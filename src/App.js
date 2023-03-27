import React from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = React.useState('USD');
  const [toCurrency, setToCurrency] = React.useState('UAH');
  const [fromPrice, setFromPrice] = React.useState(0);
  const [toPrice, setToPrice] = React.useState(1);

  const ratesRef = React.useRef({});

  React.useEffect(() => {
    fetch(
      `https://api.apilayer.com/exchangerates_data/latest?apikey=iI6SZXlShMFlKPKcBGkrIg732DxWyWEo&symbols=UAH,USD,EUR&base=UAH`,
    )
      .then((response) => response.json())
      .then((json) => {
        ratesRef.current = json.rates;
        onChangeToPrice(1);
      })
      .catch((error) => {
        console.warn(error);
        alert('Failed to get currency rates');
      });
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setToPrice(result.toFixed(2));
    setFromPrice(value);
  };

  const onChangeToPrice = (value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(2));
    setToPrice(value);
  };

  React.useEffect(() => {
    onChangeFromPrice(fromPrice);
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toPrice);
  }, [toCurrency]);

  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
