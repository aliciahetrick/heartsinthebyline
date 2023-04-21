import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart } from "../features/cartSlice";
import { useGetSingleProductQuery } from "../features/productsApi";

const SingleProduct = () => {
  const param = useParams().id;
  const dispatch = useDispatch();

  const {
    data: singleProduct,
    error,
    isLoading,
  } = useGetSingleProductQuery(param);

  console.log("singleProduct", singleProduct);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>An error occured</p>
      ) : (
        <>
          <h2>{singleProduct.name}</h2>
          <img
            src={singleProduct.image}
            alt={singleProduct.name}
            style={{ width: "300px" }}
          />
          <p>{singleProduct.desc}</p>
          <p>Price: ${singleProduct.price}</p>
          <button onClick={() => handleAddToCart(singleProduct)}>
            Add to Cart
          </button>
        </>
      )}
    </>
  );
};

export default SingleProduct;
