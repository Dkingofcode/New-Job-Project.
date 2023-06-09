import React, { useState, useEffect } from 'react';
import { fetchGPSData } from '../api';
import { Pie } from 'react-chartjs-2';

const GPSDetailsPage = ({ deviceId }) => {
  const [gpsData, setGPSData] = useState([]);

  useEffect(() => {
    // Fetch GPS data for the selected device using the API and login token
    const loginToken = localStorage.getItem('loginToken'); // Retrieve the login token from storage or state
    fetchGPSData(deviceId, loginToken)
      .then((data) => {
        setGPSData(data);
      })
      .catch((error) => {
        console.error('Error fetching GPS data:', error);
      });
  }, [deviceId]);

  // Calculate the time spent at each location
  const calculateTimeSpent = () => {
    const locationMap = new Map();

    gpsData.forEach((entry) => {
      const location = entry.location;
      if (locationMap.has(location)) {
        locationMap.set(location, locationMap.get(location) + 5); // Assuming each entry is of 5 minutes duration
      } else {
        locationMap.set(location, 5);
      }
    });

    return Array.from(locationMap.entries()).map(([location, time]) => {
      const percentage = ((time / (gpsData.length * 5)) * 100).toFixed(2);
      return {
        location,
        time,
        percentage,
      };
    });
  };

  // Prepare data for the pie chart
  const pieChartLabels = calculateTimeSpent().map((entry) => entry.location);
  const pieChartData = calculateTimeSpent().map((entry) => entry.time);

  return (
    <div>
      <h2>GPS Details Page</h2>
      <h3>Device ID: {deviceId}</h3>
      <div>
        <h4>Time Spent at Each Location:</h4>
        {calculateTimeSpent().map((entry) => (
          <div key={entry.location}>
            <p>
              {entry.location}: {entry.time} min ({entry.percentage}%)
            </p>
          </div>
        ))}
      </div>
      <div>
        <h4>Pie Chart:</h4>
        <Pie data={{ labels: pieChartLabels, datasets: [{ data: pieChartData }] }} />
      </div>
    </div>
  );
};

export default GPSDetailsPage;

