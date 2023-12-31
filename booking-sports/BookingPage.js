
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
const BookingPage = () => {
  const [studentName, setStudentName] = useState('');
  const [courtNumber, setCourtNumber] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!studentName || !courtNumber || !timeSlot ) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    const newBooking = {
      studentName,
      courtNumber,
      timeSlot,
    };

    axios
      .post('http://localhost:5000/bookings', newBooking)
      .then((response) => {
        console.log(response.data);
        if (response.data.error === "Slot is already booked.") {
          setErrorMessage("Slot is booked already. Please select another slot");
          console.log(errorMessage);
        }
        else {
          setStudentName('');
        setCourtNumber('');
        setTimeSlot('');
        setErrorMessage('');
        }

      })
      .catch((error) => {
        
        if (error.response.data.error) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage('An error occurred. Please try again later okay.');
        }
     
      });
  };

  return (
    <div className="container">
      <h1>Booking Page</h1>
      {errorMessage && <p className="alert alert-danger">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Student Name:</label>
          <input
            type="text"
            className="form-control"
            value={studentName}
            onChange={(event) => setStudentName(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Court Number:</label>
          <input
            type="number"
            className="form-control"
            value={courtNumber}
            onChange={(event) => setCourtNumber(event.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Time Slot:</label>
          <select
            className="form-select"
            value={timeSlot}
            onChange={(event) => setTimeSlot(event.target.value)}
          >
            <option value="">Select a time slot</option>
            <option value="02:30-03:45">02:30-03:45</option>
            <option value="03:45-04:30">03:45-04:30</option>
            <option value="04:30-05:30">04:30-05:30</option>
          </select>
        </div>
          
        <button type="submit" className="btn btn-primary">Book Now</button>
      </form>
    </div>
  );
};

export default BookingPage;