const pool = require("./pool")

async function getAllMessages() {
  const { rows } = await pool.query(`
    SELECT * FROM messages
    ORDER BY id
  `)
  return rows
}

async function getMessage(id) {
  const { rows } = await pool.query(`
    SELECT * FROM messages
    WHERE id = $1
  `, [id])
  return rows[0]
}

async function getMessageByIndex(index) {
  const { rows } = await pool.query(`
    SELECT * FROM messages
    ORDER BY id
    LIMIT 1 OFFSET $1
  `, [index])
  return rows[0]
}

async function insertMessage(message) {
	await pool.query(`
    INSERT INTO messages (text, name, added)
    VALUES ($1, $2, NOW())
  `, [message.text, message.name])
}

async function updateMessage(message) {
	await pool.query(`
    UPDATE messages
    SET text = $2, name = $3
    WHERE id = $1
  `, ["" + message.id, message.text, message.name])
}


async function deleteMessage(id) {
	await pool.query(`
    DELETE FROM messages WHERE id = $1
  `, [id])
}

async function deleteAllMessages() {
	await pool.query(`
    DELETE FROM messages
  `)
}

module.exports = {
  getAllMessages,
  getMessage,
  getMessageByIndex,
  insertMessage,
  updateMessage,
  deleteMessage,
  deleteAllMessages,
}