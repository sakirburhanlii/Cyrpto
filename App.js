import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fectData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
        );
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fectData();
  }, []);

  const filteredCryptoData = cryptoData.filter((crypto) =>
    crypto.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  
  return (
    <div className="App">
      <h1>Coin Tracker</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Name</th>
            <th>Price</th>
            <th>Change</th>
          </tr>
        </thead>
        <tbody>
          {filteredCryptoData.map((crypto) => (
            <tr key={crypto.id}>
              <td>
                <img src={crypto.image} alt={crypto.name} />
                {crypto.symbol.toUpperCase()}
              </td>
              <td>{crypto.name}</td>
              <td>${crypto.current_price.toLocaleString()}</td>
              <td
                className={
                  crypto.price_change_percentage_24 > 0 ? 'green' : 'red'
                }
              >
                %
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4">{filteredCryptoData.length} :Showing Result</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
