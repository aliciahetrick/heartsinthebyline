import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  console.log("auth", auth);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };

  return (
    <>
      <form onSubmit={handleRegisterSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        {/* <button>Register</button> */}
        <button>
          {auth.registerStatus === "pending" ? "Submitting" : "Register"}
        </button>
        {auth.registerStatus === "rejected" ? (
          <p>{auth.registerError} </p>
        ) : null}
      </form>
    </>
  );
};

export default Register;
