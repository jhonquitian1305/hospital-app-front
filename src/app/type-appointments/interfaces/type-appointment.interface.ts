export interface TypeAppointment {
  id:          number;
  name:        string;
  price:       number;
  isAvailable: boolean;
  speciality:  Speciality;
}

export interface Speciality {
  id:   number;
  name: string;
}
