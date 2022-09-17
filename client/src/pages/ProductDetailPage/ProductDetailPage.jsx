import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import classes from "./ProductDetailPage.module.css";
import axios from "axios";
import { host } from "../../utils/APIRoutes";
import Header from "../../components/Header/Header";
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

function ProductDetailPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [product, SetProduct] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  console.log(currentUser?.userId);
  console.log(product.userId?._id);

  useEffect(() => {
    const getProduct = async () => {
      const { data } = await axios.get(host + "/api/product/" + pathname);
      SetProduct(data.product);
    };
    getProduct();
  }, [pathname]);
  useEffect(() => {
    const storagedUser = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(storagedUser);
  }, []);

  const contactWithSeller = async () => {
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
    <>
      <Header />
      <div className={classes.container}>
        {product.length === 0 ? (
          <CircularProgress />
        ) : (
          <>
            <div className={classes.imagesSection}>
              <div className={classes.bigImage}>
                <img
                  alt={`${product.name}`}
                  src={`${host}/images/${product.images[currentIndex]}`}
                ></img>
              </div>
              <div className={classes.otherImages}>
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    alt={`${product.name}`}
                    src={`${host}/images/${product.images[index]}`}
                  ></img>
                ))}
              </div>
            </div>
            <div className={classes.information}>
              <span className={classes.productName}>{product.name}</span>
              <span className={classes.productDescription}>
                Açıklama: {product.description}
              </span>
              <span className={classes.productPrice}>
                Fiyat: {product.price}{" "}
              </span>
              <span className={classes.productWidth}>
                Genişlik: {product.width} Yükseklik: {product.height} En:
                {product.depth}
              </span>
              <span className={classes.productColor}>
                Renk: {product.color}
              </span>
              <span className={classes.productSituation}>
                Durum: {product.situation}
              </span>
              <span>Kategori: {product.category}</span>
              <span className={classes.userName}>
                Satıcı:{" "}
                {`${product.userId.firstName} ${product.userId.lastName}`}
              </span>
              <div className={classes.buttons}>
                {currentUser?.userId !== product?.userId?._id && (
                  <button onClick={contactWithSeller}>
                    Satıcıyla İletişime Geç
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProductDetailPage;
