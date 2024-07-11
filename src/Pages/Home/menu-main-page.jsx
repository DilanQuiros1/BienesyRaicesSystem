import RegisterClientSeller from "../login-client-seller/register-client-seller";
import LoginClientSeller from "../login-client-seller/login-client-seller";
import { useState } from "react";

const NavItems = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowLogin, setModalShowLogin] = useState(false);
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <a href="#home">Real State</a>
        </li>
        <div className="nav-container-item">
          <div className="nav-item">
            <a href="#ventas">Ventas</a>
          </div>
          <div className="nav-item">
            <a href="#soporte">Soporte</a>
          </div>
          <div className="nav-item">
            {/* <a href="#contact">Quiero Vender </a> */}
            <a href="#" onClick={() => setModalShow(true)}>
              Registrarme
            </a>
            <RegisterClientSeller
              show={modalShow}
              onHide={() => setModalShow(false)}
              isEdit={false}
            />
          </div>
          <div className="nav-item">
            {/* <a href="#contact">Quiero Vender </a> */}
            <a href="#" onClick={() => setModalShowLogin(true)}>
              Iniciar Sesion
            </a>
            <LoginClientSeller
              show={modalShowLogin}
              onHide={() => setModalShowLogin(false)}
            />
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default NavItems;
