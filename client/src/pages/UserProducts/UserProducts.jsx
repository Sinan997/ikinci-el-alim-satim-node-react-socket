import { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Product from "../../components/Product/Product";
import classes from "./UserProducts.module.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

function UserProducts() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  let { pathname } = useLocation();
  pathname = pathname.split("/")[2];

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get(
        "http://localhost:8000/api/product/getUserProducts/" + pathname
      );
      setProducts(res.data.user.products);
      setUser(res.data.user);
    };
    getProducts();
  }, [pathname]);

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      setCurrentUser(user);
    };
    getCurrentUser();
  }, []);

  return (
    <>
      <Header />
      <div className={classes.container}>
        <ul>
          {products.map((product, index) => (
            <Product product={product} user={user} key={index} />
          ))}
        </ul>
        {products.length === 0 && <h1>Hiçbir ilanınız bulunmamakta.</h1>}
        <div className={classes.buttons}>
          <Link to={`/profile/edit/${user._id}`}>
            {currentUser.userId === pathname && (
              <button>Profilini Düzenle</button>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}

export default UserProducts;
