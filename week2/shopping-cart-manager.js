// task1

const EventEmitter = require('events');

class cart extends EventEmitter {
    constructor() {
        super();
        this.items = [];
        this.on('onCreate', this.initCart);
        this.on('onUpdate', this.updateCart);
        this.on('onDestroy', this.destroyCart);
    }

    initCart() {
        console.log('Shopping cart initialized.\n');
    }

    add(name, price, amount) {
        this.items.push({ name, price, amount });
        this.emit('onUpdate');
    }

    updateCart() {
        console.log('Current items in the cart:');
        this.items.forEach(item => {
            console.log(`Name: ${item.name}, Price: ${item.price}, Amount: ${item.amount}`);
        });
    }

    destroyCart() {
        const totalPrice = this.items.reduce((total, item) => total + (item.price * item.amount), 0);
        console.log(`\nTotal price of items in the cart: ${totalPrice}`);
    }
}

module.exports = cart;