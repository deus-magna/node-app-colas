// establecer la comunicación
var socket = io();

var lblTciket1 = $('#lblTicket1');
var lblTciket2 = $('#lblTicket2');
var lblTciket3 = $('#lblTicket3');
var lblTciket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var lblEscritorios = [
    lblEscritorio1,
    lblEscritorio2,
    lblEscritorio3,
    lblEscritorio4
];

var lblTickets = [
    lblTciket1,
    lblTciket2,
    lblTciket3,
    lblTciket4
];

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

socket.on('estadoActual', function(resp) {
    // audio = new Audio('../audio/new-ticket.mp3');
    // audio.play();
    actualizarHTML(resp.ultimos4);
});

socket.on('ultimos4', function(resp) {
    console.log('Ultimos 4');
    audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizarHTML(resp.ultimos4);
});

function actualizarHTML(ultimos4) {

    for (var i = 0; i < ultimos4.length; i++) {
        lblTickets[i].text('Ticket ' + ultimos4[i].numero);
        lblEscritorios[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}