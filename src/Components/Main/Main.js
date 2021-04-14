import React, { useState } from "react";
import Signup from "../Signup/Signup";
import Login from "../Login/Login";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import styles from "./Main.module.css";

const Main = () => {
  const [authState, setAuthState] = useState("signin");

  const changeAuthState = (state) => {
    setAuthState(state);
  };
  let authComponent = <Login changeAuthState={changeAuthState} />;

  if (authState == "signup")
    authComponent = <Signup changeAuthState={changeAuthState} />;
  if (authState == "forgotPassword")
    authComponent = <ForgotPassword changeAuthState={changeAuthState} />;

  return (
    <div>
      <header class="header">
        <nav class="navbar navbar-expand-lg navbar-light py-3">
          <div class="container">
            <center>
              <a href="#" class="navbar-brand">
                <img src="logo-digi.png" alt="logo" width="120" />
              </a>
            </center>
          </div>
        </nav>
      </header>

      <div class="container">
        <div class="row py-1 mt-1 align-items-center">
          <div class="col-lg-5 col-md-12 pr-lg-5 mb-5 mb-md-0 col-sm-12">
            <h1 className={styles.title}>WFH Store</h1>
            <h4 className={styles.subtitle}>
              An exclusive SuperStore for corporate employees.
            </h4>
            <img
              src="banner2.jpg"
              alt=""
              class="banner"
              // class="img-fluid mb-3 d-none d-md-block"
              style={{ width: "350px" }}
            />

            <p className={styles.contact}>
              For any support, please contact hello@kobzo.com or call us at
              9361133463 (10am - 6pm)
            </p>
            <div className={styles.footer}>
              <p className="copright">
                Copyright 2021 - KobZo SuperStore - All Rights Reserved.
              </p>
            </div>
          </div>

          <div class="col-md-12 col-lg-6 ml-auto">
            {authComponent}
            <div className={styles.footer}>
              <p className="copright1">
                Copyright 2021 - KobZo SuperStore - All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
        {/* <div class="row py-1 mt-1 align-items-center">
          <div class="col-md-5 pr-lg-5 mb-5 mb-md-0">
            <div className={styles.footer}>
              <p className="copright">
                © 2012-2020 Kobzo.com. All rights reserved.
              </p>
            </div>
          </div>
          <div class="col-md-7 col-lg-6 ml-auto"></div>
        </div> */}
      </div>
    </div>
  );
};

export default Main;
