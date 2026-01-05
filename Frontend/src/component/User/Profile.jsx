import MetaData from "../layout/MetaData";
import profile from "../../images/Profile.png";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./profile.css";

function Profile() {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === "false") {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user?.name}'s Profile`} />
          <div className="profileContainer">
            <div>
              <img src={profile} alt={user?.name} />
              <NavLink to="/me/update">Edit Profile</NavLink>
            </div>
            <div>
              <div>
                <h4>Full Name</h4>
                <p>{user?.name}</p>
              </div>
              <div>
                <h4>Email</h4>
                <p>{user?.email}</p>
              </div>
              <div>
                <h4>Joined On</h4>
                <p>{String(user?.createdAt).substr(0, 10)}</p>
              </div>
              <div>
                <NavLink to="/orders">My Order</NavLink>
                <NavLink to="/password/update">Change Password</NavLink>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Profile;
