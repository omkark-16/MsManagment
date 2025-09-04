import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/data';

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { logout } = useContext(AuthContext);
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

  const handleStatusChange = async (id, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'done' : 'pending';
    try {
      await axios.put(`${API_URL}/${id}`, { status: newStatus });
      setData(prevData =>
        prevData.map(item =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (err) {
      alert('Failed to update status. Please try again.');
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
        <Table title="High" data={highPriorityData} handleStatusChange={handleStatusChange} />
        <Table title="Medium" data={mediumPriorityData} handleStatusChange={handleStatusChange} />
        <Table title="Low" data={lowPriorityData} handleStatusChange={handleStatusChange} />
        <Table title="Below" data={belowPriorityData} handleStatusChange={handleStatusChange} />
      </main>
    </div>
  );
}

export default Dashboard;