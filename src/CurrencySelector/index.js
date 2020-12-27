import React, { useMemo, useState } from "react";

import styles from "./CurrencySelector.module.scss";

function CurrencySelector({
  rates,
  onRateUpdate,
  exchangeRate,
  defaultCurrency
}) {
  const [currency, setCurrency] = useState(defaultCurrency);
  const [value, setValue] = useState("");

  const onSelectCurrency = (selectedCurrency) => {
    setCurrency(selectedCurrency);
    onRateUpdate(selectedCurrency, value);
  };

  const onChange = (inputValue) => {
    setValue(inputValue);
    onRateUpdate(currency, inputValue);
  };

  useMemo(() => {
    const convertedRate =
      Number(exchangeRate * rates[currency]).toFixed(2) || 0;
    setValue(convertedRate);
  }, [exchangeRate, currency, rates]);

  return (
    <div className={styles.Root}>
      <select
        onChange={(e) => onSelectCurrency(e.target.value)}
        value={currency}
        className={styles.Selector}
      >
        {Object.keys(rates).map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <input
        onChange={(e) => onChange(e.target.value)}
        type="number"
        placeholder="0"
        className={styles.InputBox}
        value={value}
      />
    </div>
  );
}

export default CurrencySelector;
