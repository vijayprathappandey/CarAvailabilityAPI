import React, { useState } from 'react';
import axios from 'axios';

const cars = ['Swift', 'Wagon R', 'Kiger', 'Creta', 'XUV'];

function App() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [availability, setAvailability] = useState({});

  const checkAvailability = async () => {
    if (!startDate || !endDate) return;

    try {
      const response = await axios.post('https://localhost:7081/api/cars/availability', {
        startDate,
        endDate,
      });
      setAvailability(response.data);
    } catch (error) {
      console.error('Error fetching availability:', error);
    }
  };

  return (
    <>
      <style>{`
        @keyframes rotatePlanet {
          0% { transform: rotate(0deg) translateX(200px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(200px) rotate(-360deg); }
        }

        @keyframes flicker {
          0%, 100% { opacity: 0.9; }
          45% { opacity: 0.3; }
          60% { opacity: 0.6; }
          80% { opacity: 0.1; }
        }

        .animated-bg {
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          background: radial-gradient(ellipse at bottom, #0d0d2b 0%, #000000 100%), 
                      url("https://www.transparenttextures.com/patterns/stardust.png");
          background-size: cover, auto;
          color: white;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding: 2rem;
        }

        .glow-planet {
          position: absolute;
          top: 10%;
          left: 50%;
          width: 150px;
          height: 150px;
          margin-left: -75px;
          border-radius: 50%;
          background: linear-gradient(145deg, #ff6ec4, #7873f5);
          box-shadow: 0 0 60px #ff6ec4, 0 0 100px #7873f5;
          animation: rotatePlanet 40s linear infinite;
          z-index: 0;
        }

        .stars {
          background: url("https://www.transparenttextures.com/patterns/stardust.png");
          position: absolute;
          top: 0;
          left: 0;
          width: 300%;
          height: 300%;
          opacity: 0.3;
          animation: flicker 10s infinite alternate;
          pointer-events: none;
          z-index: 0;
        }

        .stars2 {
          background: url("https://www.transparenttextures.com/patterns/stardust.png");
          position: absolute;
          top: 0;
          left: 0;
          width: 400%;
          height: 400%;
          opacity: 0.1;
          animation: flicker 20s infinite alternate;
          animation-delay: 5s;
          pointer-events: none;
          z-index: 0;
        }

        /* Content on top */
        .content {
          position: relative;
          z-index: 1;
          max-width: 900px;
          margin: 0 auto;
          background: rgba(0,0,0,0.5);
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 0 30px rgba(255,110,196,0.4);
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }

        .inputs {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          margin-bottom: 0.25rem;
          font-weight: 600;
        }

        input[type="date"] {
          padding: 0.5rem;
          border-radius: 6px;
          border: none;
          min-width: 140px;
        }

        button {
          background-color: #7c55f9;
          color: white;
          padding: 0.6rem 1.2rem;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 0 12px #7c55f9;
          transition: background-color 0.3s ease;
          align-self: flex-end;
        }

        button:hover {
          background-color: #5a33c8;
        }

        .car-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
          gap: 1rem;
        }

        .car-card {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 0 10px rgba(255,110,196,0.3);
          transition: background-color 0.4s ease;
        }

        .available {
          background-color: rgba(100, 255, 100, 0.3);
          box-shadow: 0 0 20px rgba(50, 255, 50, 0.7);
        }

        .booked {
          background-color: rgba(255, 100, 100, 0.3);
          box-shadow: 0 0 20px rgba(255, 50, 50, 0.7);
        }

        .status {
          font-weight: 700;
        }
      `}</style>

      <div className="animated-bg">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="glow-planet"></div>

        <div className="content">
          <h1>Car Availability Checker</h1>

          <div className="inputs">
            <div>
              <label>Start Date</label>
              <input className='bg-fuchsia-900'
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label>End Date</label>
              <input className='bg-fuchsia-900'
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <button onClick={checkAvailability}>Check Availability</button>
          </div>

          <div className="car-grid">
            {cars.map((car) => {
              const status = availability[car] || 'Not Checked';
              return (
                <div
                  key={car}
                  className={`car-card ${
                    status === 'Available' ? 'available' : 'booked'
                  }`}
                >
                  <h2>{car}</h2>
                  <p>Status: <span className="status">{status}</span></p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
