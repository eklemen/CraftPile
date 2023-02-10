import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1675914179966 implements MigrationInterface {
  name = 'Init1675914179966';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" UUID DEFAULT gen_random_uuid() NOT NULL, "email" varchar NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "account_id" uuid, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6acfec7285fdf9f463462de3e9" ON "user" ("account_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "account" ("id" UUID DEFAULT gen_random_uuid() NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "photo" ("id" UUID DEFAULT gen_random_uuid() NOT NULL, "bucket_name" varchar NOT NULL, "object_key" varchar NOT NULL, "thumbnail_key" varchar NOT NULL, "description" varchar NOT NULL, "date_of_photo" timestamp NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "child_id" uuid, "album_id" uuid, "account_id" uuid, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e20a7909d568260051f092f946" ON "photo" ("child_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ffd437288f0decc45db033e648" ON "photo" ("album_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b5a8898edc58430004a66f6862" ON "photo" ("account_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "child" ("id" UUID DEFAULT gen_random_uuid() NOT NULL, "name" varchar NOT NULL, "date_of_birth" varchar NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "account_id" uuid, CONSTRAINT "PK_4609b9b323ca37c6bc435ec4b6b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_39cd4ce66d0b0a7728e1226df9" ON "child" ("account_id") `
    );
    await queryRunner.query(
      `CREATE TABLE "album" ("id" UUID DEFAULT gen_random_uuid() NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "child_id" uuid, "account_id" uuid, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1bf2b7ed66a63f71b91d857109" ON "album" ("child_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ea367410f387b9ad69f6605a5a" ON "album" ("account_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_6acfec7285fdf9f463462de3e9f" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "photo" ADD CONSTRAINT "FK_e20a7909d568260051f092f9461" FOREIGN KEY ("child_id") REFERENCES "child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "photo" ADD CONSTRAINT "FK_ffd437288f0decc45db033e648f" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "photo" ADD CONSTRAINT "FK_b5a8898edc58430004a66f68625" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "child" ADD CONSTRAINT "FK_39cd4ce66d0b0a7728e1226df96" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "FK_1bf2b7ed66a63f71b91d8571098" FOREIGN KEY ("child_id") REFERENCES "child"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "album" ADD CONSTRAINT "FK_ea367410f387b9ad69f6605a5a5" FOREIGN KEY ("account_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "FK_ea367410f387b9ad69f6605a5a5"`
    );
    await queryRunner.query(
      `ALTER TABLE "album" DROP CONSTRAINT "FK_1bf2b7ed66a63f71b91d8571098"`
    );
    await queryRunner.query(
      `ALTER TABLE "child" DROP CONSTRAINT "FK_39cd4ce66d0b0a7728e1226df96"`
    );
    await queryRunner.query(
      `ALTER TABLE "photo" DROP CONSTRAINT "FK_b5a8898edc58430004a66f68625"`
    );
    await queryRunner.query(
      `ALTER TABLE "photo" DROP CONSTRAINT "FK_ffd437288f0decc45db033e648f"`
    );
    await queryRunner.query(
      `ALTER TABLE "photo" DROP CONSTRAINT "FK_e20a7909d568260051f092f9461"`
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_6acfec7285fdf9f463462de3e9f"`
    );
    await queryRunner.query(
      `DROP INDEX "album"@"IDX_ea367410f387b9ad69f6605a5a" CASCADE`
    );
    await queryRunner.query(
      `DROP INDEX "album"@"IDX_1bf2b7ed66a63f71b91d857109" CASCADE`
    );
    await queryRunner.query(`DROP TABLE "album"`);
    await queryRunner.query(
      `DROP INDEX "child"@"IDX_39cd4ce66d0b0a7728e1226df9" CASCADE`
    );
    await queryRunner.query(`DROP TABLE "child"`);
    await queryRunner.query(
      `DROP INDEX "photo"@"IDX_b5a8898edc58430004a66f6862" CASCADE`
    );
    await queryRunner.query(
      `DROP INDEX "photo"@"IDX_ffd437288f0decc45db033e648" CASCADE`
    );
    await queryRunner.query(
      `DROP INDEX "photo"@"IDX_e20a7909d568260051f092f946" CASCADE`
    );
    await queryRunner.query(`DROP TABLE "photo"`);
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(
      `DROP INDEX "user"@"IDX_6acfec7285fdf9f463462de3e9" CASCADE`
    );
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
