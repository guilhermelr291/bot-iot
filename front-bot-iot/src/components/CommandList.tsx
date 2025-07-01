// // src/components/CommandList.tsx
// import { useState } from 'react';
// import MonthlyChart from './MonthlyChart';
// import HourlyChart from './HourlyChart';
// import type { Command } from '../types/command';
// import { calculateHourlyStats, calculateMonthlyStats } from '../utils/Stats';

// interface CommandListProps {
//   commands: Command[];
// }

// const CommandList = ({ commands }: CommandListProps) => {
//   const [selectedCommandName, setSelectedCommandName] = useState<string | null>(
//     null
//   );

//   // Group commands by name, using the latest command for display
//   const uniqueCommands = Array.from(new Set(commands.map((c) => c.name))).map(
//     (name) => ({
//       name,
//       lastCommand: commands
//         .filter((c) => c.name === name)
//         .reduce((latest, current) =>
//           new Date(current.createdAt) > new Date(latest.createdAt)
//             ? current
//             : latest
//         ),
//     })
//   );

//   const getTotalUsage = (commandName: string) => {
//     return commands.filter((c) => c.name === commandName).length;
//   };

//   const getLastUsed = (commandName: string) => {
//     const command = commands
//       .filter((c) => c.name === commandName)
//       .reduce(
//         (latest, current) =>
//           new Date(current.createdAt) > new Date(latest.createdAt)
//             ? current
//             : latest,
//         commands.find((c) => c.name === commandName)!
//       );
//     return new Date(command.createdAt);
//   };

//   return (
//     <div className="space-y-6">
//       <div className="grid gap-4">
//         {uniqueCommands.length === 0 && (
//           <p className="text-gray-500 text-center py-8">
//             Nenhum comando disponível
//           </p>
//         )}
//         {uniqueCommands.map(({ name, lastCommand }) => {
//           const totalUsage = getTotalUsage(name);
//           const lastUsed = getLastUsed(name);
//           const isSelected = selectedCommandName === name;

//           return (
//             <div
//               key={name}
//               className="bg-white rounded-lg shadow-lg overflow-hidden"
//             >
//               <div
//                 className={`p-6 cursor-pointer transition-all duration-200 ${
//                   isSelected
//                     ? 'bg-blue-50 border-l-4 border-blue-500'
//                     : 'hover:bg-gray-50'
//                 }`}
//                 onClick={() => setSelectedCommandName(isSelected ? null : name)}
//               >
//                 <div className="flex justify-between items-start">
//                   <div className="flex-1">
//                     <div className="flex items-center gap-3 mb-2">
//                       <h3 className="text-xl font-semibold text-gray-800">
//                         {name}
//                       </h3>
//                       <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
//                         Último ID: {lastCommand.id}
//                       </span>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
//                       <div>
//                         <span className="font-medium">Última Criação:</span>
//                         <div className="text-gray-800">
//                           {new Date(lastCommand.createdAt).toLocaleDateString(
//                             'pt-BR'
//                           )}
//                         </div>
//                       </div>
//                       <div>
//                         <span className="font-medium">Total de usos:</span>
//                         <div className="text-gray-800 font-semibold">
//                           {totalUsage} execução{totalUsage !== 1 ? 'es' : ''}
//                         </div>
//                       </div>
//                       <div>
//                         <span className="font-medium">Último uso:</span>
//                         <div className="text-gray-800">
//                           {lastUsed
//                             ? lastUsed.toLocaleDateString('pt-BR') +
//                               ' às ' +
//                               lastUsed.toLocaleTimeString('pt-BR', {
//                                 hour: '2-digit',
//                                 minute: '2-digit',
//                               })
//                             : 'Nunca usado'}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <div
//                       className={`w-3 h-3 rounded-full ${
//                         totalUsage > 0 ? 'bg-green-400' : 'bg-gray-300'
//                       }`}
//                     />
//                     <button
//                       className={`text-sm font-medium transition-colors ${
//                         isSelected
//                           ? 'text-blue-600'
//                           : 'text-gray-500 hover:text-gray-700'
//                       }`}
//                     >
//                       {isSelected ? 'Ocultar Estatísticas' : 'Ver Estatísticas'}
//                     </button>
//                   </div>
//                 </div>
//               </div>

//               {isSelected && (
//                 <div className="border-t bg-gray-50 p-6 space-y-6">
//                   <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//                     <MonthlyChart
//                       data={calculateMonthlyStats(name, commands)}
//                       commandName={name}
//                     />
//                     <HourlyChart
//                       data={calculateHourlyStats(name, commands)}
//                       commandName={name}
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default CommandList;

// src/components/CommandList.tsx
import { useState } from 'react';
import MonthlyChart from './MonthlyChart';
import HourlyChart from './HourlyChart';
import type { Command } from '../types/command';
import {
  calculateHourlyStats,
  calculateMonthlyHourlyStats,
  calculateMonthlyStats,
} from '../utils/Stats';

interface CommandListProps {
  commands: Command[];
}

const CommandList = ({ commands }: CommandListProps) => {
  const [selectedCommandName, setSelectedCommandName] = useState<string | null>(
    null
  );
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const uniqueCommands = Array.from(new Set(commands.map((c) => c.name))).map(
    (name) => ({
      name,
      lastCommand: commands
        .filter((c) => c.name === name)
        .reduce((latest, current) =>
          new Date(current.createdAt) > new Date(latest.createdAt)
            ? current
            : latest
        ),
    })
  );

  const getTotalUsage = (commandName: string) => {
    return commands.filter((c) => c.name === commandName).length;
  };

  const getLastUsed = (commandName: string) => {
    const command = commands
      .filter((c) => c.name === commandName)
      .reduce(
        (latest, current) =>
          new Date(current.createdAt) > new Date(latest.createdAt)
            ? current
            : latest,
        commands.find((c) => c.name === commandName)!
      );
    return new Date(command.createdAt);
  };

  const getAvailableMonths = (commandName: string) => {
    return Array.from(
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
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        {uniqueCommands.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            Nenhum comando disponível
          </p>
        )}
        {uniqueCommands.map(({ name, lastCommand }) => {
          const totalUsage = getTotalUsage(name);
          const lastUsed = getLastUsed(name);
          const isSelected = selectedCommandName === name;
          const availableMonths = getAvailableMonths(name);

          return (
            <div
              key={name}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div
                className={`p-6 cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-blue-50 border-l-4 border-blue-500'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => {
                  setSelectedCommandName(isSelected ? null : name);
                  setSelectedMonth(null); // Reset month selection
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {name}
                      </h3>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        Último ID: {lastCommand.id}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Última Criação:</span>
                        <div className="text-gray-800">
                          {new Date(lastCommand.createdAt).toLocaleDateString(
                            'pt-BR'
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Total de usos:</span>
                        <div className="text-gray-800 font-semibold">
                          {totalUsage} execução{totalUsage !== 1 ? 'es' : ''}
                        </div>
                      </div>
                      <div>
                        <span className="font-medium">Último uso:</span>
                        <div className="text-gray-800">
                          {lastUsed
                            ? lastUsed.toLocaleDateString('pt-BR') +
                              ' às ' +
                              lastUsed.toLocaleTimeString('pt-BR', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : 'Nunca usado'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        totalUsage > 0 ? 'bg-green-400' : 'bg-gray-300'
                      }`}
                    />
                    <button
                      className={`text-sm font-medium transition-colors ${
                        isSelected
                          ? 'text-blue-600'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {isSelected ? 'Ocultar Estatísticas' : 'Ver Estatísticas'}
                    </button>
                  </div>
                </div>
              </div>

              {isSelected && (
                <div className="border-t bg-gray-50 p-6 space-y-6">
                  <div className="mb-4">
                    <label className="text-sm font-medium text-gray-600">
                      Filtrar por mês:
                    </label>
                    <select
                      value={selectedMonth || ''}
                      onChange={(e) => setSelectedMonth(e.target.value || null)}
                      className="ml-2 p-2 border rounded-md"
                    >
                      <option value="">Todos os meses</option>
                      {availableMonths.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <MonthlyChart
                      data={calculateMonthlyStats(name, commands)}
                      commandName={name}
                    />
                    <HourlyChart
                      data={
                        selectedMonth
                          ? calculateHourlyStats(name, commands, selectedMonth)
                          : calculateMonthlyHourlyStats(name, commands)
                      }
                      commandName={name}
                      selectedMonth={selectedMonth}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommandList;
