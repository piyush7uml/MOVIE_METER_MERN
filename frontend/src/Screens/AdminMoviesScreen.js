import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Table, Button, Toast, Modal, InputGroup, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate } from 'react-router-dom'
import { getAllMoviesAction, deleteMovieAction } from '../Actions/movieActions';
import { DELETE_MOVIE_RESET } from '../Constants/movieConstants';



const AdminMoviesScreen = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate()


    // GETTING ALL MOVIES DATA FROM STORE
    const getAllMovies = useSelector(state => state.getAllMovies)
    const { loading, movies, error } = getAllMovies;


    // GETTING USER DATA FROM STORE
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // GETTING DELETE MOVIE DATA FROM STORE
    const deleteMovie = useSelector(state => state.deleteMovie)
    const { loading: deleteLoading, error: deleteError, success } = deleteMovie

    // SETTING MOVIE ID 
    const [movieId, setMovieId] = useState(null)


    // MODAL STATE 
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false); setMovieId(null) };
    const handleShow = () => setShow(true);

    const [searchResult, setSearchResult] = useState("")

    const [page, setPage] = useState(1)







    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {

            dispatch(getAllMoviesAction(page))

        } else {
            navigate("/")
        }

    }, [userInfo])





    useEffect(() => {

        if (success) {
            dispatch(getAllMoviesAction(page))
            dispatch({
                type: DELETE_MOVIE_RESET
            })
        }

    }, [success])






    // HANDLER FOR SEARCH MOVIE

    const searchMovieHandler = () => {
        setPage(1)
        dispatch(getAllMoviesAction(1, searchResult))

    }




    // HANDLER TO DELETE MOVIE

    const deleteMovieHandler = () => {

        dispatch(deleteMovieAction(movieId))
        handleClose()

    }


    // PREV PAGE HANDLER
    const prevHandler = () => {

        if (page !== 1) {
            setPage(page - 1)
            dispatch(getAllMoviesAction(page - 1, searchResult))
        }
    }



    // NEXT PAGE HANDLER
    const nextHandler = () => {

        setPage(page + 1)
        dispatch(getAllMoviesAction(page + 1, searchResult))
    }


    return (
        <Container>

            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <h5>Delete Movie</h5>
                    </Modal.Header>
                    <Modal.Body>Are You Sure ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            No
                       </Button>
                        <Button variant="primary" onClick={deleteMovieHandler}>
                            Yes
                       </Button>
                    </Modal.Footer>
                </Modal>
            </>


            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h4 className="text-center my-5">MANAGE MOVIES</h4>

                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="search movie..."
                            aria-label="searchMovie"
                            aria-describedby="basic-addon2"
                            value={searchResult}
                            onChange={(e) => setSearchResult(e.target.value)}
                        />
                        <Button onClick={searchMovieHandler} variant="outline-primary" id="button-addon2">
                            Search
                        </Button>

                        <Button onClick={() => {
                            setSearchResult("")
                            setPage(1)
                            dispatch(getAllMoviesAction(1, ""))

                        }} variant="outline-secondary" id="button-addon3">
                            Clear
                        </Button>
                    </InputGroup>



                    <div className="d-flex justify-content-between">
                        <Link to="/">
                            <Button variant="secondary" className="my-5">Back</Button>
                        </Link>

                        <Link to="/admin/movies/add">
                            <Button variant="primary" className="my-5">Add Movie</Button>
                        </Link>
                    </div>


                    {loading && <Loader />}
                    {error && <Message>{error}</Message>}

                    {deleteLoading && <Loader />}
                    {deleteError && <Message>{deleteError}</Message>}

                    {movies && movies.length > 0 ? (

                        <>

                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th >Movie</th>
                                        <th className="text-center">Edit Movie</th>
                                        <th className="text-center">Delete Movie</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {movies.map((movie, i) => {

                                        return <tr key={movie._id}>
                                            <td>{((page - 1) * 9) + (i + 1)}</td>
                                            <td className="text-primary">
                                                <Link to={`/movies/get/${movie._id}`} style={{ textDecoration: 'none' }}>
                                                    {movie.name}
                                                </Link>
                                            </td>
                                            <td className="text-center">

                                                <Link to={`/admin/movies/edit/${movie._id}`}>
                                                    <Button variant="secondary" size='sm'>
                                                        EDIT
                                                   </Button>
                                                </Link>

                                            </td>
                                            <td className="text-center">
                                                <Button
                                                    onClick={() => {
                                                        setMovieId(movie._id)
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
                                <Message>No Movies in the List</Message>
                            </>
                        )



                    }

                    <div className="d-flex justify-content-between my-5">
                        <Button disabled={page === 1} onClick={prevHandler} variant="outline-secondary">Prev</Button>
                        {(movies && movies.length > 8) && (
                            <Button onClick={nextHandler} variant="outline-secondary">Next</Button>
                        )}
                    </div>

                </Col>
            </Row>
        </Container>
    )
}

export default AdminMoviesScreen
