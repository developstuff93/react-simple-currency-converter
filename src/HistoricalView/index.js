import React, { useCallback, useEffect, useState } from "react";
import { HISTORICAL_RATES_API } from "../utils/constants";
import { fetchRatesFromAPI } from "../utils/index";
import Chart from "./Chart";
import styles from "./HistoricalView.module.scss";

function HistoricalView({ src, des }) {
  const [rates, setRates] = useState([]);

  const generateStartEndDate = useCallback(() => {
    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - 1);
    return {
      startDate: `${start.getFullYear()}-${
        start.getMonth() + 1
      }-${start.getDate()}`,
      endDate: `${end.getFullYear()}-${end.getMonth() + 1}-${end.getDate()}`
    };
  }, []);

  const fetchHistoricalRatesJson = useCallback(async () => {
    const { startDate, endDate } = generateStartEndDate();
    const url = `${HISTORICAL_RATES_API}?start_at=${startDate}&end_at=${endDate}&symbol=${src},${des}`;
    const data = await fetchRatesFromAPI(url);
    const filtered = {};
    for (const [date, rateList] of Object.entries(data)) {
      filtered[date] = {
        [src]: rateList[src],
        [des]: rateList[des]
      };
    }
    setRates(filtered);
  }, [generateStartEndDate, src, des]);

  useEffect(() => {
    fetchHistoricalRatesJson();
  }, [fetchHistoricalRatesJson]);

  return (
    <div className={styles.Root}>
      {Object.keys(rates).length && <Chart rates={rates} src={src} des={des} />}
    </div>
  );
}

export default HistoricalView;
