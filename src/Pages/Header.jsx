import "../Styles/Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <a href="#home">Real State</a>
          </li>
          <li className="nav-item" id="about">
            <a href="#about">Ventas</a>
          </li>
          <li className="nav-item">
            <a href="#services">Soporte</a>
          </li>
          <li className="nav-item">
            <a href="#contact">Quiero Vender </a>
          </li>
        </ul>
      </nav>
      <div className="headerFondo">
        <div className="her-content">
          <h1 className="her-title">Welcome to Our Website</h1>
          <h2 className="her-subtitle">We are glad to have you here</h2>
          <input
            type="text"
            className="search-bar"
            placeholder="Busqueda por Ubicacion"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
