import { Migration } from '@mikro-orm/migrations';

export class Migration20250119075921 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" drop column "is_active";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" add column "is_active" boolean not null default true;`);
  }

}
