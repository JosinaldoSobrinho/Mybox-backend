const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
});

mongoose.connect('mongodb+srv://administrator:Escolha7@cluster0-mnk2w.mongodb.net/mybox?retryWrites=true&w=majority',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })

    .then(() => console.log('DB Conected!'))
    .catch(err => {
        console.log('Erro', err.message);
    
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes'));

server.listen(process.env.PORT || 3333);