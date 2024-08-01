const { body, validationResult } = require("express-validator");
const { sanitize } = require("../utils/texts")
class CustomError extends Error {
	constructor(title, message, statusCode) {
		super(message)
		this.name = title || "Error"
		this.statusCode = statusCode || 404
	}
}

let messages = [
	{
		id: 1,
		text: "Bonjour ici\u00a0!",
		user: "Jacqueline",
		added: new Date(),
	},
	{
		id: 2,
		text: "Allo le monde\u00a0?",
		user: "Jean-Michel",
		added: new Date(),
	},
	{
		id: 3,
		text: "Laisse-le tranquille Jean-Mich.",
		user: "Martine",
		added: new Date(),
	},
]

const getView = (req, res, next, routes, route) => {		
	res.render(route.file, {
		title: route.title,
		links: routes,
	})
	next()
}

const getAllMessages = (req, res, next, routes, route) => {	
	// if (fs.exists('./views/' + route.file + ".ejs") == true) {		
		res.render(route.file, {
			title: route.title,
			links: routes,
			messages: messages,
		})
	// }
	// else throw new CustomError(
	// 	"Page non trouvée",
	// 	"Cette page n'existe pas."
	// )
	next()
}

const getMessageByIndex = (req, res, next, routes) => {
	const messageIndex = messages[req.params.index - 1]

	if (!messageIndex) throw new CustomError(
		"Page non trouvée",
		"Cette page n'existe pas."
	)

	res.render("message", {
		title: `Message n°${req.params.index}\u00a0:`,
		links: routes,
		message: messageIndex,
	})
}

const validateMessage = [
	body("name")
		.isLength({ min: 1, max: 20 }).withMessage(`Name must be between 1 and 20 characters`),
  body("text")
    .isLength({ min: 3, max: 100 }).withMessage(`Text must be between 3 and 100 characters`),
]

const addNewMessage = [
  validateMessage,
  (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			let errorsStringArray = []
			for (const error of errors.errors) {
				errorsStringArray.push(error.msg)
			}
			throw new CustomError(
				"Erreur de formulaire",
				errorsStringArray.join(' | '),
				400
			)
		}
		else {
			messages.push({
				id: messages[messages.length - 1]?.id + 1 || 1,
				text: sanitize(req.body.text),
				user: sanitize(req.body.name),
				added: new Date(),
			})
			res.redirect("/")
		}
  }
]

const deleteMessage = (req, res) => {
	res.redirect("/")
	messages = messages.filter(
		(message) => message.id !== parseInt(req.params.id),
	)
}

module.exports = { messages, getView, getAllMessages, getMessageByIndex, addNewMessage, deleteMessage }
