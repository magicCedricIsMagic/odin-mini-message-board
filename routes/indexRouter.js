const { Router } = require("express")
const { displayDate } = require("../utils/dates")

const indexRouter = Router()

const messages = [
	{
		text: "Bonjour ici\u00a0!",
		user: "Jacqueline",
		added: new Date(),
	},
	{
		text: "Allo le monde\u00a0?",
		user: "Jean-Michel",
		added: new Date(),
	},
]

const routes = [
	{
		url: "/",
		file: "index",
		title: "Maison",
	},
	{
		url: "/new",
		file: "new-message",
		title: "Nouveau message",
	},
]

for (const route of routes) {
	indexRouter.get(route.url, (req, res) => {
		res.render(route.file, {
			title: route.title,
			links: routes,
			messages: messages,
		})
	})
}

module.exports = indexRouter
