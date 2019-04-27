// init port
const PORT = process.env.PORT || 3003;

// Import modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Import Routes
const userRoute = require('./routes/user.route');
const recipeRoute = require('./routes/recipe.route');

// app initiation
const app = express()
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true // enable set cookie
}));
app.use(cookieParser());
app.use(session({
    secret: 'Three can keep a secret if two of them are dead.',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(express.static('public'));

// Use routes
userRoute(app);
recipeRoute(app);

app.get('/', (req, res) => {
    res.send('Hello Recipes Backend!')
})

// Init sockets
const server = app.listen(PORT, () => console.log(`App listening on port ${PORT}`))
const io = require('socket.io')(server);
