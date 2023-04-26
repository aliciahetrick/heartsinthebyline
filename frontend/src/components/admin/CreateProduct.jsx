import { useState } from "react";
import { useDispatch } from "react-redux";
import { createProductAsync } from "../../features/productsSlice";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [productImage, setProductImage] = useState("");
  const [name, setName] = useState("");
  //   const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");

  //   console.log("price", typeof price);

  //   console.log(productImage);

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
        desc,
        price,
        // price: Number(price),
        image: productImage,
      })
    );
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
        {/* <select onChange={(e) => setType(e.target.value)} required>
          <option value="">Select Product Type</option>
          <option value="pin">Pin</option>
          <option value="sticker">Sticker</option>
        </select> */}
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
      <div>
        {productImage ? (
          <>
            <img src={productImage} alt="product image" />
          </>
        ) : (
          <p>Image preview will appear here</p>
        )}
      </div>
    </>
  );
};

export default CreateProduct;
