import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Injectable()
export class AppointmentsService {
  constructor(private prisma: PrismaClient) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    // Basic prevention of double booking (checking same hour on same day)
    const date = new Date(createAppointmentDto.preferredDate);
    const startOfHour = new Date(date.setMinutes(0, 0, 0));
    const endOfHour = new Date(date.setMinutes(59, 59, 999));

    const existing = await this.prisma.appointment.findFirst({
      where: {
        preferredDate: {
          gte: startOfHour,
          lte: endOfHour,
        },
        status: 'CONFIRMED',
      },
    });

    if (existing) {
      throw new BadRequestException('Ese horario ya está reservado por otro cliente.');
    }

    return this.prisma.appointment.create({
      data: {
        ...createAppointmentDto,
        preferredDate: new Date(createAppointmentDto.preferredDate),
      },
    });
  }

  findAll() {
    return this.prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.appointment.findUnique({
      where: { id },
    });
  }

  update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    return this.prisma.appointment.update({
      where: { id },
      data: {
        ...updateAppointmentDto,
        preferredDate: updateAppointmentDto.preferredDate ? new Date(updateAppointmentDto.preferredDate) : undefined,
      },
    });
  }

  remove(id: string) {
    return this.prisma.appointment.delete({
      where: { id },
    });
  }
}
