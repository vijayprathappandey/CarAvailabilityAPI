function App() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [availability, setAvailability] = useState({});

  const checkAvailability = async () => {
    if (!startDate || !endDate) return;
    const response = await axios.post('https://localhost:7081/api/cars/availability', { startDate, endDate });
    setAvailability(response.data);
  };

  return (
    <div className="animated-bg p-6">
      <div className="glow-planet"></div>
      <div className="stars"></div>

      <h1 className="text-4xl font-bold mb-8 text-center z-10 relative">
        ✨ Car Availability Universe
      </h1>

      <div className="flex flex-wrap justify-center gap-6 mb-8 z-10 relative">
        <div>
          <label className="block mb-2">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 rounded text-black"
          />
        </div>

        <div>
          <label className="block mb-2">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 rounded text-black"
          />
        </div>

        <button
          onClick={checkAvailability}
          className="bg-indigo-600 hover:bg-indigo-800 transition text-white px-6 py-2 rounded shadow-lg"
        >
          Check Availability
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 z-10 relative">
        {cars.map((car) => (
          <div
            key={car}
            className={`p-5 rounded-xl shadow-2xl transition duration-500 ease-in-out transform hover:scale-105 ${
              availability[car] === 'Available'
                ? 'bg-green-700/60'
                : availability[car] === 'Booked'
                ? 'bg-red-700/60'
                : 'bg-gray-600/60'
            }`}
          >
            <h2 className="text-2xl font-bold mb-2">{car}</h2>
            <p className="text-lg">
              Status: <span className="font-bold">{availability[car] || 'Not Checked'}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
