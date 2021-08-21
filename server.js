const express=require('express');
const app=express();
const http=require('http');
const expressServer = http.createServer(app);
const {Server}=require('socket.io');
const  io= new Server(expressServer);
const path=require('path')
const port=5000;


app.use(express.static('client-side/build'));
app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'client-side','build','index.html'))
})



io.on('connection',function (socket) {
    console.log("New User Connect ")
    socket.on('disconnect',function () {
        console.log("New User DisConnect ")
    })
})





// API Layer
app.get('/express-back',function (req,res) {
    res.send("Hello Express Server")
})



expressServer.listen(port,function () {
    console.log("Server Run @5000")
})






