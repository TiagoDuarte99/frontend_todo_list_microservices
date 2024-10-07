// index.jsx
import React, { useState } from "react";
import { login } from "./loginService";
import "./style.css";
import Image from "../../assets/react.svg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await login({ email, password });
      // Sucesso: Armazenar o token ou redirecionar o usuário
      setError(null);
      console.log("Login bem-sucedido:", data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
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
  );
};

export default LoginPage;
