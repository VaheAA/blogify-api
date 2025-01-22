import { Migration } from '@mikro-orm/migrations';

export class Migration20250122083343 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" drop column "fullname";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" add column "fullname" varchar(50) not null;`);
  }

}
