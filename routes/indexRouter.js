const { Router } = require("express")

const indexRouter = Router()

const messagesController = require("../controllers/messagesController.js")

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
		messagesController.getAllMessages(req, res, next, routes, route)
	})
}

indexRouter.get("/messages/:index", (req, res, next) => {
	messagesController.getMessageByIndex(req, res, next, routes)
})

indexRouter.post("/new", messagesController.addNewMessage)

indexRouter.post("/delete-message/:id", messagesController.deleteMessage)

module.exports = indexRouter
