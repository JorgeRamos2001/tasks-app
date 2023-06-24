const express = require('express');
const mysql = require('mysql');
const myconn = require('express-myconnection');
const routes = require('./routes')
const cors = require('cors');


const app = express();
app.set('port', process.env.PORT || 3000);

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'J1A2R3R4',
    database: 'tasks-api'
}

app.use(myconn(mysql, dbConfig, 'single'));
app.use(express.json())
app.use(cors());

app.get('/', (req, res)=> {
    res.send('API is on')
})

app.use('/api', routes);

app.listen(app.get('port'), ()=> {
    console.log('server on')
});