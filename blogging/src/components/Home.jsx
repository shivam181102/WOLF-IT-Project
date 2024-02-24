import React, { useContext } from "react";

import { ContextData } from "./context/ContextData";

function Home() {
  const { AllblogData } = useContext(ContextData);

  // MOdel JS Code
  const exampleModal = document.getElementById("exampleModal");
  if (exampleModal) {
    exampleModal.addEventListener("show.bs.modal", (event) => {
      const button = event.relatedTarget;
      const recipient = button.getAttribute("data-bs-whatever");
      function modal(recipient) {
        return new Promise((resolve, reject) => {
          console.log(recipient);
          const foundObject = AllblogData.find((obj) => obj._id === recipient);
          // console.log(foundObject);
          if (foundObject) {
            resolve(foundObject);
          } else {
            reject("Object not found");
          }
        });
      }

      // Example usage:

      const modalTitle = exampleModal.querySelector(".modal-title");
      const modelUsername = exampleModal.querySelector("#modelUsername");
      const modelDesc = exampleModal.querySelector("#modelDesc");

      modal(recipient)
        .then((info) => {
          modalTitle.textContent = info.uName;
          modelDesc.textContent = info.desc;
          modelUsername.textContent = info.title;
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }

  return (
    <>
      <div className="d-flex flex-wrap justify-content-around">
        {AllblogData?.map((data, id) => {
          return (
            <div
              key={id}
              className="card"
              style={{
                width: 500,
                margin: 30,
                boxShadow: "0 0 10 rgba(0, 0, 0, 0.9)",
              }}
            >
              <div className="card-body">
                <h5 className="card-title">{data.title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  {data.uName}
                </h6>
                <p className="card-text">{data.desc}</p>
                <button
                  type="button"
                  className="btn "
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  data-bs-whatever={data._id}
                  style={{
                    background: "-webkit-linear-gradient(#ff7e5f, #feb47b)",
                    border: "none",
                    color: "white",
                  }}
                >
                  Read
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* this is model */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                New message
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <h3 id="modelUsername"></h3>
              <p id="modelDesc"></p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
