DROP DATABASE IF EXISTS drinkupdata;
CREATE DATABASE drinkupdata;
USE drinkupdata;

CREATE TABLE drinks (
  id integer,
  drinkname TEXT,
  instructions TEXT,
  imageroute TEXT,
  comments TEXT
);

/*
 * To create the database and the tables.
 * Execute this file from the command line by typing:
 *   mysql -u root < schema.sql
 */