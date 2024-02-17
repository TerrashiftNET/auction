import React, { useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  React.useEffect(() => {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (data.length === 0) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <h1>Auction</h1>
        <div id="page-content">
          <div id="bid-list">
            <table>
              <thead id="table-header">
                <tr>
                  <th>User</th>
                  <th>Amount (Diamonds)</th>
                </tr>
              </thead>
              <tbody id="table-rows">
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.user}</td>
                    <td>{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div id="bid-form">
            <div id="item-image">
              <img src="https://via.placeholder.com/150" alt="Item" />
            </div>

            <form
              id="form"
              onSubmit={(e) => {
                e.preventDefault();
                setLoading(true);
                fetch("http://localhost:3000", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    user: user,
                    amount: amount,
                    id: Math.random().toString(36).substr(2, 9),
                  }),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    setData(data);
                    setLoading(false);
                  });
              }}
            >
              <input
                type="text"
                placeholder="User"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <button type="submit" disabled={loading}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default App;
