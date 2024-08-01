const renderError = (err, req, res, next, routes) => {
	res.render("error", {
		title: `Erreur ${err.statusCode}`,
		links: routes,
		errorName: err.name,
		errorMessage: err.message,
	})
}

module.exports = { renderError }
