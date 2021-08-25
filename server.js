const express=require('express');
const app=express();
const http=require('http');
const expressServer = http.createServer(app);
const {Server}=require('socket.io');
const io= new Server(expressServer);
const path=require('path')
const port=5000;


app.use(express.static('client-side/build'));
app.get('*',function (req,res) {
    res.sendFile(path.resolve(__dirname,'client-side','build','index.html'))
})



let UserList=[];


io.on('connection',function (socket) {



    //Add New User
    socket.on('CreateNewUser',function (user) {
        UserList.push(user);
        io.emit('AnnouceNewJoiner',user['Name']);
        io.emit('UserList',UserList);
        socket.PeerID=user['PeerID'];
    })



    socket.on('disconnect',function () {


     //Remove New User......
     UserList.map((list,i)=>{
        if(socket.PeerID===list['PeerID']){
             UserList.splice(i,1);
             io.emit('UserList',UserList);
             io.emit('AnnouceLeftJoiner',list['Name']);
        }
     });


    })
})





// API Layer
app.get('/express-back',function (req,res) {
    res.send("Hello Express Server")
})



expressServer.listen(port,function () {
    console.log("Server Run @5000")
})






