export default function(action, plantName, repetitionQuantity, date) {
  const time = date.getHours() + ":" + date.getMinutes();
  return (
    action +
    " the " +
    plantName.toLowerCase() +
    " every " +
    repetitionQuantity +
    (repetitionQuantity === 1 ? " day at " : " days at ") +
    time
  );
}
