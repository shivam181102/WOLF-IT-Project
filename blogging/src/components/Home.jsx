import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ContextData } from "./context/ContextData";
import { useNavigate } from "react-router-dom";

function Home() {
  const baseURL = "http://localhost:8080/blog/allblog";
  const { token } = useContext(ContextData);
  const [blogData, setblogData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      try {
        const headers = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`${baseURL}`, { headers });
        // console.log(response);
        if (response.status === 200) {
          setblogData(response.data);
        }
        console.log("All Blogs:"+blogData);
      } catch (error) {
        if (
          (error.response && error.response.status >= 400) ||
          error.response.status <= 500
        ) {
          // console.log(error)
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${error.response.data.message}`,
          });
          navigate('/login')
          // alert("An error occurred:", error.response.data.message);
        } else {
          alert("An error occurred:", error.response.data.message);
        }
      }
    }
    fetchData();
  }, []);

  // MOdel JS Code
  const exampleModal = document.getElementById("exampleModal");
if (exampleModal) {
  exampleModal.addEventListener("show.bs.modal", (event) => {
    // Button that triggered the modal
    const button = event.relatedTarget;
    // Extract info from data-bs-* attributes
    const recipient = button.getAttribute("data-bs-whatever");
    
    
    function modal(recipient) {
        return new Promise((resolve, reject) => {
            console.log(recipient)
            const foundObject = blogData.find(obj => obj._id === recipient);
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
          modalTitle.textContent = info.title;
          modelDesc.textContent = info.desc;
          modelUsername.textContent = info.uName;
            
            
        })
        .catch((error) => {
            console.error(error);
        });
  });
}




  return (
    <>
    <div className="d-flex flex-wrap justify-content-around">
      {blogData?.map((data,id)=>{
      return(<div
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
          <p className="card-text">
          {data.desc}
          </p>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            data-bs-whatever={data._id}
          >
            Read
          </button>
        </div>
      </div>)})}
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
