import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/authSlice";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth._id) {
      navigate("/products");
    }
  }, [auth._id, navigate]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };

  return (
    <Container>
      <Title>Login</Title>
      <LoginForm onSubmit={handleRegisterSubmit}>
        <FormInput
          type="email"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <FormInput
          type="password"
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <LoginButton>
          {auth.loginStatus === "pending" ? "Submitting" : "Login"}
        </LoginButton>
        {auth.loginStatus === "rejected" ? <p>{auth.loginError} </p> : null}
      </LoginForm>
      <div>Don't have an account?</div>
      <Link
        to={`/register`}
        style={{ textDecoration: "none", color: "#795CB2" }}>
        Register
      </Link>
    </Container>
  );
};

export default Login;

const Container = styled.h2`
  color: #f578a6;
  text-align: center;
  font-size: 1em;
  font-family: "Raleway", sans-serif;
  text-transform: uppercase;
  max-width: 50%;
  margin: 0 auto;
  position: absolute;
  top: 40%;
  left: 0;
  right: 0;
`;

const Title = styled.p`
  margin-bottom: 1em;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1em;
  text-align: center;
`;

const FormInput = styled.input`
  ::placeholder {
    text-align: center;
    text-transform: uppercase;
  }
`;

const LoginButton = styled.button`
  display: flex;
  width: 100%;
  height: 40px;
  background-color: #f578a6;
  color: white;
  font-size: 15px;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  border-radius: 5px;
  border: none;
  text-align: center;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  margin-bottom: 1em;
`;
