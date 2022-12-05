import React, { useRef } from "react";
// @ts-ignore
import { mount } from "orbit/orbit";
import { useLocation, useNavigate } from "react-router-dom";

const OrbitApp = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const mountReturnRef = useRef<any>();

  React.useEffect(() => {
    const mountProps = mount(ref.current, {
      onNavigate: (args) => {
        const windowLocation = window.location;
        if (
          args.pathname !== windowLocation.pathname ||
          args.hash !== windowLocation.hash ||
          args.search !== windowLocation.search
        ) {
          navigate(`${args.pathname}${args.search}${args.hash}`, {
            state: args.state,
          });
        }
      },
    });
    mountReturnRef.current = mountProps;
  }, []);

  React.useEffect(() => {
    if (mountReturnRef.current?.onParentNavigate) {
      mountReturnRef.current?.onParentNavigate(location);
    }
  }, [location.pathname, location.search, location.hash]);

  return <div ref={ref} />;
};

export default OrbitApp;
