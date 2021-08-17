import React from 'react';
import FormStars from './FormStars.jsx';
import FormCharacteristic from './FormCharacteristic.jsx';
import $ from 'jquery';

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
      summary: '',
      body: '',
      charsLeft: 50,
      photos: [],
      nickname: '',
      email: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCharInputChange = this.handleCharInputChange.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.calculateCharTotal = this.calculateCharTotal.bind(this);
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

  calculateCharTotal() {
    let charTotal = 0;
    if (this.state.Size > 0) {
      charTotal += 1;
    }
    if (this.state.Width > 0) {
      charTotal += 1;
    }
    if (this.state.Comfort > 0) {
      charTotal += 1;
    }
    if (this.state.Quality > 0) {
      charTotal += 1;
    }
    if (this.state.Length > 0) {
      charTotal += 1;
    }
    if (this.state.Fir > 0) {
      charTotal += 1;
    }
    return charTotal;
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

  handleSubmit(event) {
    event.preventDefault();
    let needWarning = false;
    let revCharacteristics = Object.keys(this.props.characteristics);
    let warningMessage = 'You must enter the following: ';
    let charTotal = this.calculateCharTotal();
    if (this.state.rating === 0) {
      needWarning = true;
      warningMessage += '\n' + 'Overall rating';
    }
    if (charTotal < revCharacteristics.length) {
      needWarning = true;
      warningMessage += '\n' + 'Characteristic ratings';
    }
    if (this.state.body.length < 50) {
      needWarning = true;
      warningMessage += '\n' + 'Review body';
    }
    if (this.state.nickname.length < 1) {
      needWarning = true;
      warningMessage += '\n' + 'Nickname';
    }
    if (this.state.email.length < 6) {
      needWarning = true;
      warningMessage += '\n' + 'Email';
    }
    if (needWarning) {
      alert(warningMessage);
    } else {
      //post request here
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
    let counter;
    if (this.state.body.length < this.state.charsLeft) {
      counter = <span>Minimum required characters left: [{this.state.charsLeft - this.state.body.length}]</span>
    } else {
      counter = <span>Minimum reached</span>
    }
    let picsButton;
    if (this.state.photos.length < 5) {
      picsButton = <button>Choose File</button>
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
                <h3><small><sup>*</sup></small>Do you recommend this product?</h3>
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
                <h3><small><sup>*</sup></small>Characteristics</h3>
                {chars}
              </label>
              <label>
                <h3>Review summary</h3>
                <textarea
                  name="summary"
                  value={this.state.summary}
                  placeholder="Example: Best purchase ever!"
                  maxLength="60"
                  rows={1}
                  cols={60}
                  onChange={this.handleInputChange} />
              </label>
              <label>
                <h3><small><sup>*</sup></small>Review body</h3>
                <textarea
                  name="body"
                  value={this.state.body}
                  placeholder="Why did you like the product or not?"
                  minLength="50"
                  maxLength="1000"
                  rows={6}
                  cols={60}
                  onChange={this.handleInputChange} />
                <br></br>
                {counter}
              </label>
              <label>
                <h3>Upload your photos</h3>
                Need to figure this out later...
              </label>
              <label>
                <h3><small><sup>*</sup></small>What is your nickname?</h3>
                <input
                  name="nickname"
                  type="text"
                  value={this.state.nickname}
                  placeholder="Example: jackson11!"
                  maxLength="60"
                  onChange={this.handleInputChange} />
                <br></br>
                  For privacy reasons, do not use your full name or email address
              </label>
              <label>
                <h3><small><sup>*</sup></small>Your email</h3>
                <textarea
                  name="email"
                  type="email"
                  value={this.state.email}
                  placeholder="Example: jackson11@email.com"
                  maxLength="60"
                  rows={1}
                  cols={30}
                  onChange={this.handleInputChange} />
                <br></br>
                  For authentication reasons, you will not be emailed
                <br></br>
              </label>
              <input type="submit" value="Submit review" onSubmit={ () => { return false } } onClick={this.handleSubmit}></input>
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