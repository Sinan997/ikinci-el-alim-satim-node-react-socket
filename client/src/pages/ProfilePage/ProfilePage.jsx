import Header from "../../components/Header/Header";
import classes from "./ProfilePage.module.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  let { pathname } = useLocation();
  pathname = pathname.split("/")[3];
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("http://localhost:8000/api/user/" + pathname);
      setFirstName(res.data.user.firstName);
      setLastName(res.data.user.lastName);
      setUsername(res.data.user.username);
      setEmail(res.data.user.email);
      setPhoneNumber(res.data.user.phoneNumber);
    };
    getUser();
  }, [pathname]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/user/update/" + pathname, {
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
      });
      navigate("/profile/" + pathname);
    } catch (error) {}
  };
  return (
    <>
      <Header />
      <div className={classes.container}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">İsim</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            id="firstName"
            type="text"
            placeholder="İsim"
          />
          <label htmlFor="lastName">Soyisim</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            id="lastName"
            type="text"
            placeholder="Soyisim"
          />
          <label htmlFor="username">Kullanıcı Adı</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
            placeholder="Kullanıcı Adı"
          />
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            placeholder="Email"
          />
          <label htmlFor="phoneNumber">Telefon no</label>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            id="phoneNumber"
            type="text"
            placeholder="53"
          />
          <button>Kaydet</button>
        </form>
      </div>
    </>
  );
}

export default ProfilePage;
