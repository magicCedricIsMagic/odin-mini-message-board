const { Router } = require("express")
const CustomError = require("../utils/CustomError")

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

indexRouter.get("/", (req, res, next) => {
	messagesController.getAllMessages(req, res, next, routes, routes[0])
})

indexRouter.get("/new", (req, res, next) => {
	messagesController.getNewMessageView(req, res, next, routes, routes[1])
})
indexRouter.post("/new", messagesController.addNewMessage)

indexRouter.get("/messages/:index", (req, res, next) => {
	messagesController.getMessageByIndex(req, res, next, routes)
})


indexRouter.get("/edit-message/:id", (req, res, next) => {
	messagesController.getEditMessageView(req, res, next, routes)
})
indexRouter.post("/edit-message/:id", messagesController.addNewMessage)

indexRouter.post("/delete-message/:id", messagesController.deleteMessage)

indexRouter.get("/*", (req, res, next) => {
	throw new CustomError(
		"Page non trouvée",
		"Cette page n'existe pas."
	)
})

indexRouter.use((err, req, res, next) => messagesController.getErrorView(err, req, res, next, routes))

module.exports = indexRouter
