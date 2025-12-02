function DateComponent() {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return (
    <div className="text-1.5xl xl:text-xl">
      {day}.{month}.{year}
    </div>
  );
}

export default DateComponent;