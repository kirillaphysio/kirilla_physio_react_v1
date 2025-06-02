import {useLocation} from "react-router";
import {useLayoutEffect} from "react";

export const ScrollToTopWrapper = ({children}: any) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
}