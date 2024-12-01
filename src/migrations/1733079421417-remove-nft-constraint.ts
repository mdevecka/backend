import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveNftConstraint1733079421417 implements MigrationInterface {
    name = 'RemoveNftConstraint1733079421417'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artwork" DROP CONSTRAINT "FK_7b6300cac5b0a819cb86dac9a14"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_1780c2ccb486468f3750a7e0cde"`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD CONSTRAINT "FK_7b6300cac5b0a819cb86dac9a14" FOREIGN KEY ("nft_id") REFERENCES "nft"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_1780c2ccb486468f3750a7e0cde" FOREIGN KEY ("trial_mint_id") REFERENCES "nft"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_1780c2ccb486468f3750a7e0cde"`);
        await queryRunner.query(`ALTER TABLE "artwork" DROP CONSTRAINT "FK_7b6300cac5b0a819cb86dac9a14"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_1780c2ccb486468f3750a7e0cde" FOREIGN KEY ("trial_mint_id") REFERENCES "nft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "artwork" ADD CONSTRAINT "FK_7b6300cac5b0a819cb86dac9a14" FOREIGN KEY ("nft_id") REFERENCES "nft"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
