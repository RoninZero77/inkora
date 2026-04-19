import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTattooDto } from './dto/create-tattoo.dto';
import { UpdateTattooDto } from './dto/update-tattoo.dto';

@Injectable()
export class TattoosService {
  constructor(private prisma: PrismaClient) {}

  create(createTattooDto: CreateTattooDto) {
    return this.prisma.tattoo.create({
      data: createTattooDto,
    });
  }

  findAll(category?: string) {
    return this.prisma.tattoo.findMany({
      where: category ? { category: { name: category } } : {},
      include: {
        artist: true,
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.tattoo.findUnique({
      where: { id },
      include: {
        artist: true,
        category: true,
      },
    });
  }

  update(id: string, updateTattooDto: UpdateTattooDto) {
    return this.prisma.tattoo.update({
      where: { id },
      data: updateTattooDto,
    });
  }

  remove(id: string) {
    return this.prisma.tattoo.delete({
      where: { id },
    });
  }
}
