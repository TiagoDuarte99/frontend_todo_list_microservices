// index.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "./loginService";
import "./styleLogin.css";
import Image from "../../assets/react.svg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await Login({ email, password });
      localStorage.setItem("auth_token", data.token);

      if (data.payload.id === 1) {
        navigate("/dashboard");
      } else {
        navigate("/to-do-list");
      }

      //TODO Sucesso: Armazenar o token ou redirecionar o usuário

      setError(null);
      console.log("Login bem-sucedido:", data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h1>Colocar imagem</h1>
        </div>

        <div className="col-md-6">
          <form className="formLogin" onSubmit={handleSubmit}>
            <img src={Image} alt="" />
            <h2>Login</h2>
            <div>
              <label>Email:</label>
              <br />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <br />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
