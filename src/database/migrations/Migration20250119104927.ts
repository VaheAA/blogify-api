import { Migration } from '@mikro-orm/migrations';

export class Migration20250119104927 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "post" drop constraint "post_author_id_id_foreign";`);

    this.addSql(`alter table "post" rename column "author_id_id" to "author_id";`);
    this.addSql(`alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "post" drop constraint "post_author_id_foreign";`);

    this.addSql(`alter table "post" rename column "author_id" to "author_id_id";`);
    this.addSql(`alter table "post" add constraint "post_author_id_id_foreign" foreign key ("author_id_id") references "user" ("id") on update cascade;`);
  }

}
