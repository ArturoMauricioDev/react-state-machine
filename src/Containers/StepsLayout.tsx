import { Welcome } from "../Components/Welcome";
import { Search } from "../Components/Search";
import { Tickets } from "../Components/Tickets";
import { Passengers } from "../Components/Passengers";
import "./StepsLayout.css";

const StepsLayout = ({ state, send }: any) => {
  const renderContent = () => {
    if (state.matches("inicial")) return <Welcome send={send} />;
    if (state.matches("search")) return <Search state={state} send={send} />;
    if (state.matches("tickets")) return <Tickets state={state} send={send} />;
    if (state.matches("passengers"))
      return <Passengers state={state} send={send} />;
    return null;
  };
  return <div className="StepsLayout">{renderContent()}</div>;
};

export { StepsLayout };
