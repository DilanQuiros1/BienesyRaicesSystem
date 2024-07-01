import Margin from "./Margin";
import PropTypes from "prop-types";
import "../Styles/FrameComponent6.css";

const FrameComponent6 = ({ className = "" }) => {
  return (
    <section className={`comment-title-container-parent ${className}`}>
      <div className="comment-title-container">
        <h2 className="leave-a-comment">Dejar comentario</h2>
      </div>
      <div className="comment-form-container">
        <div className="container-frame">
          <div className="container53">
            <div className="background4" />
            <div className="background5" />
          </div>
        </div>
        <div className="comment-input-fields">
          <Margin name1="Nombre" />
          <Margin
            name1="Email"
            propFlex="1"
            propMinWidth="390"
            propWidth="100%"
          />
        </div>
      </div>
      <Margin
        name1="Escrinir comentario aquí"
        propFlex="unset"
        propMinWidth="unset"
        propWidth="100%"
      />
      <div className="container54">
        <button className="button1">
          <div className="post-comment">Enviar comentario</div>
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
