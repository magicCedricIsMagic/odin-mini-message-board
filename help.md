## Initialisation projet
`pnpm init` 
<br>
`pnpm install express`
<br>
`touch .gitignore` ou `echo ".env" "node_modules" > .gitignore` ou `printf ".env\nnode_modules" > .gitignore`

<br>

## PostgreSql
| Commande                      | Détails                        |
| ----------------------------- | ------------------------------ |
| `psql`                        | Enter the PostgreSQL shell     |
| `\l`                          | View the current dbs           |
| `CREATE DATABASE top_users;`  | Create a new db                |
| `\c top_users`                | Connect to the db              |
| `CREATE TABLE usernames (id`… | Create a table and its columns |
| `\d`                          | View the tables                |
| `SELECT * FROM usernames;`    | Check the table                |
| `\q`                          | Quit the PostgreSQL shell      |