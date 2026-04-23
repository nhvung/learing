'use strict';

showClasses();
console.log('---');
showInheritance();
console.log('---');
showMixins();

// ─── Basic Class ──────────────────────────────────────────────────────────────

class BankAccount {
  #balance;        // private field — inaccessible outside the class
  #owner;

  static #nextId = 1;                      // private static field
  static defaultCurrency = 'USD';          // public static property

  constructor(owner, initialBalance = 0) {
    if (initialBalance < 0) throw new Error('Initial balance cannot be negative');
    this.#owner = owner;
    this.#balance = initialBalance;
    this.id = BankAccount.#nextId++;
    this.currency = BankAccount.defaultCurrency;
  }

  // Getter — access as property
  get balance() { return this.#balance; }
  get owner() { return this.#owner; }

  deposit(amount) {
    if (amount <= 0) throw new Error('Deposit amount must be positive');
    this.#balance += amount;
    return this;  // enable chaining
  }

  withdraw(amount) {
    if (amount <= 0) throw new Error('Withdrawal amount must be positive');
    if (amount > this.#balance) throw new Error('Insufficient funds');
    this.#balance -= amount;
    return this;
  }

  toString() {
    return `Account(${this.id}, ${this.#owner}, ${this.currency} ${this.#balance.toFixed(2)})`;
  }

  // Static factory method
  static create(owner, balance) {
    return new BankAccount(owner, balance);
  }
}

function showClasses() {
  console.log('=== Classes ===');

  const account = BankAccount.create('Alice', 1000);
  console.log(account.toString());
  console.log('owner:', account.owner);
  console.log('balance:', account.balance);
  // console.log(account.#balance); // SyntaxError — truly private

  // Method chaining
  account.deposit(500).deposit(200).withdraw(100);
  console.log('after deposits/withdrawal:', account.balance); // 1600

  const account2 = new BankAccount('Bob', 500);
  console.log(account2.toString());
  console.log('default currency:', BankAccount.defaultCurrency);

  console.log('Alice instanceof BankAccount:', account instanceof BankAccount);

  // Error handling
  try {
    account.withdraw(99999);
  } catch (err) {
    console.log('caught:', err.message);
  }
}

// ─── Inheritance ──────────────────────────────────────────────────────────────

class Shape {
  constructor(color = 'black') {
    this.color = color;
  }

  area() { return 0; }
  perimeter() { return 0; }

  describe() {
    return `${this.constructor.name}: area=${this.area().toFixed(2)}, perimeter=${this.perimeter().toFixed(2)}, color=${this.color}`;
  }
}

class Circle extends Shape {
  #radius;

  constructor(radius, color) {
    super(color);  // must call super before using this
    this.#radius = radius;
  }

  get radius() { return this.#radius; }

  area() { return Math.PI * this.#radius ** 2; }
  perimeter() { return 2 * Math.PI * this.#radius; }
}

class Rectangle extends Shape {
  constructor(width, height, color) {
    super(color);
    this.width = width;
    this.height = height;
  }

  area() { return this.width * this.height; }
  perimeter() { return 2 * (this.width + this.height); }
}

class Square extends Rectangle {
  constructor(side, color) {
    super(side, side, color);  // Rectangle handles width/height
  }
}

function showInheritance() {
  console.log('=== Inheritance ===');

  const shapes = [
    new Circle(5, 'red'),
    new Rectangle(4, 3, 'blue'),
    new Square(4, 'green'),
  ];

  shapes.forEach(s => console.log(s.describe()));

  // instanceof checks the prototype chain
  const sq = new Square(3);
  console.log('Square instanceof Square:', sq instanceof Square);       // true
  console.log('Square instanceof Rectangle:', sq instanceof Rectangle); // true
  console.log('Square instanceof Shape:', sq instanceof Shape);         // true

  // Polymorphism — same method, different behavior
  const totalArea = shapes.reduce((sum, s) => sum + s.area(), 0);
  console.log('total area:', totalArea.toFixed(2));

  // Use constructor.name for class name
  shapes.forEach(s => console.log(`  ${s.constructor.name}`));
}

// ─── Mixins ───────────────────────────────────────────────────────────────────

// Mixins add capabilities without deep inheritance
const Serializable = (Base) => class extends Base {
  toJSON() {
    return JSON.stringify(this);
  }
  static fromJSON(json, ...args) {
    return Object.assign(new this(...args), JSON.parse(json));
  }
};

const Validatable = (Base) => class extends Base {
  #errors = [];

  validate() {
    this.#errors = [];
    this._validate(this.#errors);
    return this.#errors.length === 0;
  }

  get errors() { return [...this.#errors]; }

  _validate(_errors) {}  // override in subclass
};

class User extends Serializable(Validatable(Shape)) {
  constructor(name, email) {
    super();
    this.name = name;
    this.email = email;
  }

  _validate(errors) {
    if (!this.name) errors.push('name is required');
    if (!this.email?.includes('@')) errors.push('email must be valid');
  }

  toString() { return `User(${this.name}, ${this.email})`; }
}

function showMixins() {
  console.log('=== Mixins ===');

  const user = new User('Alice', 'alice@example.com');
  console.log('valid:', user.validate()); // true
  console.log('json:', user.toJSON());

  const invalid = new User('', 'not-an-email');
  console.log('valid:', invalid.validate()); // false
  console.log('errors:', invalid.errors);
}
