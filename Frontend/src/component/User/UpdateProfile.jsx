import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUser, updateProfile } from "../../Actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../Constants/userConstant";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import "./UpdateProfile.css";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";

function UpdateProfile() {
  const { user } = useSelector((state) => state.user);
  const { isUpdated, error, loading } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user?.name);
      setEmail(user?.email);
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("Profile Updated Successfully");
      dispatch(loadUser());

      navigate("/account");

      dispatch({ type: UPDATE_PROFILE_RESET });
    }
  }, [dispatch, error, toast, user, isUpdated]);

  const updateProfileSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);

    dispatch(updateProfile(myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <div className="UpdateProfileContainer">
            <div className="UpdateProfileBox">
              <h2 className="UpdateProfileHeading">Update Profile</h2>
              <form
                className="UpdateProfileForm"
                onSubmit={updateProfileSubmit}
              >
                <div className="UpdateProfileName">
                  <PersonIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="UpdateProfileEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
                  className="UpdateProfileBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UpdateProfile;
