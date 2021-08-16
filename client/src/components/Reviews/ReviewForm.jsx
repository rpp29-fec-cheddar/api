import React from 'react';
import FormStars from './FormStars.jsx';
import FormCharacteristic from './FormCharacteristic.jsx';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      meaning: '',
      rec: 'Yes',
      Size: 0,
      Width: 0,
      Comfort: 0,
      Quality: 0,
      Length: 0,
      Fit: 0,
      SizeSelection: 'none selected',
      WidthSelection: 'none selected',
      ComfortSelection: 'none selected',
      QualitySelection: 'none selected',
      LengthSelection: 'none selected',
      FitSelection: 'none selected',
      summary: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCharInputChange = this.handleCharInputChange.bind(this);
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

  handleCharInputChange(event) {
    let target = event.target;
    let value = target.value;
    let num = Number(target.attributes[1].value);
    let char = target.attributes[3].value;
    this.setState({
      [char]: num,
      [`${char}Selection`]: value
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
    let characteristics = Object.keys(this.props.characteristics);
    let chars;
    if (characteristics.length > 0) {
      chars = characteristics.map((char, index) =>
        <FormCharacteristic
          key={`char-${index}`}
          char={char}
          handleCharInputChange={this.handleCharInputChange}
          SizeSelection={this.state.SizeSelection}
          WidthSelection={this.state.WidthSelection}
          ComfortSelection={this.state.ComfortSelection}
          QualitySelection={this.state.QualitySelection}
          LengthSelection={this.state.LengthSelection}
          FitSelection={this.state.FitSelection} />
      )
    }
    return (
      <div className="reviewForm-modal">
        <div className="reviewForm-content">
          <div className="reviewForm-header">
            <h2 className="reviewForm-title">Write Your Review</h2>
            <h3 className="reviewForm-subtitle">About the {this.props.name}</h3>
          </div>
          <div className="reviewForm-body">
            <h3><small><sup>*</sup></small>Overall rating:</h3>
            <FormStars
              starsClickMandatory={this.starsClickMandatory}
              clickStars={this.handleStarClick}
              rating={this.state.rating}
              meaning={this.state.meaning} />
            <form>
              <label>
                <h3><small><sup>*</sup></small>Do you recommend this product?:</h3>
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
              <label>
                <h3><small><sup>*</sup></small>Characteristics:</h3>
                {chars}
              </label>
              <label>
                <h3>Review summary:</h3>
                <textarea
                  name="summary"
                  value={this.state.summary}
                  placeholder="Example: Best purchase ever!"
                  maxLength="60"
                  rows={1}
                  cols={60}
                  onChange={this.handleInputChange}
                  required />
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