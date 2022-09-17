import Header from "../../components/Header/Header";
import { useState } from "react";
import classes from "./LoginPage.module.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { loginRoute } from "../../utils/APIRoutes";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: "800",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const submitHandler = async (e) => {
    const { email, password } = values;
    e.preventDefault();
    if (handleValidation()) {
      try {
        const { data } = await axios.post(loginRoute, {
          email,
          password,
        });
        authCtx.login(
          data.token,
          data.expirationTime,
          data.username,
          data.userId,
          data.email
        );
        navigate("/");
      } catch (error) {
        toast.error(error.response.data.message, toastOptions);
      }
    }
  };

  const handleValidation = () => {
    const { email, password } = values;
    if (email === "") {
      toast.error("Email boş", toastOptions);
      return false;
    }
    if (password === "") {
      toast.error("Şifre boş", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <>
      <Header />
      <div className={classes.container}>
        <form onSubmit={submitHandler}>
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            name="email"
            id="email"
            type="text"
            placeholder="Email"
          />
          <label htmlFor="password">Şifre</label>
          <input
            onChange={handleChange}
            name="password"
            id="password"
            type="password"
            placeholder="Şifre"
          />
          <button>Giriş Yap</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default LoginPage;
