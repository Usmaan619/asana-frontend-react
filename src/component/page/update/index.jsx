import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Multiselect from "multiselect-react-dropdown"; // Ensure this package is installed
import { useForm } from "react-hook-form";
import Sidebar from "../../common/sidebar/Sidebar";
import Navbar from "../../common/navbar/Navbar";
import { CARDDATA } from "../../../constant/constant";

const Update = () => {
  const [show, setShow] = useState(false);
  const [collaboratorSelect, setCollaboratorSelect] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const TaskData = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    // Add more collaborators as needed
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (data) => {
    console.log('data: ', data);
    handleClose();
  };

  const onCollaboratorSelect = (selectedList) => {
    setCollaboratorSelect(selectedList);
  };

  const onCollaboratorRemove = (selectedList) => {
    setCollaboratorSelect(selectedList);
  };

  return (
    <>
      <Sidebar></Sidebar>
      <main className="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <Navbar />
        <div className="container-fluid py-4">
          <div className="row">
            {CARDDATA.map((card, index) => (
              <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4" key={index}>
                <div className="card">
                  <div className="card-body p-3">
                    <div className="row">
                      <div className="col-8">
                        <div className="numbers">
                          <p className="text-sm mb-0 text-capitalize font-weight-bold">
                            {card.title}
                          </p>
                          <h5 className="font-weight-bolder mb-0">
                            {card.value}
                            <span
                              className={`${card.percentageColor} text-sm font-weight-bolder`}
                            >
                              {card.percentage}
                            </span>
                          </h5>
                        </div>
                      </div>
                      <div className="col-4 text-end">
                        <div
                          className={`icon icon-shape ${card.iconColor} shadow text-center border-radius-md`}
                        >
                          <i
                            className={`${card.icon} text-lg opacity-10`}
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Task Board */}
          <Button variant="primary" onClick={handleShow} className="m-5">
            Update
          </Button>
        </div>
      </main>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="taskNumber">Task Number</label>
              <input
                type="text"
                className={`form-control ${
                  errors.taskNumber ? "is-invalid" : ""
                }`}
                placeholder="Enter task number"
                {...register("taskNumber", { required: true })}
              />
              {errors.taskNumber && (
                <div className="invalid-feedback">Task number is required.</div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="textarea">About</label>
              <textarea
                className="form-control"
                rows={3}
                {...register("textarea")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                {...register("date")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                rows={3}
                {...register("description")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="collaborator">Collaborator</label>
              <Multiselect
                placeholder="Collaborator"
                options={TaskData}
                selectedValues={collaboratorSelect}
                onSelect={onCollaboratorSelect}
                onRemove={onCollaboratorRemove}
                displayValue="name"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" type="submit" >
            Submit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Update;
