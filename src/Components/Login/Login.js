import React, { Component } from "react";
import styles from "./Login.module.css";
import axios from "axios";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
  return valid;
};

class Login extends Component {
  state = {
    email: "",
    password: "",
    submitLogin: 0,
    errors: {
      email: "",
      password: "",
    },
    errorMessage: "",
  };

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  submitLogin = () => {
    this.setState({ submitLogin: 1 });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let errors = this.state.errors;
    if (!validEmailRegex.test(this.state.email)) {
      errors.email = "email is invalid";
    }
    if (this.state.password.length < 8) {
      errors.password = "password is invalid";
    }
    this.setState({ ...this.state, errors });

    console.log("validate", validateForm(this.state.errors));
    if (!validateForm(this.state.errors)) {
      return console.error("Invalid Form");
    }
    console.log(this.state);
    axios
      .get("https://kobzo.store/logins/login-api.php", {
        params: {
          email: this.state.email,
          password: this.state.password,
          submitLogin: this.state.submitLogin,
          ajax: 1,
        },
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.success == true) {
          window.location.href = "https://www.kobzo.store/?superCustomer=1";
        } else {
          this.setState({
            ...this.state,
            errorMessage: "Invalid email or password",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        // this.setState({ ...this.state, errorMessage: "Invalid Credentials" });
      });
  };

  render() {
    const { errors } = this.state;
    return (
      <div>
        <h2 className={styles.title}>Sign In</h2>
        {console.log(this.state.errorMessage)}
        {this.state.errorMessage.length > 0 ? (
          <span className={styles.errorMessage}>{this.state.errorMessage}</span>
        ) : (
          ""
        )}
        <form onSubmit={this.handleSubmit} noValidate>
          <div class="row">
            <div class="input-group col-lg-12 mt-4">
              <div class="input-group-prepend">
                <span class="input-group-text bg-white px-4 border-md border-right-0">
                  <i class="fa fa-envelope text-muted"></i>
                </span>
              </div>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email Address"
                class="form-control bg-white border-left-0 border-md"
                onChange={this.handleChange}
                noValidate
              />
            </div>
            {errors.email.length > 0 && (
              <span className="error">{errors.email}</span>
            )}
            <div class="input-group col-lg-12 mt-4">
              <div class="input-group-prepend">
                <span class="input-group-text bg-white px-4 border-md border-right-0">
                  <i class="fa fa-lock text-muted"></i>
                </span>
              </div>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                class="form-control bg-white border-left-0 border-md"
                onChange={this.handleChange}
                noValidate
              />
              <br></br>
            </div>
            {errors.password.length > 0 && (
              <span className="error">{errors.password}</span>
            )}

            {/* <div className="info">
              <small>Password must be eight characters in length.</small>
            </div> */}
            <div class="form-group col-lg-12 mx-auto mt-4">
              <button
                class="btn btn-primary btn-block py-2"
                onClick={this.submitLogin}
              >
                <span class="font-weight-bold">Login</span>
              </button>
            </div>
            <div class="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
              <div class="border-bottom w-100 ml-5"></div>
              <span class="px-2 small text-muted font-weight-bold text-muted">
                OR
              </span>
              <div class="border-bottom w-100 mr-5"></div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="text-center w-100">
                <p class="text-muted font-weight-bold">
                  New User?
                  <button
                    class="text-primary ml-2"
                    onClick={() => this.props.changeAuthState("signup")}
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="text-center w-100">
                <p class="text-muted font-weight-bold">
                  {" "}
                  <button
                    class="text-primary ml-2"
                    onClick={() => this.props.changeAuthState("forgotPassword")}
                  >
                    Forgot Password?
                  </button>
                </p>
              </div>
            </div>
          </div>
        </form>
        <div className="contact-details">
          <p className={styles.contact1}>
            For any support, please contact hello@kobzo.com or call us at
            9361133463 (10am - 6pm)
          </p>
        </div>
      </div>
    );
  }
}

export default Login;
