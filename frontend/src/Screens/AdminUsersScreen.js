import React, { useEffect, useState } from 'react';
import { Container, Row, Col, InputGroup, Form, Button, Table, Modal } from 'react-bootstrap';
import { listUsersAction, userDeleteAction } from '../Actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'
import { USER_DELETE_RESET } from '../Constants/userContstants';
import Loader from '../components/Loader';
import Message from "../components/Message"

const AdminUsersScreen = () => {


    // STATE FOR PAGINATION
    const [page, setPage] = useState(1);

    // STATE FOR SERACH STRINGS
    const [searchResult, setSearchResult] = useState("")


    //SETTING USER ID 
    const [userId, setUserId] = useState(null)


    // MODAL STATE
    const [show, setShow] = useState(false);

    const handleClose = () => { setShow(false); setUserId(null) };
    const handleShow = () => setShow(true);


    const dispatch = useDispatch();


    // TO REDIRECT USING NAVIGATE HOOK
    const navigate = useNavigate();


    // GETTING USER DATA FORM STORE
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    // GETTING USERS LIST FROM STORE
    const listUsers = useSelector(state => state.listUsers)
    const { loading, error, users } = listUsers;


    // GETTING DELETED USER DATA FORM LIST
    const userDelete = useSelector(state => state.userDelete)
    const { loading: deleteLoading, error: deleteError, success: deleteSuccess } = userDelete





    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsersAction(page, searchResult))
        } else {
            navigate("/")
        }
    }, [userInfo])




    useEffect(() => {

        if (deleteSuccess) {
            dispatch({
                type: USER_DELETE_RESET
            })

            dispatch(listUsersAction(page, searchResult))
        }

    }, [deleteSuccess])






    // HANDLER TO SEARCH USER
    const searchUserHandler = () => {
        setPage(1);
        dispatch(listUsersAction(1, searchResult))
    }


    // HANDLER FOR PREV PAGE

    const prevHandler = () => {
        if (page !== 1) {
            setPage(page - 1);
            dispatch(listUsersAction(page - 1, searchResult))
        }
    }


    // HANDLER TO NEXT PAGE

    const nextHandler = () => {
        setPage(page + 1);
        dispatch(listUsersAction(page + 1, searchResult))

    }


    // HANDLER TO DELETE USER

    const deleteUserHandler = () => {

        dispatch(userDeleteAction(userId))
        handleClose()

    }




    return (
        <Container>


            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <h5>Delete User</h5>
                    </Modal.Header>
                    <Modal.Body>Are You Sure ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            No
                       </Button>
                        <Button variant="primary" onClick={deleteUserHandler}>
                            Yes
                       </Button>
                    </Modal.Footer>
                </Modal>
            </>


            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h4 className="text-center my-5">MANAGE USERS</h4>

                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Enter firstname only..."
                            aria-label="searchMovie"
                            aria-describedby="basic-addon2"
                            value={searchResult}
                            onChange={(e) => setSearchResult(e.target.value)}
                        />
                        <Button onClick={searchUserHandler} variant="outline-primary" id="button-addon2">
                            Search
                        </Button>

                        <Button onClick={() => {
                            setSearchResult("")
                            setPage(1)
                            dispatch(listUsersAction(1, ""))

                        }} variant="outline-secondary" id="button-addon3">
                            Clear
                        </Button>
                    </InputGroup>



                    <div className="d-flex justify-content-between">
                        <Link to="/">
                            <Button variant="secondary" className="my-5">Back</Button>
                        </Link>

                    </div>


                    {loading && <Loader />}
                    {error && <Message>{error}</Message>}

                    {deleteLoading && <Loader />}
                    {deleteError && <Message>{deleteError}</Message>}

                    {users && users.length > 0 ? (

                        <>

                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th >Name</th>
                                        <th className="text-center">Email</th>
                                        <th className="text-center">Delete User</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.map((user, i) => {

                                        return <tr key={user._id}>
                                            <td>{((page - 1) * 10) + (i + 1)}</td>
                                            <td className="text-primary">
                                                {user.firstname} {user.lastname}
                                            </td>
                                            <td className="text-center">

                                                {user.email}

                                            </td>
                                            <td className="text-center">
                                                <Button
                                                    onClick={() => {
                                                        setUserId(user._id)
                                                        handleShow()
                                                    }}
                                                    variant="danger" size='sm'>
                                                    DELETE
                                                </Button>
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </Table>



                        </>

                    ) : (
                            <>
                                <Message>No Users in the List</Message>
                            </>
                        )



                    }

                    <div className="d-flex justify-content-between my-5">
                        <Button disabled={page === 1} onClick={prevHandler} variant="outline-secondary">Prev</Button>
                        {(users && users.length === 10) && (
                            <Button onClick={nextHandler} variant="outline-secondary">Next</Button>
                        )}
                    </div>

                </Col>
            </Row>
        </Container>
    )
}

export default AdminUsersScreen
