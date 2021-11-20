//I have used Constructor Pattern here where the car and Plane inherited from Vehicle

class Vehicle {
    constructor(gas, wheels, passengers) {
        this.set_num_of_passengers = passengers;
        this.set_num_of_wheels = wheels;
        this.has_gas = gas;

    }
}

class Car extends Vehicle {
    constructor(gas, wheels, passengers) {
        super(gas, wheels, passengers);
        this.has_gas = gas;
        this.set_num_of_wheels = wheels;
        this.set_num_of_passengers = passengers;


    }
}

class Plane extends Vehicle {
    constructor(gas, wheels, passengers) {
        super(gas, wheels, passengers);
        this.has_gas = gas;
        this.set_num_of_wheels = wheels;
        this.set_num_of_passengers = passengers;

    }
}

let vehicle_1 = new Plane("false", '14', '100');
let vehicle_2 = new Car("true", '4', '5');

console.log(vehicle_2.has_gas);