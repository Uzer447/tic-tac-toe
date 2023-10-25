const express = require('express');
const http = require('http');
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
const Room = require('./models/room');
var io = require('socket.io')(server);

app.use(express.json());
const DB = "mongodb+srv://uzer447:uzer123@cluster0.86j7g8c.mongodb.net/?retryWrites=true&w=majority";
io.on('connection', (socket) => {
    console.log("connected");
    socket.on('createRoom', async ({ nickname }) => {
        try {
            let room = new Room();
            let player = {
                socketID: socket.id,
                nickname: nickname,
                playerType: 'X',
            };
            room.players.push(player);
            room.turn = player;
            room = await room.save();

            const roomID = room._id.toString();
            socket.join(roomID);

            io.to(roomID).emit('createRoomSuccess', room);
        }
        catch (e) {
            console.log(e);
        }
    });
    socket.on('joinRoom', async ({ nickname, roomID }) => {
        try {
            if (!roomID.match(/^[0-9a-fA-F]{24}$/)) {
                socket.emit('errorOccurred', 'Please enter a valid roomID');
                return;
            }
            let room = await Room.findByID(roomID);
            if (room.isJoin) {
                let player={
                    nickname,
                    socketID:socket.id,
                    playerType:"O",
                }
                socket.join(roomID);
                room.player.push(player);
                room.isJoin=false;
                room= await Room.save();
                io.to(roomID).emit('joinRoomSuccess', room);
                io.to(roomID).emit('updatePlayers', room.players);
                io.to(roomID).emit('updateRoom',room);
            } else {
                socket.emit('errorOccurred', 'Room is full');
            }
        } catch (e) {
            console.log(e);
        }
    });
    socket.on('tap',async({index,roomID})=> {
        try{
            let room=await room.findById(roomID);
            let choice= room.turn.playerType;
            if(room.turnIndex==0)
            {
                room.turnIndex=1;
                room.turn=room.players[1];
            }
            else {
                room.turnIndex=0;
                room.turn=room.players[0];
            }
            room=await room.save();
            io.to(roomId).emit('tapped',{
                index,
                choice,
                room,
            });
        } catch (e) {
            console.log(e);
        }
    });
    socket.on('winner',async({winnerSocketId,roomId})=>{
        try{
            let room=await room.findById(roomId);
            let player=room.players.find((player)=>player.socketId == winnerSocketId);
            player.points+=1;
            room=await room.save();

            if(player.points>=room.maxRounds)
            {
                io.to(roomId).emit('endGame',player);
            }
            else {
                io.to(roomId).emit('pointIncrease',player);
            }
        } catch (e) {
            console.log(e);
        }
    });
});
mongoose.connect(DB).then(() => {
    console.log("Connection success");
}).catch((e) => {
    console.log(e);
});
server.listen(port, '0.0.0.0', () => {
    console.log(`Server started and running on port ${port}`);
});



