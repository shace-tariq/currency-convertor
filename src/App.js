import React, { useState, useEffect } from 'react';
import CurrencyInput from "./CurrencyInput";
import './App.css';
import axios from 'axios';

function App() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);

  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('USD');
  const [Rates, setRates] = useState({}); // Set as an object, not an array

  useEffect(() => {
    axios.get('https://data.fixer.io/api/latest?access_key=17c6f43510094d2e8ca2ce7d79cb1c31')
      .then(response => {
        if (response.data && response.data.rates) {
          setRates(response.data.rates);
        } else {
          console.error("Invalid API response:", response.data);
        }
      })
      .catch(error => console.error("Error fetching exchange rates:", error));
  }, []);
 function handleAmount1Change(amount1) {
   setAmount2(format (amount1 * Rates[currency2] / Rates[currency1]));
    setAmount1(amount1);
  }
  function handleCurrency1Change(currency1) {
    setAmount2(format (amount1 * Rates[currency2] / Rates[currency1]));
    setCurrency1(currency1);
  }
  function handleAmount2Change(amount2) {
    setAmount1(format (amount2 * Rates[currency1] / Rates[currency2]));
    setAmount2(amount2);
  }
  function handleCurrency2Change(currency2) {
    setAmount1(format (amount2 * Rates[currency1] / Rates[currency2]));
    setCurrency2(currency2);
  }
  
function format(number){
  return number.toFixed(2);
}
  return (
    <div className='App'>
      <h1>Currency Converter</h1>
      <CurrencyInput
onAmountChange={handleAmount1Change}
onCurrencyChange={handleCurrency1Change}

        currencies={Object.keys(Rates)}

        amount={amount1}

        currency={currency1} />
      <CurrencyInput
onAmountChange={handleAmount2Change}
onCurrencyChange={handleCurrency2Change}

        currencies={Object.keys(Rates)}

        amount={amount2}

        currency={currency2} />
    </div>
  );
}

export default App;
