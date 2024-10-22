import React, { useState, useEffect } from "react";
import { Users } from "./usersServices";
import ModalEditUser from "../modalEditUser"

import "./stylesUsers.css";

const UsersPage = () => {
  const [page, countPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isDisabledDecrement, setIsDisabledDecrement] = useState(false);
  const [isDisabledIncrement, setIsDisabledIncrement] = useState(false);

  const [modalShow, setModalShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setModalShow(true);
  };

  const getUserPage = async (page) => {
    try {
      const data = await Users(page);
      setTotalCount(data.totalCount);
      const pagesTotal = Math.ceil(data.totalCount / 12);
      setTotalPages(pagesTotal);

      setUsers(data.users);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    getUserPage(page);
    setIsDisabledDecrement(page === 1);
    setIsDisabledIncrement(page === totalPages);
  }, [page]);

  const handleIncrement = () => {
    if (page) countPage((prevPage) => prevPage + 1);
  };
  const handleDecrement = () => {
    if (page === 1) {
      setIsDisabledDecrement(true);
    } else {
      countPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <h1>Users Page {page}</h1>

      <div className="usersList">
        {users.map((user, index) => (
          <div
            key={user.id}
            className={`userCard ${index % 2 === 0 ? "trWhite" : "trGrey"}`}
          >
            <div className="row">
              <div className="col-12 col-md-6 listUser">
                <p>ID: {user.id}</p>
                <p>Email: {user.email}</p>
                <p>Estado: {user.active ? "Ativo" : "Bloqueado"}</p>
              </div>
              <div className="col-12 col-md-6 buttonsUser">
                <button
                  className="buttonEdit"
                  onClick={() => handleEditClick(user)}
                >
                  Editar
                </button>
                <button className="buttonDelete">Eliminar</button>
              </div>
            </div>
          </div>
        ))}

        {selectedUser && (
          <ModalEditUser
            user={selectedUser}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        )}
      </div>

      {error && <p className="error-message">{error}</p>}
      <div className="paginator">
        <p>
          Total Utilizadores - {totalCount} / Total Paginas {totalPages}
        </p>
        <div>
          <button onClick={handleDecrement} disabled={isDisabledDecrement}>
            Previous Page
          </button>
          <button onClick={handleIncrement} disabled={isDisabledIncrement}>
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};
export default UsersPage;
