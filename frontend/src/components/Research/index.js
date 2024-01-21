import React, { Component } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import Header from '../Header';
import './index.css';

// Firebase configuration
const firebaseConfig = {
    // your firebase config
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

class ResearchGrants extends Component {
  state = {
    allData: [],
    filteredData: [],
    departments: [
      'Information Technology', 
      'Electrical and Electronics Engineering',
      'Pharmacy', 
      'Electronics and Communication Engineering', 
      'English',
      'Computer Science and Engineering', 
      'Chemical Engineering',
      'Business Management', 
      'Mathematics', 
      'Institution', 
      'MBA', 
      'Physics'
    ],
    selectedDepartment: '',
    loading: false,
    message: ''
  };

  componentDidMount() {
    this.fetchResearchGrantsData();
  }

  fetchResearchGrantsData = async () => {
    this.setState({ loading: true });
    try {
      const collectionRef = collection(firestore, 'researchgrants');
      const querySnapshot = await getDocs(collectionRef);
      const data = querySnapshot.docs.map(doc => doc.data());
      this.setState({
        allData: data
      });
      
    } catch (error) {
      console.error("Error fetching research grants data: ", error);
      this.setState({ message: 'Failed to import data' });
    }
    this.setState({ loading: false });
  };

  handleDepartmentChange = (e) => {
    this.setState({ selectedDepartment: e.target.value });
  };

  handleGoClick = () => {
    const filteredData = this.state.allData.filter(item => item.Department === this.state.selectedDepartment);
    this.setState({ filteredData });
  };

  renderTable = () => {
    const { filteredData } = this.state;
    return (
      <div className="table-container">
      <table className="research-table">
        <thead>
          <tr>
            <th>Investigator</th>
            <th>Department</th>
            <th>Funding Agency</th>
            <th>Sanctioned Amount</th>
            <th>Year Of Sanction</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.Investigator}</td>
              <td>{item.Department}</td>
              <td>{item.FundingAgency}</td>
              <td>{item.SanctionedAmount}</td>
              <td>{item.YearOfSanction}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  };

  render() {
    const { departments, selectedDepartment, loading, message } = this.state;
    return (
      <>
        <Header />
        <div className="dropdown-container">
          <select value={selectedDepartment} onChange={this.handleDepartmentChange} className="department-dropdown">
            <option value="">Select Department</option>
            {departments.map((dept, index) => (
              <option key={index} value={dept}>{dept}</option>
            ))}
          </select>
          <button onClick={this.handleGoClick}>Go</button>
        </div>
        {this.state.filteredData.length > 0 && this.renderTable()}
      </>
    );
  }
}

export default ResearchGrants;
