let store = {drivers: [], passengers: [], trips: []}

let driverId = 0

class Driver{
  constructor(name){
    this.id = ++driverId
    this.name = name
    store.drivers.push(this)
  }
  trips() { //driver has many trips use .filter
    return store.trips.filter(trip => {
      return trip.driverId === this.id
    }
    )
  };

  passengers() { // driver has many passengers through trips
    return this.trips().map(trip => {
        return trip.passenger()
    }
    )
  }
};

let passengerId = 0

class Passenger{
  constructor(name){
    this.id = ++passengerId
    this.name = name
    store.passengers.push(this)
  }
  trips() {
    return store.trips.filter( trip => {
      return trip.passengerId === this.id
    })
  };
  drivers() {
    return this.trips().map( trip => {
        return trip.driver()
      })
  }
};

let tripId = 0

class Trip{ //associating a driver and passenger with a trip
  constructor(driver, passenger){
    this.id = ++tripId
    this.driverId = driver.id;
    this.passengerId = passenger.id;
    store.trips.push(this)
  }

  driver() { //trip has a driver, so use .find
    return store.drivers.find(driver => {
      return driver.id === this.driverId
    }
    )
  }
  passenger(passenger) {//trp has a passenger, so use .find
    return store.passengers.find(
      function (passenger) {
        return passenger.id === this.passengerId
      }.bind(this)
    )
  }
};

//look up arrow function!
