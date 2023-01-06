import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../Actions/userActions';

const HeaderComponent = () => {


    const dispatch = useDispatch()


    const userLogin = useSelector(state => state.userLogin)

    const { userInfo } = userLogin;


    const logoutHandler = () => {
        dispatch(logoutAction())
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand >Movie Meter <i class="fa-regular fa-clapperboard-play"></i></Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">



                        {(userInfo && userInfo.firstname) ? (
                            <>
                                <NavDropdown title={userInfo.firstname.toUpperCase()} id="basic-nav-dropdown">
                                    <LinkContainer to={`/user/profile/${userInfo._id}`}>
                                        <NavDropdown.Item >My Profile</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to={`/user/myReviews`}>
                                        <NavDropdown.Item >My Reviews</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to={`/user/myWatchList`}>
                                        <NavDropdown.Item >My Watched List</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler} >
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>

                            </>
                        ) : (
                                <>
                                    <LinkContainer to="/login">
                                        <Nav.Link >Login</Nav.Link>
                                    </LinkContainer>
                                </>
                            )}


                        {(userInfo && userInfo.isAdmin) ? (
                            <>
                                <NavDropdown title="ADMIN" id="basic-nav-dropdown">
                                    <LinkContainer to="/admin/movies">
                                        <NavDropdown.Item >Manage Movies</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/admin/users">
                                        <NavDropdown.Item >Manage Users</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>

                            </>
                        ) : null}


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default HeaderComponent
