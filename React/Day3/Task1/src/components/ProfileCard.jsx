import "./ProfileCard.css";
import profileImage from "../assets/image/photo.webp";

function ProfileCard() {
  return (
    <div className="profile-card">
      <img
        src={profileImage}
        alt="Profile"
      />

      <h2>Ashvi</h2>

      <p>Frontend Developer</p>

      <button onClick={() => alert("Profile viewed!")}>
        View Profile
      </button>
    </div>
  );
}

export default ProfileCard;