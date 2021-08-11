/* eslint-disable react/prop-types */
import React from 'react';

class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recPercentage: 0,
      five: 0,
      four: 0,
      three: 0,
      two: 0,
      one: 0,
      reviewsCount: 0
    }
    this.calculateRecPercentage = this.calculateRecPercentage.bind(this);
    this.calculateReviewTotals = this.calculateReviewTotals.bind(this);
  }

  componentDidMount() {
    this.calculateRecPercentage();
    this.calculateReviewTotals();
  }

  calculateRecPercentage() {
    let total,
      decimal,
      percent;
    let recs = this.props.recommended;
    console.log('calc!: ', recs)
    if (Object.keys(recs).length > 0) {
      total = (Number(recs.true) + Number(recs.false));
      decimal = Number((recs.true / total).toFixed(1));
      percent = (decimal * 100);
    } else {
      total = 0;
      percent = 0
    }
    this.setState({
      recPercentage: percent,
      reviewsCount: total
    });
  }

  calculateReviewTotals() {
    let ratings = this.props.ratings;
    this.setState({
      five: ratings[5] || 0,
      four: ratings[4] || 0,
      three: ratings[3] || 0,
      two: ratings[2] || 0,
      one: ratings[1] || 0
    })
  }

  handleClick(event) {
    let filterNumber = (event.target.innerText).slice(0, 1);
    //later this will filter the displayed reviews
  }

  render() {
    let totalCountOfReviews = this.state.reviewsCount;
    let fivePortion = (this.state.five / totalCountOfReviews) * 100;
    let fourPortion = (this.state.four / totalCountOfReviews) * 100;
    let threePortion = (this.state.three / totalCountOfReviews) * 100;
    let twoPortion = (this.state.two / totalCountOfReviews) * 100;
    let onePortion = (this.state.one / totalCountOfReviews) * 100;
    return (
      <div>
        <div className="ratingBreakdown">
          <u onClick={this.handleClick}>5 stars</u>&nbsp;
          <div className="ratingBarContainer"><div className="ratingBar" style={{'width': `${fivePortion}%`}}></div></div>
          &nbsp;<p style={{'fontSize': '90%', 'display': 'inline-block'}}>({this.state.five})</p>
          <br></br>

          <u onClick={this.handleClick}>4 stars</u>&nbsp;
          <div className="ratingBarContainer"><div className="ratingBar" style={{'width': `${fourPortion}%`}}></div></div>
          &nbsp;<p style={{'fontSize': '90%', 'display': 'inline-block'}}>({this.state.four})</p>
          <br></br>

          <u onClick={this.handleClick}>3 stars</u>&nbsp;
          <div className="ratingBarContainer"><div className="ratingBar" style={{'width': `${threePortion}%`}}></div></div>
          &nbsp;<p style={{'fontSize': '90%', 'display': 'inline-block'}}>({this.state.three})</p>
          <br></br>

          <u onClick={this.handleClick}>2 stars</u>&nbsp;
          <div className="ratingBarContainer"><div className="ratingBar" style={{'width': `${twoPortion}%`}}></div></div>
          &nbsp;<p style={{'fontSize': '90%', 'display': 'inline-block'}}>({this.state.two})</p>
          <br></br>

          <u onClick={this.handleClick}>1 stars</u>&nbsp;
          <div className="ratingBarContainer"><div className="ratingBar" style={{'width': `${onePortion}%`}}></div></div>
          &nbsp;<p style={{'fontSize': '90%', 'display': 'inline-block'}}>({this.state.one})</p>
          <br></br>
          <br></br>

          {this.state.recPercentage}% of reviews recommend this product
        </div>
      </div>
    )
  }
}

export default RatingBreakdown;
