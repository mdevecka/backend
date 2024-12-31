import { MemoryStoredFile } from 'nestjs-form-data';
import { MimeType } from './utils';

export interface FileType extends MemoryStoredFile {
  get mimeType(): MimeType;
}
