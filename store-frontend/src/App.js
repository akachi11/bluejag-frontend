import { useContext } from "react";
import Home from "./containers/Home";
import "./fonts/fonts.css"
import { useHomeContext } from "./context/HomeContext";

function App() {

  return (
    <>
      <Home />
    </>
  );
}

export default App;
