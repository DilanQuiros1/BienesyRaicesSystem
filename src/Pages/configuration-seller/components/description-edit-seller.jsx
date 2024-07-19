import "../Styles-configuration-seller/description-edit-seller.css";

const DescriptionEditSeller = () => {
  return (
    <div className="ad-container">
      <div className="ad-text">
        <h1 className="ad-header">Edita tu propiedad con FazWaz.co.cr</h1>
        <p className="ad-subheader">
          Obtengamos la información de su propiedad para que pueda publicarla.
        </p>
        <div className="ad-step">
          <h3 className="ad-step-header">Nesecitas ayuda ?</h3>
          <p className="ad-step-description">Proporcionar lo básico</p>
          <p className="ad-step-description">
            Comunicate con soporte, pronto te contactaremos para ayudarte en lo
            que nesecitas
          </p>
          <a href="#soporte" className="ad-button">
            Comunicate con soporte
          </a>
        </div>
        <div className="ad-step">
          <h3 className="ad-step-header">Calidad</h3>
          <p className="ad-step-description">Haga que su anuncio destaque</p>
          <p className="ad-step-description">
            Proporcine detalles de su propiedad relavantes para los clientes de
            RealState.com
          </p>
        </div>
        <div className="ad-step">
          <h3 className="ad-step-header">Seguridad</h3>
          <p className="ad-step-description">
            Asegurate de guardar los datos que has decidido editar
          </p>
          <p className="ad-step-description">
            Estamos seguros que tu propiedad sera de gran relevancia en nuestro
            sistema, muchos exitos en tu venta!!
          </p>
        </div>
      </div>
      <div className="ad-image">
        <img
          src="https://res.cloudinary.com/djxwusqnb/image/upload/v1721243917/nnv8pkjs7bmqbjgq1vni.jpg"
          alt="Family moving in"
        />
      </div>
    </div>
  );
};

export default DescriptionEditSeller;
