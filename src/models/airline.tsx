class Airline {
  iata: string;
  icao: string;
  nvls: number;
  publicName: string;

  constructor(
    iata: string,
    icao: string,
    nvls: number,
    publicName: string
  ) {
    this.iata = iata;
    this.icao = icao;
    this.nvls = nvls;
    this.publicName = publicName;
  }
}
export default Airline;
