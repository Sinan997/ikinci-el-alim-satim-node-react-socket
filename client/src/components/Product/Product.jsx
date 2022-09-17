import classes from "./Product.module.css";
import { host } from "../../utils/APIRoutes";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../../store/auth-context";

function Product({ product, user }) {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    const storagedUser = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(storagedUser);
  }, []);
  const { pathname } = useLocation();

  const validate = () => {
    if (
      currentUser?.userId === user?._id ||
      pathname.includes("profile") ||
      !isLoggedIn
    ) {
      return true;
    }
  };

  const contactForProduct = async () => {
    await axios.post("http://localhost:8000/api/message/addMessage", {
      from: currentUser.userId,
      to: product.userId._id,
      message:
        "Merhaba ilana koyduğunuz " +
        product.name +
        " ürünü ile ilgileniyorum.",
    });
    navigate("/messages/");
  };

  return (
    <li className={classes.product}>
      <div className={classes.image}>
        <img
          alt={`${product.name}`}
          src={`${host}/images/${product.images[0]}`}
        ></img>
      </div>
      <div className={classes.information}>
        <span className={classes.productName}>{product.name}</span>
        <span className={classes.productDescription}>
          Açıklama: {product.description}
        </span>
        <span className={classes.productPrice}>Fiyat: {product.price} </span>
        <span className={classes.productWidth}>
          Genişlik: {product.width} Yükseklik: {product.height} En:
          {product.depth}
        </span>
        <span className={classes.productColor}>Renk: {product.color}</span>
        <span className={classes.productSituation}>
          Durum: {product.situation}
        </span>
        <span>Kategori: {product.category}</span>
        <span className={classes.userName}>
          Satıcı: {`${user?.firstName} ${user?.lastName}`}
        </span>
        <div className={classes.buttons}>
          <Link to={`/product/${product._id}`}>
            <button>Ürün Detayları</button>
          </Link>
          {!validate() && (
            <button onClick={contactForProduct}>Satıcıyla İletişime Geç</button>
          )}
        </div>
      </div>
    </li>
  );
}

export default Product;
