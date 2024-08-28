import PropTypes from "prop-types";
import axios from "axios";
import "../Styles/FrameComponent6.css";
import { useState } from "react";
import Swal from "sweetalert2";
const FrameComponent6 = ({ className = "" }) => {
  const [formValues, setFormValues] = useState({
    to: "quiroschinchilladilan@gmail.com",
    subject: "",
    name: "",
    message: "",
  });

  const handleChance = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const sendEmail = async () => {
    try {
      if (
        !formValues.to ||
        !formValues.subject ||
        !formValues.name ||
        !formValues.message
      ) {
        console.log("");
        Swal.fire("Completa todos los campos para continuar !!");
      } else {
        console.log(formValues);
        const response = await axios.post(
          "http://localhost:3000/send-email",
          formValues
        );
        if (response.status === 200) {
          Swal.fire("Correo Enviado con exito, pronto te responderemos !!");
        }
        console.log(response);
      }
    } catch (error) {
      Swal.fire("Ha ocurrido un error!!");
    }
  };

  return (
    <section className={`comment-title-container-parent ${className}`}>
      <div className="comment-title-container">
        <h2 className="leave-a-comment">Comunicate con soporte</h2>
      </div>
      <div className="comment-form-container">
        <div className="container-frame">
          <div className="container53">
            <div className="background4" />
            <div className="background5" />
          </div>
        </div>
        <div
          className="comment-input-fields"
          style={{ display: "flex", justifyContent: "center", gap: "10px" }}
        >
          <input
            placeholder="Ingresa el asunto del correo electronico"
            name="subject"
            onChange={handleChance}
            style={{ width: "48%", padding: "15px", border: "1px solid #CCC" }}
          />
          <input
            type="number"
            name="name"
            onChange={handleChance}
            placeholder="Ingresa telefono celular de contacto"
            style={{ width: "48%", padding: "15px", border: "1px solid #CCC" }}
          />
        </div>
      </div>
      <textarea
        placeholder="Mensage"
        name="message"
        onChange={handleChance}
        rows={1}
        style={{
          width: "96.8%",
          margin: "10px 0 10px 0",
          position: "relative",
          padding: "15px",
          border: "1px solid #CCC",
          marginLeft: "24px",
          fontSize: "17px",
        }}
      />
      <div className="container54">
        <button className="button1" onClick={sendEmail}>
          <div className="post-comment">Enviar Mensaje</div>
          <div className="overlay1">
            <div className="container55">
              <img className="icon21" alt="" src="/icon-23.svg" />
            </div>
          </div>
        </button>
      </div>
    </section>
  );
};

FrameComponent6.propTypes = {
  className: PropTypes.string,
};

export default FrameComponent6;
