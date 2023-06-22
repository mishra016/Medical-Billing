import "/public/styles.css";
import React, { useState } from "react";

export default function App() {
  const [formData, setFormData] = useState({
    patientName: "",
    patientAddress: "",
    hospitalName: "",
    dateOfService: "",
    billAmount: "",
    billImage: null
  });

  const [showSummary, setShowSummary] = useState(false);
  const [billList, setBillList] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, billImage: file });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setBillList([...billList, formData]);
    setShowSummary(true);
  };

  const handleEdit = () => {
    setShowSummary(false);
  };

  const handleAddNew = () => {
    setShowSummary(false);
    setFormData({
      patientName: "",
      patientAddress: "",
      hospitalName: "",
      dateOfService: "",
      billAmount: "",
      billImage: null
    });
  };

  return (
    <div className="container">
      <h1>Medical Bill Uploader</h1>
      {!showSummary ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Patient Name:</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Patient Address:</label>
            <input
              type="text"
              name="patientAddress"
              value={formData.patientAddress}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Hospital Name:</label>
            <input
              type="text"
              name="hospitalName"
              value={formData.hospitalName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Date of Service:</label>
            <input
              type="date"
              name="dateOfService"
              value={formData.dateOfService}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Bill Amount:</label>
            <input
              type="number"
              name="billAmount"
              value={formData.billAmount}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Bill Image:</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h2>Summary</h2>
          <p>
            <strong>Patient Name:</strong> {formData.patientName}
          </p>
          <p>
            <strong>Patient Address:</strong> {formData.patientAddress}
          </p>
          <p>
            <strong>Hospital Name:</strong> {formData.hospitalName}
          </p>
          <p>
            <strong>Date of Service:</strong> {formData.dateOfService}
          </p>
          <p>
            <strong>Bill Amount:</strong> ${formData.billAmount}
          </p>
          <p>
            <strong>Bill Image:</strong>{" "}
            {formData.billImage ? formData.billImage.name : "No image uploaded"}
          </p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}

      <hr />

      <h2>Bills</h2>
      {billList.length > 0 ? (
        <ul>
          {billList.map((bill, index) => (
            <li key={index}>
              <strong>Patient Name:</strong> {bill.patientName} |{" "}
              <strong>Hospital Name:</strong> {bill.hospitalName} |{" "}
              <strong>Date of Service:</strong> {bill.dateOfService} |{" "}
              <strong>Bill Amount:</strong> ${bill.billAmount}
            </li>
          ))}
        </ul>
      ) : (
        <p>No bills uploaded</p>
      )}

      <button onClick={handleAddNew}>Add New Bill</button>
    </div>
  );
}
