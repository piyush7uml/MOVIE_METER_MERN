import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, InputGroup, Form, Button, Table, Modal } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useNavigate, Link } from 'react-router-dom';
import { getWatchlistAction, userWatchlistAction } from '../Actions/userActions';
import { USER_WATCHLIST_RESET } from '../Constants/userContstants';


const MyWatchedListScreen = () => {


    // DISPATCH HOOK TO DISPATCH ACTION
    const dispatch = useDispatch();

    // TO REDIRECT USING NAVIGATE HOOK
    const navigate = useNavigate()

    // GETTING USER DATA FROM STORE
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin


    // GETTING WATCHED LIST DATA FROM STORE
    const getWatchedList = useSelector(state => state.getWatchedList);
    const { loading, error, myWatchedList } = getWatchedList


    // GETTING WATCHED LIST AFTER SETTING DATA FROM STORE
    const userWatchlist = useSelector(state => state.userWatchlist)

    const { loading: setLoading, error: setError, success: setSuccess } = userWatchlist


    //STATE FOR SEARCH STRINGS
    const [searchResult, setSearchResult] = useState("")

    const [page, setPage] = useState(1)


    // STATE FOR MOVIE ID
    const [movieId, setMovieId] = useState(null)


    // STATE FOR MODAL
    const [show, setShow] = useState(false);

    const handleClose = () => { setShow(false); setMovieId(null) };
    const handleShow = () => setShow(true);




    useEffect(() => {
        dispatch(getWatchlistAction(page, searchResult))
    }, [])




    useEffect(() => {

        if (userInfo && userInfo._id) {

            if (setSuccess) {

                dispatch({
                    type: USER_WATCHLIST_RESET
                })

                dispatch(getWatchlistAction(page, searchResult))
            }

        } else {
            navigate("/")
        }

    }, [userInfo, setSuccess])






    // HANDLER TO SERACH MOVIE
    const searchMovieHandler = () => {
        setPage(1)
        dispatch(getWatchlistAction(1, searchResult))
    }



    // HANDLER TO SET WATCHED LIST
    const setWatchedListHandler = () => {

        dispatch(userWatchlistAction(movieId, 'remove'))
        handleClose()

    }



    // HANDLER TO GO PREV PAGE
    const prevHandler = () => {

        if (page !== 1) {
            setPage(page - 1)
            dispatch(getWatchlistAction(page - 1, searchResult))
        }
    }



    // HANDLER TO GO NEXT PAGE
    const nextHandler = () => {

        setPage(page + 1)
        dispatch(getWatchlistAction(page + 1, searchResult))
    }




    return (
        <Container>

            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <h5>Remove Movie</h5>
                    </Modal.Header>
                    <Modal.Body>Are You Sure ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            No
                       </Button>
                        <Button variant="primary" onClick={setWatchedListHandler}>
                            Yes
                       </Button>
                    </Modal.Footer>
                </Modal>
            </>

            <Row>
                <Col md={{ span: 8, offset: 2 }}>
                    <h4 className="text-center my-5">My Watched List</h4>

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
                            dispatch(getWatchlistAction(1, ""))

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
                    {setError && <Message>{setError}</Message>}
                    {setLoading && <Loader />}

                    {myWatchedList && myWatchedList.length > 0 ? (

                        <>

                            <Table bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th >Movie</th>
                                        <th className="text-center">Movie Details</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {myWatchedList.map((movie, i) => {

                                        return <tr key={movie._id}>
                                            <td>{((page - 1) * 10) + (i + 1)}</td>
                                            <td className="text-primary">
                                                <Link to={`/movies/get/${movie._id}`} style={{ textDecoration: 'none' }}>
                                                    {movie.name}
                                                </Link>
                                            </td>
                                            <td>

                                                <p className="text-center">Directer: <span className="text-primary">{movie.director}</span></p>

                                            </td>

                                            <td className="text-center">
                                                <Button
                                                    onClick={() => {
                                                        setMovieId(movie._id)
                                                        handleShow()
                                                    }}
                                                    variant="danger" size='sm'>
                                                    Remove From List
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
                        {(myWatchedList && myWatchedList.length > 9) && (
                            <Button onClick={nextHandler} variant="outline-secondary">Next</Button>
                        )}
                    </div>

                </Col>
            </Row>

        </Container>
    )
}

export default MyWatchedListScreen
