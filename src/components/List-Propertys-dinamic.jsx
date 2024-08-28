import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Proptypes from "prop-types";
import { Pagination } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CharacteristicSystem from "../Pages/MainPage/characteristics";
import Swal from "sweetalert2";
const ListaPropiedadesDinamic = ({
  nameApi,
  isviewSeller,
  correoSeller,
  onSearAll,
  isLooking,
  isFavotites,
}) => {
  const [propiedades, setPropiedades] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(8);

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = propiedades.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const searchAllProperties = () => {
    onSearAll();
  };

  const deleteProperty = async (id) => {
    console.log(id);
    Swal.fire({
      title: "Estas seguro ?",
      text: "No podras revertir los cambios realizados",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",

      confirmButtonText: "Si, Eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:3000/delete-property-seller?id=${id}`
          );
          if (response.status == 200) {
            Swal.fire({
              title: "Propiedad Eliminada!",
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

  const addPropertyFavoriteToUser = async (idUser, IdProperty) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/favorites-properties",
        {
          ID_Usuario: idUser,
          ID_Propiedad: IdProperty,
        }
      );
      Swal.fire("Se agrego a tu lista de propiedades favoritas");
    } catch (error) {
      if (error.response.status === 400) {
        Swal.fire("Usuario no registrado en el sistema");
      } else if (error.response.status === 410) {
        Swal.fire("Esta propiedad ya existe en tus favoritas");
      } else {
        Swal.fire("Error al agregar propiedad");
      }
    }
  };

  const viewProperty = (id) => {
    navigate({
      pathname: "/MainProperty",
      search: `?Id_Property=${encodeURIComponent(id)}`,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch propiedades
        const propiedadesResponse = await axios.get(nameApi);

        if (
          (propiedadesResponse.status === 200 &&
            propiedadesResponse.data.length > 0) ||
          propiedadesResponse.status === 205
        ) {
          const propiedadesData = propiedadesResponse.data;

          // Fetch imagenes
          const imagenesResponse = await axios.get(
            "http://localhost:3000/Imagenes"
          );

          const imagenesData = imagenesResponse.data;

          // Combine propiedades and imagenes
          const propiedadesConImagenes = propiedadesData.map((propiedad) => {
            const imagenes = imagenesData.filter(
              (imagen) => imagen.ID_Propiedad === propiedad.ID_Propiedad
            );
            return { ...propiedad, imagenes };
          });

          if (propiedadesResponse.status === 205) {
            console.log("Good");
          }

          if (
            isLooking &&
            nameApi !== "http://localhost:3000/propiedades-principal"
          ) {
            const showProps = document.getElementById("ventas");
            showProps.scrollIntoView({ behavior: "smooth" });
          }

          setPropiedades(propiedadesConImagenes);
        } else {
          console.log("");
        }
      } catch (error) {
        if (error.response && error.response.status == 404) {
          console.log("No hay coincidencias");
        } else {
          console.error(error);
        }
      }
    };

    fetchData();
  }, [nameApi, searchParams, isLooking]);

  const navigatePropertyEdit = (idPrpertySeller) => {
    navigate({
      pathname: "/EditPropertySeller",
      search: `?Correo=${encodeURIComponent(
        correoSeller
      )}&IdProperty=${encodeURIComponent(idPrpertySeller)}`,
    });
  };

  const deleteFavorite = async (idUsuario, idPropiedad) => {
    Swal.fire({
      title: "Estas seguro de eliminarla de favoritas?",
      text: "No podras revertir los cambios realizados",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",

      confirmButtonText: "Si, Eliminar!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:3000/favorites-properties?ID_Usuario=${idUsuario}&ID_Propiedad=${idPropiedad}`
          );
          if (response.status == 200) {
            Swal.fire({
              title: " Se elimino de favoritas!",
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

  const addFavorites = async (id) => {
    console.log("id: ", id);
    const { value: ipAddress } = await Swal.fire({
      title: "Ingrese su ID de Usuario",
      input: "text",
      inputLabel: "Debes tener una cuenta creada!!",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Tienes que agregar tu ID!";
        }
      },
    });
    if (ipAddress) {
      addPropertyFavoriteToUser(ipAddress, id);
    }
  };

  return (
    <section className="mt-3 mb-4" id="ContainerListaProvincias">
      <div className="ms-5 mt-5 mb-5" id="ContainerTextInitial">
        <h1 style={{ fontFamily: "Yantramanav", color: "#495057" }}>
          Propiedades e Inmuebles interesantes de RealState.co.cr en Costa Rica
        </h1>
        <p style={{ fontFamily: "bootstrap-icons" }}>
          Conocemos bien nuestro catálogo. ¡Eche un vistazo a los anuncios de
          las propiedades inmobiliarias más importantes de RealState.co.cr!
        </p>
      </div>
      {!isviewSeller && (
        <section id="ContainerCharacteristics">
          <CharacteristicSystem />
        </section>
      )}
      {!isviewSeller && (
        <section id="ventas">
          <Button variant="dark" className="ms-5" onClick={searchAllProperties}>
            Ver Todas las Propiedades
          </Button>
        </section>
      )}
      <Row className="p-5">
        {currentProperties.map((propiedad) => (
          <Col
            style={{ height: "500px" }}
            key={propiedad.ID_Propiedad}
            md={2}
            lg={3}
            className="mb-4"
          >
            <Card>
              <Card.Img
                style={{ height: "230px" }}
                variant="top"
                src={
                  propiedad.imagenes.length > 0
                    ? propiedad.imagenes[0].Url_img
                    : "default.jpg"
                }
              />
              <Card.Body>
                <div className="d-flex">
                  <Card.Title>$ {propiedad.Precio}</Card.Title>
                  <div className="icon-liked">
                    {/* <i className="bi bi-heart"></i> */}
                    <i
                      className="bi bi-heart-fill"
                      style={{
                        color: `${isFavotites ? "red" : "black"}`,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        if (isFavotites) {
                          console.log("favorite:", propiedad.ID_Usuario);
                          if (propiedad.ID_Propiedad && propiedad.ID_Usuario) {
                            deleteFavorite(
                              propiedad.ID_Usuario,
                              propiedad.ID_Propiedad
                            );
                          }
                        } else {
                          addFavorites(propiedad.ID_Propiedad);
                        }
                      }}
                    ></i>
                  </div>
                </div>

                <Card.Text>
                  <section className="d-flex mb-2">
                    <div
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginRight: "5px",
                        maxWidth: "150px", // Ajusta el valor según el diseño
                      }}
                    >
                      <i
                        className="bi bi-house-fill"
                        style={{ marginRight: "5px" }}
                      ></i>
                      {propiedad.Nombre}
                    </div>
                    <br />
                    <div
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginRight: "5px",
                      }}
                    >
                      <i
                        className="bi bi-arrows-fullscreen ms-4"
                        style={{ marginRight: "5px" }}
                      ></i>
                      {propiedad.Area_Lote} m²
                    </div>
                    <br />
                  </section>
                  <section className="d-flex">
                    <i className="bi bi-droplet-fill"></i> {propiedad.Num_Banos}{" "}
                    Baños
                    <br />
                    <i
                      className="bi bi-door-open-fill ms-4"
                      style={{ marginRight: "7px" }}
                    ></i>{" "}
                    {propiedad.Num_Habitaciones} Dormitorios
                    <br />
                  </section>
                  <div
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <i className="bi bi-geo-alt-fill"></i> {propiedad.Ciudad},{" "}
                    {propiedad.Provincia}, {propiedad.Pais}
                  </div>
                </Card.Text>

                <section style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    variant="dark"
                    style={{ width: "100px" }}
                    onClick={() => {
                      viewProperty(propiedad.ID_Propiedad);
                    }}
                  >
                    Ver
                  </Button>
                  {isviewSeller && (
                    <Button
                      variant="warning"
                      className="ms-2"
                      onClick={() => {
                        navigatePropertyEdit(propiedad.ID_Propiedad);
                      }}
                      style={{ width: "100px" }}
                    >
                      Editar
                    </Button>
                  )}
                  {isviewSeller && (
                    <div
                      style={{ marginLeft: "10%" }}
                      onClick={() => deleteProperty(propiedad.ID_Propiedad)}
                    >
                      <i className="bi bi-trash3-fill"></i>
                    </div>
                  )}
                </section>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination className="justify-content-center mt-4">
        {[...Array(Math.ceil(propiedades.length / propertiesPerPage))].map(
          (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          )
        )}
      </Pagination>
    </section>
  );
};

ListaPropiedadesDinamic.propTypes = {
  nameApi: Proptypes.string.isRequired,
  isviewSeller: Proptypes.bool.isRequired,
  correoSeller: Proptypes.string,
  onSearAll: Proptypes.func,
  isLooking: Proptypes.bool,
  isFavotites: Proptypes.bool,
};

export default ListaPropiedadesDinamic;
