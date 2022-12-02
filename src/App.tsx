import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { createBrowserHistory } from "history";

const OrbitApp = React.lazy(() => import("./OrbitApp"));
const AuthApp = React.lazy(() => import("././AuthApp"));
import "./index.css";

const ComponentDumb = (props?: { route?: string }) => {
  const navigate = useNavigate();

  return (
    <button
      style={{ position: "fixed", top: 0, left: 0, zIndex: 10000 }}
      onClick={() => navigate(props?.route || "/boilerplate")}
    >
      Mudar rota {props?.route}
    </button>
  );
};

const history = createBrowserHistory();
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/newroute" element={<ComponentDumb route="/boilerplate" />} />
          <Route
            path="/boilerplate/*"
            element={
              <React.Suspense fallback={<div>loading</div>}>
                <AuthApp />
              </React.Suspense>
            }
          />
          <Route
            path="/*"
            element={
              <React.Suspense fallback={<div>loading</div>}>
                <OrbitApp />
              </React.Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("app") as HTMLDivElement
);
root.render(<App />);
