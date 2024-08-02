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
	{
		url: "/parametres",
		file: "param",
		title: "Paramètres",
	},
]

let cookieHueValue = 230

indexRouter.get("/*", (req, res, next) => {
	const cookies = req.headers.cookie
	if (cookies) {
		const newCookieHueValue = cookies
			.split("; ")
			.find((row) => row.startsWith("hue="))
			?.split("=")[1]
		if (!!newCookieHueValue) cookieHueValue = newCookieHueValue
	}
	next()
})

indexRouter.get("/", (req, res, next) => {
	messagesController.getAllMessages(req, res, next, { routes, route: routes[0], cookieHueValue })
})

indexRouter.get("/new", (req, res, next) => {
	messagesController.getNewMessageView(req, res, next, { routes, route: routes[1], cookieHueValue })
})
indexRouter.post("/new", messagesController.addNewMessage)

indexRouter.get("/messages/:index", (req, res, next) => {
	messagesController.getMessageByIndex(req, res, next, { routes, cookieHueValue })
})


indexRouter.get("/edit-message/:id", (req, res, next) => {
	messagesController.getEditMessageView(req, res, next, { routes, cookieHueValue })
})
indexRouter.post("/edit-message/:id", messagesController.addNewMessage)

indexRouter.post("/delete-message/:id", messagesController.deleteMessage)

indexRouter.get("/parametres", (req, res, next) => {
	messagesController.getView(req, res, next, { routes, route: routes[2], cookieHueValue })
})

indexRouter.post("/change-hue", (req, res, next) => {
	console.log("req.body", req.body)
})

indexRouter.get("/*", (req, res, next) => {
	throw new CustomError(
		"Page non trouvée",
		"Cette page n'existe pas."
	)
})

indexRouter.use((err, req, res, next) => messagesController.getErrorView(err, req, res, next, { routes, cookieHueValue }))

module.exports = indexRouter
