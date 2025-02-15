const { body, validationResult } = require("express-validator");
const { sanitize } = require("../utils/texts")
const CustomError = require("../utils/CustomError")
const db = require("../db/queries")

function getView(req, res, next, params) {
	res.render(params.route.file, {
		title: params.route.title,
		links: params.routes,
		theme: params.theme,
	})
}

async function getAllMessages(req, res, next, params) {
	const messages = await db.getAllMessages()
	res.render(params.route.file, {
		title: params.route.title,
		links: params.routes,
		messages: messages,
		theme: params.theme,
	})
}

function getNewMessageView(req, res, next, params) {
	res.render("new-message", {
		title: params.route.title,
		links: params.routes,
		message: false,
		theme: params.theme,
	})
}
async function getEditMessageView(req, res, next, params) {
	const message = await db.getMessage(parseInt(req.params.id))
	console.log("getEditMessageView", message)
	res.render("new-message", {
		title: "Modifier le message",
		links: params.routes,
		message: message,
		theme: params.theme,
	})
}

async function getMessageByIndex(req, res, next, params) {
	const message = await db.getMessageByIndex(parseInt(req.params.index - 1))
	if (message) {
		res.render("message", {
			title: `Message n°${req.params.index}\u00a0:`,
			links: params.routes,
			message: message,
			theme: params.theme,
		})
	}
	else next()
}

const validateMessage = [
	body("name")
		.isLength({ min: 1, max: 100 })
		.withMessage(`Nom doit être entre 1 et 100 caractères`),
	body("text")
		.isLength({ min: 3, max: 255 })
		.withMessage(`Texte doit être entre 1 et 255 caractères`),
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
			(async() => {
				const postId = parseInt(req.params.id)
				const message = {
					text: sanitize(req.body.text),
					name: sanitize(req.body.name),
				}
				if (postId) {
					message.id = postId
					console.log("updateMessage", message)
					await db.updateMessage(message)
				}
				else await db.insertMessage(message)
				res.redirect("/")
			})()
		}
	}
]

async function deleteMessage (req, res, next) {
	await db.deleteMessage(req.params.id)
	res.redirect("/")
}

async function deleteAllMessages (req, res, next) {
	await db.deleteAllMessages()
	res.redirect("/")
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
	getView,
	getAllMessages,
	getMessageByIndex,
	getNewMessageView,
	getEditMessageView,
	addNewMessage,
	deleteMessage,
	deleteAllMessages,
	getErrorView,
}
