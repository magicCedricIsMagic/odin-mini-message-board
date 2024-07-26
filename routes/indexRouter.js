const { Router } = require("express")

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
	{
		text: "Ta gueule Jean-Mich",
		user: "Martine",
		added: new Date(),
	},
	{
		text: "Mais je n'ai presque rien dit !",
		user: "Jean-Michel",
		added: new Date(),
	},
	{
		text: "Et moi j'ai dit ta gueule Jean-Mich",
		user: "Martine",
		added: new Date(),
	},
	{
		text: "…",
		user: "Jean-Michel",
		added: new Date(),
	},
	{
		text: "Ouais bah ta gueule toi-même Martoche, d'ailleurs t'es moche.\nTout le monde pense comme moi. Même que c'est vrai.",
		user: "Anonyme",
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
		text: req.body.text,
		user: req.body.name,
		added: new Date(),
	})
	res.redirect("/")
})

module.exports = indexRouter
