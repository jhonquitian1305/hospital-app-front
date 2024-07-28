import { DateInput } from "@formkit/tempo";

export interface CreateAppointment {
  userId?: number;
  typeId: number;
  schedule: DateInput;
  startHour: number;
  doctorId: number;
}
