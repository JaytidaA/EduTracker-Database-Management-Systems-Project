#!/bin/zsh

db_file="test/edutracker.db"

rm "$db_file"
touch "$db_file"

sqlite3 "$db_file" < "setup.sql"
sqlite3 "$db_file" < "utility_sql_scripts/department_setup.sql"
sqlite3 "$db_file" < "utility_sql_scripts/admin_setup.sql"
