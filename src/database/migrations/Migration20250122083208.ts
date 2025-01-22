import { Migration } from '@mikro-orm/migrations';

export class Migration20250122083208 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" rename column "full_name" to "fullname";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" rename column "fullname" to "full_name";`);
  }

}
