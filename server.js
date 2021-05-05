//initiallizing express and socket server
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000; //CHANGE BACK TO 6789

var mongo = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://localhost:27017/users'

var rl = require('readline');

//using the public folder
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/');
});

//clients dictionary
clients = [];

//connection
io.on("connection", (socket) => {
    var sessionID = socket.id;

    //wait for the socket to send back a packet of their user information (WIP)
    socket.on('connected-data', function(data) {
        console.log(`User logged on with:`)
        console.log(`   Username: ${data.name}`);
        console.log(`   Socket-Id: ${sessionID}\n`);
        var user = {'Username': data.name, 'Id': sessionID}
        clients.push(user);
    });

    socket.on('disconnect', function() {
      for (let i = 0; i<clients.length; i++) {
        var checkC = clients[i]
        if (checkC['Id'] == sessionID) {
          console.log('User logged off with:');
          console.log(`   Username: ${checkC['Username']}`)
          console.log(`   Socket-Id: ${checkC['Id']}`)
          clients.splice(i, 1)
        }
      }
      
    });

    //on user change
    socket.on('mplayer-update', function(data) {
        io.sockets.emit("drawS", data);
    });
});

//---Server side commands---\\
var EE = true

function com() {
  if ( EE == true ) {       
    var prompts = rl.createInterface(process.stdin, process.stdout);
    prompts.question("", function(cmdCOM){
     
      var msg = "";
     
      if( cmdCOM == "easter" ) {
        msg = "Easter eggs ;) \n here are a couple: RICK ROLL GOTTEM";
      } else if ( cmdCOM.includes("remove ") == true){
        cmdCOMCOM = cmdCOM.split(" ").pop();
        cmdCOMCOMchange = parseInt(cmdCOMCOM, 10);
        console.log(clientsID[cmdCOMCOMchange])
        io.to(clientsID[cmdCOMCOMchange]).emit("frc");
        msg = "Force kicked member id: " + clientsID[cmdCOMCOMchange];
        clientsID.splice(cmdCOMCOMchange, 1);
        clients -= 1;
      } else if ( cmdCOM == "show-m" ) {
        msg = clients;        
      } else if ( cmdCOM == "rs" ) {
        msg = "Restarting...\n"
      } else if ( cmdCOM == "help") {
        msg = "Here is a list of commands: \n 1. rainbow  -  makes text on the chat flash colors \n 2. hack  -  makes a black screen pop up saying that they were hacked! \n 3. show-m  -  shows the ids of all of the members connected \n 4. remove [index]  -  example usage: remove 0. This removes a member from the server. The index is specifying the position of a member's id in the 'show-m' list. For example, 0 would be the first id.";
      } else if ( cmdCOM == "exit" ) {
        io.sockets.emit('sexit');
        msg = "Closed the server";
        return process.abort();
      };
      console.log(msg);
      prompts.close()
      EE = true
      com()
    });
    EE = false
    com()
  } 
}

//listen at localhost (IP) "MAYBE GET A DNS REGISTRATION??  (pls)"
http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
  com();    
});