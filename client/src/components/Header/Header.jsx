import React from "react";
import classes from "./Header.module.css";
import logo from "../../assets/dekolgo.png";
import { IoIosSearch } from "react-icons/io";
import { BiUser } from "react-icons/bi";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SiGooglemessages } from "react-icons/si";

function Header() {
  let { pathname } = useLocation();
  pathname = pathname.split("/")[2];
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <header>
        <div className={classes.headerStart}>
          <ul>
            <li>Kullanım</li>
            <li>Hakkımızda</li>
            <li>İlan Ver</li>
            <li>İletişim</li>
          </ul>
        </div>

        <div className={classes.header}>
          <div className={classes.logo}>
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <div className={classes.headerSearch}>
            <form onSubmit={submitHandler}>
              <input placeholder="Ürün veya kategori ara" type="text" />
              <button type="submit">{<IoIosSearch />}</button>
            </form>
          </div>

          <div className={classes.headerEnd}>
            {!isLoggedIn ? (
              <>
                <div
                  onClick={() => navigate("/login")}
                  className={classes.auth}
                >
                  <BiUser className={classes.userIcon} />
                  <span>Giriş Yap</span>
                </div>
                <div
                  onClick={() => navigate("/register")}
                  className={classes.auth}
                >
                  <BiUser className={classes.userIcon} />
                  <span>Kayıt Ol</span>
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={() => navigate("/messages/")}
                  className={classes.auth}
                >
                  <SiGooglemessages className={classes.userIcon} />
                  <span>Mesajlar</span>
                </div>
                <Link to="/">
                  <div onClick={logout} className={classes.auth}>
                    <BiUser className={classes.userIcon} />
                    <span>Çıkış yap</span>
                  </div>
                </Link>
                <div
                  onClick={() => navigate("/profile/" + userId)}
                  className={classes.auth}
                >
                  <BiUser className={classes.userIcon} />
                  <span>Profil</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className={classes.headerBottom}>
          <ul>
            <Link style={{ color: "black" }} to={"/category/yatak"}>
              <li className={pathname === "yatak" ? classes.selected : ""}>
                Yatak
              </li>
            </Link>
            <Link style={{ color: "black" }} to={"/category/koltuk"}>
              <li className={pathname === "koltuk" ? classes.selected : ""}>
                Koltuk
              </li>
            </Link>
            <Link style={{ color: "black" }} to={"/category/dolap"}>
              <li className={pathname === "dolap" ? classes.selected : ""}>
                Dolap
              </li>
            </Link>
            <Link
              style={{ color: "black" }}
              to={"/category/masa%20ve%20sandalye"}
            >
              <li
                className={
                  pathname === "masa%20ve%20sandalye" ? classes.selected : ""
                }
              >
                Masa ve Sandalye
              </li>
            </Link>
            <Link
              style={{ color: "black" }}
              to={"/category/bahce%20ve%20balkon"}
            >
              <li
                className={
                  pathname === "bahce%20ve%20balkon" ? classes.selected : ""
                }
              >
                Bahçe ve Balkon
              </li>
            </Link>
            <Link style={{ color: "black" }} to={"/category/beyaz%20esya"}>
              <li
                className={pathname === "beyaz%20esya" ? classes.selected : ""}
              >
                Beyaz Eşya
              </li>
            </Link>
            <Link style={{ color: "black" }} to={"/category/aydinlatma"}>
              <li className={pathname === "aydinlatma" ? classes.selected : ""}>
                Aydınlatma
              </li>
            </Link>
            <Link style={{ color: "black" }} to={"/category/mutfak"}>
              <li className={pathname === "mutfak" ? classes.selected : ""}>
                Mutfak
              </li>
            </Link>
            <Link style={{ color: "black" }} to={"/category/bilgisayar"}>
              <li className={pathname === "bilgisayar" ? classes.selected : ""}>
                Bilgisayar
              </li>
            </Link>
            <Link style={{ color: "black" }} to={"/category/telefon"}>
              <li className={pathname === "telefon" ? classes.selected : ""}>
                Telefon
              </li>
            </Link>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
