#! /usr/bin/env node
require("dotenv").config()

const { Client } = require("pg")

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR (255),
  name VARCHAR (100),
  added TIMESTAMP
);

INSERT INTO messages (text, name, added) 
VALUES
  ('Bonjour ici\u00a0!', 'Jacqueline', NOW() - time '01:01'),
  ('Allo le monde\u00a0?', 'Jean-Michel', NOW() - time '00:31'),
  ('Oui\u00a0?', 'Le monde', NOW())
;
`

async function main() {
  console.log("seeding…")
  const client = new Client({
    connectionString: process.env.DB_CONNECTION_STRING,
  })
  await client.connect()
  await client.query(SQL)
  await client.end()
  console.log("done")
}

main()
