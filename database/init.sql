-- Create the foodrescue user and database
CREATE USER foodrescue WITH PASSWORD 'foodrescue123';
CREATE DATABASE foodrescue OWNER foodrescue;
GRANT ALL PRIVILEGES ON DATABASE foodrescue TO foodrescue;