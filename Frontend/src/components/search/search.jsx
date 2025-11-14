import { useState } from "react";
import "./search.css";

function Search({ onSearch }) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      onSearch(inputValue.trim());
      e.target.blur();
      e.target.placeholder = inputValue.trim();
      setInputValue("");
    }
  };

  return (
    <input
      type="text"
      placeholder="Delhi"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}

export default Search;
