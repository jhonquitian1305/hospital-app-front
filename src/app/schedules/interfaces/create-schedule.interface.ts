import { DateInput } from "@formkit/tempo";

export interface CreateSchedulesDto {
  date: DateInput;
  startTime: number;
  endTime?: number;
}
