import {
  boolean,
  date,
  integer,
  json,
  pgTable,
  text,
  time,
  varchar,
} from "drizzle-orm/pg-core";

export const department = pgTable("department", {
  id: integer().primaryKey(),
  name: text().notNull(),
});

export const student = pgTable("student", {
  id: integer().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: varchar({ length: 118 }).notNull(),
  date: date().notNull(),
  dep_id: integer()
    .notNull()
    .references(() => department.id),
});

export const lecture_researcher = pgTable("lecture_researcher", {
  id: integer().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: varchar({ length: 118 }).notNull(),
  reg_date: date().notNull(),
  is_coor: boolean().notNull().default(false),
  dep_id: integer()
    .notNull()
    .references(() => department.id),
  scholar_link: text(),
});

export const admin = pgTable("admin", {
  id: integer().primaryKey(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: varchar({ length: 118 }).notNull(),
});

export const notification = pgTable("notification", {
  id: integer().primaryKey(),
  time: time().notNull(),
  text: text().notNull(),
  user_info: json().notNull(),
});
