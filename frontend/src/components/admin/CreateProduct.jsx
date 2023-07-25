import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProductAsync } from "../../features/productsSlice";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productImage, setProductImage] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [artist, setArtist] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    transformFile(file);
  };

  const transformFile = (file) => {
    // gets a base64 url instead of an object
    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      // once the file is read, set the state
      reader.onloadend = () => {
        setProductImage(reader.result);
      };
    } else {
      // resets state when opening the modal but no file is selected
      setProductImage("");
    }
  };

  const handleCreateProductSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createProductAsync({
        name,
        url,
        desc,
        type,
        artist,
        price,
        stock,
        image: productImage,
      })
    );
    navigate("/products");
  };

  return (
    <>
      <form onSubmit={handleCreateProductSubmit}>
        <h3>Create a product</h3>
        <input
          type="file"
          accept="image/"
          onChange={handleProductImageUpload}
          required
        />
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL"
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <input
          type="textarea"
          placeholder="Description"
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <p>Type:</p>
        <select name="type" onChange={(e) => setType(e.target.value)} required>
          <option value="">Select Product Type</option>
          <option value="pin">Pin</option>
          <option value="sticker">Sticker</option>
        </select>
        <p>Artist:</p>
        <select
          name="artist"
          onChange={(e) => setArtist(e.target.value)}
          required>
          <option value="">Select Artist</option>
          <option value="taylor">Taylor</option>
          <option value="billie">Billie</option>
          <option value="olivia">Olivia</option>
        </select>
        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Stock"
          onChange={(e) => setStock(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {productImage ? (
          <>
            <img src={productImage} alt="" />
          </>
        ) : (
          <p>Image preview will appear here</p>
        )}
      </div>
    </>
  );
};

export default CreateProduct;
