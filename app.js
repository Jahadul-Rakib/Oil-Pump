const express = require('express');
const app = express();
app.use(express.json());
const mongoose = require('mongoose');

const user = require('./app_modules/route/user_route');

app.use('/user', user);

mongoose.connect('mongodb://localhost:27017/oil_pump', {useNewUrlParser: true})
    .then(() => console.log('Connected TO DB'))
    .catch(reason => console.log(reason));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening Port ${port} ....`));