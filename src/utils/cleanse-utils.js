import moment from "moment";

export const parseDate = (excelDate) => {
  if (!excelDate || isNaN(excelDate)) return null;

  const unixTimestamp = (excelDate - 25569) * 86400 * 1000;
  const date = moment(unixTimestamp);
  if (!date.isValid()) return null;

  return date.toISOString();
}

export const parseCurrency = (input) => {
  if (typeof input === 'string') {
    return parseFloat(input.replace(/[^0-9.-]+/g, ''));
  }
  return Number(input);
}