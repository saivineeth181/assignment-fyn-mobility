import React, { useState, useEffect } from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchData } from '../service/apiService';

const HomePage = () => {
  const [revenueData, setRevenueData] = useState({
    daily_revenue: [],
    monthly_revenue: [],
    yearly_revenue: []
  });
  const [chartData, setChartData] = useState([]);
  const [timeframe, setTimeframe] = useState('day');

  useEffect(() => {
    // Fetch revenue data from API
    const fetchRevenueData = async () => {
      try {
        const data = await fetchData('revenue');
        setRevenueData(data);
        setChartData(data.daily_revenue); // Default to daily revenue
      } catch (error) {
        console.error('Error fetching revenue data:', error);
      }
    };

    fetchRevenueData();
  }, []);

  // Handle timeframe change
  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
    if (newTimeframe === 'day') {
      setChartData(revenueData.daily_revenue);
    } else if (newTimeframe === 'month') {
      setChartData(revenueData.monthly_revenue);
    } else if (newTimeframe === 'year') {
      setChartData(revenueData.yearly_revenue);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Home Page - Revenue Dashboard</h2>
      <div className="d-flex justify-content-end align-items-center mb-4">
        <DropdownButton id="timeframe-dropdown" title={`Timeframe: ${timeframe}`}>
          <Dropdown.Item onClick={() => handleTimeframeChange('day')}>Day</Dropdown.Item>
          <Dropdown.Item onClick={() => handleTimeframeChange('month')}>Month</Dropdown.Item>
          <Dropdown.Item onClick={() => handleTimeframeChange('year')}>Year</Dropdown.Item>
        </DropdownButton>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={timeframe === 'day' ? 'date' : timeframe === 'month' ? 'month' : 'year'} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HomePage;
