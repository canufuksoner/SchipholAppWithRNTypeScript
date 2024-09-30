interface AircraftType {
  iataMain: string;
  iataSub: string;
}

interface BaggageClaim {
  belts: string[];
}

interface Codeshares {
  codeshares: string[];
}

interface PublicFlightState {
  flightStates: string[];
}

interface Route {
  destinations: string[];
  eu: string;
  visa: boolean;
}

class Flight {
  id: string; 
  actualLandingTime: string;
  aircraftType: AircraftType;
  airlineCode: number;
  flightName: string;
  flightNumber: number;
  estimatedLandingTime: string;
  expectedTimeOnBelt: string;
  flightDirection: string;
  scheduleDate: string;
  scheduleDateTime: string;
  terminal: number;
  isOperationalFlight: boolean;
  lastUpdatedAt: string;
  baggageClaim: BaggageClaim;
  codeshares: Codeshares;
  publicFlightState: PublicFlightState;
  route: Route;

  constructor(data: {
    id: string; 
    actualLandingTime: string;
    aircraftType: AircraftType;
    airlineCode: number;
    flightName: string;
    flightNumber: number;
    estimatedLandingTime: string;
    expectedTimeOnBelt: string;
    flightDirection: string;
    scheduleDate: string;
    scheduleDateTime: string;
    terminal: number;
    isOperationalFlight: boolean;
    lastUpdatedAt: string;
    baggageClaim: BaggageClaim;
    codeshares: Codeshares;
    publicFlightState: PublicFlightState;
    route: Route;
  }) {
    this.id = data.id; 
    this.actualLandingTime = data.actualLandingTime;
    this.aircraftType = data.aircraftType;
    this.airlineCode = data.airlineCode;
    this.flightName = data.flightName;
    this.flightNumber = data.flightNumber;
    this.estimatedLandingTime = data.estimatedLandingTime;
    this.expectedTimeOnBelt = data.expectedTimeOnBelt;
    this.flightDirection = data.flightDirection;
    this.scheduleDate = data.scheduleDate;
    this.scheduleDateTime = data.scheduleDateTime;
    this.terminal = data.terminal;
    this.isOperationalFlight = data.isOperationalFlight;
    this.lastUpdatedAt = data.lastUpdatedAt;
    this.baggageClaim = data.baggageClaim;
    this.codeshares = data.codeshares;
    this.publicFlightState = data.publicFlightState;
    this.route = data.route;
  }

  toString(): string {
    return `Flight ${this.flightName} (${this.flightNumber}) - Airline: ${this.airlineCode}, Landing Time: ${this.actualLandingTime}, Terminal: ${this.terminal}`;
  }
}

export { Flight };
