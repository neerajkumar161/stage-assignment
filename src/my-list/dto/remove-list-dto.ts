import { IsString } from 'class-validator';

export class RemoveListDto {
  @IsString()
  contentId: string;
}


