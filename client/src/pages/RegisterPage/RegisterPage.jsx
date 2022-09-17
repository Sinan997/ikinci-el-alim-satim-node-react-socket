import Header from "../../components/Header/Header";
import classes from "./RegisterPage.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "axios";
import { registerRoute } from "../../utils/APIRoutes";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
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

  const handleSubmit = async (e) => {
    const { firstName, lastName, username, email, phoneNumber, password } =
      values;
    e.preventDefault();
    console.log(values);
    if (handleValidation()) {
      try {
        const { data } = await axios.post(registerRoute, {
          firstName,
          lastName,
          username,
          email,
          phoneNumber,
          password,
        });

        console.log(data);
        navigate("/login");
      } catch (error) {
        toast.error(error.response.data.message, toastOptions);
      }
    }
  };

  const handleValidation = () => {
    const { firstName, lastName, username, email, phoneNumber, password } =
      values;
    if (firstName.length < 2) {
      toast.error("Lütfen isim kısmını doldurun...", toastOptions);
      return false;
    }
    if (lastName.length < 2) {
      toast.error("Lütfen soyisim kısmını doldurun...", toastOptions);
      return false;
    }
    if (username.length < 2) {
      toast.error("Lütfen kullanıcı adını doğru girin...", toastOptions);
      return false;
    }
    if (email.length < 2 || !email.includes("@")) {
      toast.error("Lütfen emaili doğru girin...", toastOptions);
      return false;
    }
    if (phoneNumber.length !== 10) {
      toast.error("Lütfen telefon numaranızı doğru girin...", toastOptions);
      return false;
    }
    if (password.length < 6) {
      toast.error("Şifre 6 karakterden az olamaz...", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <>
      <Header />
      <div className={classes.container}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">İsim</label>
          <input
            onChange={handleChange}
            id="firstName"
            type="text"
            placeholder="İsim"
            name="firstName"
          />
          <label htmlFor="lastName">Soyisim</label>
          <input
            onChange={handleChange}
            id="lastName"
            type="text"
            placeholder="Soyisim"
            name="lastName"
          />
          <label htmlFor="username">Kullanıcı Adı</label>
          <input
            onChange={handleChange}
            id="username"
            type="text"
            name="username"
            placeholder="Kullanıcı Adı"
          />
          <label htmlFor="email">Email</label>
          <input
            onChange={handleChange}
            name="email"
            id="email"
            placeholder="Email"
          />
          <label htmlFor="phoneNumber">Telefon no</label>
          <input
            onChange={handleChange}
            id="phoneNumber"
            type="text"
            name="phoneNumber"
            placeholder="53"
          />
          <label htmlFor="password">Şifre</label>
          <input
            name="password"
            onChange={handleChange}
            id="password"
            type="password"
            placeholder="Şifre"
          />
          <button>Üye Ol</button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default RegisterPage;
