import React, { useState } from "react";
import axios from "axios";

function SuggestionForm() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);
    if (value) {
      axios
        .get(`http://jsonplaceholder.typicode.com/comments/?q=${value}`)
        //https://jsonplaceholder.typicode.com/comments/?q=${value}
        .then((response) => {
          setSuggestions(response.data);
          console.log(suggestions);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setSuggestions([]);
    }
  };

  return (
    <form>
      <label htmlFor="query">Query:</label>
      <input
        type="text"
        id="query"
        name="query"
        value={query}
        onChange={handleChange}
      />
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion.id}>{suggestion.name}</li>
        ))}
      </ul>
    </form>
  );
}

export default SuggestionForm;
