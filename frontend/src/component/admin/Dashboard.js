import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { allUsers, clearErrors } from '../../redux/Actions/userAction'
import { MDBDataTable } from 'mdbreact'
import Loader from "../layout/Loader/Loader"

const Dashboard = () => {
    const dispatch = useDispatch()

    const { loading, error, users } = useSelector(state => state.allusers)
    console.log("user in dash", users)

    useEffect(() => {
        dispatch(allUsers())

        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }

    }, [dispatch, error])

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        users?.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            })
        })

        return data;
    }

    return (
        <div className="col-12 col-md-10">
            <Fragment>
                <h1 className="my-5">All Users</h1>

                {loading ? <Loader /> : (
                    <MDBDataTable
                        data={setUsers()}
                        className="px-3"
                        bordered
                        striped
                        hover
                    />
                )}

            </Fragment>
        </div>
    )
}

export default Dashboard
