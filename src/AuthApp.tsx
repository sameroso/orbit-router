import React from "react";
// @ts-ignore
import { mount } from "auth/boilerplate";
import { useLocation, useNavigate } from "react-router-dom";

const AuthApp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const jonas = React.useRef<any>(null);

  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    jonas.current = mount(ref.current, {
      onNavigate: (loc: any) => {
        console.log({loc, location});
        if (
          loc.pathname !== location.pathname ||
          loc.hash !== location.hash ||
          loc.search !== location.search
        ) {
          navigate(loc);
        }
      },
      parentLocation: location,
    });
  }, []);

  React.useEffect(() => {
    if (jonas.current?.onParentNavigate) {
      jonas.current.onParentNavigate(location);
    }
  }, [location.pathname, location.search, location.hash]);
  return <div ref={ref} />;
};

export default AuthApp;