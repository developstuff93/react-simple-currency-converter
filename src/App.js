import React, { useEffect, useState } from "react";

import CurrencyConverter from "./CurrencyConverter";
import HistoricalView from "./HistoricalView";

import { LATEST_RATES_API } from "./utils/constants";
import { fetchRatesFromAPI } from "./utils";
import styles from "./App.module.scss";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [rates, setRates] = useState([]);
  const [leftCurrency, setLeftCurrency] = useState("USD");
  const [rightCurrency, setRightCurrency] = useState("GBP");

  useEffect(() => {
    const fetchRatesJson = async () => {
      setLoading(true);
      const data = await fetchRatesFromAPI(LATEST_RATES_API);
      setRates(data);
      setLoading(false);
    };
    fetchRatesJson();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className={styles.Root}>
      <div className={styles.Header}>
        <h1>Currency Converter</h1>
      </div>
      <div className={styles.Body}>
        <CurrencyConverter
          rates={rates}
          leftCurrency={leftCurrency}
          rightCurrency={rightCurrency}
          setLeftCurrency={setLeftCurrency}
          setRightCurrency={setRightCurrency}
        />
        {leftCurrency && rightCurrency && (
          <HistoricalView src={leftCurrency} des={rightCurrency} />
        )}
      </div>
    </div>
  );
}
