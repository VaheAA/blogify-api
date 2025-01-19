import { Migration } from '@mikro-orm/migrations';

export class Migration20250119134346 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" add column "avatar" varchar(255) null;`);

    this.addSql(`alter table "post" add column "cover" varchar(255) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop column "avatar";`);

    this.addSql(`alter table "post" drop column "cover";`);
  }

}
