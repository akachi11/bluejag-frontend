import "./fonts/fonts.css";
import ProductPage from "./containers/ProductPage";
import Announcement from "./components/Announcement";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Announcement />
      <Navbar />
      {/* <Home /> */}
      <ProductPage />
    </>
  );
}

export default App;
