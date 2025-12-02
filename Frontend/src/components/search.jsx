import { useState } from "react";

function Search({onSearch , currentCity}) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      onSearch(inputValue.trim());
      e.target.blur();
      setInputValue("");
    }
  };

  return (
    <input
      type="text"
      placeholder={currentCity}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
      className="w-3/5 xl:w-1/2 bg-bl py-2 px-4 rounded-full transition-all duration-100 ease-in-out hover:border placeholder:capitalize relative z-10"
    />
  );
}

export default Search;
