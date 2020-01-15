const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/routes')
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/IGDB',{

    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true

})

const corsOptions = {
    exposedHeaders: ['x-auth']
}

app.use(bodyParser.urlencoded({

    extended: false

}));

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.get('/', (request , response) => {

response.json('testas');
});


// app.use('/api/v1', router)
app.use('/instagram', router)


app.listen(3000)