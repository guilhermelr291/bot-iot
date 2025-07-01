// // src/components/MonthlyChart.tsx

import type { MonthlyStats } from '../types/command';

// import type { MonthlyStats } from '../types/command';

// interface MonthlyChartProps {
//   data: MonthlyStats[];
//   commandName: string;
// }

// const MonthlyChart = ({ data, commandName }: MonthlyChartProps) => {
//   const maxCount = Math.max(...data.map((d) => d.count), 1);

//   return (
//     <div className="bg-white rounded-lg shadow-lg p-6">
//       <h3 className="text-lg font-semibold text-gray-800 mb-4">
//         Uso Mensal - {commandName}
//       </h3>
//       <div className="space-y-3">
//         {data.map((item, index) => (
//           <div key={index} className="flex items-center gap-4">
//             <div className="w-16 text-sm font-medium text-gray-600">
//               {item.month}
//             </div>
//             <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
//               <div
//                 className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500 ease-out"
//                 style={{ width: `${(item.count / maxCount) * 100}%` }}
//               />
//             </div>
//             <div className="w-12 text-sm font-semibold text-gray-800 text-right">
//               {item.count}
//             </div>
//           </div>
//         ))}
//       </div>
//       {data.length === 0 && (
//         <p className="text-gray-500 text-center py-8">Nenhum dado disponível</p>
//       )}
//     </div>
//   );
// };

// export default MonthlyChart;

// src/components/MonthlyChart.tsx

interface MonthlyChartProps {
  data: MonthlyStats[];
  commandName: string;
}

const MonthlyChart = ({ data, commandName }: MonthlyChartProps) => {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Uso Mensal - {commandName}
      </h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-16 text-sm font-medium text-gray-600">
              {item.month}
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              />
            </div>
            <div className="w-12 text-sm font-semibold text-gray-800 text-right">
              {item.count}
            </div>
          </div>
        ))}
      </div>
      {data.length === 0 && (
        <p className="text-gray-500 text-center py-8">Nenhum dado disponível</p>
      )}
    </div>
  );
};

export default MonthlyChart;
