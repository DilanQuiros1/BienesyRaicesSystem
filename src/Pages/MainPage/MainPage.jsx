import "../../Styles/MainPages/ListaPrivincias.css";
import Causosel from "../../components/Caurosels";
import FrameComponent6 from "../../components/FrameComponent6";
import { useSearchParams } from "react-router-dom";
import ListaPropiedadesDinamic from "../../components/List-Propertys-dinamic";
import { useEffect, useState } from "react";
const MainPropetys = () => {
  const [searchParams] = useSearchParams();

  const api = "http://localhost:3000";
  useSearchParams();
  const [valueNameApi, SetvalueNameApi] = useState(
    `${api}/propiedades-principal`
  );

  const handleSearch = () => {
    SetvalueNameApi(`${api}/propiedades-principal`);
  };

  useEffect(() => {
    const getValueToLook = `${api}/buscar-propiedad?search=${searchParams.get(
      "look"
    )}`;
    console.log("New API URL: ", getValueToLook);
    SetvalueNameApi(getValueToLook);
  }, [searchParams]);

  const searchByProvince = (event) => {
    console.log("looking: ", event.currentTarget.getAttribute("data-province"));
    SetvalueNameApi(
      `${api}/buscar-propiedad?search=${event.currentTarget.getAttribute(
        "data-province"
      )}`
    );
  };

  return (
    <div>
      <div id="ContainerMain">
        <main>
          <ul id="ListaProvincias">
            <div
              className="Container-provincia"
              id="Container-Sj"
              data-province="San Jose"
              onClick={searchByProvince}
            >
              <div className="fondo-img">
                <p>Busco Propiedad en:</p>
                <p>San Jose</p>
              </div>
            </div>
            <div
              className="Container-provincia"
              data-province="Heredia"
              id="Container-Heredia"
              onClick={searchByProvince}
            >
              <div className="fondo-img">
                <p>Busco Propiedad en:</p>
                <p>Heredia</p>
              </div>
            </div>
            <div
              className="Container-provincia"
              data-province="Perez Zeledon"
              id="Container-pz"
              onClick={searchByProvince}
            >
              <div className="fondo-img">
                <p>Busco Propiedad en:</p>
                <p>Perez Zeledon</p>
              </div>
            </div>
            <div
              className="Container-provincia"
              data-province="Cartago"
              onClick={searchByProvince}
              id="Container-cartago"
            >
              <div className="fondo-img">
                <p>Busco Propiedad en:</p>
                <p>Cartago</p>
              </div>
            </div>
            <div
              className="Container-provincia"
              data-province="Guanacaste"
              onClick={searchByProvince}
              id="Container-guanacaste"
            >
              <div className="fondo-img">
                <p>Busco Propiedad en:</p>
                <p>Guanacaste</p>
              </div>
            </div>
            <div
              className="Container-provincia"
              data-province="Puntarenas"
              onClick={searchByProvince}
              id="Container-puntarenas"
            >
              <div className="fondo-img">
                <p>Busco Propiedad en:</p>
                <p>Puntarenas</p>
              </div>
            </div>
            <div
              className="Container-provincia"
              data-province="Limon"
              onClick={searchByProvince}
              id="Container-limon"
            >
              <div className="fondo-img">
                <p>Busco Propiedad en:</p>
                <p>Limon</p>
              </div>
            </div>
          </ul>
        </main>
      </div>

      <section className="mt-5">
        <ListaPropiedadesDinamic
          nameApi={valueNameApi}
          isviewSeller={false}
          isLooking={true}
          onSearAll={handleSearch}
        />
      </section>
      <section
        className="mt-5"
        style={{
          width: "70%",
          height: "80%",
          position: "relative",
          left: "15%",
          marginBottom: "100px",
        }}
      >
        <Causosel />
      </section>
      <section id="soporte" className="p-5">
        <FrameComponent6 />
      </section>
    </div>
  );
};

export default MainPropetys;
