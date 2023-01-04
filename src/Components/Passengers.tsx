import React, { useState } from "react";
import "./Passengers.css";

const Passengers = ({ state, send }: any) => {
  const [value, setvalue] = useState<string>("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send("ADD", { newPassenger: value });
    setvalue("");
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setvalue(value);
  };
  const { passengers } = state.context;

  const goToTicket = () => {
    send("DONE");
  };
  return (
    <form onSubmit={submit} className="Passengers">
      <p className="Passengers-title title">
        Agrega a las personas que van a volar ✈️
      </p>
      {passengers?.map((person: string, idx: any) => (
        <p className="text" key={`person-${idx}`}>
          {person}
        </p>
      ))}
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Escribe el nombre completo"
        required
        value={value}
        onChange={onChangeInput}
      />
      <div className="Passengers-buttons">
        <button className="Passengers-add button-secondary" type="submit">
          Agregar Pasajero
        </button>
        <button
          onClick={goToTicket}
          className="Passenger-pay button"
          type="button"
          // disabled={passengers.length === 0}
        >
          Ver mi ticket
        </button>
      </div>
    </form>
  );
};

export { Passengers };
