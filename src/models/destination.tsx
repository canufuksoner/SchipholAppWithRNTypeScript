export interface PublicName {
    dutch: string;  
    english: string;
  }
  
  export interface Destination {
    country: string;
    iata: string;   
    city?: string;  
    publicName: PublicName;
  }