import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Moves enterprise showcase background image from block level to per-card uploads.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages_blocks_enterprise_showcase" DROP CONSTRAINT "pages_blocks_enterprise_showcase_background_image_id_media_id_fk";

  ALTER TABLE "_pages_v_blocks_enterprise_showcase" DROP CONSTRAINT "_pages_v_blocks_enterprise_showcase_background_image_id_media_id_fk";

  DROP INDEX "pages_blocks_enterprise_showcase_background_image_idx";
  DROP INDEX "_pages_v_blocks_enterprise_showcase_background_image_idx";

  ALTER TABLE "pages_blocks_enterprise_showcase_cards" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "_pages_v_blocks_enterprise_showcase_cards" ADD COLUMN "background_image_id" integer;

  ALTER TABLE "pages_blocks_enterprise_showcase_cards" ADD CONSTRAINT "pages_blocks_enterprise_showcase_cards_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_enterprise_showcase_cards" ADD CONSTRAINT "_pages_v_blocks_enterprise_showcase_cards_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

  CREATE INDEX "pages_blocks_enterprise_showcase_cards_background_image_idx" ON "pages_blocks_enterprise_showcase_cards" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_enterprise_showcase_cards_background_ima_idx" ON "_pages_v_blocks_enterprise_showcase_cards" USING btree ("background_image_id");

  UPDATE "pages_blocks_enterprise_showcase_cards" AS c
  SET "background_image_id" = p."background_image_id"
  FROM "pages_blocks_enterprise_showcase" AS p
  WHERE c."_parent_id" = p."id" AND p."background_image_id" IS NOT NULL;

  UPDATE "_pages_v_blocks_enterprise_showcase_cards" AS c
  SET "background_image_id" = p."background_image_id"
  FROM "_pages_v_blocks_enterprise_showcase" AS p
  WHERE c."_parent_id" = p."id" AND p."background_image_id" IS NOT NULL;

  ALTER TABLE "pages_blocks_enterprise_showcase" DROP COLUMN "background_image_id";
  ALTER TABLE "_pages_v_blocks_enterprise_showcase" DROP COLUMN "background_image_id";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "pages_blocks_enterprise_showcase_cards" DROP CONSTRAINT "pages_blocks_enterprise_showcase_cards_background_image_id_media_id_fk";

  ALTER TABLE "_pages_v_blocks_enterprise_showcase_cards" DROP CONSTRAINT "_pages_v_blocks_enterprise_showcase_cards_background_image_id_media_id_fk";

  DROP INDEX "pages_blocks_enterprise_showcase_cards_background_image_idx";
  DROP INDEX "_pages_v_blocks_enterprise_showcase_cards_background_ima_idx";

  ALTER TABLE "pages_blocks_enterprise_showcase" ADD COLUMN "background_image_id" integer;
  ALTER TABLE "_pages_v_blocks_enterprise_showcase" ADD COLUMN "background_image_id" integer;

  ALTER TABLE "pages_blocks_enterprise_showcase" ADD CONSTRAINT "pages_blocks_enterprise_showcase_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_enterprise_showcase" ADD CONSTRAINT "_pages_v_blocks_enterprise_showcase_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;

  CREATE INDEX "pages_blocks_enterprise_showcase_background_image_idx" ON "pages_blocks_enterprise_showcase" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_enterprise_showcase_background_image_idx" ON "_pages_v_blocks_enterprise_showcase" USING btree ("background_image_id");

  ALTER TABLE "pages_blocks_enterprise_showcase_cards" DROP COLUMN "background_image_id";
  ALTER TABLE "_pages_v_blocks_enterprise_showcase_cards" DROP COLUMN "background_image_id";
  `)
}
