import "../../Styles/MainPages/characteristics.css"; // Archivo CSS para los estilos

const CharacteristicSystem = () => {
  return (
    <div className="promo-container">
      <div className="promo-image">
        <img
          src="https://res.cloudinary.com/djxwusqnb/image/upload/v1720466871/llrpvpz7aco8hbhj6oid.jpg"
          alt="Promo"
        />
        <button className="promo-button">
          <span className="promo-play-icon">▶</span>
        </button>
        <p className="promo-caption">
          Explora cientos de propiedades sin salir de casa.
        </p>
      </div>
      <div className="promo-text">
        <h2>Porque Comprar con RealState.com</h2>
        <div className="promo-text-item">
          <span className="promo-icon">🏠</span>
          <p>
            <strong>
              La mejor experiencia para visitar, buscar & comprar.
            </strong>
            <br />
            Controla tus propiedades y realiza tus offertas desde casa.
          </p>
        </div>
        <div className="promo-text-item">
          <span className="promo-icon">📱</span>
          <p>
            <strong>
              Compra desde donde quiera que estes. Te guiaremos hacia tu compra.
            </strong>
            <br />
            Registrate y guarda tus propiedades preferidas. Tendras un acceso
            rapido cuando quieras, desde la comodidad de un solo click.
          </p>
        </div>
        <div className="promo-text-item">
          <span className="promo-icon">🚶</span>
          <p>
            <strong>Weve done the walkthrough, so you dont have to.</strong>
            <br />
            Narrow down your search from the comfort of your own home with our
            video tours of hundreds of projects and their units.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacteristicSystem;
