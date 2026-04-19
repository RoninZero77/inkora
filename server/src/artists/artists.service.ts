import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaClient) {}

  create(createArtistDto: CreateArtistDto) {
    return this.prisma.artist.create({
      data: createArtistDto,
    });
  }

  findAll() {
    return this.prisma.artist.findMany({
      include: { tattoos: true },
    });
  }

  findOne(id: string) {
    return this.prisma.artist.findUnique({
      where: { id },
      include: { tattoos: true },
    });
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  remove(id: string) {
    return this.prisma.artist.delete({
      where: { id },
    });
  }
}
