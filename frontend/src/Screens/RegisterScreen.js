import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormContainer from '../components/FormContainer';
import { userRegisterAction } from '../Actions/userActions';
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom'

const RegisterScreen = () => {


    // FORM FIELDS
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();


    // GETTING USER DATA FROM STORE AFTER REGISTER
    const userRegister = useSelector(state => state.userRegister);
    const { loading, error } = userRegister

    // GETTING USER DATA FROM STORE
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;


    // TO REDIRECT USING NAVIGATE HOOK
    const navigate = useNavigate()





    useEffect(() => {

        if (userInfo && userInfo.firstname) {
            navigate("/")
        }

    }, [userInfo, navigate])






    // HANDLER TO REGISTER USER

    const registerHandler = (e) => {
        e.preventDefault();

        setMessage("");

        if (firstname && lastname && email && password && confirmPassword) {

            if (confirmPassword === password) {

                dispatch(userRegisterAction({
                    firstname, lastname, email, password
                }))

            } else {
                setMessage("Passwords do not Match")
            }

        } else {
            setMessage("All Fields Are Mandatory")
        }
    }




    return (

        <FormContainer>
            <h3 className="my-4 text-center">Register</h3>
            {loading && <Loader />}
            {error && <Message>{error}</Message>}
            {message && <Message>{message}</Message>}
            <Form onSubmit={registerHandler}>
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
                    Register
                </Button>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen
