import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { DeleteUser } from "./deleteUserService";
import "./styleModalDeleteUser.css";

// Componente do Modal
const ModalDeleteUser = ({ user, show, onHide }) => {
  const [id, setId] = useState("");

  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setId(user.id);
    }
  }, [user]);


  const deleteUser = async () => {
    try {

      console.log(user.id);
      const data = await DeleteUser(user);
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
          Eliminar Utilizador
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <label>Tem a certeza que pretende eliminar o utilizador com o id: {id}</label>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Fechar</Button>
        <Button
         variant="danger" 
          onClick={() => {
            deleteUser();
          }}
        >
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default ModalDeleteUser;
