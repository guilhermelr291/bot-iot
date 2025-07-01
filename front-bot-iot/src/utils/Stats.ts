// import type { Command, HourlyStats, MonthlyStats } from '../types/command';

import type {
  Command,
  HourlyStats,
  MonthlyHourlyStats,
  MonthlyStats,
} from '../types/command';

// export const calculateHourlyStats = (
//   commandName: string,
//   commands: Command[]
// ): HourlyStats[] => {
//   const hourlyCounts: { [key: number]: number } = {};

//   // Initialize all hours (0-23)
//   for (let hour = 0; hour < 24; hour++) {
//     hourlyCounts[hour] = 0;
//   }

//   // Count creations per hour for the specific command name
//   commands
//     .filter((c) => c.name === commandName)
//     .forEach((c) => {
//       const date = new Date(c.createdAt);
//       const hour = date.getHours();
//       hourlyCounts[hour]++;
//     });

//   // Convert to array of HourlyStats
//   return Object.entries(hourlyCounts).map(([hour, count]) => ({
//     hour: parseInt(hour),
//     count,
//   }));
// };

// export const calculateMonthlyStats = (
//   commandName: string,
//   commands: Command[]
// ): MonthlyStats[] => {
//   const monthlyCounts: { [key: string]: number } = {};

//   // Count creations per month for the specific command name
//   commands
//     .filter((c) => c.name === commandName)
//     .forEach((c) => {
//       const date = new Date(c.createdAt);
//       const monthYear = date.toLocaleString('pt-BR', {
//         month: 'long',
//         year: 'numeric',
//       });
//       monthlyCounts[monthYear] = (monthlyCounts[monthYear] || 0) + 1;
//     });

//   // Convert to array of MonthlyStats
//   return Object.entries(monthlyCounts)
//     .map(([month, count]) => ({
//       month,
//       count,
//     }))
//     .sort((a, b) => {
//       const [aMonth, aYear] = a.month.split(' de ');
//       const [bMonth, bYear] = b.month.split(' de ');
//       return new Date(`${aYear}-${aMonth}-01`) <
//         new Date(`${bYear}-${bMonth}-01`)
//         ? 1
//         : -1;
//     });
// };

// src/utils/stats.ts

export const calculateHourlyStats = (
  commandName: string,
  commands: Command[],
  month?: string
): HourlyStats[] => {
  const hourlyCounts: { [key: number]: number } = {};

  // Initialize all hours (0-23)
  for (let hour = 0; hour < 24; hour++) {
    hourlyCounts[hour] = 0;
  }

  // Filter by command name and optionally by month
  commands
    .filter((c) => c.name === commandName)
    .filter(
      (c) =>
        !month ||
        new Date(c.createdAt).toLocaleString('pt-BR', {
          month: 'long',
          year: 'numeric',
        }) === month
    )
    .forEach((c) => {
      const date = new Date(c.createdAt);
      const hour = date.getHours();
      hourlyCounts[hour]++;
    });

  return Object.entries(hourlyCounts).map(([hour, count]) => ({
    hour: parseInt(hour),
    count,
  }));
};

export const calculateMonthlyStats = (
  commandName: string,
  commands: Command[]
): MonthlyStats[] => {
  const monthlyCounts: { [key: string]: number } = {};

  commands
    .filter((c) => c.name === commandName)
    .forEach((c) => {
      const date = new Date(c.createdAt);
      const monthYear = date.toLocaleString('pt-BR', {
        month: 'long',
        year: 'numeric',
      });
      monthlyCounts[monthYear] = (monthlyCounts[monthYear] || 0) + 1;
    });

  return Object.entries(monthlyCounts)
    .map(([month, count]) => ({
      month,
      count,
    }))
    .sort((a, b) => {
      const [aMonth, aYear] = a.month.split(' de ');
      const [bMonth, bYear] = b.month.split(' de ');
      return new Date(`${aYear}-${aMonth}-01`) <
        new Date(`${bYear}-${bMonth}-01`)
        ? 1
        : -1;
    });
};

export const calculateMonthlyHourlyStats = (
  commandName: string,
  commands: Command[]
): MonthlyHourlyStats[] => {
  const months = Array.from(
    new Set(
      commands
        .filter((c) => c.name === commandName)
        .map((c) =>
          new Date(c.createdAt).toLocaleString('pt-BR', {
            month: 'long',
            year: 'numeric',
          })
        )
    )
  );

  return months.map((month) => ({
    month,
    hourlyStats: calculateHourlyStats(commandName, commands, month),
  }));
};
