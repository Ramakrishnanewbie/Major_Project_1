import {Component} from 'react'
import {Link} from 'react-router-dom'
import logo from './logo.jpeg'
import UserHome from '../UserHome'
import './index.css'


class UserHeader extends Component{
    render(){
        return(
            <nav className='nav-container'>   
                <ul className='ulist-container'>
                    <li>
                    <Link to='/userhome'>
                            <img src={logo} alt='logo' className='logo'/>
                    </Link>
                    </li>
                    <li>
                        <Link to='/students'>
                            <button type='button' className='btn'>Students</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/faculty'>
                            <button type='button' className='btn'>Faculty</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/programs'>
                            <button type='button' className='btn'>Programs</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/admissions'>
                            <button type='button' className='btn'>Admissions</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/research-grants'>
                            <button type='button' className='btn'>Research Grants</button>
                        </Link>
                    </li>
                    <li>
                        <button type='button' className='btn'>Logout</button>
                    </li>
                </ul>
                <hr className='hrule'/>
            </nav>
            
        )
    }
}

export default UserHeader