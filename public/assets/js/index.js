// // Stop form changing page on submit
// $(document).ready(function() {
//     const form = $('#roll');
//     form.submit(function(){
//        $.post($(this).attr('action'), $(this).serialize(), function(response) {
//        },'json');
//        return false;
//     });
//  });

// // Init the socket connection on game create / join
// function init(gameDetails) {
//     const jsonDetails = JSON.parse(gameDetails)

//     // set-up a connection between the client and the server
//     const socket = io.connect('http://localhost:3000');

//     socket.on('connect', () => {
//         console.log(`signed up to get messages from ${jsonDetails.gameName}`)
//         // Connected, let's sign-up for to receive messages for this room
//         socket.emit('room', { gameName: jsonDetails.gameName, playerName: jsonDetails.playerName});

//         socket.on('disconnect', () => {
//             console.log('client disconnected')
//          });
//     });

//     socket.on('roll', (data) => {
//         $('#roll-outcome').text(data)
//     });
//     socket.on('player-join', (data) => {
//         console.log(`${data} joined!`)
//         $("#player-list ul").append($(`<li id=${data}>`).text(data));
//     });
//     socket.on('player-leave', (data) => {
//         $(`#${data}`).remove();
//     });
    
// }
