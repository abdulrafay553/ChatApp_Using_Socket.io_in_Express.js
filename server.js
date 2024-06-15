const express = require('express')
const path = require('path')
const app = express()
const cors = require("cors")
const port = 3000
const http = require('http').createServer(app)

app.use(cors())
app.use(express.static('./public/'))

app.get("/c", (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})
const io = require('socket.io')(http)

// Socket Open
io.on('connection', (socket)=>{
  console.log('User Connected....')
  // Receive Message  
  socket.on('message', (msg)=>{
    console.log(msg)
    // Send Message to All Connected Users
    socket.broadcast.emit('broadcast', msg)
  })
})

http.listen(port, (req, res)=>{
    console.log("Server Started .... " + port)
})