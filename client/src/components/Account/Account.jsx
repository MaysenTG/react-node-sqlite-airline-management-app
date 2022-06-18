/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idParam: window.location.pathname.split("/")[2],
      userData: null,
    };
  }

  // Fetches the data for this page. Called in componentDidMount. Calles gets user data, and flights associated with the user via the user_flights junction table
  async componentDidMount() {
    const idParam = this.state.idParam;

    const response = await fetch(`/api/get_user_data/${idParam}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const body = await response.json();

    console.log("------");
    console.log(body);

    this.setState({ userData: body });
  }

  render() {
    const userData = this.state.userData;

    if (userData) {
      return (
        <section className="vh-100">
          <div className="container h-100">
            <br />
            <div className="row-1 row-cols-1 row-cols-sm-1 row-cols-md-1">
              <div className="row h-100">
                <div className="w-100 col">
                  <div className="card" style={{ borderRadius: 15 + "px" }}>
                    <div className="card-body p-4">
                      <div className="d-flex text-black">
                        <div className="flex-shrink-0">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                            alt="Generic placeholder image"
                            className="img-fluid"
                            style={{
                              width: 180 + "px",
                              borderRadius: 10 + "px",
                            }}
                          />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h5 className="mb-1">{userData[0].first_name} {userData[0].last_name}</h5>
                          <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>
                            Customer ID: <strong>{ userData[0].id }</strong>
                          </p>
                          <div
                            className="d-flex justify-content-start rounded-3 p-2 mb-2"
                            style={{ backgroundColor: "#efefef" }}
                          >
                            <div>
                              <p className="small text-muted mb-1">Number of booked flights</p>
                              <p className="mb-0">{ userData.length }</p>
                            </div>
                          </div>
                          <div className="d-flex pt-1">
                            <button
                              type="button"
                              className="btn btn-outline-primary me-1 flex-grow-1"
                            >
                              Chat
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary flex-grow-1"
                            >
                              Follow
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <h3>Booked flights</h3>
              <div className="row h-100">
                <div className="w-100 col">
                  <div className="card" style={{ borderRadius: 15 + "px" }}>
                    <div className="card-body p-4">
                      <div className="d-flex text-black">
                        <div className="flex-shrink-0">
                          <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                            alt="Generic placeholder image"
                            className="img-fluid"
                            style={{
                              width: 180 + "px",
                              borderRadius: 10 + "px",
                            }}
                          />
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <h5 className="mb-1">Danny McLoan</h5>
                          <p className="mb-2 pb-1" style={{ color: "#2b2a2a" }}>
                            Senior Journalist
                          </p>
                          <div
                            className="d-flex justify-content-start rounded-3 p-2 mb-2"
                            style={{ backgroundColor: "#efefef" }}
                          >
                            <div>
                              <p className="small text-muted mb-1">Articles</p>
                              <p className="mb-0">41</p>
                            </div>
                            <div className="px-3">
                              <p className="small text-muted mb-1">Followers</p>
                              <p className="mb-0">976</p>
                            </div>
                            <div>
                              <p className="small text-muted mb-1">Rating</p>
                              <p className="mb-0">8.5</p>
                            </div>
                          </div>
                          <div className="d-flex pt-1">
                            <button
                              type="button"
                              className="btn btn-outline-primary me-1 flex-grow-1"
                            >
                              Chat
                            </button>
                            <button
                              type="button"
                              className="btn btn-primary flex-grow-1"
                            >
                              Follow
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    }
  }
}

export default Account;
