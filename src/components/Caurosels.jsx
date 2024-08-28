import Carousel from "react-bootstrap/Carousel";
import "../Styles/Caurosel.css"; // Ensure you import your CSS for additional styling

function Causosel() {
  return (
    <Carousel slide={false}>
      {/* First slide with image and detailed caption */}

      <Carousel.Item>
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/mrpiPK8_up0?si=gEy8YHZ5F08rWF9-"
            title="Reproductor de video de YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/mrpiPK8_up0?si=gEy8YHZ5F08rWF9-"
            title="Reproductor de video de YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="video-container">
          <iframe
            src="https://www.youtube.com/embed/JjC9b_t9_uU?si=dRaiPRUV0rpOg-kh"
            title="Reproductor de video de YouTube"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default Causosel;
