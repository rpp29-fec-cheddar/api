import React from 'react';
import ReviewTiles from './ReviewTiles.jsx';

class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relevantReviews: [],
      value: 'relevant',
      howManyReviews: 0
    }
    this.calculateTotalReviews = this.calculateTotalReviews.bind(this);
    this.sortHelpful = this.sortHelpful.bind(this);
    this.sortNewest = this.sortNewest.bind(this);
    this.sortRelevant = this.sortRelevant.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }


  calculateTotalReviews() {
    let recs = this.props.recommended;
    let total;
    if (Object.keys(recs).length > 0) {
      total = (Number(recs.true) + Number(recs.false));
    } else {
      total = 0;
    }
    this.setState({
      howManyReviews: total
    })
  }


  //if two reviews have the same helpfulness rating, the one with the newer
  //date score should have a lower score (come first)
  sortHelpful(array) {
    for (let i = 0; i < array.length; i++) {
      let hReviewObj = array[i];
      let nextHReviewObj = array[i + 1] || {};
      if (hReviewObj.helpfulness === nextHReviewObj.helpfulness) {
        let hReviewObjDate = new Date(hReviewObj.date);
        let nextHReviewObjDate = new Date(nextHReviewObj.date)
        if (hReviewObjDate.getTime() < nextHReviewObjDate.getTime()) {
          array[i + 1] = hReviewObj;
          array[i] = nextHReviewObj;
          return this.sortHelpful(array);
        }
      }
    }
    return array;
  }


  //if two reviews have the same date, the one with the higher
  //helpfulness score should have a lower score
  sortNewest(array) {
    for (let i = 0; i < array.length; i++) {
      let nReviewObj = array[i];
      let nextNReviewObj = array[i + 1] || {};
      if (nReviewObj.date === nextNReviewObj.date) {
        if (nReviewObj.helpfulness < nextNReviewObj.helpfulness) {
          array[i + 1] = nReviewObj;
          array[i] = nextNReviewObj;
          return this.sortNewest(array);
        }
      }
    }
    return array;
  }


  sortRelevant(helpfulArray, newestArray) {
    let relevance = {}
    //scoring reviews based on their helpfulness
    //lowest score is most helpful
    for (let i = 0; i < helpfulArray.length; i++) {
      let hReviewObj = helpfulArray[i];
      //adding the scores together
      //lowest score is most relevant
      relevance[hReviewObj.review_id] = i
    }

    //scoring reviews based on their newness
    //lowest score is newest
    for (let j = 0; j < newestArray.length; j++) {
      let n2ReviewObj = newestArray[j]
      relevance[n2ReviewObj.review_id] += j
    }

    /*byRelevance will be an array of tuples that is sorted by most relevant
      ex. [
      [reviewid, most relevant/lowest score],
      [reviewid, least relevant/highest score]
      ]
    */
    let byRelevance = [];
    for (let reviewId in relevance) {
      byRelevance.push([reviewId, relevance[reviewId]])
    }
    byRelevance.sort(function(a, b) {
      return a[1] - b[1]
    })

    let relevantArray = [];

    //going through sorted tuple array and grabbing the review object from
    //the newestArray that matches its reviewId so that the resulting relevant
    //reviews object is in orded
    for (let k = 0; k < byRelevance.length; k++) {
      let reviewTuples = byRelevance[k];
      let reviewId = Number(reviewTuples[0])
      for (let m = 0; m < newestArray.length; m++) {
        if (newestArray[m].review_id === reviewId) {
          relevantArray.push(newestArray[m])
        }
      }
    }
    return relevantArray;
  }


  componentDidMount() {
    this.calculateTotalReviews();
    let helpfulReviews = this.sortHelpful(this.props.helpfulReviews);
    let newestReviews = this.sortNewest(this.props.newestReviews);
    let relevantArray = this.sortRelevant(helpfulReviews, newestReviews);
    this.setState({
      relevantReviews: relevantArray
    })
  }



  handleChange(event) {
    this.setState({
      value: event.target.value
    });
    //helpful --> this.props.helpfulReviews
    //newest --> this.props.newestReviews
    //relevant --> this.state.relevantReviews
  }


  render() {
    let reviewsToPassDown;
    if (this.state.value === 'relevant') {
      reviewsToPassDown = this.state.relevantReviews;
    } else if (this.state.value === 'helpful') {
      reviewsToPassDown = this.props.helpfulReviews;
    } else if (this.state.value === 'newest') {
      reviewsToPassDown = this.props.newestReviews;
    }

    return (
      <div>
        <label>
          <h4>{this.state.howManyReviews} reviews, sorted by &nbsp;
            <select value={this.state.value} onChange={this.handleChange}>
              <option value="relevant">relevance</option>
              <option value="helpful">helpfulness</option>
              <option value="newest">date</option>
            </select>
          </h4>
        </label>
        <ReviewTiles
          reviews={reviewsToPassDown}
          renderStars={this.props.renderStars} />
      </div>
    )
  }
}

export default Sort;