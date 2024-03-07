import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from '@nestjs/class-validator';

export class OrderDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  to: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  from: string;
}
