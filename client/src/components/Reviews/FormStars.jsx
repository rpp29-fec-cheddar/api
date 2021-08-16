import React from 'react';

class FormStars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: 0
    }
  }

  handleStar1Click(event) {
    console.log('clicked: ', event.target.id);
  }

  handleStar2Click(event) {
    console.log('clicked: ', event.target.id);
  }

  handleStar3Click(event) {
    console.log('clicked: ', event.target.id);
  }

  handleStar4Click(event) {
    console.log('clicked: ', event.target.id);
  }

  handleStar5Click(event) {
    console.log('clicked: ', event.target.id);
    event.preventDefault();
  }



  render() {
    return (
      <div className='formStarContainer'>
        <div className='formStarBox' style={{ 'width': `${this.state.rating}%` }}>
          <div className='formInlineStars'>
            <img className="formStarsLayout" src="star.png" alt="Star" id={20} onClick={this.handleStar1Click.bind(this)} />
            <img className="formStarsLayout" src="star.png" alt="Star" id={40} onClick={this.handleStar2Click.bind(this)} />
            <img className="formStarsLayout" src="star.png" alt="Star" id={60} onClick={this.handleStar3Click.bind(this)} />
            <img className="formStarsLayout" src="star.png" alt="Star" id={80} onClick={this.handleStar4Click.bind(this)} />
            <img className="formStarsLayout" src="star.png" alt="Star" id={100} onClick={this.handleStar5Click.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}

export default FormStars;