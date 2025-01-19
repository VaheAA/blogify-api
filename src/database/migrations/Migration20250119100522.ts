import { Migration } from '@mikro-orm/migrations';

export class Migration20250119100522 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "post" add column "tags" jsonb not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "post" drop column "tags";`);
  }

}
