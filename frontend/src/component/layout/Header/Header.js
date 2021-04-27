import React, { Fragment } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../../redux/Actions/userAction'

const Header = () => {
    const { user, loading } = useSelector(state => state.users)
    const alert = useAlert()
    const dispatch = useDispatch()


    const logoutHandler = () => {
        dispatch(logout());
        alert.success('Logged out successfully.')
    }

    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="#">Navbar</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {user ? (
                        <ul className="navbar-nav mr-auto">

                            <li className="nav-item active mr-2">
                                <Link className="nav-link" to="/admin/dashboard">DashBoard<span className="sr-only"></span></Link>
                            </li>

                            <li className="nav-item active mr-2">
                                <Link className="nav-link" to="/admin/request">Appointment Request<span className="sr-only"></span></Link>
                            </li>
                            <li className="nav-item active mr-2">
                                <Link className="nav-link" to="/" onClick={logoutHandler}>
                                    Logout
                                </Link>
                            </li>
                        </ul>
                    ) : (
                        !loading && <Link className="nav-link btn btn-danger text-white" to="/login">Login<span className="sr-only">(current)</span></Link>
                    )
                    }
                </div >
            </nav >
        </Fragment >
    )
}

export default Header
