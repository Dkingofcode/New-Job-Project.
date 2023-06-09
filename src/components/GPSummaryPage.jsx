import React, { useState, useEffect } from 'react';
import { fetchGPSData } from '../api';

const GPSummaryPage = () => {
  const [gpsData, setGPSData] = useState([]);
  const [sortedField, setSortedField] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    // Fetch GPS data using the API and login token
    const loginToken = localStorage.getItem('loginToken'); // Retrieve the login token from storage or state
    fetchGPSData(loginToken)
      .then((data) => {
        setGPSData(data);
      })
      .catch((error) => {
        console.error('Error fetching GPS data:', error);
      });
  }, []);

  // Sort GPS data by the selected field
  const sortGPSData = (field) => {
    // Update the sortedField state
    setSortedField(field);

    // Sort the GPS data based on the selected field
    const sortedData = [...gpsData].sort((a, b) => {
      if (a[field] < b[field]) return -1;
      if (a[field] > b[field]) return 1;
      return 0;
    });

    // Update the GPS data state with the sorted data
    setGPSData(sortedData);
  };

  // Filter GPS data based on search query
  const filterGPSData = () => {
    const filteredData = gpsData.filter((entry) => {
      return (
        entry.deviceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.deviceType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    return filteredData;
  };

  // Calculate the total number of pages based on filtered GPS data
  const totalPages = Math.ceil(filterGPSData().length / itemsPerPage);

  // Get the current page of GPS data
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filterGPSData().slice(startIndex, endIndex);
  };

  // Handle pagination navigation
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle navigation to GPS detail page
  const navigateToGPSDetail = (deviceId) => {
    // Perform navigation logic to the GPS detail page
  };

  return (
    <div>
      <h2>GPS Summary Page</h2>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by device ID or device type"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortGPSData('deviceId')}>Device ID</th>
            <th onClick={() => sortGPSData('deviceType')}>Device Type</th>
            <th onClick={() => sortGPSData('timestamp')}>Timestamp</th>
            <th onClick={() => sortGPSData('location')}>Location</th>
          </tr>
        </thead>
        <tbody>
          {getCurrentPageData().map((entry) => (
            <tr key={entry.deviceId} onClick={() => navigateToGPSDetail(entry.deviceId)}>
              <td>{entry.deviceId}</td>
              <td>{entry.deviceType}</td>
              <td>{entry.timestamp}</td>
              <td>{entry.location}</td>
            </tr>
          )
          )
            }
            </tbody>
            </table>
            </div>
            )
        }


        export default GPSummaryPage;