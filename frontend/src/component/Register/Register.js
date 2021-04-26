import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { register, clearErrors } from "../../redux/Actions/userAction"

const Register = ({ history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [password, setpassword] = useState('')

    const dispatch = useDispatch();
    const alert = useAlert()

    const { isAuthenticated, loading, error } = useSelector(state => state.users)

    useEffect(() => {

        if (isAuthenticated) {
            history.push('/login')
            alert.success("Registration Successful")
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [isAuthenticated, dispatch, alert, error, history])

    const userDeatils = {
        name, email, mobile, password
    }
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(userDeatils))
    }

    return (
        <Fragment>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="exampleInputName1">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputName1"
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
          </small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputMobile1">Mobile</label>
                    <input
                        type="text"
                        className="form-control"
                        id="exampleInputMobile1"
                        name="mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter Mobile"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                        name='password'
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading ? true : false}>
                    REGISTER
        </button>
            </form>
        </Fragment>
    );
};

export default Register;
