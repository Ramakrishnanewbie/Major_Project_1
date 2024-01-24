import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import UserHeader from '../UserHeader';
import './index.css';

// Your web app's Firebase configuration

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC3mjvIXgowrzAntZfdwqgg0RNk6y4rwXk",
    authDomain: "major-745ad.firebaseapp.com",
    databaseURL: "https://major-745ad-default-rtdb.firebaseio.com",
    projectId: "major-745ad",
    storageBucket: "major-745ad.appspot.com",
    messagingSenderId: "460361188074",
    appId: "1:460361188074:web:cbe928a362bf723ad70d93",
    measurementId: "G-EZFP9MH10Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const FacultyComponent = () => {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [facultyData, setFacultyData] = useState([]);

  const programs = {
    "B.Tech": [
      "INFORMATION TECHNOLOGY",
      "ELECTRICAL AND ELECTRONICS ENGINEERING",
      "COMPUTER SCIENCE AND ENGINEERING",
      "MECHANICAL ENGINEERING",
      "CHEMICAL ENGINEERING",
      "CIVIL ENGINEERING",
      "ARTIFICIAL INTELLIGENCE",
      "ELECTONICS AND COMMUNICATION ENGINEERING",
      "COMPUTER SCIENCE ENGINEERING( CYBER SECURITY)",
      "COMPUTER SCIENCE ENGINEERING( DATA SCIENCE)",
      "CONSTRUCTION TECHNOLOGY AND MANAGEMENT",
      "CHEMICAL ENGINEERING"
    ],
    "M.Tech": [
      "VLSI DESIGN SYSTEM",
      "STRUCTURAL ENGINEERING",
      "CYBER SECURITY",
      "EMBEDDED SYSTEMS",
      "ARTIFICIAL INTELLIGENCE",
      "DATA SCIENCES",
      "CONSTRUCTION TECHNOLOGY AND MANAGEMENT",
      "ADDITIVE MANUFACTURING",
      "POWER ELECTRONICS AND ELECTRICAL DRIVES",
      "ROBOTICS AND AUTOMATION",
      "CIVIL",
      "MACHINE DESIGN"
    ],
    "Ph.D": [
      "COMPUTER SCIENCE AND ENGINEERING",
      "CHEMICAL ENGINEERING",
      "CIVIL ENGINEERING",
      "MECHANICAL ENGINEERING",
      "ELECTONICS AND COMMUNICATION ENGINEERING",
      "ELECTRICAL AND ELECTRONIC ENGINEERING",
      "CSE (SPECIALIZATION IN ARTIFICIAL INTELLIGENCE)",
      "CSE (SPECIALIZATION IN IT)"
    ],
    "M.Pharm": [
      "PHARMACEUTICS",
      "PHARMACOLOGY",
      "INDUSTRIAL PHARMACY",
      "DOCTOR OF PHARMACY",
      "PHARMA ANALYSIS",
      "PHARMACEUTICAL REGULATORY AFFAIRS"
    ],
    "B.Pharm": [
      "BACHELOR OF PHARMACY"
    ],
    "BBA": [
      "BACHELOR OF BUSINESS ADMINISTRATION"
    ],
    "B.Com": [
      "BACHELOR OF COMMERCE"
    ],
    "B.Sc": [
      "BACHELOR OF SCIENCE-DATA SCIENCE",
      "BACHELOR OF SCIENCE-ARTIFICIAL INTELLIGENCE"
    ],
    "B.J": [
      "BACHELOR OF JOURNALISM"
    ],
    "B.A": [
      "BACHELOR OF ARTS"
    ]
    // ... other programs and their departments can be added here ...
  };
  

  useEffect(() => {
    // Update the departments based on the selected program
    if (selectedProgram) {
      setDepartments(programs[selectedProgram] || []);
    }
  }, [selectedProgram]);

  const handleProgramChange = (event) => {
    const program = event.target.value;
    setSelectedProgram(program);
  
    // Reset the department selection when program changes
    setSelectedDepartment('');
  
    // Update departments list based on the selected program
    // Use a Set to ensure unique values
    const uniqueDepartments = new Set(programs[program]);
    setDepartments([...uniqueDepartments]);
  };
  

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const fetchFacultyData = async () => {
    try {
      // Adjust the query to match the case and structure of your Firestore collection
      const q = query(
        collection(db, "faculty"),
        where("Program", "==", selectedProgram.toUpperCase()),
        where("f_branch", "==", selectedDepartment.toUpperCase())
      );
  
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => {
        const faculty = doc.data();
        // Mapping keys based on your Firestore document structure
        return {
          name: faculty.f_name,   // Assuming 'f_name' is the correct key
          course: faculty.f_course,  // Assuming 'f_course' is the correct key
          branch: faculty.f_branch,  // Assuming 'f_branch' is the correct key
          gender: faculty.f_gender,  // Assuming 'f_gender' is the correct key
          caste: faculty.Caste  // Assuming 'Caste' is the correct key
        };
      });
      setFacultyData(data);
    } catch (error) {
      console.error("Error fetching faculty data: ", error);
    }
  };
  

  return (
    <>
          
    <UserHeader />
    <div className="dropdown-container">
  <select value={selectedProgram} onChange={handleProgramChange}>
    <option value="">Select Program</option>
    {Object.keys(programs).map(program => (
      <option key={program} value={program}>{program}</option>
    ))}
  </select>
  
  <select value={selectedDepartment} onChange={handleDepartmentChange} disabled={!selectedProgram}>
    <option value="">Select Department</option>
    {departments.map(department => (
      <option key={department} value={department}>{department}</option>
    ))}
  </select>
  
  {/* Since data is now filtered on the client-side, the "GO" button is no longer needed. */}
</div>
      
      <button onClick={fetchFacultyData}>GO</button>

      {facultyData.length > 0 && (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Course</th>
        <th>Branch</th>
        <th>Gender</th>
        <th>Caste</th>
        {/* Add other table headers here if needed */}
      </tr>
    </thead>
    <tbody>
      {facultyData.map((faculty, index) => (
        <tr key={index}>
          <td>{faculty.name}</td>
          <td>{faculty.course}</td>
          <td>{faculty.branch}</td>
          <td>{faculty.gender}</td>
          <td>{faculty.caste}</td>
          {/* Render other faculty data here if needed */}
        </tr>
      ))}
    </tbody>
  </table>
)}

    
    </>
  );
};

export default FacultyComponent;