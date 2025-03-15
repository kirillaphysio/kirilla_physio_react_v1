import "./policy.scss"
import {NavLink} from "react-router";

const Social = () => {
  return (
    <div className={"policy"}>
      <NavLink to={"/aszf"}>Ászf</NavLink>
      <NavLink to={"/aszf"}>Adatkezelési tájékoztató</NavLink>
      <NavLink to={"/aszf"}>Cookie nyilatkozat</NavLink>
    </div>
  );
};

export default Social;