// Stop form changing page on submit
$(document).ready(function() {
    const form = $('#roll');
    form.submit(function(){
       $.post($(this).attr('action'), $(this).serialize(), function(response) {
           console.log('test')
       },'json');
       return false;
    });
 });

// Init the socket connection on game create / join
function init(roomName) {
    // set-up a connection between the client and the server
    const socket = io.connect('http://localhost:3000');

    socket.on('connect', () => {
        console.log(`signed up to get messages from ${roomName}`)
        // Connected, let's sign-up for to receive messages for this room
        socket.emit('room', roomName);
    });

    socket.on('roll', (data) => {
        $('#roll-outcome').text(data)
    });
}
