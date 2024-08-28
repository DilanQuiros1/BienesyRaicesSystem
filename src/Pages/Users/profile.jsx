import { useEffect, useState } from "react";
import "../../Styles/Users/user_profile.css"; // Custom styles
import ListaPropiedadesDinamic from "../../components/List-Propertys-dinamic";
import { useSearchParams } from "react-router-dom";
import AddExtraData from "./add-extra-data";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import FrameComponent6 from "../../components/FrameComponent6";
import Swal from "sweetalert2";
const UserProfile = ({ isManagement }) => {
  const [searchParams] = useSearchParams();
  const [correoUser, setCorreoUser] = useState();
  const [haveData, setHaveData] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  // const [is]
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState({
    ID_Usuario: "",
    Nombre: "",
    Apellidos: "",
    Correo: "",
    Telefono: "",
    Genero: "",
    Tipo: "",
    Fecha_Creacion: "2024-08-19T21:41:46.000Z",
  });
  const [extraData, setExtraData] = useState({
    ID_Usuario: "",
    IG_Profile: "",
    FaceBook_Profile: "",
    Url_Img: "",
    Country_User: "",
    City: "",
    Postal_Code: "",
  });

  const resetValues = () => {
    setExtraData((prev) => ({
      ...prev,
      Url_Img: "",
    }));
    setDataUser({
      ID_Usuario: "",
      Nombre: "",
      Apellidos: "",
      Correo: "",
      Telefono: "",
      Genero: "",
      Tipo: "",
      Fecha_Creacion: "2024-08-19T21:41:46.000Z",
    });
  };

  useEffect(() => {
    setCorreoUser(searchParams.get("Correo"));
    resetValues();
    const fetchDataUser = async () => {
      const response = await axios.get(
        `http://localhost:3000/buscar-usuario?Correo=${searchParams.get(
          "Correo"
        )}`
      );
      const data = response.data[0];
      setDataUser({
        ID_Usuario: data.ID_Usuario,
        Nombre: data.Nombre,
        Apellidos: data.Apellidos,
        Correo: data.Correo,
        Telefono: data.Telefono,
        Genero: data.Genero,
        Tipo: data.Tipo,
        Fecha_Creacion: "2024-08-19T21:41:46.000Z",
      });
      console.log(response.data);
    };

    const fetchExtraDataUser = async () => {
      const response = await axios.get(
        `http://localhost:3000/extra-data-user?Correo=${searchParams.get(
          "Correo"
        )}`
      );
      const data = response.data[0];
      if (response.length === 0) {
        console.log("no data");
      }
      setExtraData({
        ID_Usuario: data.ID_Usuario,
        IG_Profile: data.IG_Profile,
        FaceBook_Profile: data.FaceBook_Profile,
        Url_Img: data.Url_Img,
        Country_User: data.Country_User,
        City: data.City,
        Postal_Code: data.Postal_Code,
      });
      setHaveData(true);
      console.log("data: ", response.data);
    };

    fetchDataUser();
    fetchExtraDataUser();
  }, [searchParams]);

  const deleteAccount = async (id) => {
    Swal.fire({
      title: "Estas seguro de eliminar la cuenta ?",
      text: "No podras restablecerla!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:3000/delete-user-account?id=${id}`
          );
          if (response.status == 200) {
            Swal.fire({
              title: "Cuenta Eliminada!",
              text: "Se elimino de forma correcta",
              icon: "success",
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  const editMainDataUser = async () => {
    try {
      const { Nombre, Apellidos, Telefono, Genero, Correo } = dataUser;
      const sendApiValues = { Nombre, Apellidos, Telefono, Genero, Correo };
      const response = await axios.put(
        `http://localhost:3000/usuarios?Correo=${searchParams.get("Correo")}`,
        sendApiValues
      );

      Swal.fire("Datos editados de forma correcta!");
    } catch (error) {
      Swal.fire("Ha ocurrido un error!");
    }
  };

  const handleChangeDataUser = (e) => {
    const { name, value } = e.target;
    setDataUser((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const toggleEdit = () => {
    setIsEditable((prevState) => !prevState);
  };
  const goHome = () => {
    window.history.back();
  };
  return (
    <div className="container-fluid profile-container" id="profile-section">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 sidebar bg-white">
          <div className="text-center py-4">
            <img
              src={
                extraData.Url_Img
                  ? extraData.Url_Img
                  : "https://res.cloudinary.com/djxwusqnb/image/upload/v1724334577/sqiuhcqvtz1evqdkm4s8.png"
              }
              alt="Nathaniel Poole"
              className="rounded-circle mb-3 profile-pic"
            />
            <h4 className="mb-1">{dataUser.Nombre}</h4>
            <p className="text-muted">{dataUser.Apellidos}</p>
            <div style={{ marginLeft: "70px", marginTop: "70px" }}>
              <section style={{ display: "flex", gap: "10px" }}>
                <i className="bi bi-whatsapp" style={{ color: "green" }}></i>
                <p>{dataUser.Telefono}</p>
              </section>
              <section style={{ display: "flex", gap: "10px" }}>
                <i
                  className="bi bi-envelope-at-fill"
                  style={{ color: "#CCC" }}
                ></i>
                <p>{dataUser.Correo}</p>
              </section>
              <section style={{ display: "flex", gap: "10px" }}>
                <i
                  className="bi bi-gender-ambiguous"
                  style={{ color: "blue" }}
                ></i>
                <p>{dataUser.Genero}</p>
              </section>
              <section style={{ display: "flex", gap: "10px" }}>
                <i className="bi bi-passport"></i>
                <p>{dataUser.ID_Usuario}</p>
              </section>
            </div>
            <button
              className="btn btn-outline-primary mt-4"
              onClick={(e) => {
                const subject = encodeURIComponent("RealState mensaje");
                if (isManagement) {
                  window.location.href = `mailto:${dataUser.Correo}?subject=${subject}`;
                }
              }}
            >
              {isManagement ? "Contactar Usuario" : "Quiero Vender Propiedades"}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-9 main-content">
          <div className="cover-photo mb-4"></div>
          <div className="bg-white p-4 rounded shadow-sm">
            <section
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p
                className="border-bottom pb-3 mb-4"
                style={{ color: "#495057", cursor: "pointer" }}
                onClick={toggleEdit}
              >
                {!isEditable ? " Editar Perfil" : "Cancelar"}
              </p>
              <p
                className="border-bottom pb-3 mb-4"
                style={{ color: "#495057", cursor: "pointer" }}
                onClick={() => {
                  if (dataUser.ID_Usuario) {
                    deleteAccount(dataUser.ID_Usuario);
                    console.log(dataUser.ID_Usuario);
                  } else {
                    Swal.fire("No se selecciono ningun ID");
                  }
                }}
              >
                Eliminar cuenta
              </p>
              <p
                className="border-bottom pb-3 mb-4"
                style={{ color: "#495057", cursor: "pointer" }}
                onClick={() => {
                  navigate({ pathname: "/" });
                }}
              >
                Cerrar Sesion
              </p>

              <a
                href="#soporte"
                className="border-bottom pb-3 mb-4"
                style={{ textDecoration: "none", color: "rgb(73, 80, 87)" }}
              >
                Soporte
              </a>
              <p
                className="border-bottom pb-3 mb-4"
                style={{ color: "#495057", cursor: "pointer" }}
                onClick={goHome}
              >
                Salir
              </p>
            </section>
            <form>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Nombre</label>
                  <input
                    style={
                      isEditable
                        ? { border: "1px solid #CCC" }
                        : { border: "none", background: "rgb(242 245 247)" }
                    }
                    disabled={!isEditable}
                    type="text"
                    className="form-control"
                    value={dataUser.Nombre}
                    name="Nombre"
                    onChange={handleChangeDataUser}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label>Apellidos</label>
                  <input
                    style={
                      isEditable
                        ? { border: "1px solid #CCC" }
                        : { border: "none", background: "rgb(242 245 247)" }
                    }
                    disabled={!isEditable}
                    type="text"
                    className="form-control"
                    value={dataUser.Apellidos}
                    name="Apellidos"
                    onChange={handleChangeDataUser}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label>Numero de telefono</label>
                  <input
                    type="text"
                    style={
                      isEditable
                        ? { border: "1px solid #CCC" }
                        : { border: "none", background: "rgb(242 245 247)" }
                    }
                    disabled={!isEditable}
                    className="form-control"
                    value={dataUser.Telefono}
                    name="Telefono"
                    onChange={handleChangeDataUser}
                  />
                </div>

                <div className="form-group col-md-6">
                  <label>Correo Electronico</label>
                  <input
                    style={
                      isEditable
                        ? { border: "1px solid #CCC" }
                        : { border: "none", background: "rgb(242 245 247)" }
                    }
                    disabled={!isEditable}
                    type="email"
                    className="form-control"
                    value={dataUser.Correo}
                    name="Correo"
                    onChange={handleChangeDataUser}
                  />
                </div>
                <section style={{ margin: "10px 0 10px 0" }}>
                  {isEditable == true && (
                    <button
                      type="button"
                      className={`btn mb-3 ${
                        isEditable ? "btn-warning" : "btn-dark"
                      }`}
                      onClick={editMainDataUser}
                    >
                      Editar Datos principales de mi perfil
                    </button>
                  )}
                  <p style={{ fontSize: "23px", color: "#28a745" }}>
                    Informacion adicional del usuario {dataUser.Tipo}
                  </p>
                </section>
              </div>
              {dataUser.Tipo == "Cliente" ? (
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Ciudad</label>
                    <input
                      type="text"
                      style={{ border: "none", background: "rgb(242 245 247)" }}
                      disabled="false"
                      className="form-control"
                      value={extraData.City}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Codigo Posta Ubicacion</label>
                    <input
                      type="text"
                      style={{ border: "none", background: "rgb(242 245 247)" }}
                      disabled="false"
                      className="form-control"
                      value={extraData.Postal_Code}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Pais</label>
                    <input
                      type="text"
                      style={{ border: "none", background: "rgb(242 245 247)" }}
                      disabled="false"
                      className="form-control"
                      value={extraData.Country_User}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Perfil de FaceBook</label>
                    <input
                      type="text"
                      style={{ border: "none", background: "rgb(242 245 247)" }}
                      disabled="false"
                      className="form-control"
                      value={extraData.FaceBook_Profile}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Perfil de Instagram</label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ border: "none", background: "rgb(242 245 247)" }}
                      disabled="false"
                      value={extraData.IG_Profile}
                    />
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    background: "#dee2e6",
                    height: "100px",
                    padding: "30px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "1.3em",
                      fontWeight: "bold",
                      color: "#17a2b8cc",
                    }}
                  >
                    No hay informacion para mostrar{" "}
                    <i className="bi bi-shop"></i>
                  </p>
                </div>
              )}

              {(!haveData || isEditable) && (
                <button
                  style={{ marginTop: "10px" }}
                  type="button"
                  className={`btn ${isEditable ? "btn-warning" : "btn-dark"}`}
                  onClick={() => setModalShow(true)}
                >
                  {isEditable
                    ? "Editar Datos extras de al perfil"
                    : "Agregar más datos a al perfil"}
                </button>
              )}

              {/* {!isManagement && extraData.City.length === 0 && <p>AA</p>} */}
            </form>
          </div>
        </div>
      </div>
      {!isManagement && (
        <div>
          {correoUser && (
            <ListaPropiedadesDinamic
              nameApi={`http://localhost:3000/favorites-properties?Correo=${correoUser}`}
              isFavotites={true}
              isviewSeller={false}
            />
          )}
        </div>
      )}
      <section>
        <AddExtraData
          show={modalShow}
          onHide={() => setModalShow(false)}
          isEditing={isEditable}
        />
      </section>
      {!isManagement && (
        <section
          id="soporte"
          style={{
            padding: "30px",
            backgroundImage: "linear-gradient(180deg, #f8f9fa00, #495057)",
          }}
        >
          <FrameComponent6 />
        </section>
      )}
    </div>
  );
};

UserProfile.propTypes = {
  isManagement: PropTypes.string,
};

export default UserProfile;
