import React from 'react';

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

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
            <h4 className="reviewForm-title">Write Your Review</h4>
            <h3 className="reviewForm-subtitle">{this.props.name}</h3>
          </div>
          <div className="reviewForm-body">Form here</div>
          <div className="reviewForm-footer">
            <button className="reviewForm-button" onClick={this.props.onClose}>Close</button>
          </div>
        </div>
      </div>
    )
  }

}

export default ReviewForm;