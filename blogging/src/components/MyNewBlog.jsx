
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ContextData } from "./context/ContextData";

import toast from "react-hot-toast";



function MyNewBlog() {
    const { token, uName } = useContext(ContextData);
    const [newBlog, setnewBlog] = useState({
        title: "",
        desc: "",
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setnewBlog((prevState) => ({ ...prevState, [name]: value }));
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
          const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          };
          console.log(uName);
          const data = { title: newBlog.title, desc: newBlog.desc, uName: uName };
          const response = await axios.post(
            `http://localhost:8080/blog/newblog`,
            data,
            { headers }
          );
          if (response.status === 200) {
            toast.success(response.data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      };
  return (
    <>
    <Fab
      style={{
        position: 'fixed',
        bottom: '30px', // Adjust this value to change the distance from the bottom
        right: '30px', // Adjust this value to change the distance from the right
        zIndex: '999',
        width:"100px",
        height: "100px",
        background: "-webkit-linear-gradient(#ff7e5f, #feb47b)",
            border: "none",
            color: "white", // Ensure it stays on top of other elements
      }}
        color="primary"
        id="floating-button"
        aria-
        label="add"
        data-bs-toggle="modal"
        data-bs-target="#example"
      >
        <AddIcon style={{width:"50px",
        height: "50px"}} />
      </Fab>
      <div
        className="modal fade"
        id="example"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add New Blog
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Add new blog */}

              <form>
                <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                    onChange={handleChange}
                    value={newBlog.title}
                    name="title"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Blog
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    name="desc"
                    style={{ height: "300px" }}
                    onChange={handleChange}
                    value={newBlog.desc}
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"
                style={{background: "-webkit-linear-gradient(#ff7e5f, #feb47b)",
            border: "none",
            color: "white",}}
              >
                Post Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyNewBlog