import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { PutUser } from "./editUserService";
import "./styleModalEditUser.css";

// Componente do Modal
const ModalEditUser = ({ user, show, onHide }) => {
  const [newEmail, setNewEmail] = useState("");
  const [id, setId] = useState("");

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmePassword, setShowConfirmePassword] = useState(false);
  const [active, setActive] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setId(user.id);
      setActive(user.active);
    }
  }, [user]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmePassword((prev) => !prev);
  };

  const putUser = async (id, newEmail, active) => {
    try {
      let user = {
        id,
        ...(newEmail ? { newEmail } : {}),
        ...(active !== undefined && { active }),
        ...(password ? { password } : {}),
        ...(newPassword ? { newPassword } : {}),
        ...(confirmNewPassword ? { confirmNewPassword } : {}),
      }
      console.log(user);
      const data = await PutUser(user);
      console.log(data);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Editar Utilizador
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <label>ID: {id}</label>
          </div>
          <div>
            <label>Email: {user.email}</label>
            <input 
            type="email" 
            onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password antiga:</label>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                className="password-input"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? "Ocultar" : "Mostrar"}{" "}
              </button>
            </div>
          </div>
          <div>
            <label>Nova password:</label>
            <div className="password-container">
              <input
                type={showNewPassword ? "text" : "password"}
                className="password-input"
                onChange={(e) => setNewPassword(e.target.value)}

              />
              <button
                type="button"
                className="toggle-password"
                onClick={toggleNewPasswordVisibility}
              >
                {showNewPassword ? "Ocultar" : "Mostrar"}{" "}
              </button>
            </div>
          </div>
          <div>
            <label>Confirme nova Password:</label>
            <div className="password-container">
              <input
                type={showConfirmePassword ? "text" : "password"}
                className="password-input"
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmePassword ? "Ocultar" : "Mostrar"}{" "}
              </button>
            </div>
          </div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={!active}
                onChange={() => setActive((prev) => !prev)} 
              />
              Definir como inativo
            </label>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Fechar</Button>
        <Button
          onClick={() => {
            putUser(id, newEmail, active);
          }}
        >
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalEditUser;
