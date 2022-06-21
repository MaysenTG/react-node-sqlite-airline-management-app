/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

class EditAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idParam: window.location.pathname.split("/")[2],
      userData: null,
      showSaveBtn: false,
    };
  }

  async componentDidMount() {
    const idParam = this.state.idParam;

    const response = await fetch(`/api/get_user_data/${idParam}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const body = await response.json();

    this.setState({ userData: body[0] });
  }

  showSaveChangeButton() {
    const newSaveBtnState = true.valueOf;
    this.setState({ showSaveBtn: newSaveBtnState });
  }

  onSubmitEdit = async (e) => {
    e.preventDefault();
    const idParam = this.state.idParam;

    const response = await fetch(`/api/edit_user_data/${idParam}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userData: {
          email: e.target.inputEmail.value,
          password: e.target.inputPassword.value,
          first_name: e.target.inputFName.value,
          last_name: e.target.inputLName.value,
        },
      }),
    });

    const body = await response.json();

    this.setState({ showSaveBtn: false });
  };

  render() {
    const userData = this.state.userData;

    if (userData) {
      return (
        <section className="vh-100">
          {this.state.showSaveBtn && (
            <div
              className="justify-content-end align-items-center"
              style={{
                display: "flex",
                height: 70 + "px",
                backgroundColor: "#2c2c2e",
                borderRadius: 5 + "px",
              }}
            >
              <button
                style={{ height: 50 + "px", marginRight: 1 + "rem" }}
                className="btn btn-success"
                form="edit-account-form"
              >
                Save changes
              </button>
            </div>
          )}
          <div className="container w-75 h-100">
            <br />
            <h2>
              Editing account for ID: <strong>{userData.id}</strong>
            </h2>
            <form id="edit-account-form" onSubmit={this.onSubmitEdit}>
              <div className="mb-3 row">
                <div className="col">
                  <label for="inputFName" className="col-sm-2 col-form-label">
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
                  <label for="inputLName" className="col-sm-2 col-form-label">
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
              <div className="mb-3 row">
                <div className="col">
                  <label for="inputEmail" className="col-sm-2 col-form-label">
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
                  <label
                    for="inputPassword"
                    className="col-sm-2 col-form-label"
                  >
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
          </div>
        </section>
      );
    }
  }
}

export default EditAccount;
