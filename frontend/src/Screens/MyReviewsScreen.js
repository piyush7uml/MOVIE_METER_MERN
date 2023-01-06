import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, InputGroup, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsByUserAction } from '../Actions/reviewActions';
import { useNavigate } from 'react-router-dom';
import { DELETE_REVIEW_RESET } from '../Constants/reviewConstants';
import ReviewComp from '../components/ReviewComp';
import Loader from '../components/Loader';
import Message from '../components/Message';


const MyReviewsScreen = () => {

    // STATE FOR PAGINATION
    const [page, setPage] = useState(1);

    //STATE FOR SEARCH STRINGS
    const [searchResult, setSearchResult] = useState("")


    // TO REDIRECT USING NAVIGATE HOOK
    const navigate = useNavigate()

    const dispatch = useDispatch();


    // GETTING REVIEWS DATA FROM STORE
    const getReviewsByUser = useSelector(state => state.getReviewsByUser)
    const { loading: getReviewsLoading, error: getReviewsError, reviewsForUser } = getReviewsByUser


    // GETTING DELETED REVIEW DATA FROM STORE
    const deleteReview = useSelector(state => state.deleteReview)
    const { error: deleteError, success: deleteSuccess } = deleteReview

    // GETTING USER DATA FROM STORE
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;






    useEffect(() => {
        dispatch(getReviewsByUserAction(page, searchResult))
    }, [])






    useEffect(() => {

        if (userInfo && userInfo._id) {

            if (deleteSuccess) {
                dispatch({
                    type: DELETE_REVIEW_RESET
                })
                dispatch(getReviewsByUserAction(page, searchResult))
            }

        } else {
            navigate("/")
        }

    }, [userInfo, deleteSuccess])






    // HANDLER TO SERACH MOVIE
    const searchMovieByUserHandler = () => {
        setPage(1)
        dispatch(getReviewsByUserAction(1, searchResult))
    }


    // HANDLER TO GO PREV PAGE 
    const prevReviewsHandler = () => {

        if (page !== 1) {
            setPage(page - 1)
            dispatch(getReviewsByUserAction(page - 1, searchResult))

        }
    }


    // HANDLER TO GO NEXT PAGE 
    const nextReviewsHandler = () => {

        setPage(page + 1)
        dispatch(getReviewsByUserAction(page + 1, searchResult))

    }

    return (
        <Container>
            <Row>
                <Col md={{ span: 10, offset: 1 }}>
                    <h4 className="text-center my-5">My Reviews</h4>

                    <InputGroup className="my-5">
                        <Form.Control
                            placeholder="search movie..."
                            aria-label="searchMovie"
                            aria-describedby="basic-addon2"
                            value={searchResult}
                            onChange={(e) => setSearchResult(e.target.value)}
                        />
                        <Button onClick={searchMovieByUserHandler} variant="outline-primary" id="button-addon2">
                            Search
                        </Button>
                        <Button onClick={() => {
                            setSearchResult("")
                            setPage(1)
                            dispatch(getReviewsByUserAction(1, ""))

                        }} variant="outline-secondary" id="button-addon3">
                            Clear
                        </Button>
                    </InputGroup>

                    {(reviewsForUser && reviewsForUser.length === 0) && (
                        <Message>No Reviews</Message>
                    )}

                    <ListGroup variant="flush">

                        {getReviewsLoading && <Loader />}
                        {getReviewsError && <Message>{getReviewsError}</Message>}

                        {(reviewsForUser && reviewsForUser.length > 0) && reviewsForUser.map((review, i) => {
                            return <ReviewComp key={review._id} review={review} />
                        })}

                    </ListGroup>

                    <div className="d-flex justify-content-between my-5">
                        <Button disabled={page === 1} onClick={prevReviewsHandler} variant="outline-secondary">Prev</Button>
                        {(reviewsForUser && reviewsForUser.length > 4) && (
                            <Button onClick={nextReviewsHandler} variant="outline-secondary">Next</Button>
                        )}
                    </div>
                </Col>


            </Row>

        </Container>
    )
}

export default MyReviewsScreen
