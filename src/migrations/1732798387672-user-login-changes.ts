import { MigrationInterface, QueryRunner } from "typeorm";

export class UserLoginChanges1732798387672 implements MigrationInterface {
  name = 'UserLoginChanges1732798387672'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."user_login_type_enum" AS ENUM('credentials', 'google')`);
    await queryRunner.query(`ALTER TABLE "user" ADD "login_type" "public"."user_login_type_enum" NOT NULL DEFAULT 'credentials'`);
    await queryRunner.query(`ALTER TABLE "user" ADD "login_provider_id" text`);
    await queryRunner.query(`CREATE TYPE "public"."user_register_state_enum" AS ENUM('registering', 'registered')`);
    await queryRunner.query(`ALTER TABLE "user" ADD "register_state" "public"."user_register_state_enum" NOT NULL DEFAULT 'registering'`);
    await queryRunner.query(`ALTER TABLE "user" ADD "register_token" text`);
    await queryRunner.query(`ALTER TABLE "user" ADD "reset_token" text`);
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "label" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "label" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "reset_token"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "register_token"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "register_state"`);
    await queryRunner.query(`DROP TYPE "public"."user_register_state_enum"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "login_provider_id"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "login_type"`);
    await queryRunner.query(`DROP TYPE "public"."user_login_type_enum"`);
  }

}
