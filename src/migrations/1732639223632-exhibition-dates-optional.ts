import { MigrationInterface, QueryRunner } from "typeorm";

export class ExhibitionDatesOptional1732639223632 implements MigrationInterface {
  name = 'ExhibitionDatesOptional1732639223632'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "exhibition" ALTER COLUMN "from_date" DROP NOT NULL`);
    await queryRunner.query(`ALTER TABLE "exhibition" ALTER COLUMN "to_date" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "exhibition" ALTER COLUMN "to_date" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "exhibition" ALTER COLUMN "from_date" SET NOT NULL`);
  }

}
