export interface Schedule {
  date: string;
}

export interface StartHour{
  startHour: number;
}

export interface ScheduleComplete{
  id: number;
  date: string;
  startTime: number;
  endTime: number;
}
