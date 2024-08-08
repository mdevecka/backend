import { IsNotEmpty } from 'class-validator';

export class Metadata {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description: string;
}

export class CollectionDto {
    @IsNotEmpty()
    metadata: Metadata;
    @IsNotEmpty()
    address: string;
}