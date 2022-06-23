import PropTypes from "prop-types";
import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: null,
      newAccountID:
        Math.floor(Math.random() * 1000) * Math.floor(Math.random() * 1100) +
        123,
      showLogin: false,
    };
  }

  componentDidMount() {
    const userLoginInfo = JSON.parse(
      window.localStorage.getItem("userLoginInfo")
    );
    console.log(userLoginInfo);
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.loginEmail.value;
    const password = e.target.loginPassword.value;

    console.log(email);
    console.log(password);

    const response = await fetch("/api/account/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userLoginInfo: {
          email: e.target.loginEmail.value,
          password: e.target.loginPassword.value,
        },
      }),
    });

    const body = await response.json();

    if (body.length > 0) {
      window.localStorage.setItem("userLoginInfo", JSON.stringify(body[0]));
      this.setState({
        authenticated: true,
      });
      window.location.reload();
    } else {
      this.setState({
        authenticated: false,
      });
    }
  };

  handleCreateAccount = async (e) => {
    e.preventDefault();

    console.log(e.target);

    const email = e.target.inputEmail.value;
    const password = e.target.inputPassword.value;
    const first_name = e.target.inputFName.value;
    const last_name = e.target.inputLName.value;
    const user_name = e.target.inputUserName.value;
    const user_id = this.state.newAccountID;

    const response = await fetch("/api/account/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createUserInfo: {
          createUserEmail: e.target.inputEmail.value,
          createUserPassword: e.target.inputPassword.value,
          createUserFirstName: e.target.inputFName.value,
          createUserLastName: e.target.inputLName.value,
          createUserUserName: e.target.inputUserName.value,
          createUserUserID: user_id,
        },
      }),
    });

    const body = await response.json();

    window.localStorage.setItem(
      "userLoginInfo",
      JSON.stringify({
        email: e.target.inputEmail.value,
        password: e.target.inputPassword.value,
        first_name: e.target.inputFName.value,
        last_name: e.target.inputLName.value,
        customer_id: user_id,
      })
    );

    e.target.reset();
    
    this.setState({ showLogin: true });
  };

  render() {
    return (
      <>
        <div className="container w-75 mt-2">
          <h2>Login</h2>
          {this.state.authenticated === false && (
            <div style={{ color: "red" }}>
              Login credentials incorrect, please try again
            </div>
          )}
          <form onSubmit={this.handleSubmit} className="form">
            <div className="form-outline mb-4">
              <label className="form-label" htmlhtmlFor="form2Example1">
                Email address
              </label>
              <input
                type="email"
                id="loginEmail"
                name="login_email"
                className="form-control"
                required
              />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlhtmlFor="form2Example2">
                Password
              </label>
              <input
                type="password"
                id="loginPassword"
                name="login_password"
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
            &nbsp; | &nbsp;
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#accountCreationModal"
            >
              Don't have an account? Create one here
            </button>
          </form>
        </div>
        <div
          class="modal fade"
          id="accountCreationModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Create a new account (ID: {this.state.newAccountID})
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <form
                  id="create-account-form"
                  onSubmit={this.handleCreateAccount}
                  validate
                >
                  <div className="mb-3 row row-cols-1 row-cols-sm-2 row-cols-lg-2">
                    <div className="col">
                      <label htmlFor="inputFName" className="col-form-label">
                        First Name
                      </label>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          id="inputFName"
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label htmlFor="inputLName" className="col-form-label">
                        Last name
                      </label>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          id="inputLName"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-3 row row-cols-1 row-cols-sm-1 row-cols-lg-1">
                    <div className="col">
                      <label htmlFor="inputEmail" className="col-form-label">
                        Email
                      </label>
                      <div className="col">
                        <input
                          type="email"
                          className="form-control"
                          id="inputEmail"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row row-cols row-cols-sm-1 row-cols-lg-2">
                    <div className="col">
                      <label htmlFor="inputLName" className="col-form-label">
                        User name
                      </label>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          id="inputUserName"
                        />
                      </div>
                    </div>
                    <div className="col">
                      <label htmlFor="inputPassword" className="col-form-label">
                        Password
                      </label>
                      <div className="col">
                        <input
                          type="password"
                          className="form-control"
                          id="inputPassword"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                {this.state.showLogin ? (
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Login
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button form="create-account-form" class="btn btn-primary">
                      Create Account
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

/*
<form id="edit-account-form" onSubmit={this.onSubmitEdit}>
              <div className="mb-3 row row-cols-1 row-cols-sm-2 row-cols-lg-2">
                <div className="col">
                  <label htmlFor="inputFName" className="col-form-label">
                    First Name
                  </label>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      id="inputFName"
                      defaultValue={userData.first_name}
                      onChange={() => this.showSaveChangeButton()}
                    />
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="inputLName" className="col-form-label">
                    Last name
                  </label>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      id="inputLName"
                      defaultValue={userData.last_name}
                      onChange={() => this.showSaveChangeButton()}
                    />
                  </div>
                </div>
              </div>
              <div className="mb-3 row row-cols-1 row-cols-sm-2 row-cols-lg-2">
                <div className="col">
                  <label htmlFor="inputEmail" className="col-form-label">
                    Email
                  </label>
                  <div className="col">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail"
                      defaultValue={userData.email}
                      onChange={() => this.showSaveChangeButton()}
                    />
                  </div>
                </div>
                <div className="col">
                  <label htmlFor="inputPassword" className="col-form-label">
                    Password
                  </label>
                  <div className="col">
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                      defaultValue={userData.password}
                      onChange={() => this.showSaveChangeButton()}
                    />
                  </div>
                </div>
              </div>
            </form>
*/
