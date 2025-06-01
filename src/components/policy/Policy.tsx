import "./policy.scss"
import {NavLink} from "react-router";

const Policy = () => {
  return (
    <div className={"policy"}>
      <NavLink to={"/terms"}>Ászf</NavLink>
      <NavLink to={"/privacy"}>Adatkezelési tájékoztató</NavLink>
      <NavLink to={"/cookie"}>Cookie nyilatkozat</NavLink>
    </div>
  );
};

export default Policy;