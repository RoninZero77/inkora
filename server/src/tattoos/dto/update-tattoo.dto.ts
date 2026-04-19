import { PartialType } from '@nestjs/swagger';
import { CreateTattooDto } from './create-tattoo.dto';

export class UpdateTattooDto extends PartialType(CreateTattooDto) {}
