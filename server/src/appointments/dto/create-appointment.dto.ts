import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @ApiProperty({ example: 'juan@example.com' })
  @IsEmail()
  @IsNotEmpty()
  clientEmail: string;

  @ApiProperty({ example: '+34600000000' })
  @IsString()
  @IsNotEmpty()
  clientPhone: string;

  @ApiProperty({ example: 'Realismo' })
  @IsString()
  @IsNotEmpty()
  tattooType: string;

  @ApiProperty({ example: '10x10cm' })
  @IsString()
  @IsOptional()
  size?: string;

  @ApiProperty({ example: 'Un león en el antebrazo' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '2024-05-20T10:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  preferredDate: string;
}
