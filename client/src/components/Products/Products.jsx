import classes from "./Products.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { getAllProducts, host } from "../../utils/APIRoutes";
import Product from "../Product/Product";

function Products({ pathname }) {
  const [products, SetProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      if (pathname === "/") {
        const { data } = await axios.get(getAllProducts);
        SetProducts(data.products);
      } else {
        const { data } = await axios.get(
          host + "/api/product/category/" + pathname
        );
        SetProducts(data.products);
      }
    };
    getProducts();
  }, [pathname]);

  return (
    <div className={classes.container}>
      <ul>
        {products.map((product, index) => (
          <Product product={product} user={product.userId} key={index} />
        ))}
      </ul>
      {products.length === 0 && <h1>Bu kategoride ürün bulunmamaktadır</h1>}
    </div>
  );
}

export default Products;
