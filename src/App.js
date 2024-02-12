import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    dob: "",
  });
  const [formVisible, setFormVisible] = useState(false);
  const formRef = useRef();

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
    if (formData.phone.length !== 10) {
      alert("Invalid phone number. Please enter a 10-digit phone number.");
    } else if (selectedDate > today) {
      alert("Invalid date of birth. Date of birth cannot be in future.");
    } else {
      setFormData({
        username: "",
        email: "",
        phone: "",
        dob: "",
      });
      setFormVisible(false);
    }
  };

  const handleClickOutside = (e) => {
    if (formRef.current && !formRef.current.contains(e.target)) {
      setFormVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="app">
      <h1>User Details Form</h1>
      {formVisible && (
        <div className="modal">
        <div className="modal-content" ref={formRef}>
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
        </div></div>
      )}
      {!formVisible && (
        <button onClick={() => setFormVisible(true)}>Open Form</button>
      )}
    </div>
  );
};

export default App;
