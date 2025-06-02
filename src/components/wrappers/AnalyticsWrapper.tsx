import { useEffect } from 'react';
import {useLocation} from "react-router";

export const trackPageView = (path: string) => {
  if ((window as any).gtag) {
    (window as any).gtag('config', 'G-0GWJX0SNMX', {
      'page_path': path
    });
  }
};

export const AnalyticsTracker = ()=> {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return null;
}