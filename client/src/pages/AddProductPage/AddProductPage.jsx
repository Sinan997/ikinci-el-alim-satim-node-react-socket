import classes from "./AddProductPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { createProduct, uploadPhoto } from "../../utils/APIRoutes";
import { useEffect } from "react";
import Header from "../../components/Header/Header";

function AddProductPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserId(user.userId);
  }, []);

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    category: "Yatak",
    width: "",
    height: "",
    depth: "",
    color: "Mavi",
    situation: "Eski",
  });

  const [files, setFiles] = useState(undefined);

  const onFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      try {
        setIsUploading(true);
        const data = new FormData();

        for (let i = 0; i < files.length; i++) {
          data.append("file", files[i]);
        }

        const res = await axios.post(uploadPhoto, data);
        let photos = [];
        for (let i = 0; i < res.data.length; i++) {
          photos.push(res.data[i].filename);
        }
        if (res.status === 200) {
          const {
            name,
            description,
            price,
            category,
            width,
            height,
            depth,
            color,
            situation,
          } = values;
          const data = {
            name,
            description,
            images: photos,
            price,
            userId,
            category,
            width,
            height,
            depth,
            color,
            situation,
          };
          const res = await axios.post(createProduct, data);
          if (res.status === 201) {
            toast.success("İlan başarıyla yayınlandı.", toastOptions);
            setValues({
              name: "",
              description: "",
              price: "",
              category: "Yatak",
              width: "",
              height: "",
              depth: "",
              color: "Mavi",
              situation: "Eski",
            });
            setFiles(undefined);
            setIsUploading(false);
            navigate("/");
          }
        }
      } catch (error) {}
    }
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: "800",
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const handleValidation = () => {
    const { name, description, price, width, height, depth } = values;
    if (name === "") {
      toast.error("Ürün adı boş olamaz", toastOptions);
      return false;
    }
    if (description === "") {
      toast.error("Ürün açıklaması boş olamaz", toastOptions);
      return false;
    }
    if (!files || files.length === 0) {
      toast.error("Ürün için en az 1 resim gereklidir.", toastOptions);
      return false;
    }
    if (price === "") {
      toast.error("Ürün fiyatı boş olamaz", toastOptions);
      return false;
    }
    if (width === "") {
      toast.error("Ürün genişliği boş olamaz", toastOptions);
      return false;
    }
    if (height === "") {
      toast.error("Ürün yüksekliği boş olamaz", toastOptions);
      return false;
    }
    if (depth === "") {
      toast.error("Ürün en boş olamaz", toastOptions);
      return false;
    }

    return true;
  };

  return (
    <>
      <Header />
      <div className={classes.container}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Ürün adı</label>
          <input
            value={values.name}
            onChange={handleChange}
            name="name"
            id="name"
            type="text"
            placeholder="Ürün adı"
          />
          <label htmlFor="description">Ürün Açıklaması</label>
          <textarea
            value={values.description}
            onChange={handleChange}
            name="description"
            id="description"
            type="text"
            placeholder="Ürün adı"
            cols="30"
            rows="5"
          />
          <label htmlFor="images">Resim</label>
          <input
            key={files}
            onChange={onFileChange}
            name="images"
            id="images"
            type="file"
            accept=".png,.jpeg,.jpg"
            multiple
          />
          <label htmlFor="price">Fiyat</label>
          <input
            value={values.price}
            id="price"
            name="price"
            onChange={handleChange}
            htmlFor="category"
            type="text"
            placeholder="Fiyat"
          />
          <label htmlFor="category">Kategori</label>
          <select
            value={values.category}
            onChange={handleChange}
            id="category"
            name="category"
          >
            <option>Yatak</option>
            <option>Koltuk</option>
            <option>Dolap</option>
            <option>Masa ve Sandalye</option>
            <option>Bahçe ve Balkon</option>
            <option>Beyaz Eşya</option>
            <option>Aydınlatma</option>
            <option>Mutfak</option>
            <option>Bilgisayar</option>
            <option>Telefon</option>
          </select>
          <label htmlFor="width">Genişlik</label>
          <input
            value={values.width}
            onChange={handleChange}
            id="width"
            name="width"
            type="number"
            placeholder="Genişlik"
            min="0"
          />
          <label htmlFor="height">Yükseklik</label>
          <input
            value={values.height}
            onChange={handleChange}
            id="height"
            name="height"
            type="number"
            placeholder="Yükseklik"
            min="0"
          />
          <label htmlFor="depth">En</label>
          <input
            value={values.depth}
            onChange={handleChange}
            id="depth"
            name="depth"
            type="number"
            placeholder="En"
            min="0"
          />
          <label htmlFor="color">Renk</label>
          <select
            value={values.color}
            onChange={handleChange}
            id="color"
            name="color"
          >
            <option>Mavi</option>
            <option>Kırmızı</option>
            <option>Yeşil</option>
            <option>Sarı</option>
            <option>Çok renkli</option>
          </select>
          <label htmlFor="situation">Durum</label>
          <select
            value={values.situation}
            onChange={handleChange}
            id="situation"
            name="situation"
          >
            <option>Eski</option>
            <option>Normal</option>
            <option>Yeni</option>
          </select>
          <button type="submit">
            {isUploading ? (
              <CircularProgress size="24px" color="inherit" />
            ) : (
              "İlan Oluştur"
            )}
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddProductPage;
