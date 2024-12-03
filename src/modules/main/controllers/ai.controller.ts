import { Controller, Patch, UseGuards, Body, NotFoundException, BadRequestException, ValidationPipe } from '@nestjs/common';
import { FormDataRequest } from 'nestjs-form-data';
import { JwtAuthGuard } from '@modules/auth/helpers';
import { AiRepository } from '@modules/app-db/repositories';
import { ArtworkImage } from '@modules/app-db/entities';
import { UpdateArtworkImageDto, UpdateArtworkImageDataDto } from '../contracts/ai';
import { mapEmpty } from '@common/helpers';

@UseGuards(JwtAuthGuard)
@Controller('ai')
export class AiController {

  private validator = new ValidationPipe();

  constructor(private aiRepository: AiRepository) {
  }

  @Patch('image/update')
  @FormDataRequest()
  async updateArtworkImage(@Body() dto: UpdateArtworkImageDto) {
    const data = JSON.parse(dto.json);
    await this.validator.transform(data, { type: 'body', metatype: UpdateArtworkImageDataDto });
    if ((dto.image != null) !== (data.modified_image_id != null))
      throw new BadRequestException(`image and modified_image_id either both need to be set or unassigned`);
    const artwork = await this.aiRepository.getArtworkByImageId(data.image_id);
    if (artwork == null)
      throw new NotFoundException();
    await this.aiRepository.saveArtwork({
      id: artwork.id,
      protectedImage: mapEmpty(dto.image, image => ({ id: data.modified_image_id, buffer: image.buffer, mimeType: image.mimeType }), ArtworkImage.empty),
      aiDuplicateStatus: data.image_duplicate_status,
      aiGeneratedStatus: data.ai_generated_status,
      aiProcessing: false,
    });
  }

}
