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
		url: "/param",
		file: "param",
		title: "Paramètres",
	},
]

const initialHue = 230
const initialDarkMode = false

let theme = {
	hue: initialHue,
	darkMode: initialDarkMode,
}


function extractCookie(headersCookie, cookieName) {
	const cookie = headersCookie
		.split("; ")
		.find((row) => row.startsWith(`${cookieName}=`))
		?.split("=")[1]
	return cookie
}

indexRouter.get("/*", (req, res, next) => {
	const headersCookie = req.headers.cookie
	if (headersCookie) {
		const newHue = extractCookie(headersCookie, "hue")
		if (newHue) theme.hue = JSON.parse(newHue)
		
		const newDarkMode = extractCookie(headersCookie, "darkMode")
		if (newDarkMode) theme.darkMode = JSON.parse(newDarkMode)
	}
	else {
		theme.hue = initialHue
		theme.darkMode = initialDarkMode
	}
	next()
})

indexRouter.get("/", (req, res, next) => {
	messagesController.getAllMessages(req, res, next, { routes, route: routes[0], theme })
})

indexRouter.get("/new", (req, res, next) => {
	messagesController.getNewMessageView(req, res, next, { routes, route: routes[1], theme })
})
indexRouter.post("/new", messagesController.addNewMessage)

indexRouter.get("/messages/:index", (req, res, next) => {
	messagesController.getMessageByIndex(req, res, next, { routes, theme })
})


indexRouter.get("/edit-message/:id", (req, res, next) => {
	messagesController.getEditMessageView(req, res, next, { routes, theme })
})
indexRouter.post("/edit-message/:id", messagesController.addNewMessage)

indexRouter.post("/delete-message/:id", messagesController.deleteMessage)

indexRouter.get("/param", (req, res, next) => {
	messagesController.getView(req, res, next, { routes, route: routes[2], theme })
})

indexRouter.post("/change-hue", (req, res) => {
	console.log("req.body", req.body)
	res.json({ hueSuccess: true })
})

indexRouter.get("/*", (req, res, next) => {
	throw new CustomError(
		"Page non trouvée",
		"Cette page n'existe pas."
	)
})

indexRouter.use((err, req, res, next) => messagesController.getErrorView(err, req, res, next, { routes, theme }))

module.exports = indexRouter
