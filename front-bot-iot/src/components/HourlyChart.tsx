// // src/components/HourlyChart.tsx

import type { HourlyStats, MonthlyHourlyStats } from '../types/command';

// import type { HourlyStats } from '../types/command';

// interface HourlyChartProps {
//   data: HourlyStats[];
//   commandName: string;
// }

// const HourlyChart = ({ data, commandName }: HourlyChartProps) => {
//   const maxCount = Math.max(...data.map((d) => d.count), 1);
//   const peakHour = data.reduce((prev, current) =>
//     prev.count > current.count ? prev : current
//   );

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-lg font-semibold text-gray-800">
//           Picos de Uso - {commandName}
//         </h3>
//         <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
//           Pico: {peakHour.hour}:00h ({peakHour.count} usos)
//         </div>
//       </div>

//       <div className="grid grid-cols-12 gap-1 mb-4">
//         {data.map((item) => (
//           <div key={item.hour} className="text-center">
//             <div
//               className={`w-full rounded-t transition-all duration-300 ${
//                 item.count === peakHour.count
//                   ? 'bg-gradient-to-t from-red-400 to-red-600'
//                   : 'bg-gradient-to-t from-blue-400 to-blue-600'
//               }`}
//               style={{
//                 height: `${Math.max((item.count / maxCount) * 80, 4)}px`,
//                 minHeight: '4px',
//               }}
//               title={`${item.hour}:00h - ${item.count} usos`}
//             />
//             <div className="text-xs text-gray-600 mt-1">
//               {item.hour.toString().padStart(2, '0')}h
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-3 gap-4 text-sm">
//         <div className="text-center p-2 bg-blue-50 rounded">
//           <div className="font-semibold text-blue-700">Total de Usos</div>
//           <div className="text-blue-600">
//             {data.reduce((sum, d) => sum + d.count, 0)}
//           </div>
//         </div>
//         <div className="text-center p-2 bg-green-50 rounded">
//           <div className="font-semibold text-green-700">Horário de Pico</div>
//           <div className="text-green-600">{peakHour.hour}:00h</div>
//         </div>
//         <div className="text-center p-2 bg-purple-50 rounded">
//           <div className="font-semibold text-purple-700">Usos no Pico</div>
//           <div className="text-purple-600">{peakHour.count}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HourlyChart;

// src/components/HourlyChart.tsx

interface HourlyChartProps {
  data: HourlyStats[] | MonthlyHourlyStats[];
  commandName: string;
  selectedMonth: string | null;
}

const HourlyChart = ({
  data,
  commandName,
  selectedMonth,
}: HourlyChartProps) => {
  const isMonthlyData =
    Array.isArray(data) && data.length > 0 && 'month' in data[0];

  let maxCount: number;
  let peakHour: HourlyStats | null = null;
  let totalUsage = 0;

  if (isMonthlyData) {
    const monthlyData = data as MonthlyHourlyStats[];
    maxCount = Math.max(
      ...monthlyData.flatMap((m) => m.hourlyStats.map((h) => h.count)),
      1
    );
    monthlyData.forEach((m) => {
      totalUsage += m.hourlyStats.reduce((sum, h) => sum + h.count, 0);
      const monthPeak = m.hourlyStats.reduce((prev, current) =>
        prev.count > current.count ? prev : current
      );
      if (!peakHour || monthPeak.count > peakHour.count) {
        peakHour = monthPeak;
      }
    });
  } else {
    const hourlyData = data as HourlyStats[];
    maxCount = Math.max(...hourlyData.map((d) => d.count), 1);
    peakHour = hourlyData.reduce((prev, current) =>
      prev.count > current.count ? prev : current
    );
    totalUsage = hourlyData.reduce((sum, d) => sum + d.count, 0);
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Picos de Uso - {commandName}{' '}
          {selectedMonth ? `(${selectedMonth})` : ''}
        </h3>
        {peakHour && (
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Pico: {peakHour.hour}:00h ({peakHour.count} uso
            {peakHour.count !== 1 ? 's' : ''})
          </div>
        )}
      </div>

      {isMonthlyData ? (
        (data as MonthlyHourlyStats[]).map((monthData) => (
          <div key={monthData.month} className="mb-6">
            <h4 className="text-sm font-medium text-gray-600 mb-2">
              {monthData.month}
            </h4>
            <div className="grid grid-cols-12 gap-1 mb-4">
              {monthData.hourlyStats.map((item) => (
                <div key={item.hour} className="text-center">
                  <div
                    className={`w-full rounded-t transition-all duration-300 ${
                      item.count === peakHour?.count
                        ? 'bg-gradient-to-t from-red-400 to-red-600'
                        : 'bg-gradient-to-t from-blue-400 to-blue-600'
                    }`}
                    style={{
                      height: `${Math.max((item.count / maxCount) * 80, 4)}px`,
                      minHeight: '4px',
                    }}
                    title={`${monthData.month} ${item.hour}:00h - ${
                      item.count
                    } uso${item.count !== 1 ? 's' : ''}`}
                  />
                  <div className="text-xs text-gray-600 mt-1">
                    {item.hour.toString().padStart(2, '0')}h
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="grid grid-cols-12 gap-1 mb-4">
          {(data as HourlyStats[]).map((item) => (
            <div key={item.hour} className="text-center">
              <div
                className={`w-full rounded-t transition-all duration-300 ${
                  item.count === peakHour?.count
                    ? 'bg-gradient-to-t from-red-400 to-red-600'
                    : 'bg-gradient-to-t from-blue-400 to-blue-600'
                }`}
                style={{
                  height: `${Math.max((item.count / maxCount) * 80, 4)}px`,
                  minHeight: '4px',
                }}
                title={`${item.hour}:00h - ${item.count} uso${
                  item.count !== 1 ? 's' : ''
                }`}
              />
              <div className="text-xs text-gray-600 mt-1">
                {item.hour.toString().padStart(2, '0')}h
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="text-center p-2 bg-blue-50 rounded">
          <div className="font-semibold text-blue-700">Total de Usos</div>
          <div className="text-blue-600">{totalUsage}</div>
        </div>
        <div className="text-center p-2 bg-green-50 rounded">
          <div className="font-semibold text-green-700">Horário de Pico</div>
          <div className="text-green-600">
            {peakHour ? `${peakHour.hour}:00h` : '-'}
          </div>
        </div>
        <div className="text-center p-2 bg-purple-50 rounded">
          <div className="font-semibold text-purple-700">Usos no Pico</div>
          <div className="text-purple-600">
            {peakHour ? peakHour.count : '-'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyChart;
