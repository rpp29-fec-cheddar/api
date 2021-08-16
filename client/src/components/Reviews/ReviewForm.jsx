import React from 'react';
import FormStars from './FormStars.jsx';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      meaning: '',
      rec: 'Yes'
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
    this.starsClickMandatory = this.starsClickMandatory.bind(this);
  }

  handleInputChange(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
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
      alert('please select an overall rating');
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
              <label>
                <h4><small><sup>*</sup></small>Do you recommend this product?:</h4>
                <input
                  name="rec"
                  type="radio"
                  value="Yes"
                  defaultChecked
                  onChange={this.handleInputChange} />Yes
                <input
                  name="rec"
                  type="radio"
                  value="No"
                  onChange={this.handleInputChange} />No
              </label>
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