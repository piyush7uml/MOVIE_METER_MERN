import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormContainer from '../components/FormContainer';
import { userLoginAction } from '../Actions/userActions';
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate, Link } from 'react-router-dom'


const LoginScreen = () => {


    // FORM FIELDS
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");


    const dispatch = useDispatch();


    // GETTING USER DATA FROM STORE
    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo, error } = userLogin;


    // TO REDIRECT USING NAVIGATE HOOK
    const navigate = useNavigate()




    useEffect(() => {

        if (userInfo && userInfo.firstname) {
            navigate("/")
        }

    }, [userInfo, navigate])






    // HANDLER TO LOGIN USER

    const loginHandler = (e) => {
        e.preventDefault();

        setMessage("");

        if (email && password) {

            dispatch(userLoginAction({ email, password }))

        } else {
            setMessage("Email and Password both Are Mandatory")
        }
    }


    return (

        <FormContainer>
            <h3 className="my-4 text-center">Login</h3>
            {loading && <Loader />}
            {error && <Message>{error}</Message>}
            {message && <Message>{message}</Message>}
            <Form onSubmit={loginHandler}>

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



                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
            <p className="my-3">New User ? <Link to="/register">Register</Link></p>
        </FormContainer>
    )
}

export default LoginScreen
