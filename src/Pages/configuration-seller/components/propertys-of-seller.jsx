import "../../../Styles/MainPages/ListaPrivincias.css";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import ListaPropiedadesDimamic from "../../../components/List-Propertys-dinamic";

function ListaPropiedadesOfSeller({ mailSeller }) {
  return (
    <section className="mt-5">
      <div className="ms-5">
        <h1 style={{ color: "#198754d6", fontFamily: "Raleway" }}>
          Con RealState.co.cr podras manejar el inventario de tus propiedades
        </h1>
        <p style={{ fontFamily: "bootstrap-icons" }}>
          Esperamos que tus propiedades inmobiliarias más sean de gran
          relevancia en RealState.co.cr!
        </p>
      </div>
      <Row className="p-5">
        <ListaPropiedadesDimamic
          nameApi={`propiedades-principal-vendedores?Correo=${mailSeller}`}
        />
      </Row>
    </section>
  );
}
ListaPropiedadesOfSeller.propTypes = {
  mailSeller: PropTypes.string,
};
export default ListaPropiedadesOfSeller;
