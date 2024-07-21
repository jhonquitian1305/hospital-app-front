import { Doctor } from "../../doctors/interfaces/doctor.interface";
import { Patient } from "../../patients/interfaces/patients.interface";

export interface Appointment {
  id:           number;
  description:  null;
  schedule:     Date;
  startHour:    number;
  completed_at: null;
  patient:      Patient;
  doctor:       Doctor;
  type:         State;
  state:        State;
}

export interface State {
  id:   number;
  name: string;
}
