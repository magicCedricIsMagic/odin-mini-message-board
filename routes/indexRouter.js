const { Router } = require("express")

const indexRouter = Router()

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
		})
	})
}

module.exports = indexRouter