import { Migration } from '@mikro-orm/migrations';

export class Migration20250125135231 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "tag" ("id" serial primary key, "name" varchar(255) not null);`);
    this.addSql(`alter table "tag" add constraint "tag_name_unique" unique ("name");`);

    this.addSql(`create table "user" ("id" serial primary key, "username" varchar(50) not null, "email" varchar(100) not null, "password" varchar(255) not null, "avatar" varchar(255) null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);

    this.addSql(`create table "post" ("id" serial primary key, "title" varchar(255) not null, "content" text not null, "author_id" int not null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);
    this.addSql(`create index "post_title_index" on "public"."post" using gin(to_tsvector('simple', "title"));`);

    this.addSql(`create table "post_tags" ("post_id" int not null, "tag_id" int not null, constraint "post_tags_pkey" primary key ("post_id", "tag_id"));`);

    this.addSql(`create table "user_sessions" ("id" serial primary key, "user_id" int not null, "token" text not null, "created_at" timestamptz not null);`);

    this.addSql(`alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;`);

    this.addSql(`alter table "post_tags" add constraint "post_tags_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "post_tags" add constraint "post_tags_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "user_sessions" add constraint "user_sessions_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "post_tags" drop constraint "post_tags_tag_id_foreign";`);

    this.addSql(`alter table "post" drop constraint "post_author_id_foreign";`);

    this.addSql(`alter table "user_sessions" drop constraint "user_sessions_user_id_foreign";`);

    this.addSql(`alter table "post_tags" drop constraint "post_tags_post_id_foreign";`);

    this.addSql(`drop table if exists "tag" cascade;`);

    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop table if exists "post" cascade;`);

    this.addSql(`drop table if exists "post_tags" cascade;`);

    this.addSql(`drop table if exists "user_sessions" cascade;`);
  }

}
