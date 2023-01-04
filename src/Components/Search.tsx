import React, { useState } from "react";
import "./Search.css";

const Search = ({ state, send }: any) => {
  const [flight, setFlight] = useState<string>("");

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFlight(value);
  };
  const options = state.context.countries;
  // const options = ["Mexico", "Colombia", "Chile"];
  const goToPassengers = () => {
    send("CONTINUE", { selectedCountry: flight });
  };
  return (
    <div className="Search">
      <p className="Search-title title">Busca tu destino</p>
      <select
        id="country"
        className="Search-select"
        value={flight}
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          Escoge un país
        </option>
        {options.map((option: any) => (
          <option value={option.name} key={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      <button
        onClick={goToPassengers}
        disabled={flight === ""}
        className="Search-continue button"
      >
        Continuar
      </button>
    </div>
  );
};

export { Search };
