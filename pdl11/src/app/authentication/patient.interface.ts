export interface Patient {
    id: string;
    name: string;
    mobile:string;
    email:string;
    age: string;
    drugs: Drug[];
  }
  
  interface Drug {
    name: string;
    description: number;
  }
  