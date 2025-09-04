// import React, { useState, useEffect,createContext, useContext } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import './App.css';



// const API_URL = 'http://localhost:5000/api/data';
// export const AuthContext = createContext(null);

// function App() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(API_URL);
//         setData(response.data);
//       } catch (err) {
//         setError('Failed to fetch data.');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${API_URL}/${id}`);
//       setData(data.filter(item => item.id !== id));
//     } catch (err) {
//       alert('Failed to delete entry.');
//     }
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   const renderTable = (priority) => {
//     const filteredData = data.filter(item => item.priority === priority);
//     if (filteredData.length === 0) return null;

//     return (
//       <div className="table-container">
//         <h2>{priority} Priority</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>No.</th>
//               <th>Email 1</th>
//               <th>Date</th>
//               <th>Value 1</th>
//               <th>Email 2</th>
//               <th>Phone/Details</th>
//               <th>Value 2</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredData.map((item, index) => (
//               <tr key={item.id}>
//                 <td>{index + 1}</td>
//                 <td>{item.email1}</td>
//                 <td>{item.date}</td>
//                 <td>{item.value1}</td>
//                 <td>{item.email2}</td>
//                 <td>{item.phone}</td>
//                 <td>{item.value2}</td>
//                 <td><button onClick={() => handleDelete(item.id)}>Delete</button></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   return (
//     <div className="App">
//       <h1>Data Management Dashboard</h1>
//       {renderTable('High')}
//       {renderTable('Medium')}
//       {renderTable('Low')}
//       {renderTable('Below')}
//     </div>
//   );
// }

// export default App;


import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import './App.css';

// Create an Auth Context
export const AuthContext = createContext(null);

// Custom hook for authentication
const useAuth = () => {
  return useContext(AuthContext);
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Redirect root to login or dashboard based on auth status */}
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
          />
          {/* Optional: Add a 404 Not Found page */}
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;