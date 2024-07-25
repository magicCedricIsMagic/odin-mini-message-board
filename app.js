require("dotenv").config()

const express = require("express")
const path = require("path")

const app = express()

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: true })) /* Pour pouvoir décoder texte envoyé via POST */

const { displayDate, displayHour } = require("./utils/dates")
app.locals.displayDate = displayDate
app.locals.displayHour = displayHour

const indexRouter = require("./routes/indexRouter")
app.use("/", indexRouter)

app.use((err, req, res, next) => {
	console.error(err)
	res.status(err.statusCode || 500).send(err.message)
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Nous écoutons port ${PORT}`))
