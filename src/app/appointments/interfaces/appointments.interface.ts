import { DateInput } from "@formkit/tempo";
import { Doctor } from "../../doctors/interfaces/doctor.interface";
import { Patient } from "../../patients/interfaces/patients.interface";

export interface Appointment {
  id:           number;
  description:  null;
  schedule:     Date;
  startHour:    number;
  completed_at: DateInput;
  patient:      Patient;
  doctor:       Doctor;
  type:         Type;
  state:        State;
}

interface Type {
  id: number;
  name: string;
}

export interface State {
  id:   number;
  name: string;
}
