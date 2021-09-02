require('./models/db');

const express = require('express');
const employeeController = require('./controllers/employeeController');
const path = require('path');
const exphb = require('express-handlebars');
const bodyparser = require('body-parser');


const app = express();
const port = 3000;

app.use(bodyparser.urlencoded({
    extended: true,
}));

app.use(bodyparser.json());

app.use('/employee', employeeController)

//setting the view directory 
app.set('views', path.join(__dirname, '/views'))

// app.engine('hbs', exphb({
//     extname: 'hbs',
//     defaultLayout: 'mainLayout',
//     layoutsDir: __dirname + '/views/layouts'
// }))
// app.set('view engine', 'hbs');


const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
app.engine('hbs', exphb({
    extname: 'hbs', defaultLayout: 'mainLayout', handlebars: allowInsecurePrototypeAccess(Handlebars),
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');

//If user emters /employee we should return a form to add employee

app.get('/', (req, res) => {
    res.redirect('/employee/list');
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})