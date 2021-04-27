import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link } from 'react-router-dom'
import Loader from "../layout/Loader/Loader";
import { login, clearErrors } from "../../redux/Actions/userAction";

const Login = ({ history, location }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const alert = useAlert();

    const { isAuthenticated, loading, error, user } = useSelector(
        (state) => state.users
    );

    useEffect(() => {
        if (isAuthenticated) {
            if (user.role === "admin") {
                history.push("/admin/dashboard");
            }
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    });

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />
                        <small id="emailHelp" className="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>

                    <Link to="/register" className="float-right mt-3">
                        New User?
                     </Link>
                </form>
            )}
        </Fragment>
    );
};

export default Login;
