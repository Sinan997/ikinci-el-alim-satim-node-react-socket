import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import AddProductPage from "./pages/AddProductPage/AddProductPage";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import UserProducts from "./pages/UserProducts/UserProducts";
import ChatPage from "./pages/ChatPage/ChatPage";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <RegisterPage />}
        />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/addProduct"
          element={isLoggedIn ? <AddProductPage /> : <Navigate to="/" />}
        />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/profile/:userId" element={<UserProducts />} />
        <Route path="/profile/edit/:userId" element={<ProfilePage />} />
        <Route path="/messages/" element={<ChatPage />} />
      </Routes>
    </>
  );
}

export default App;
