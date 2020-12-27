import axios from "axios";
import _get from "lodash/get";

export const fetchRatesFromAPI = async (url) => {
  try {
    const res = await axios.get(url);
    return _get(res, "data.rates", {});
  } catch (err) {
    return {};
  }
};
