const fs = require('fs');

class Ticket {

    constrcutor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TickerControl {

    constructor() {

        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];

        let data = require('../data/data.json');

        console.log(data);

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimos;
        } else {
            this.reiniciarConteo();
        }
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = {
            numero: numeroTicket,
            escritorio: escritorio
        };

        this.ultimosCuatro.unshift(atenderTicket);

        if (this.ultimosCuatro.length > 4) {
            this.ultimosCuatro.splice(-1, 1);
        }
        console.log('Ultimos 4');
        console.log(this.ultimosCuatro);

        this.grabarArchivo();
        return atenderTicket;
    }

    siguiente() {
        this.ultimo += 1;
        let ticket = new Ticket(1, 1);
        this.tickets.push({
            numero: this.ultimo,
            escritorio: null
        });

        this.grabarArchivo();

        return `Ticket ${ this.ultimo }`;

    }

    getUltimoTicket() {
        return `Ticket ${ this.ultimo }`
    }

    getUltimos4() {
        return this.ultimosCuatro;
    }

    reiniciarConteo() {

        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];
        console.log('Se ha inicializado el conteo');

        this.grabarArchivo();
    }

    grabarArchivo() {

        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos: this.ultimosCuatro
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }
}



module.exports = {
    TickerControl
}