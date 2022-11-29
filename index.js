const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');

const members = require('./Members');
const apiRoutes = require('./routes/apiRoutes');
const logger = require('./middleware/logger');

const app = express();

const PORT = process.env.PORT || 5000;


// init custom logger middleware
// app.use(logger);

// BodyParser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// register view engine - handlebars middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');


// handlebars VIEWS routes
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Member App Home',
        members
    });
})

// MEMBERS API routes
app.use('/api/members', apiRoutes);

// static folder middleware
app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//     // path.join(__dirname, foldername, filename)
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// })

app.listen(PORT, () => console.log(`Server started on ${PORT}`));