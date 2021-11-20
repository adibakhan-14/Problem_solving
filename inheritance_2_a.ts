//In number 2, factory design pattern has been used.
//Car and Plane inherits from Vehicle

interface Vehicle {
    set_num_of_wheels(): number;
    set_num_of_passengers(): number;
    has_gas(): boolean;
  }
  class Car1 implements Vehicle {
    set_num_of_wheels() {
      return 4;
    }
  
    set_num_of_passengers() {
      return 4;
    }
  
    has_gas() {
      return true;
    }
  }

  class Plane1 implements Vehicle {
    set_num_of_wheels() {
      return 14;
    }
  
    set_num_of_passengers() {
      return 100;
    }
  
    has_gas() {
      return false;
    }
  }
 
  
  
  