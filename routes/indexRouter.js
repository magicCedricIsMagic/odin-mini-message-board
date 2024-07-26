const { Router } = require("express")

const indexRouter = Router()

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
	indexRouter.get(route.url, (req, res, next) => {
		res.render(route.file, {
			title: route.title,
			links: routes,
			messages: messages,
		})
		next()
	})
}

indexRouter.get("/messages/:index", (req, res) => {
	res.render("message", {
		title: `Message n°${req.params.index}\u00a0:`,
		links: routes,
		message: messages[req.params.index - 1],
	})
})

indexRouter.post("/new", (req, res) => {
	messages.push({
		id: messages[messages.length - 1]?.id + 1 || 1,
		text: req.body.text,
		user: req.body.name,
		added: new Date(),
	})
	res.redirect("/")
})

indexRouter.post("/delete-message/:id", (req, res) => {
	res.redirect("/")
	messages = messages.filter((message) => message.id !== parseInt(req.params.id))
})

module.exports = indexRouter
