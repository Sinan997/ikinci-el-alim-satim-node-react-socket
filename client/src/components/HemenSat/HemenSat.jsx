import classes from "./HemenSat.module.css";
import { MdNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";

function HemenSat() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className={classes.container}>
      <p>
        Bu uygulama ile ikinci el eşyalarını satabilirsin. Ücretsiz ilan ver...
      </p>
      <Link to={isLoggedIn ? "/addProduct" : "/login"}>
        <button className={classes.btn}>
          <p>İlan Ver</p>

          <div className={classes.icon}>
            <MdNavigateNext />
          </div>
        </button>
      </Link>
    </div>
  );
}

export default HemenSat;
