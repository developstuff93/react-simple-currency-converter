import React, { useEffect, useState } from "react";
import CurrencySelector from "../CurrencySelector";

import styles from "./CurrencyConverter.module.scss";

function CurrencyConverter({
  rates,
  leftCurrency,
  rightCurrency,
  setLeftCurrency,
  setRightCurrency
}) {
  const [leftRate, setLeftRate] = useState(0);
  const [rightRate, setRightRate] = useState(0);

  const onLeftRateUpdate = (currency, value) => {
    setLeftCurrency(currency);
    setLeftRate(value / rates[currency]);
  };

  const onRightRateUpdate = (currency, value) => {
    setRightCurrency(currency);
    setRightRate(value / rates[currency]);
  };

  return (
    <div className={styles.Root}>
      <CurrencySelector
        rates={rates}
        onRateUpdate={onLeftRateUpdate}
        exchangeRate={rightRate}
        defaultCurrency={leftCurrency}
      />
      <CurrencySelector
        rates={rates}
        onRateUpdate={onRightRateUpdate}
        exchangeRate={leftRate}
        defaultCurrency={rightCurrency}
      />
    </div>
  );
}

export default CurrencyConverter;
