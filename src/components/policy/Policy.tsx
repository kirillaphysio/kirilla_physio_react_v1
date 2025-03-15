import "./policy.scss"
import {NavLink} from "react-router";

const Policy = () => {
  return (
    <div className={"policy"}>
      <NavLink to={"/aszf"}>Ászf</NavLink>
      <NavLink to={"/aszf"}>Adatkezelési tájékoztató</NavLink>
      <NavLink to={"/aszf"}>Cookie nyilatkozat</NavLink>
    </div>
  );
};

export default Policy;