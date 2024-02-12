import "./App.css";
import { useState } from "react";
import Modal from "react-modal";

const Mymodal = ({ isOpen, closeModal }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let selectedDate = new Date(formData.dob);
    let today = new Date();
    if(formData.phone.length !== 10){
      alert("Invalid phone number. Please enter a 10-digit phone number.")
    }
    else if(selectedDate > today){
      alert("Invalid date of birth. Date of birth cannot be in future.");
    }
    else{
      setFormData({
        username: "",
        email: "",
        phone: "",
        dob: "",
      });
      closeModal();
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Modal">
      <div className="modal-content">
        <h2>Fill Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="inputfield">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              id="username"
            />
          </div>
          <div className="inputfield">
            <label>Email Address:</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              id="email"
            />
          </div>
          <div className="inputfield">
            <label>Phone Number:</label>
            <input
              type="number"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              id="phone"
            />
          </div>
          <div className="inputfield">
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              required
              value={formData.dob}
              onChange={handleChange}
              id="dob"
            />
          </div>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="modal">
      <h1>User Details Modal</h1>
      <button onClick={openModal}>Open Form</button>
      <Mymodal isOpen={modalIsOpen} closeModal={closeModal} />
    </div>
  );
}

export default App;
