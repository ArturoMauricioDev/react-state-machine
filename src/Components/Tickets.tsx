import React from "react";
import "./Tickets.css";

const Tickets = ({ state, send }: any) => {
  const finish = () => {
    send("FINISH");
  };
  return (
    <div className="Tickets">
      <p className="Tickets-description description">
        Gracias por volar con book a fly 💚
      </p>
      <div className="Tickets-ticket">
        <div className="Tickets-country">{state.context.selectedCountry}</div>
        <div className="Tickets-passengers">
          <span>✈</span>
          {state.context.passengers.map((person: any, index: any) => {
            return <p key={index}>{person}</p>;
          })}
        </div>
      </div>
      <button onClick={finish} className="Tickets-finalizar button">
        Finalizar
      </button>
    </div>
  );
};

export { Tickets };
