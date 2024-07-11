import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Conéctate con nosotros en las redes sociales:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                Nombre de empresa
              </h6>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint, odio! Asperiores esse veritatis 

              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Páginas</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Inicio
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Perfil
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Acerca de
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Contacto
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>UEnlaces útiles</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Ajustes
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Acerca de
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Propiedades
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Ayuda
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contacto</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Costa Rica, San José, San Pedro
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                correo@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> +506 1234 5678
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> +506 8765 4321
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          PROYECTO CND
        </a>
      </div>
    </MDBFooter>
  );
}