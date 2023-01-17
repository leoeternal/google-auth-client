import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserInfo, logoutUser } from "../store/UserAction";
import "./home.css";
import AddCity from "./AddCity";
import { addCity } from "../store/CityAction";
import { cityActions } from "../store/CitySlice";
import ViewCity from "./ViewCity";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    userLoggedIn,
    authError,
    buttonLoader,
    screenLoader,
    userData,
    cities,
  } = useSelector((state) => state.user);
  const { cityAdded } = useSelector((state) => state.city);
  const [city, setCity] = useState("");

  useEffect(() => {
    if (authError) {
      navigate("/login");
    }
  }, [navigate, authError]);

  useEffect(() => {
    if (userLoggedIn) {
      dispatch(getUserInfo());
    }
  }, [userLoggedIn, dispatch]);

  useEffect(() => {
    if (cityAdded) {
      setCity("");
      toast.success("city added!");
      dispatch(cityActions.updateCityAddedValue());
    }
  }, [dispatch, cityAdded]);

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const navigateHandler = (action) => {
    if (action === "login") {
      navigate("/login");
    } else if (action === "register") {
      navigate("/register");
    } else if (action === "logout") {
      dispatch(logoutUser());
    } else if (action === "add-city") {
      if (userLoggedIn) dispatch(addCity({ city }));
      else toast.error("Please log in first");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        hideProgressBar={true}
        autoClose={2000}
      />
      {userLoggedIn && screenLoader ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <div className="home-wrapper">
          <h1 id="title">
            Welcome to TUMMOC{userLoggedIn ? <>,</> : null}{" "}
            {userLoggedIn ? <>{userData.name}</> : null}
          </h1>
          <div className="link-container">
            {!userLoggedIn ? (
              <p onClick={() => navigateHandler("login")}>Login</p>
            ) : null}
            {!userLoggedIn ? (
              <p onClick={() => navigateHandler("register")}>Register</p>
            ) : null}
            {userLoggedIn ? (
              <>
                {buttonLoader ? (
                  <p
                    style={{
                      color: "grey",
                      cursor: "default",
                      textDecoration: "none",
                    }}
                  >
                    Logout
                  </p>
                ) : (
                  <p onClick={() => navigateHandler("logout")}>Logout</p>
                )}
              </>
            ) : null}
          </div>
          <div>
            <AddCity data={{ navigateHandler, city, handleCityChange }} />
            {userLoggedIn && cities.length !== 0 ? (
              <ViewCity data={{ cities }} />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
