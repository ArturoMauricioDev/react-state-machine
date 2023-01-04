import "./Nav.css";

const Nav = ({ state, send }: any) => {
  const goToWelcome = () => {
    send("CANCEL");
  };
  return (
    <nav className="Nav">
      <h1 className="Nav-logo">Book a fly ✈</h1>
      {!state.matches("inicial") && !state.matches("tickets") && (
        <button onClick={goToWelcome} className="Nav-cancel button-secondary">
          Cancelar
        </button>
      )}
    </nav>
  );
};

export { Nav };
