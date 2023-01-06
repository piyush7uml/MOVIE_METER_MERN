import React, { useState, useEffect } from 'react'
import Rating from '../components/Rating';
import { ListGroup, Modal, Form, Row, Col, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReviewAction } from '../Actions/reviewActions';
import Loader from './Loader';
import Message from './Message';
import { Link } from 'react-router-dom'

const ReviewComp = ({ review }) => {

    const [loading, setLoading] = useState(false)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin;

    const deleteReview = useSelector(state => state.deleteReview)

    const { error: deleteError, reviewDeleted } = deleteReview


    useEffect(() => {

        if (deleteError || reviewDeleted) {
            setLoading(false)
        }

    }, [deleteError, reviewDeleted])


    const deleteReviewHandler = () => {

        setLoading(true)
        dispatch(deleteReviewAction(review._id))
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
                        <Button variant="primary" onClick={deleteReviewHandler}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>


            {loading && <Loader />}
            <ListGroup.Item className="mb-4">

                {review.movieName && (
                    <Link to={`/movies/get/${review.movieId._id}`}>
                        <p>{review.movieName}</p>
                    </Link>
                )}

                <div className="my-3">
                    <Rating rating={review && (review.rating)} />
                </div>

                <div>
                    <p>{review && review.reviewText}</p>
                </div>

                <div className="d-flex justify-content-between">
                    <p className="text-muted">posted by <span className="text-primary">{review && review.userId ? review.userId.firstname : 'user'} {review && review.userId ? review.userId.lastname : 'deleted'}</span> <span className="text-muted px-2">on {review && review.updatedAt}</span></p>

                    {(userInfo && review && review.userId) && (
                        <div className="curser-pointer">
                            {(userInfo._id === review.userId._id) && (
                                <Link to={`/review/update/${review._id}`}>
                                    <i className="fa-solid fa-pen-to-square edit-color fa-lg"></i>
                                </Link>

                            )}

                            {(userInfo._id === review.userId._id || userInfo.isAdmin) && (
                                <i onClick={handleShow} className="fa-solid fa-trash delete-color fa-lg "></i>
                            )}

                        </div>
                    )}

                    {(userInfo && userInfo.isAdmin) && (review && review.userId === null) && (
                        <i onClick={handleShow} className="fa-solid fa-trash delete-color fa-lg "></i>

                    )}
                </div>

            </ListGroup.Item>
        </>)
}

export default ReviewComp
