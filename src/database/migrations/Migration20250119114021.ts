import { Migration } from '@mikro-orm/migrations';

export class Migration20250119114021 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user_sessions" ("id" serial primary key, "user_id" int not null, "token" text not null, "created_at" timestamptz not null);`);

    this.addSql(`alter table "user_sessions" add constraint "user_sessions_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "user_sessions" cascade;`);
  }

}
