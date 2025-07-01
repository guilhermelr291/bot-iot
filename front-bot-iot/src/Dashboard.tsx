// // // src/components/Dashboard.tsx
// // import { useNavigate } from 'react-router-dom';
// // import { useAuth } from './hooks/AuthContext';

// // const Dashboard = () => {
// //   const { user, logout } = useAuth();
// //   const navigate = useNavigate();

// //   if (!user) {
// //     navigate('/login');
// //     return null;
// //   }

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //       <div className="bg-white p-6 rounded-lg shadow-lg">
// //         <h1 className="text-2xl font-bold mb-4">Bem-vindo ao Dashboard!</h1>
// //         <button
// //           onClick={logout}
// //           className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
// //         >
// //           Sair
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;

// // src/components/Dashboard.tsx
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './hooks/AuthContext';
// import { useDashboardData } from './hooks/UseDashboard';
// import type { Command, CommandUsage } from './types/command';
// import CommandList from './components/CommandList';

// const Dashboard = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const { commands, usage, loading, error } = useDashboardData();

//   if (!user) {
//     navigate('/login');
//     return null;
//   }

//   const totalCommands = commands.length;
//   const totalExecutions = usage.length;
//   const activeCommands = commands.filter((cmd: Command) =>
//     usage.some((u: CommandUsage) => u.commandId === cmd.id)
//   ).length;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600 text-lg">
//             Carregando dados do dashboard...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
//         <div className="text-center">
//           <p className="text-red-500 text-lg">{error}</p>
//           <button
//             onClick={logout}
//             className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
//           >
//             Sair
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       <div className="container mx-auto px-4 py-8">
//         <div className="mb-8 flex justify-between items-center">
//           <div>
//             <h1 className="text-4xl font-bold text-gray-800 mb-2">
//               Dashboard de Comandos
//             </h1>
//             <p className="text-gray-600 text-lg">
//               Monitore e analise o uso dos seus comandos em tempo real
//             </p>
//           </div>
//           <button
//             onClick={logout}
//             className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
//           >
//             Sair
//           </button>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm font-medium">
//                   Total de Comandos
//                 </p>
//                 <p className="text-3xl font-bold text-blue-600">
//                   {totalCommands}
//                 </p>
//               </div>
//               <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                 <svg
//                   className="w-6 h-6 text-blue-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm font-medium">
//                   Total de Execuções
//                 </p>
//                 <p className="text-3xl font-bold text-green-600">
//                   {totalExecutions}
//                 </p>
//               </div>
//               <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
//                 <svg
//                   className="w-6 h-6 text-green-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M13 10V3L4 14h7v7l9-11h-7z"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-lg p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-gray-600 text-sm font-medium">
//                   Comandos Ativos
//                 </p>
//                 <p className="text-3xl font-bold text-purple-600">
//                   {activeCommands}
//                 </p>
//               </div>
//               <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
//                 <svg
//                   className="w-6 h-6 text-purple-600"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>

//         <CommandList commands={commands} usage={usage} />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

// src/components/Dashboard.tsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from './hooks/AuthContext';
import { useDashboardData } from './hooks/UseDashboard';
import CommandList from './components/CommandList';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { commands, loading, error } = useDashboardData();

  if (!user) {
    navigate('/login');
    return null;
  }

  const totalCommands = commands.length;
  const totalExecutions = commands.length; // Each command is an execution
  const activeCommands = new Set(commands.map((cmd) => cmd.name)).size; // Unique command names

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">
            Carregando dados do dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={logout}
            className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Sair
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Dashboard de Comandos
            </h1>
            <p className="text-gray-600 text-lg">
              Monitore e analise o uso dos seus comandos em tempo real
            </p>
          </div>
          <button
            onClick={logout}
            className="py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total de Comandos
                </p>
                <p className="text-3xl font-bold text-blue-600">
                  {totalCommands}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Total de Execuções
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {totalExecutions}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  Comandos Ativos
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {activeCommands}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <CommandList commands={commands} />
      </div>
    </div>
  );
};

export default Dashboard;
