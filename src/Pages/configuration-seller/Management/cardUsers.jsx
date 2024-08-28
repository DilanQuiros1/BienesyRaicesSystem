import "./Styles/cardUser.css"; // Custom CSS file for styles
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
const UserCard = ({ name, Correo, imageUrl, role }) => {
  const [searchParams, setParams] = useSearchParams();

  const lookUser = () => {
    setParams({ Correo: Correo });
  };
  return (
    <div className="user-card">
      <img
        src={imageUrl ? imageUrl : "img"}
        alt={`${name}'s avatar`}
        className="user-avatar"
      />
      <h4>{name}</h4>
      <p>{Correo}</p>
      <button
        className={`follow-btn ${role === "VIP" ? "vip" : ""}`}
        onClick={lookUser}
      >
        Ver Usuario
      </button>
    </div>
  );
};
UserCard.propTypes = {
  name: PropTypes.string.isRequired,
  Correo: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};
export default UserCard;
