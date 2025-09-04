import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import { AuthContext } from '../App'; // Import AuthContext for logout
import { useNavigate } from 'react-router-dom';

const API_URL = 'https://data-dashboard-api.onrender.com/api/data';

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useContext(AuthContext); // Get logout from context
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        setData(response.data);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setData(data.filter(item => item.id !== id));
        alert('Entry deleted successfully!');
      } catch (err) {
        alert('Failed to delete entry. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <div className="loading-spinner"></div>;
  if (error) return <div className="error-message">{error}</div>;

  const highPriorityData = data.filter(item => item.priority === 'High');
  const mediumPriorityData = data.filter(item => item.priority === 'Medium');
  const lowPriorityData = data.filter(item => item.priority === 'Low');
  const belowPriorityData = data.filter(item => item.priority === 'Below');

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Data Management Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <main className="dashboard-content">
        <Table title="High" data={highPriorityData} handleDelete={handleDelete} />
        <Table title="Medium" data={mediumPriorityData} handleDelete={handleDelete} />
        <Table title="Low" data={lowPriorityData} handleDelete={handleDelete} />
        <Table title="Below" data={belowPriorityData} handleDelete={handleDelete} />
      </main>
    </div>
  );
}

export default Dashboard;