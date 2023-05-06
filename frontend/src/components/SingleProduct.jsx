import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, getTotals } from "../features/cartSlice";
// import { useGetSingleProductQuery } from "../features/productsApi";
import { fetchSingleProductAsync } from "../features/productsSlice";

const SingleProduct = () => {
  const param = useParams().id;
  console.log("param", param);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { singleProduct, singleProductStatus } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchSingleProductAsync(param));
  }, [dispatch, param]);

  console.log("singleProduct", singleProduct);

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <>
      {singleProductStatus === "success" ? (
        <>
          <h2>{singleProduct.name}</h2>
          <img
            src={singleProduct.image.url}
            alt={singleProduct.name}
            style={{ width: "300px" }}
          />
          <p>{singleProduct.desc}</p>
          <p>Price: ${singleProduct.price}</p>
          {singleProduct.stock === 0 ? (
            <button disabled>Sold Out </button>
          ) : (
            <button onClick={() => handleAddToCart(singleProduct)}>
              Add to Cart
            </button>
          )}
        </>
      ) : singleProductStatus === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...</p>
      )}
    </>
  );
};

export default SingleProduct;
