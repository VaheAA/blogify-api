import { Migration } from '@mikro-orm/migrations';

export class Migration20250119113023 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "post" alter column "title" type varchar(255) using ("title"::varchar(255));`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "post" alter column "title" type tsvector using ("title"::tsvector);`);
  }

}
