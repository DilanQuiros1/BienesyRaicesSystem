import "./Styles/management.css"; // Archivo CSS para estilos personalizados
import Dashboard from "./dasboard";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import UserProfile from "../../Users/profile";
import UserCard from "./cardUsers";
import axios from "axios";
import FrameComponent6 from "../../../components/FrameComponent6";
import ListaPropiedadesDinamic from "../../../components/List-Propertys-dinamic";
const Management = () => {
  const [show, setShow] = useState(false);
  const [dataUser, setDataUser] = useState([]);

  const getUsersCard = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/usuarios-card-management"
      );
      if (response.data) {
        setDataUser(response.data);
      }
    } catch (error) {
      console.error("Error al obtener el contador:", error);
    }
  };

  useEffect(() => {
    getUsersCard();
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div>
      <header className="admin-header">
        {/* Imagen de fondo */}
        <div className="header-background">
          <div
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Contenido del Header */}
            <div className="header-content">
              <h1>Bienvenido al Panel de Administración de RealState</h1>
              <p>
                Gestiona tus propiedades, revisa consultas y optimiza tus ventas
              </p>

              {/* Links de navegación */}
              <nav className="header-nav">
                <ul>
                  <li>
                    <a href="#dashboard-section">Dashboard</a>
                  </li>
                  <li>
                    <a href="#properties">Propiedades</a>
                  </li>
                  <li>
                    <a href="#ContainerListaProvincias">Propieades</a>
                  </li>
                  <li>
                    <a href="#profile-section">Perfil</a>
                  </li>
                  <li>
                    <a href="/">Salir</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <section style={{ marginTop: "50px" }}>
        <Dashboard />
      </section>
      <section>
        <Button
          variant="dark"
          onClick={handleShow}
          style={{ marginLeft: "80%", marginTop: "50px" }}
        >
          Mostrar Lista de Usuarios
        </Button>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Usuarios del Sistema</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {dataUser &&
              dataUser.map((data, index) => (
                <UserCard
                  key={index}
                  name={data.Nombre}
                  Correo={data.Correo}
                  imageUrl={data.Url_Img}
                />
              ))}
          </Offcanvas.Body>
        </Offcanvas>
      </section>
      <section style={{ marginTop: "50px" }}>
        <UserProfile isManagement={true} />
      </section>
      <section className="mt-5">
        <ListaPropiedadesDinamic
          nameApi={"http://localhost:3000/propiedades-principal"}
          isviewSeller={true}
          isLooking={true}
        />
      </section>
      <section
        id="soporte"
        style={{
          padding: "30px",
          backgroundImage: "linear-gradient(180deg, #f8f9fa00, #495057)",
        }}
      >
        <FrameComponent6 />
      </section>
    </div>
  );
};

export default Management;
