import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Header from '../Header';
import './index.css';
import UserHeader from '../UserHeader';

// Firebase configuration
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

// Initialize Firebase
initializeApp(firebaseConfig);
const firestore = getFirestore();

const Admissions = () => {
  const [allData, setAllData] = useState([]);
  const [admissionData, setAdmissionData] = useState([]);
  const [years] = useState([
    '2021-22', '2020-21', '2019-20', '2018-19', 
    '2017-18', '2016-17', '2015-16', '2014-15'
  ]);
  const [selectedYear, setSelectedYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAllAdmissionData();
  }, []);

  const fetchAllAdmissionData = async () => {
    setLoading(true);
    try {
      const collectionRef = collection(firestore, 'admission');
      const querySnapshot = await getDocs(collectionRef);
      const data = querySnapshot.docs.map(doc => doc.data());
      setAllData(data);
      // Removed setMessage for data import success
    } catch (error) {
      console.error("Error fetching admissions data: ", error);
      setMessage('Failed to import data');
    }
    setLoading(false);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleGoClick = () => {
    const filteredData = allData.filter(item => item.Year === selectedYear);
    setAdmissionData(filteredData);
  };

  return (
      <div>
        <UserHeader />
        <div className="dropdown-container"> {/* Centered dropdown */}
          <select value={selectedYear} onChange={handleYearChange} className="year-dropdown">
            <option value="">Select Year</option>
            {years.map((year, index) => (
              <option key={index} value={year}>{year}</option>
            ))}
          </select>
          <button onClick={handleGoClick}>Go</button>
        </div>
        {!loading && admissionData.length > 0 && (
          <table className="admission-table"> {/* Styled table */}
            <thead>
              <tr>
                <th>Program</th>
                <th>Intake</th>
                <th>Admitted</th>
                <th>AdmittedPercent</th>
                <th>LateralCount</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {admissionData.map((item, index) => (
                <tr key={index}>
                  <td>{item.Program}</td>
                  <td>{item.Intake}</td>
                  <td>{item.Admitted}</td>
                  <td>{item.Admittedpercent}</td>
                  <td>{item.LateralCount}</td>
                  <td>{item.Year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
};

export default Admissions;
