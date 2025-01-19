import { Migration } from '@mikro-orm/migrations';

export class Migration20250119113216 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`drop index "post_tags_index";`);
  }

  override async down(): Promise<void> {
    this.addSql(`create index "post_tags_index" on "public"."post" using gin(to_tsvector('simple', "tags"));`);
  }

}
