class GiftCart {
  #items = [];
  #discount = 0;
  #PROMO_CODES = {
    PROMO10: 0.1,
    PROMO25: 0.25,
    SANTA50: 0.5,
  };

  add(id, price) {
    const exists = this.#items.some((item) => item.id === id);

    if (exists) {
      console.error("Item with the same id is already added to the cart");
      return;
    }

    if (typeof price !== "number") {
      console.error("Price has to be a number");
      return;
    }

    if (price <= 0) {
      console.error("Price can't be negative or 0");
      return;
    }

    this.#items.push({ id, price });
  }

  applyDiscount(code) {
    const normalizedCode = code.toUpperCase();
    if (this.#PROMO_CODES[normalizedCode]) {
      this.#discount = this.#PROMO_CODES[normalizedCode];
    } else {
      console.error("Invalid promo code");
    }
  }

  total() {
    const total = this.#items.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    const totalWithDiscount = total * (1 - this.#discount);

    return +totalWithDiscount.toFixed(2);
  }

  list() {
    return {
      items: this.#items.map((item) => ({ ...item })),
      discount: this.#discount,
    };
  }

  remove(id) {
    const exists = this.#items.some((item) => item.id === id);

    if (!exists) {
      console.error("Item with this id doesn't exist");
      return;
    }

    this.#items = this.#items.filter((item) => item.id !== id);
  }

  clear() {
    this.#items = [];
    this.#discount = 0;
  }
}

const cart = new GiftCart();

cart.add("train", 30);
cart.add("train", 30);
cart.add("bus", 33.33);
cart.add("plane", 80);
console.log(cart.total());
cart.applyDiscount("PROMO35");
cart.applyDiscount("santa50");
console.log(cart.total());
console.log(cart.list());
cart.remove("train");
console.log(cart.total());
console.log(cart.list());
cart.clear();
console.log(cart.list());
