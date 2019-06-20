let store = { drivers: [], passengers: [], trips: [] };
let driverId = 0;
let passengerId = 0;
let tripId = 0

class Driver {
  constructor(name) {
    this.name = name;
    this.id = ++driverId;
    store.drivers.push(this);
  }
  trips() {
    //'this' is Driver here but inside the following scope/function, 'this' is undefined. So we need to use bind
    //Returns trips array which driverId is eqaul to this(driver).id
    return store.trips.filter(function(trip) {
     return trip.driverId === this.id
    }.bind(this))
  }
  passengers() {
    return this.trips().map(function(trip) {
      return trip.passenger()
    })
  }
}

class Passenger {
  constructor(name) {
    this.name = name;
    this.id = ++passengerId;
    store.passengers.push(this)
  }
  trips() {
    return store.trips.filter(function(trip) {
      return trip.passengerId === this.id;
    }.bind(this))
  }
  drivers() {
    return this.trips().map(function(trip) {
      return trip.driver()
    })
  }
}

class Trip {
  constructor(driver, passenger) {
    this.driverId = driver.id;
    this.passengerId = passenger.id;
    this.id = ++tripId;
    store.trips.push(this)
  }
  driver() {
    //Return array of driver
    return store.drivers.find(function(driver) {
      return driver.id === this.driverId
    }.bind(this))
  }
  passenger() {
    return store.passengers.find(function(passenger) {
      return passenger.id === this.passengerId
    }.bind(this))
  }
}
