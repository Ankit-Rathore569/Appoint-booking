import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="#">Navbar</Link>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className="nav-link btn btn-danger text-white" to="/login">Login <span className="sr-only">(current)</span></Link>
                        </li>
                    </ul>

                </div>
            </nav>
        </Fragment>
    )
}

export default Header
