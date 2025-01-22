import { Migration } from '@mikro-orm/migrations';

export class Migration20250122082045 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" add column "username" varchar(50) not null;`);
    this.addSql(`alter table "user" rename column "name" to "full_name";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop column "username";`);

    this.addSql(`alter table "user" rename column "full_name" to "name";`);
  }

}
