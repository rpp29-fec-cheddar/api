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
    this.starsClickMandatory = this.starsClickMandatory.bind(this);
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

  //on submit
  starsClickMandatory() {
    if (this.state.rating === 0) {
      alert(please select an overall rating)
    }
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
            <h3 className="reviewForm-subtitle">About the {this.props.name}</h3>
          </div>
          <div className="reviewForm-body">
            <h4><small><sup>*</sup></small>Overall rating:</h4>
            <FormStars
              starsClickMandatory={this.starsClickMandatory}
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