import React, { useState, useEffect } from 'react';
import EachCard from './EachCard.jsx';
import YourOutfitAdder from './YourOutfitAdder.jsx';

const ProductCard = (props) => {
  if (!props.detailInfo) {
    return null;
  }

  console.log('PROPS INFO', props.info);
  console.log('PROPS DETAIL INFO', props.detailInfo);

  let combine = props.detailInfo.reduce((map, value) => {
    map[value.product_id] = value;
    return map;
  }, {});
  let relevantProps = [];
  for (let i = 0; i < props.info.length; i++) {
    let items = combine[props.info[i].id];
    console.log('ITEMS', items)
    if (items) {
      relevantProps.push({
        id: items.product_id,
        results: items.results,
        name: props.info[i].name,
        category: props.info[i].category,
        description: props.info[i].description,
        defaultPrice: props.info[i].default_price,
        features: props.info[i].features,
        salePrice: items.results[0].sale_price
      })
    }
  }

  const { show } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(relevantProps.length);

  useEffect(() => {
    setLength(relevantProps.length)
  }, [relevantProps])

  const next = () => {
    if (currentIndex < (length - show)) {
      setCurrentIndex(prevState => prevState + 1)
    }
  }

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1)
    }
  }

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {currentIndex > 0 &&
          <button
            className="left-arrow"
            onClick={prev}
          >
            &lt;
          </button>}
        <div className="carousel-content-wrapper">
          <div
            className={`carousel-content show-${show}`}
            style={{ transform: `translateX(-${currentIndex * (100 / show)}%)` }}
          >
            {relevantProps.map((each, index) =>
              <EachCard className="card"
                info={each}
                prodId={props.info}
                detailInfo={props.detailInfo}
                overViewProd={props.overViewProd}
                overViewStyles={props.overViewStyles}
                renderStars={props.renderStars}
                onClick={props.onClick}
                key={index}
              />)}
          </div>
          {currentIndex < (length - show) &&
            <button
              className="right-arrow"
              onClick={next}
            >
              &gt;
            </button>}
        </div>
      </div>
    </div>

  )
}

export default ProductCard;