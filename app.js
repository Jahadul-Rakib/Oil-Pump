const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');

const user = require('./route/user_route');

app.use('/user', user);

mongoose.connect('mongodb://localhost:27017/oil_pump', {useNewUrlParser: true})
    .then(() => console.log('Connected TO DB'))
    .catch(reason => console.log(reason));
app.listen(3000, () => console.log('Listening Port 3000....'));