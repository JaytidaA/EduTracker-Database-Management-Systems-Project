#!/bin/zsh

db_file="test/edutracker.db"

rm "$db_file"
touch "$db_file"

sqlite3 "$db_file" < "setup.sql"
sqlite3 "$db_file" < "dummy_sql_scripts/dummy_setup_2.sql"
