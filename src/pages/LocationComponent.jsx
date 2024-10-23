import React, { useState } from 'react';

const LocationComponent = () => {
  const [locationData, setLocationData] = useState(null);
  const [error, setError] = useState(null);

  const fetchLocation = () => {
    fetch('http://localhost:5000/get-location')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Assuming the API returns JSON
      })
      .then(data => {
        setLocationData(data);
        setError(null); // Clear any previous errors
      })
      .catch(error => {
        setError('Failed to fetch location');
        console.error('Error fetching location:', error);
      });
  };

  return (
    <div>
      <button onClick={fetchLocation}>Get Location</button>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {locationData && (
        <div>
          <h3>Location Data:</h3>
          <pre>{JSON.stringify(locationData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default LocationComponent;
