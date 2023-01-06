import React from 'react'

const Rating = ({ rating }) => {
    return (
        <>
            {rating >= 1 ? (<i className="fas fa-star star-color"></i>) : rating >= 0.5 ?
                (<i className="fas fa-star-half-alt star-color"></i>) : (<i className="far fa-star star-color"></i>)}

            {rating >= 2 ? (<i className="fas fa-star star-color"></i>) : rating >= 1.5 ?
                (<i className="fas fa-star-half-alt star-color"></i>) : (<i className="far fa-star star-color"></i>)}

            {rating >= 3 ? (<i className="fas fa-star star-color"></i>) : rating >= 2.5 ?
                (<i className="fas fa-star-half-alt star-color"></i>) : (<i className="far fa-star star-color"></i>)}

            {rating >= 4 ? (<i className="fas fa-star star-color"></i>) : rating >= 3.5 ?
                (<i className="fas fa-star-half-alt star-color"></i>) : (<i className="far fa-star star-color"></i>)}

            {rating >= 5 ? (<i className="fas fa-star star-color star-color"></i>) : rating >= 4.5 ?
                (<i className="fas fa-star-half-alt star-color star-color"></i>) : (<i className="far fa-star star-color"></i>)}

        </>
    )
}

export default Rating
