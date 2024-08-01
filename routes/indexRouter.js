const { Router } = require("express")

const indexRouter = Router()

const messagesController = require("../controllers/messagesController.js")
const appController = require("../controllers/appController.js")

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

indexRouter.get("/", (req, res, next) => {
	messagesController.getAllMessages(req, res, next, routes, routes[0])
})

indexRouter.get("/new", (req, res, next) => {
	messagesController.getView(req, res, next, routes, routes[1])
})

indexRouter.get("/messages/:index", (req, res, next) => {
	messagesController.getMessageByIndex(req, res, next, routes)
})

indexRouter.post("/new", messagesController.addNewMessage)

indexRouter.post("/delete-message/:id", messagesController.deleteMessage)

indexRouter.use((err, req, res, next) => appController.renderError(err, req, res, next, routes))

module.exports = indexRouter
