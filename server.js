let express = require("express")
let app = express()
const port = 3000

// ****************************************     Middleware     ******************************************************* 

// template engine ejs
app.set("view engine", "ejs")

// load static file 
app.use('/static', express.static(__dirname + '/public'))

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// ****************************************     IHM     *******************************************************

app.get('/', function (req, res) {
    res.render('pages/index')
})

app.listen(port, function () {
    console.log(`Listen on port : ${port}`)
})