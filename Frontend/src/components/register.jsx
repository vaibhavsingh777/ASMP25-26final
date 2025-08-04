import React, { useState } from 'react';
import logo from '../assets/images/mk.png';
import '../styles/Register.css';
import Select from 'react-select';
import UseSignup from '../hooks/useSignup';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';

function Register() {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      width: '100%',
      height: '58px',
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: state.isFocused ? "10px 10px 0 0" : "10px",
      border: "none",
      boxShadow: "none",
      marginBottom: "20px",
      paddingLeft: "20px",
      "&:hover": {
        borderColor: "transparent"
      }
    }),
    singleValue: provided => ({
      ...provided,
      color: 'white',
      fontSize: "22px",
      fontFamily: "'Fraunces', serif",
    }),
    input: base => ({
      ...base,
      color: "white",
      height: "40px",
    }),
    indicatorSeparator: base => ({
      ...base,
      display: 'none'
    }),
    dropdownIndicator: base => ({
      ...base,
      color: "white"
    }),
    menu: base => ({
      ...base,
      width: '578px',
      borderRadius: '0 0 10px 10px',
      marginTop: '-5px',
      background: "rgba(0, 0, 0, 0.9)",
      border: "none",
      boxShadow: "none"
    }),
    menuList: base => ({
      ...base,
      padding: 0,
      borderRadius: '0 0 10px 10px'
    }),
    placeholder: base => ({
      ...base,
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: "22px",
      fontFamily: "'Fraunces', serif"
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected 
        ? '#BD04E7' 
        : isFocused 
          ? 'rgba(189, 4, 231, 0.3)' 
          : 'transparent',
      color: 'white',
      fontSize: "22px",
      fontFamily: "'Fraunces', serif",
      padding: '15px 20px'
    })
  };

  const [department, setDepartment] = useState('');
  const [name, setName] = useState('');
  const [degree, setDegree] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleDepartmentChange = (event) => setDepartment(event.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleDegreeChange = (event) => setDegree(event.value);
  const handleContactNumberChange = (event) => setContactNumber(event.target.value);
  const handleEmailIdChange = (event) => setEmailId(event.target.value);
  const handleRollNumberChange = (event) => setRollNumber(event.target.value);

  const allFieldsFilled = () => {
    return (
      department !== '' &&
      degree !== '' &&
      name !== '' &&
      contactNumber !== '' &&
      rollNumber !== '' &&
      password !== '' &&
      emailId !== ''
    );
  };

  const degreeOptions = [
    { value: 'btech', label: 'B.Tech' },
    { value: 'bs', label: 'B.S' },
    { value: 'dual_degree', label: 'Dual Degree' },
    { value: 'mtech', label: 'M.Tech' },
    { value: 'msc', label: 'M.Sc' },
    { value: 'phd', label: 'PhD' },
    { value: 'other_degree', label: 'Other Degree' },
  ];

  const branchOptions = [
    { value: 'aero', label: 'Aerospace Engineering' },
    { value: 'cse', label: 'Computer Science Engineering' },
    { value: 'ee', label: 'Electrical Engineering' },
    { value: 'mech', label: 'Mechanical Engineering' },
    { value: 'chem', label: 'Chemistry' },
    { value: 'biosci', label: 'Biosciences & Bioengineering' },
    { value: 'che', label: 'Chemical Engineering' },
    { value: 'eco', label: 'Economics' },
    { value: 'ieor', label: 'Industrial Engineering and Operations Research' },
    { value: 'metallurgy', label: 'Metallurgical Engineering and Material Science' },
    { value: 'engphy', label: 'Engineering Physics' },
    { value: 'envsci', label: 'Environmental Science & Engineering' },
    { value: 'energy', label: 'Energy Science & Engineering' },
    { value: 'math', label: 'Mathematics' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'earthsci', label: 'Earth Sciences and Resource Engineering' },
    { value: 'rural', label: 'Technology for Rural Areas' },
    { value: 'design', label: 'Design' },
    { value: 'other', label: 'Other (If not mentioned above)' },
  ];

  const { signup, loading, error, success } = UseSignup();

  const handleRegistration = async () => {
  const userData = {
    fullname: name,
    ldap: emailId + '@iitb.ac.in',
    roll: rollNumber,
    dept: department,
    degree: degree,
    password: password,
    contact: contactNumber,
  };

  const result = await signup(userData);

  if (result.success) {
    Swal.fire({
      icon: "success",
      title: "Registration Successful!",
      text: "Verification link has been sent to your webmail. Please verify your account to login.",
      confirmButtonText: "OK"
    }).then((res) => {
      if (res.isConfirmed) {
        navigate('/login');
      }
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Registration Failed",
      text: result.message || "Something went wrong. Please try again.",
      confirmButtonText: "Retry"
    });
  }
};


  return (
    localStorage.getItem('accessToken') !== null ? <Navigate to="/login" /> :
    <div className='form-container'>
       <div className="image-containerr">
                <img src={logo} alt="Logo" className="logoo" />
              </div>
      
      
      <div className="form-box">
        <input
          type="text"
          placeholder="NAME"
          value={name}
          onChange={handleNameChange}
          className='input-field'
        />
        
        
        <input
          type="text"
          placeholder="LDAP ID"
          value={emailId}
          onChange={handleEmailIdChange}
          className='input-field'
        />

        <input
          type="text"
          placeholder="ROLL NUMBER"
          value={rollNumber}
          onChange={handleRollNumberChange}
          className='input-field'
        />

        <Select
          options={branchOptions}
          styles={customStyles}
          placeholder="DEPARTMENT"
          onChange={handleDepartmentChange}
          classNamePrefix="react-select"
        />

        <Select
          options={degreeOptions}
          styles={customStyles}
          placeholder="DEGREE"
          onChange={handleDegreeChange}
          classNamePrefix="react-select"
        />

        <input
          type="text"
          placeholder="CONTACT NUMBER"
          value={contactNumber}
          onChange={handleContactNumberChange}
          className='input-field'
        />

        <input
          type="password"
          placeholder="PASSWORD"
          value={password}
          onChange={handlePasswordChange}
          className='input-field'
        />

        <button
          className={allFieldsFilled() ? 'register-button' : 'register-button button-disabled'}
          onClick={handleRegistration}
          disabled={!allFieldsFilled() || loading}
        >
          {loading ? 'REGISTERING...' : 'REGISTER'}
        </button>

        <div className="login-link">
          Already registered? <a href="/login">LOG IN</a>
        </div>
      </div>
    </div>
  );
}

export default Register;