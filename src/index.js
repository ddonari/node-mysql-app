const express = require("express");
const morgan = require("morgan");
const exphbars = require("express-handlebars")
const path = require("path");
const { nextTick } = require("process");

// Init
const app = express();

// Settings
app.set("port", process.env.PORT || 4000);

// set layout path
app.set("views", path.join(__dirname, 'views'))

//config handlebars
app.engine(".hbs", exphbars({
    defaultLayout: 'main', 
    layoutsDir: path.join(app.get('views'),"layouts"),
    partialsDir: path.join(app.get('views'),"partials"),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
}));

app.set('view engine', '.hbs')

// configure express accept format types
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Middlewares
app.use(morgan("dev"));

// Global variables
app.use((req, res, next) => {
  next();
});

// Routes
app.use(require('./routes'))
app.use(require('./routes/authentication'))
// {path}/links{...}
app.use('/links', require('./routes/links'))

// Public
app.use(express.static(path.join(__dirname,'public')))

// Start server
app.listen(app.get("port"), () => {
  console.log("Server on port: ", app.get("port"));
});
