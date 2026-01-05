import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./loginSignup.css";
import { useEffect, useRef, useState } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";
import Profile from "../../images/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../Actions/userAction";
import toast from "react-hot-toast";
import Loader from "../layout/Loader/Loader";

function LoginSignup() {
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  const location = useLocation();

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const SwitcherTab = useRef(null);

  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  // const [avatar, setAvatar] = useState(Profile);
  // const [avatarPreview, setAvatarPreview] = useState(Profile);

  // const registerDataChange = (e) => {
  //   if (e.target.name === "avatar") {
  //     const file = e.target.files[0];
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setAvatarPreview(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //     setAvatar(file);
  //   } else {
  //     setUser({ ...user, [e.target.name]: e.target.value });
  //   }
  // };

  const registerDataChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect") || "/account";

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successfully");
      const redirectPath = redirect.startsWith("/") ? redirect : `/${redirect}`;
      navigate(redirectPath);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, toast, isAuthenticated, redirect, navigate]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      SwitcherTab.current.classList.add("shiftToNeutral");
      SwitcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      SwitcherTab.current.classList.add("shiftToRight");
      SwitcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    // myForm.append("avatar", avatar);

    dispatch(register(myForm));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="LoginSignupContainer">
            <div className="LoginSignupBox">
              <div>
                <div className="login_signup_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={SwitcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <NavLink to="/password/forgot">Forgot Password ?</NavLink>
                <input type="submit" value="Login" className="loginBtn" />
              </form>

              <form
                className="signUpForm"
                ref={registerTab}
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <PersonIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default LoginSignup;
