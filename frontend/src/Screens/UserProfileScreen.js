import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Modal } from 'react-bootstrap';
import { USER_DELETE_RESET, USER_UPDATE_RESET } from '../Constants/userContstants';
import { logoutAction, userDeleteAction, userUpdateAction } from '../Actions/userActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';


const UserProfileScreen = () => {

    // FORM FIELDS
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");



    const dispatch = useDispatch()

    // USER ID FROM PARAMS
    const { userId } = useParams();

    // TO REDIRECT USING NAVIGATE HOOK
    const navigate = useNavigate();


    // GETTING DELETED USER DATA FROM STORE
    const userDelete = useSelector(state => state.userDelete)
    const { loading: deleteLoading, error: deleteError, success: deleteSuccess } = userDelete;


    // GETTING USER DATA FROM STORE
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    // GETTING UPDATED USER DATA FROM STORE

    const updateUser = useSelector(state => state.updateUser)
    const { loading: updateLoading, error: updateError, success: updateSuccess } = updateUser


    // STATE TO MANAGE MODAL 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);






    useEffect(() => {

        if (userInfo && userInfo._id) {

            setFirstname(userInfo.firstname)
            setLastname(userInfo.lastname)
            setEmail(userInfo.email)

        } else {
            navigate("/")
        }

    }, [userInfo])




    useEffect(() => {

        if (deleteSuccess) {
            dispatch({
                type: USER_DELETE_RESET
            })
            dispatch(logoutAction())
            navigate('/')
        }

        if (updateSuccess) {
            dispatch({
                type: USER_UPDATE_RESET
            })
        }

    }, [deleteSuccess, updateSuccess])





    // HANDLER TO UPDATE USER PROFILE

    const updateProfileHandler = (e) => {
        e.preventDefault();

        setMessage("");

        if (firstname && lastname && email) {

            if (password) {
                if (password !== confirmPassword) {
                    setMessage('Passwords do not match')
                    return;
                }

            }

            dispatch(userUpdateAction({
                firstname, lastname, email, password
            }))

        } else {
            setMessage("Firstname Lastname and Email can not be empty")
        }
    }




    // HANDLER TO DELETE USER
    const userDeleteHandler = () => {
        dispatch(userDeleteAction(userId))
        handleClose()
    }


    return (

        <>
            <>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <h5>Delete Review</h5>
                    </Modal.Header>
                    <Modal.Body>Are You Sure ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            No
                        </Button>
                        <Button variant="primary" onClick={userDeleteHandler}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

            <FormContainer>
                <h4 className="my-4 text-center">Update Profile</h4>
                {deleteLoading && <Loader />}
                {deleteError && <Message>{deleteError}</Message>}
                {updateLoading && <Loader />}
                {updateError && <Message>{updateError}</Message>}
                {message && <Message>{message}</Message>}

                <Form onSubmit={updateProfileHandler}>
                    <Form.Group className="mb-3" controlId="firstname">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="lastname">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Last Name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Update
                </Button>
                </Form>

                <Button className="my-5 text-center" onClick={handleShow} variant="danger">
                    Deactivate My Account
            </Button>
            </FormContainer>


        </>
    )
}

export default UserProfileScreen
