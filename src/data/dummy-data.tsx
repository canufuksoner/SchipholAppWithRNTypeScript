import Category from '../models/category';
import { Flight } from '../models/flight';

export const CATEGORIES = [
  new Category('c1', 'Yurt İçi Uçuşlar', 'Yurt İçi Uçuşlar Açıklama...', '#f8f8f8'),
  new Category('c2', 'Yurt Dışı Uçuşlar', 'Yurt Dışı Uçuşlar Açıklama...', '#f8f8f8'),
  new Category('c3', 'Balkan Ülkeleri', 'Balkan Ülkeleri Açıklama...', '#f8f8f8'),
];

const flightData = {
  actualLandingTime: '2024-09-29T00:35:33.000+02:00',
  aircraftType: { iataMain: '737', iataSub: '73H' },
  airlineCode: 164,
  flightName: 'HV6920',
  flightNumber: 6920,
  estimatedLandingTime: '2024-09-31T00:35:44.000+02:00',
  expectedTimeOnBelt: '2024-09-31T01:14:00.000+02:00',
  flightDirection: 'A',
  scheduleDate: '2024-09-31',
  scheduleDateTime: '2024-09-31T00:05:00.000+02:00',
  terminal: 1,
  isOperationalFlight: true,
  lastUpdatedAt: '2024-09-29T02:14:00.150+02:00',
  id: '140752077872932574', 
  baggageClaim: { belts: ['2'] }, 
  codeshares: { codeshares: ['KL2533'] }, 
  publicFlightState: { flightStates: ['ARR', 'EXP'] }, 
  route: { destinations: ['HER'], eu: 'S', visa: false }, 
};

export const FLIGHTS = [
  new Flight(flightData),
];

export const upcomingFlights: Flight[] = [
  new Flight(flightData),
  new Flight(flightData)
];

export const pastFlights: Flight[] = [
  new Flight(flightData),
  new Flight(flightData),
  new Flight(flightData),
  new Flight(flightData),
];
