import React, { useState } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Objectways from "./images/Objectways.svg";
import Form_Inout from "./images/form_input_image.svg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

const Form = () => {
  // Define state variables for form inputs, error messages, and success message
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [degree, setDegree] = useState('');
  const [year, setYear] = useState('');
  const [company, setCompany] = useState('');
  const [experience, setExperience] = useState('');
  const [resume, setResume] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validation, valchange] = useState("");

  // const navigate = useNavigate();
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!firstName) {
      setError('FirstName is required.');
      return;
    }
    if (!lastName) {
      setError('LastName is required.');
      return;
    }
    if (!email) {
      setError('Email is required.');
      return;
    }
    if (!phone) {
      setError('Phone Number is required.');
      return;
    } else if (phone.length !== 10) {
      setError('Phone Number should be exactly 10 digits.');
      return;
    }
    if (!degree) {
      setError('Degree is required.');
      return;
    }
    if (!year) {
      setError('Passed Out Year is required.');
      return;
    }

    if (resume.size > 700000) {
      setError('Resume file size must be less than 200 KB.');
      return;
    }

    if (resume.type !== 'application/pdf') {
      setError('Resume file type must be PDF.');
      return;
    }


     // Define a function to reset the form
  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setDegree('');
    setYear('');
    setCompany('');
    setExperience('');
    setResume(null);
    // ...
  };
    // Create a new FormData object to store form data
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('degree', degree);
    formData.append('year', year);
    formData.append('experience', experience);
    formData.append('company', company);
    formData.append('resume', resume);

    // Send a POST request to the server with form data
    try {
      const response = await axios.post('http://localhost:5000/submit', formData);
      console.log(response.data);
      Swal.fire(
        'Thank you for applying!',
        'We will contact you soon!',
        'success'
      )
      // navigate('/table');
     // Reset the form after submission
     resetForm();
     window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
    setError('');
  };

  return (
    <div className="font_family mainDiv">
      <div className="container-fluid mt-5 bg ">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-2 setOne wholeRow">
            <div className="d-flex justify-content-center pt-3">
              <img className="obw_logo Animate_2" src={Objectways} alt="Objectways" />
            </div>
            <div className="d-flex justify-content-center">
              <img className="obw_logo_two Animate_2" src={Form_Inout} alt="Form_Inout" />
            </div>
          </div>

          <div className="col-4 setTwo wholerow" >
            <p className="textOne d-flex justify-content-center app mt-2 Animate_one">
              APPLICATION FORM
            </p>
            <form autoComplete="off" className="scroll-to" onSubmit={handleSubmit} id="scrollable-div" >
              <div className="row d-flex justify-content-center">
                <div className="col-5">
                  <div className="form-group mt-4 d-flex justify-content-center">
                    <div>
                      <TextField
                        label="First Name *"
                        id="outlined-size-small"
                        size="small"
                        className="email_login"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <div className="d-flex">
                      </div>
                    </div>
                  </div>

                </div>
                <div className="col-5">
                  <div className="form-group mt-4 d-flex justify-content-center">
                    <div>
                      <TextField
                        label="Last Name *"
                        id="outlined-size-small"
                        size="small"
                        className="email_login"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      <div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-5">
                  <div className="form-group mt-4 d-flex justify-content-center">
                    <div>
                      <TextField
                        label="Email *"
                        id="outlined-size-small"
                        size="small"
                        className="email_login"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className="col-5">
                  <div className="form-group mt-4 d-flex justify-content-center">
                    <div>
                      <TextField
                        label="Phone *"
                        id="outlined-size-small"
                        size="small"
                        className="email_login"
                        type="number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-5">
                  <div className="form-group mt-4 d-flex justify-content-center">
                    <div>
                      <TextField
                        label="Degree *"
                        id="outlined-size-small"
                        size="small"
                        className="email_login"
                        type="text"
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                      />
                    </div>
                  </div>

                </div>
                <div className="col-5">
                <div className="form-group mt-4 d-flex justify-content-center">
                    <div>
                      <TextField
                        label="Passed Out Year *"
                        id="outlined-size-small"
                        size="small"
                        className="email_login"
                        type="number"   
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                      />
                    </div>
                  </div>
                  
                </div>
              </div>
              <p className="textTwo d-flex justify-content-center  mt-2  Animate_one">
                WORK EXPERIANCE
              </p>
              <div className="row d-flex justify-content-center">
                <div className="col-5">
                  <div className="form-group mt-4 d-flex justify-content-center">
                    <div>
                      <TextField
                        label="Current Company Name"
                        id="outlined-size-small"
                        size="small"
                        className="email_login"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                      />
                      
                    </div>
                  </div>
                </div>
                <div className="col-5">
                  <div className="form-group mt-4 d-flex justify-content-center">
                  <div>
                      <TextField
                        label="No of Years Experienced"
                        id="outlined-size-small"
                        size="small"
                        className="email_login"
                        type="number"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                      />
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className='resumeUpload'>
                <label for="images" class="drop-container">
                  <span class="drop-title">Drop files here</span>
                  or
                  <input type="file" id="resume" className='fileInput' accept=".pdf" onChange={handleFileChange} />
                </label>
              </div>
              <div className='submitBtn'>
                <button type="submit" className='submitbtn'>Submit</button>
              </div>
              {error && <div style={{ color: 'red' }}>{error}</div>}
              {success && <div style={{ color: 'green' }}>{success}</div>}
            </form>

          </div>
          <div className="col-3"></div>
        </div>
      </div>
    </div>
  );
};

export default Form;