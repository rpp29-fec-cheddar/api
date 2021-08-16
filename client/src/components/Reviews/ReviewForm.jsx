import React from 'react';
import FormStars from './FormStars.jsx';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      meaning: ''
    }
    this.handleStarClick = this.handleStarClick.bind(this);
  }

  handleStarClick(event) {
    let newRating = Number(event.target.id)
    let newMeaning;
    if (newRating === 20) {
      newMeaning = 'Poor';
    } else if (newRating === 40) {
      newMeaning = 'Fair';
    } else if (newRating === 60) {
      newMeaning = 'Average';
    } else if (newRating === 80) {
      newMeaning = 'Good';
    } else if (newRating === 100) {
      newMeaning = 'Great';
    }

    this.setState({
      rating: newRating,
      meaning: newMeaning
    });
  }

  render() {
    if (!this.props.show) {
      return null
    }
    return (
      <div className="reviewForm-modal">
        <div className="reviewForm-content">
          <div className="reviewForm-header">
            <h2 className="reviewForm-title">Write Your Review</h2>
            <h4 className="reviewForm-subtitle">About the {this.props.name}</h4>
          </div>
          <div className="reviewForm-body">
            <small><sup>*</sup></small>Overall rating<br></br>
            <FormStars
              clickStars={this.handleStarClick}
              rating={this.state.rating}
              meaning={this.state.meaning} />
            <form>
            </form>


          </div>
          <div className="reviewForm-footer">
            <button className="reviewForm-button" onClick={this.props.onClose}>Close</button>
          </div>
        </div>
      </div>
    )
  }

}

export default ReviewForm;