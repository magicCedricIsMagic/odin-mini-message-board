const { body, validationResult } = require("express-validator");
const { sanitize } = require("../utils/texts")
const CustomError = require("../utils/CustomError")

let messages = [
	{
		id: 1,
		text: "Bonjour ici\u00a0!",
		user: "Jacqueline",
		added: new Date().addHours(-1).addMinutes(-2),
	},
	{
		id: 2,
		text: "Allo le monde\u00a0?",
		user: "Jean-Michel",
		added: new Date().addMinutes(-31),
	},
	{
		id: 3,
		text: "Oui ?",
		user: "Le monde",
		added: new Date(),
	},
]

const getView = (req, res, next, params) => {
	res.render(params.route.file, {
		title: params.route.title,
		links: params.routes,
		theme: params.theme,
	})
}

const getAllMessages = (req, res, next, params) => {
	res.render(params.route.file, {
		title: params.route.title,
		links: params.routes,
		messages: messages,
		theme: params.theme,
	})
}

const getNewMessageView = (req, res, next, params) => {
	res.render("new-message", {
		title: params.route.title,
		links: params.routes,
		message: false,
		theme: params.theme,
	})
}
const getEditMessageView = (req, res, next, params) => {
	res.render("new-message", {
		title: "Modifier le message",
		links: params.routes,
		message: messages.find((msg) => msg.id === parseInt(req.params.id)),
		messages: messages,
		theme: params.theme,
	})
}

const getMessageByIndex = (req, res, next, params) => {
	const messageIndex = messages[req.params.index - 1]

	if (!messageIndex) throw new CustomError(
		"Page non trouvée",
		"Cette page n'existe pas."
	)

	res.render("message", {
		title: `Message n°${req.params.index}\u00a0:`,
		links: params.routes,
		message: messageIndex,
		theme: params.theme,
	})
}

const validateMessage = [
	body("name")
		.isLength({ min: 1, max: 30 }).withMessage(`Nom doit être entre 1 et 30 caractères`),
	body("text")
		.isLength({ min: 3, max: 300 }).withMessage(`Texte doit être entre 1 et 300 caractères`),
]

const addNewMessage = [
	validateMessage,
	(req, res, next) => {
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
			const postId = parseInt(req.params.id)
			if (postId) {
				messages = messages.map((message) => {
					if (message.id === postId) {
						return {
							...message,
							text: sanitize(req.body.text),
							user: sanitize(req.body.name),
						}
					}
					else return message
				})
			}
			else {
				messages.push({
					id: messages[messages.length - 1]?.id + 1 || 1,
					text: sanitize(req.body.text),
					user: sanitize(req.body.name),
					added: new Date(),
				})
			}
			res.redirect("/")
		}
	}
]

const deleteMessage = (req, res, next) => {
	res.redirect("/")
	messages = messages.filter(
		(message) => message.id !== parseInt(req.params.id),
	)
}

const getErrorView = (err, req, res, next, params) => {
	res.render("error", {
		title: `Erreur ${err.statusCode}`,
		links: params.routes,
		error: err,
		theme: params.theme,
	})
}

module.exports = {
	messages,
	getView,
	getAllMessages,
	getMessageByIndex,
	getNewMessageView,
	getEditMessageView,
	addNewMessage,
	deleteMessage,
	getErrorView,
}
