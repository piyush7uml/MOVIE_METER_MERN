import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Container } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom';
import { getReviewAction, updateReviewAction } from '../Actions/reviewActions';
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { GET_REVIEW_RESET, UPDATE_REVIEW_RESET } from '../Constants/reviewConstants';

const UpdateReviewScreen = () => {

    // OPTIONS TO SELECT RATING
    const options = [1, 2, 3, 4, 5];

    // REVIEW FORM FIELDS
    const [rating, setRating] = useState(1);
    const [reviewText, setReviewText] = useState("")
    const [message, setMessage] = useState("");

    // REVIEW ID FROM PARAMS
    const { reviewId } = useParams();

    // TO REDIRECT USING NAVIGATE HOOK
    const navigate = useNavigate();


    const dispatch = useDispatch();


    // GETTING REVIEW  DATA FROM STORE
    const getReview = useSelector(state => state.getReview)
    const { loading, error, singleReview } = getReview


    // GETTING USER DATA FROM STORE
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    // GETTING UPADTED REVIEW DATA FROM STORE
    const updateReview = useSelector(state => state.updateReview)
    const { loading: updateLoading, error: updateError, success } = updateReview





    useEffect(() => {

        if (userInfo && userInfo._id) {

            if (singleReview && singleReview._id) {
                setRating(singleReview.rating)
                setReviewText(singleReview.reviewText)
            } else {
                dispatch(getReviewAction(reviewId))
            }

        } else {
            navigate("/login")
        }

    }, [singleReview, userInfo])




    useEffect(() => {

        if (success) {
            dispatch({
                type: UPDATE_REVIEW_RESET
            })
            navigate(-1)
        }

    }, [success])





    useEffect(() => {
        return () => {
            dispatch({
                type: GET_REVIEW_RESET
            })
        }
    }, [])






    // HANDLER TO UPDATE REVIEW
    const updateReviewHandler = (e) => {
        e.preventDefault()

        setMessage("");

        if (!rating || !reviewText) {
            setMessage(`Both Rating and Review are mandatory`)
        } else {
            dispatch(updateReviewAction({ rating, reviewText }, reviewId))
        }
    }





    return (
        <Container>
            <Row className="mb-5">
                <h3 className="text-center my-3">Edit Movie Review</h3>
                <h4 className=" mt-5 text-center text-primary">{singleReview && singleReview.movieId.name}</h4>
                <Col md={{ span: 6, offset: 3 }}>
                    {loading && <Loader />}
                    {error && <Message>{error}</Message>}
                    {message && <Message>{message}</Message>}

                    {updateLoading && <Loader />}
                    {updateError && <Message>{updateError}</Message>}

                    <Button onClick={() => navigate(-1)} className="my-4" variant="secondary">Back</Button>

                    <Form onSubmit={updateReviewHandler}>
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
        </Container>
    )
}

export default UpdateReviewScreen
