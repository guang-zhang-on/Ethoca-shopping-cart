module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.totalItems = cart.totalItems || 0;
    this.totalPrice = cart.totalPrice || 0;

    this.add = function(item, id) {
        var cartItem = this.items[id];
        if (!cartItem) {
            cartItem = this.items[id] = {item: item, quantity: 0, price: 0};
        }
        cartItem.quantity++;
        cartItem.price = cartItem.item.price * cartItem.quantity;
        this.totalItems++;
        this.totalPrice += cartItem.item.price;
    };

    this.adds = function(item, id, counts) {
        var added = 0;
        added = counts;
        console.log("Adding >>> " + added + " >>> item(s)");
        var cartItem = this.items[id];
        if (!cartItem) {
            cartItem = this.items[id] = {item: item, quantity: 0, price: 0};
        }
        cartItem.quantity=cartItem.quantity + added;
        console.log("quantity per item is : " + cartItem.quantity);

        cartItem.price = cartItem.item.price * cartItem.quantity;
        cartItem.addedPrice = cartItem.item.price*added;
        console.log(cartItem.price);

        this.totalItems = this.totalItems + added;
        console.log("totalItems is : " + this.totalItems);

        this.totalPrice = this.totalPrice + cartItem.addedPrice;
        console.log("current total price is : " + this.totalPrice);
    };

    this.remove = function(id) {
        this.totalItems -= this.items[id].quantity;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };
    
    this.getItems = function() {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};