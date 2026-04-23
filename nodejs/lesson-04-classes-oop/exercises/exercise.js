'use strict';

// Exercise 1: Create a Stack class with:
//   push(value)       — add to top
//   pop()             — remove and return top (throw Error if empty)
//   peek()            — return top without removing (throw Error if empty)
//   isEmpty()         — return boolean
//   size              — getter for number of items
//   toString()        — 'Stack([1, 2, 3])' (bottom to top)
class Stack {
  // TODO: use a private field #items = []

  push(value) { /* TODO */ }
  pop() { /* TODO */ }
  peek() { /* TODO */ }
  isEmpty() { /* TODO */ return true; }
  get size() { /* TODO */ return 0; }
  toString() { /* TODO */ return 'Stack([])'; }
}

// Exercise 2: Create a Vehicle base class and two subclasses.
//
// Vehicle(make, model, year):
//   - describe() → "2022 Toyota Camry"
//   - age (getter) → current year - this.year
//
// Car extends Vehicle:
//   - constructor(make, model, year, doors)
//   - describe() → "2022 Toyota Camry (4-door sedan)"
//
// ElectricCar extends Car:
//   - constructor(make, model, year, doors, rangeKm)
//   - describe() → "2022 Tesla Model 3 (4-door sedan, range: 500km)"

const CURRENT_YEAR = new Date().getFullYear();

class Vehicle {
  constructor(make, model, year) {
    // TODO
  }
  describe() { /* TODO */ return ''; }
  get age() { /* TODO */ return 0; }
}

class Car extends Vehicle {
  constructor(make, model, year, doors) {
    super(make, model, year);
    // TODO
  }
  describe() { /* TODO */ return ''; }
}

class ElectricCar extends Car {
  constructor(make, model, year, doors, rangeKm) {
    super(make, model, year, doors);
    // TODO
  }
  describe() { /* TODO */ return ''; }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

console.log('=== Exercise 1: Stack ===');
const s = new Stack();
console.log('isEmpty:', s.isEmpty()); // true
s.push(1); s.push(2); s.push(3);
console.log('size:', s.size);         // 3
console.log('peek:', s.peek());       // 3
console.log('pop:', s.pop());         // 3
console.log('pop:', s.pop());         // 2
console.log('size:', s.size);         // 1
console.log(s.toString());            // Stack([1])
try { new Stack().pop(); } catch (e) { console.log('empty pop:', e.message); }

console.log('\n=== Exercise 2: Vehicle ===');
const car = new Car('Toyota', 'Camry', 2022, 4);
console.log(car.describe());  // 2022 Toyota Camry (4-door sedan)
console.log('age:', car.age); // current year - 2022

const ev = new ElectricCar('Tesla', 'Model 3', 2023, 4, 500);
console.log(ev.describe());   // 2023 Tesla Model 3 (4-door sedan, range: 500km)
console.log('ev instanceof Car:', ev instanceof Car);
console.log('ev instanceof Vehicle:', ev instanceof Vehicle);
