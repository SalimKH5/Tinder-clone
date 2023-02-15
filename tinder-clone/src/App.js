import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard"
import Oneboarding from "./pages/Oneboarding";
import { createRoot } from "react-dom/client";
import {useCookies} from "react-cookie"
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Route,
  Router,
  Link,
  Routes,
} from "react-router-dom";

import "./index.css"
function App() {

  const [cookies,setCookie,removeCookie]=useCookies(["user"])

  const authToken=cookies.AuthToken
  return (
   
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          
          { authToken && <Route path="/dashboard" element={<Dashboard/>} />}

          { authToken && <Route path="/oneboarding" element={<Oneboarding/>} />}

       </Routes>
     </BrowserRouter>
 
  );
}

export default App;
