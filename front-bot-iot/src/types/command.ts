// src/types/command.ts
export interface Command {
  id: number;
  name: string;
  createdAt: string;
}

export interface HourlyStats {
  hour: number;
  count: number;
}

export interface MonthlyStats {
  month: string;
  count: number;
}

export interface MonthlyHourlyStats {
  month: string;
  hourlyStats: HourlyStats[];
}
