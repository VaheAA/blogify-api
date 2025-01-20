import { Migration } from '@mikro-orm/migrations';

export class Migration20250120082413 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create index "post_tags_index" on "post" ("tags");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop index "post_tags_index";`);
  }

}
