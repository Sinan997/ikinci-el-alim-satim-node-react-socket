import Header from "../../components/Header/Header";
import Slider from "../../components/Slider/Slider";
import HemenSat from "../../components/HemenSat/HemenSat";
import Products from "../../components/Products/Products";
import classes from "./HomePage.module.css";
import { useLocation } from "react-router-dom";

function HomePage() {
  let { pathname } = useLocation();
  return (
    <>
      <Header />
      <Slider />
      <div className={classes.container}>
        <HemenSat />
        <span className={classes.headline}>Son eklenenler...</span>
      </div>
      <Products pathname={pathname} />
    </>
  );
}

export default HomePage;
