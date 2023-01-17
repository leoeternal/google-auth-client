import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import "./register.css";
import { loginUserWithGoogleAuth, registerUser } from "../store/UserAction";
import { userActions } from "../store/UserSlice";
import { GoogleLogin } from "react-google-login";
import { CircularProgress } from "@mui/material";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { buttonLoader, userRegistered, errors, userLoggedIn } = useSelector(
    (state) => state.user
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/");
    }
  }, [userLoggedIn, navigate]);

  useEffect(() => {
    dispatch(userActions.updateErrorsValue());
    if (userRegistered) {
      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    }
  }, [userRegistered, navigate, dispatch]);

  const googleHandleFailure = (result) => {
    toast.error(
      "There is some error with google login. Please try again later"
    );
  };

  const googleHandleLogin = (googleData) => {
    dispatch(loginUserWithGoogleAuth(googleData));
  };

  const submitHandler = () => {
    const data = {
      name,
      email,
      password,
    };
    dispatch(registerUser(data));
  };

  const navigateHandler = (action) => {
    if (action === "login") {
      navigate("/login");
    } else if (action === "home") {
      navigate("/");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={2000}
      />
      <div className="register-wrapper">
        <div className="register-container">
          <h1 id="title">Register for TUMMOC</h1>
          <div className="form-field-container">
            <div className="form-field">
              <p id="key">Full Name</p>
              <TextField
                error={
                  errors.some((error) => error?.field === "name") ? true : false
                }
                helperText={errors.map((error, index) => {
                  return error.field === "name" ? (
                    <span key={index}>
                      <span>{error.message}</span>
                      <br />
                    </span>
                  ) : null;
                })}
                InputProps={{ disableUnderline: true }}
                fullWidth
                label="Enter your full name"
                id="filled-basic"
                variant="filled"
                autoComplete="off"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-field">
              <p id="key">Email</p>
              <TextField
                error={
                  errors.some((error) => error?.field === "email")
                    ? true
                    : false
                }
                helperText={errors.map((error, index) => {
                  return error.field === "email" ? (
                    <span key={index}>
                      <span>{error.message}</span>
                      <br />
                    </span>
                  ) : null;
                })}
                type="email"
                InputProps={{ disableUnderline: true }}
                fullWidth
                label="Enter your email"
                id="filled-basic"
                variant="filled"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-field">
              <p id="key">Password</p>
              <TextField
                error={
                  errors.some((error) => error?.field === "password")
                    ? true
                    : false
                }
                helperText={errors.map((error, index) => {
                  return error.field === "password" ? (
                    <span key={index}>
                      <span>{error.message}</span>
                      <br />
                    </span>
                  ) : null;
                })}
                type="password"
                InputProps={{ disableUnderline: true }}
                label="Enter password"
                fullWidth
                id="filled-basic"
                variant="filled"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="button">
              {buttonLoader ? (
                <Button disabled color="error" variant="contained">
                  Register
                </Button>
              ) : (
                <Button
                  onClick={submitHandler}
                  color="error"
                  variant="contained"
                >
                  Register
                </Button>
              )}
            </div>
            <div className="google-auth-button">
              {buttonLoader ? (
                <CircularProgress />
              ) : (
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Continue with Google"
                  onSuccess={googleHandleLogin}
                  onFailure={googleHandleFailure}
                  cookiePolicy={"single_host_origin"}
                />
              )}
            </div>
            <div className="registerpage-link">
              <p onClick={() => navigateHandler("home")}>Home</p>
              <p onClick={() => navigateHandler("login")}>Login</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
