import React from 'react';
import SingleTile from './SingleTile.jsx';
import AddReview from './AddReview.jsx';

class ReviewTiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: 0,
      end: 2,
      button: false
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      if (this.props.reviews !== undefined && this.props.reviews.length > 2) {
        this.setState({
          button: true
        })
      }
    }
  }

  handleClick() {
    let newEnd = this.state.end + 2;
    this.setState({
      end: newEnd
    })

    if (newEnd >= this.props.reviews.length) {
      this.setState({
        button: false
      })
    }
  }

  render() {
    let allReviews = this.props.reviews;
    let reviews,
      displayedReviews;
    let button = <button
      className="moreReviewsButton"
      type="button"
      onClick={this.handleClick}
      style={this.state.button ? {} : { display: 'none' }}>
      More Reviews
    </button>

    if (allReviews === undefined || allReviews.length === 0) {
      reviews = 'There are no reviews for this product.'
    } else {
      reviews = allReviews.map((rev, index) => {
        return <SingleTile
          key={`review-${index}`}
          review={rev}
          renderStars={this.props.renderStars}
          recordClick={(e) => this.props.recordClick(e)} />
      })
      displayedReviews = reviews.slice(this.state.start, this.state.end);
    }

    return (
      <div className="outerReviewTiles">
        <div className='reviewTiles' onClick={(e) => this.props.recordClick(e)}>
          {displayedReviews}
        </div>
        <div className="reviewsButtons">
          <div className="moreReviewsButton"
          >{button}</div>
          <AddReview
            name={this.props.name}
            characteristics={this.props.characteristics}
            productId={this.props.productId}
            recordClick={(e) => this.props.recordClick(e)} />
        </div>
      </div>
    )
  }
}

export default ReviewTiles;