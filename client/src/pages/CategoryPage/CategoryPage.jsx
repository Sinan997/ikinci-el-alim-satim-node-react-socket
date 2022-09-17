import Header from "../../components/Header/Header";
import { useLocation } from "react-router-dom";
import Products from "../../components/Products/Products";

function CategoryPage() {
  let { pathname } = useLocation();
  pathname = pathname.split("/")[2];
  return (
    <>
      <Header />
      <Products pathname={pathname} />
    </>
  );
}

export default CategoryPage;
