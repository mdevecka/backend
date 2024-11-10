import { MigrationInterface, QueryRunner } from "typeorm";

export class NftChanges1731257774915 implements MigrationInterface {
  name = 'NftChanges1731257774915'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "collection" ADD "online_check" text`);
    await queryRunner.query(`ALTER TABLE "nft" ADD "online_check" text`);
    await queryRunner.query(`ALTER TABLE "wallet" ADD "online_check" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "online_check"`);
    await queryRunner.query(`ALTER TABLE "nft" DROP COLUMN "online_check"`);
    await queryRunner.query(`ALTER TABLE "collection" DROP COLUMN "online_check"`);
  }

}
