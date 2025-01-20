import { Migration } from '@mikro-orm/migrations';

export class Migration20250120082327 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "post" drop column "cover";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "post" add column "cover" varchar(255) null;`);
  }

}
