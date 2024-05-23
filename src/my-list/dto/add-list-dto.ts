import { TContent } from '../schemas/my-list.schema';
import { IsString } from 'class-validator';

export class AddListDto {
  @IsString()
  contentId: string;

  @IsString()
  contentType: TContent;
}
