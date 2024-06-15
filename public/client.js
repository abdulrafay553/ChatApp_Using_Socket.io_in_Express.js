const socket = io()

var pname = '';
do {
    pname = prompt('Please Enter Your Name: ')
} while (!pname)

var textarea = document.getElementById('t1')
var message_area = document.getElementById('message_area')
var divtype = ""

textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {
        btnClick(e.target.value)
    }
})

function btnClick(){
    var txtMessage = document.getElementById('t1').value
    let msg = {
        user: pname,
        message: txtMessage.trim()
    }    
    // console.log(msg);
    divtype="outgoing"
    
    appendMessage(msg, divtype)
    textarea.value = ''
    
    socket.emit('message', msg)
}

function appendMessage(vmsg, type){
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className)
    let markup = "<h4>" + vmsg.user + "</h4> <p> " + vmsg.message + "</p> "
    // alert(markup)
    mainDiv.innerHTML = markup
    message_area.appendChild(mainDiv)
}

function scrollToBottom() {
    message_area.scrollTop = message_area.scrollHeight
}

// Receive Server Broadcast Messages
socket.on('broadcast', (msg)=>{
    console.log(msg)
    appendMessage(msg, "incoming")
    scrollToBottom()
})