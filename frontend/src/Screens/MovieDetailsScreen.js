import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, ListGroup, Form, Button, } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getMovieAction } from '../Actions/movieActions';
import { useParams, Link } from 'react-router-dom';
import Rating from '../components/Rating';
import ReviewComp from '../components/ReviewComp';
import { createReviewAction, getReviewsByMovieAction } from '../Actions/reviewActions';
import { CREATE_REVIEW_RESET, DELETE_REVIEW_RESET } from '../Constants/reviewConstants';
import { userWatchlistAction } from '../Actions/userActions';
import { USER_WATCHLIST_RESET } from '../Constants/userContstants';

const MovieDetailsScreen = () => {


    // OPTION TO SELECT RATING FOR MOVIE
    const options = [1, 2, 3, 4, 5];


    // REVIEW FOR MOVIE FORM FIELDS
    const [rating, setRating] = useState(1);
    const [reviewText, setReviewText] = useState("");


    // STATE FOR PAGINATION
    const [page, setPage] = useState(1)

    // SORT OPTION FOR REVIEWS
    const catOptions = ['Recent', 'Top rated', 'Low rated']
    const [category, setCategory] = useState(catOptions[0]);


    const dispatch = useDispatch();

    // GETTING USER DATA FROM STORE
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;


    // GETTING MOVIE DATA FROM STORE
    const getMovie = useSelector(state => state.getMovie)
    const { loading, movie, error } = getMovie;

    // MOVIE ID FROM PARAMS
    const { id } = useParams()


    // GETTING CREATED REVIEW DATA FROM STORE
    const createReview = useSelector(state => state.createReview)
    const { loading: createdReviewLoading, error: createdReviewError, reviewCreated, success: createdReviewSuccess } = createReview

    // GETTING MOVIE REVIEWS DATA FROM STORE
    const getReviewsByMovie = useSelector(state => state.getReviewsByMovie)
    const { loading: getReviewsLoading, error: getReviewsError, reviewsForMovie, success: getReviewsSuccess } = getReviewsByMovie;


    // GETTING DELETED REVIEW DATA FROM STORE
    const deleteReview = useSelector(state => state.deleteReview)
    const { error: deleteError, success: deleteSuccess } = deleteReview


    // GETTING USER WATCHED LIST DATA FROM STORE
    const userWatchlist = useSelector(state => state.userWatchlist)
    const { loading: watchlistLoading, error: watchlistError, success: watchlistSuccess } = userWatchlist







    useEffect(() => {
        dispatch(getMovieAction(id));
        dispatch(getReviewsByMovieAction(1, id, category))
    }, [])





    useEffect(() => {

        if (createdReviewSuccess) {
            dispatch({
                type: CREATE_REVIEW_RESET
            });
            dispatch(getReviewsByMovieAction(1, id, category))
        }

        if (deleteSuccess) {
            dispatch({
                type: DELETE_REVIEW_RESET
            });
            dispatch(getReviewsByMovieAction(1, id, category))
        }

        if (watchlistSuccess) {
            dispatch({
                type: USER_WATCHLIST_RESET
            })
        }

    }, [createdReviewSuccess, deleteSuccess, watchlistSuccess])







    // HANDLER TO CREATE REVIEW
    const createReviewHandler = (e) => {
        e.preventDefault();
        dispatch(createReviewAction({ movieName: movie.name, rating, reviewText }, movie._id))
    }


    // HANDLER TO SET WATCHED LIST
    const setWatchListHandler = (status) => {
        dispatch(userWatchlistAction(movie._id, status))
    }



    // HANDLER FOR PREV PAGE OF REVIEWS

    const prevReviewsHandler = () => {

        if (page !== 1) {
            setPage(page - 1)
            dispatch(getReviewsByMovieAction(page - 1, id, category))

        }
    }


    // HANDLER FOR NEXT PAGE OF REVIEWS

    const nextReviewsHandler = () => {

        setPage(page + 1)
        dispatch(getReviewsByMovieAction(page + 1, id, category))

    }



    // SORT REVIEWS BY OPTIONS HANDLER

    const sortByHandler = (e) => {
        e.preventDefault();

        setPage(1)

        setCategory(e.target.value)

        dispatch(getReviewsByMovieAction(1, id, e.target.value))


    }



    return (
        <Container className="my-5">
            {error && <Message>{error}</Message>}
            {loading && <Loader />}

            {movie && (
                <Row >
                    <Col md={6} style={{ margin: "0 auto" }}>
                        <Image src={movie.image.secure_url} fluid
                            style={{
                                display: "block",
                                width: "70%",
                                height: "auto",
                                margin: "0 auto"
                            }}
                        />
                    </Col>

                    <Col md={6}>
                        <h3 className="mt-2">{movie.name}</h3>
                        <p className="mb-4 mt-3 font-medium text-white-50"><span >{movie.description}</span></p>

                        <p className="my-3 font-medium">Directed By : <span className="text-primary">{movie.director}</span></p>
                        <p className="my-3 font-medium">Wriiten By : <span className="text-primary">{movie.writer}</span></p>
                        <p className="my-3 font-medium">Produced By : <span className="text-primary">{movie.producer}</span></p>
                        <p className="my-3 font-medium">Star Cast: <span className="text-primary">{movie.starcast}</span> </p>
                        <p className="my-3 font-medium">Release Date: <span className="text-primary">{movie.releaseDate}</span></p>
                        <p className="my-3 font-medium">Run Time: <span className="text-primary">{movie.runTime}</span></p>
                        <p className="my-3 font-medium">Certificate: <span className="text-primary">{movie.certificate}</span></p>

                        {/* {watchlistLoading && <Loader />} */}
                        {watchlistError && <Message>{watchlistError}</Message>}

                        {userInfo && !watchlistLoading ? (
                            <>
                                {userInfo.watched.flat().includes(id) ? (
                                    <Button onClick={() => setWatchListHandler('remove')} variant="danger">
                                        Remove Movie From Watched List
                                    </Button>
                                ) :
                                    (<Button onClick={() => setWatchListHandler('add')} variant="success">
                                        Add Movie To Watched List
                                    </Button>)

                                }
                            </>
                        ) : (<>
                            {userInfo && <Loader />}
                        </>)
                        }
                    </Col>


                </Row>
            )}


            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <h3 className="margin-y2">Reviews</h3>

                    {(reviewsForMovie && reviewsForMovie.length > 0) && (
                        <div className="mb-5 fs-5">
                            <Rating rating={reviewsForMovie && (reviewsForMovie[0].movieId.sumOfRatings / reviewsForMovie[0].movieId.numberOfReviews)} /> ({reviewsForMovie && reviewsForMovie[0].movieId.numberOfReviews})
                    </div>
                    )}

                    {userInfo && userInfo._id && (

                        <Row className="mb-5">


                            <Col md={{ span: 6, offset: 3 }}>
                                {createdReviewLoading && <Loader />}
                                {createdReviewError && <Message>{createdReviewError}</Message>}
                                {deleteError && <Message>{deleteError}</Message>}

                                <Form onSubmit={createReviewHandler}>
                                    <Form.Group className="mb-3" controlId="category">
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as="select" value={rating} onChange={(e) => setRating(e.target.value)}>
                                            {options.map((option) => (
                                                <option key={option}>{option}</option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="my-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Write a Review</Form.Label>
                                        <Form.Control as="textarea" rows={3}
                                            value={reviewText} onChange={(e) => setReviewText(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Post
                               </Button>
                                </Form>
                            </Col>
                        </Row>
                    )}

                    {!userInfo && (
                        <h4 className="text-center text-primary"><Link to="/login">Login</Link> to Post a Review</h4>
                    )}

                    {reviewsForMovie && (
                        <>

                            <Form.Group className="mb-5 select-width" controlId="category">
                                <Form.Label>Sort By:</Form.Label>
                                <Form.Control as="select" value={category} onChange={(e) => sortByHandler(e)}>
                                    {catOptions.map((option) => (
                                        <option key={option}>{option}</option>
                                    ))}
                                </Form.Control>

                            </Form.Group>
                            <ListGroup variant="flush">

                                {getReviewsLoading && <Loader />}
                                {getReviewsError && <Message>{getReviewsError}</Message>}

                                {(reviewsForMovie && reviewsForMovie.length > 0) && reviewsForMovie.map((review, i) => {
                                    return <ReviewComp key={review._id} review={review} movie={movie} />
                                })}

                            </ListGroup>
                        </>
                    )}

                    {(!reviewsForMovie || reviewsForMovie.length === 0) && (
                        <Message>No Reviews </Message>
                    )}

                    <div className="d-flex justify-content-between my-5">
                        <Button disabled={page === 1} onClick={prevReviewsHandler} variant="outline-secondary">Prev</Button>
                        {(reviewsForMovie && reviewsForMovie.length > 4) && (
                            <Button onClick={nextReviewsHandler} variant="outline-secondary">Next</Button>
                        )}
                    </div>
                </Col>
            </Row>


        </Container >
    )
}

export default MovieDetailsScreen
