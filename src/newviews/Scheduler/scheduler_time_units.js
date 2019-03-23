const SECONDS = 'SECONDS';
const MINUTES = 'MINUTES';
const HOURS = 'HOURS';
const DAYS = 'DAYS';
const WEEKS = 'WEEKS';
const MONTHS = 'MONTHS';
const YEARS = 'YEARS';

const units = [
  {
    name: "Seconds",
    type: SECONDS,
    units: 60
  },
  {
    name: "Minutes",
    type: MINUTES,
    units: 60
  },
  {
    name: "Hours",
   type: HOURS,
   units: 60
  },
  {
    name: "Days",
    type: DAYS,
    units: 7
  },
  {
    name: "Weeks",
    type: WEEKS,
    units: 4
  },
  {
    name: "Months",
    type: MONTHS,
    units: 12
  },
  {
    name: "Years",
    type: YEARS,
    units: 100
  }
]

export default units;