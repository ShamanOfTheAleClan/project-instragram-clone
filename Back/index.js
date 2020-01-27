const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const mongoose = require('mongoose');
const path = require('path');

const postRoutes = require('./Routes/post.routes');
const postedRoutes = require('./Routes/posted.routes');
const errorController = require('./controllers/error.controller');

const app = express();

mongoose.connect('mongodb://localhost:27017/IGDB', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const corsOptions = {
  exposedHeaders: ['x-auth']
};

app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(postRoutes);
app.use(postedRoutes);

app.use(errorController.get404);

// app.use('/api/v1', router)
app.use('/instagram', router);

app.listen(3000);
