import {Component} from 'react'
import {Link} from 'react-router-dom'
import logo from './logo.jpeg'

import './index.css'


class AdminHeader extends Component{
    render(){
        return(
            <nav className='nav-container'>   
                <ul className='ulist-container'>
                    <li>
                        <Link to="/AdminHome">
                            <img src={logo} alt='logo' className='logo'/>
                        </Link>
                    </li>
                    <li>
                        <Link to='/adduser'>
                            <button type='button' className='btn'>Add User</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/viewuser'>
                            <button type='button' className='btn'>View User</button>
                        </Link>
                    </li>
                    <li>
                        <Link to='/upload'>
                            <button type='button' className='btn'>Upload Files</button>
                        </Link>
                    </li>

                    <li>
                        <Link to='/deleteuser'>
                            <button type='button' className='btn'>Delete User</button>
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

export default AdminHeader;