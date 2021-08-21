import React from 'react'
import NewStyles from './components/newStyles.jsx'
import NewPhotos from './components/newPhotos.jsx'
import NewSize from './components/newSize.jsx'
import NewAmount from './components/newAmount.jsx'
import NewButton from './components/newButton.jsx'
import Modal from './components/modal.jsx'
import Features from './components/features.jsx'
import axios from 'axios'
import config from '../../../../config.js'


// root / client / src / components / overview
class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: { features: undefined },
      styles: { results: [] },
      // Styles State
      selectedStyle: 0,
      currentStyleInfo: {
        name: 'Forest Green & Black',

        photos: [{
          url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
          thumbnail_url: ['https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80'],
        }],
        skus: {
          '941206': {
            quantity: '8',
            size: '-'
          },
          style_id: '162332'
        }
      },
      // sizeAmount State
      chosenSize: '-',
      chosenAmount: '',
      skuID: '36300',
      availableSizes: [{ size: '-', quantity: '8' }],
      availableAmount: '-',
      // Photos
      mainPhoto: '',
      thumbnails: [{
        thumbnail_url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
        url: 'https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'
      }],
      showWarning: false,
      showModal: false,
      currentStyle: '',
      thumbnailIndex: '0',
      mainPhotoIndex: '0',

      original_price: '140.00',
      sale_price: '0',
      showModalPhotoZoom: false,

    };
    this.setSelectedStyle = this.setSelectedStyle.bind(this)
    this.setCurrentSku = this.setCurrentSku.bind(this)
    this.setCurrentStyleInfo = this.setCurrentStyleInfo.bind(this)
    this.setChosenSize = this.setChosenSize.bind(this)
    this.setAvailableAmount = this.setAvailableAmount.bind(this)
    this.setChosenAmount = this.setChosenAmount.bind(this)
    this.setMainPhoto = this.setMainPhoto.bind(this)
    this.setThumbnails = this.setThumbnails.bind(this)
    this.setAvailableSizes = this.setAvailableSizes.bind(this)
    this.setSkuID = this.setSkuID.bind(this)
    this.setShowWarning = this.setShowWarning.bind(this)
    this.setShowModal = this.setShowModal.bind(this)
    this.setThumbnailIndex = this.setThumbnailIndex.bind(this)
    this.setOriginalPrice = this.setOriginalPrice.bind(this)
    this.setSalePrice = this.setSalePrice.bind(this)
    this.setMainPhotoIndex = this.setMainPhotoIndex.bind(this)
    this.setShowModalPhotoZoom = this.setShowModalPhotoZoom.bind(this)
    // Click Handlers
    this.clickModal = this.clickModal.bind(this)
    this.clickPhotos = this.clickPhotos.bind(this)
    this.clickDescription = this.clickDescription.bind(this)
    this.clickStyles = this.clickStyles.bind(this)
    this.clickChosensSelectors = this.clickChosensSelectors.bind(this)
  }
  setSelectedStyle(selectedStyle) { this.setState({ selectedStyle }) }
  setCurrentSku(currentSku) { this.setState({ currentSku }) }
  setCurrentStyleInfo(currentStyleInfo) { this.setState({ currentStyleInfo }) }
  setSkuID(skuID) { this.setState({ skuID }) }
  setChosenSize(chosenSize) { this.setState({ chosenSize }) }
  setChosenAmount(chosenAmount) { this.setState({ chosenAmount }) }
  setAvailableSizes(availableSizes) { this.setState({ availableSizes }) }
  setAvailableAmount(availableAmount) { this.setState({ availableAmount }) }
  setMainPhoto(mainPhoto) { this.setState({ mainPhoto }) }
  setThumbnails(thumbnails) { this.setState({ thumbnails }) }
  setShowWarning(showWarning) { this.setState({ showWarning }) }
  setShowModal(showModal) { this.setState({ showModal }) }
  setThumbnailIndex(thumbnailIndex) { this.setState({ thumbnailIndex }) }
  setOriginalPrice(original_price) { this.setState({ original_price }) }
  setSalePrice(sale_price) { this.setState({ sale_price }) }
  setMainPhotoIndex(mainPhotoIndex) { this.setState({ mainPhotoIndex }) }
  setShowModalPhotoZoom(showModalPhotoZoom) { this.setState({ showModalPhotoZoom }) }

  // Leaving a config.TOKEN here Exposes the token. Import the functions from interactions.js right above this file
  // and give the components the interactions there.
  clickModal() {
    let time = new Date()
    axios({
      method: 'POST',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions',
      headers: {
        'Authorization': config.TOKEN
      },
      data: {
        element: 'Modals',
        widget: 'Overview',
        time: time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + '-' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
      }
    })
  }
  clickPhotos() {
    let time = new Date()
    axios({
      method: 'POST',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions',
      headers: {
        'Authorization': config.TOKEN
      },
      data: {
        element: 'Photos',
        widget: 'Overview',
        time: time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + '-' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
      }
    })
  }

  clickDescription() {
    let time = new Date()
    axios({
      method: 'POST',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions',
      headers: {
        'Authorization': config.TOKEN
      },
      data: {
        element: 'Description',
        widget: 'Overview',
        time: time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + '-' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
      }
    })
  }
  clickStyles() {
    let time = new Date()
    axios({
      method: 'POST',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions',
      headers: {
        'Authorization': config.TOKEN
      },
      data: {
        element: 'Styles',
        widget: 'Overview',
        time: time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + '-' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
      }
    })
  }
  clickChosensSelectors() {
    let time = new Date()
    axios({
      method: 'POST',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/interactions',
      headers: {
        'Authorization': config.TOKEN
      },
      data: {
        element: 'ChosenSelectors',
        widget: 'Overview',
        time: time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + '-' + time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
      }
    })
  }

  jest() {
    return 'Jest'
  }

  componentDidMount() {
    if (this.props !== undefined) {
      this.setState({
        info: this.props.overview,
        styles: this.props.styles,
        currentStyleInfo: this.props.styles.results[0],
        availableSizes: this.props.styles.results[0].skus,
        mainPhoto: this.props.styles.results[0].photos[0].url,
        thumbnails: this.props.styles.results[0].photos,
      })
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        info: this.props.overview,
        styles: this.props.styles,
        currentStyleInfo: this.props.styles.results[0],
        availableSizes: this.props.styles.results[0].skus,
        mainPhoto: this.props.styles.results[0].photos[0].url,
        thumbnails: this.props.styles.results[0].photos,
      })
    }
  }

  render() {
    let features;
    if (this.state.info.features === undefined) {
      features = <div></div>
    } else {
      features = <Features features={this.state.info.features} />
    }
    return (
      <div className="Overview" data-testid="Overview">

        <br></br>
        <div className="OVMain1">
          <NewPhotos
            clickPhotos={this.clickPhotos}
            currentStyleInfo={this.state.currentStyleInfo}
            mainPhoto={this.state.mainPhoto}
            thumbnailIndex={this.state.thumbnailIndex}
            mainPhotoIndex={this.state.mainPhotoIndex}
            thumbnails={this.state.thumbnails}
            showModal={this.state.showModal}
            setMainPhoto={this.setMainPhoto}
            setThumbnails={this.setThumbnails}
            setShowModal={this.setShowModal}
            setThumbnailIndex={this.setThumbnailIndex}
            setMainPhotoIndex={this.setMainPhotoIndex}
          />
          <div className="OVMainChild2">
            <NewStyles
              clickChosensSelectors={this.clickChosensSelectors}
              showWarning={this.state.showWarning}
              allStyles={this.state.styles.results}
              selectedStyle={this.state.selectedStyle}
              setSelectedStyle={this.setSelectedStyle}
              currentStyleInfo={this.state.currentStyleInfo}
              setCurrentStyleInfo={this.setCurrentStyleInfo}
              setChosenSize={this.setChosenSize}
              setMainPhoto={this.setMainPhoto}
              setThumbnails={this.setThumbnails}
              setAvailableSizes={this.setAvailableSizes}
              setAvailableAmount={this.setAvailableAmount}
              setSkuID={this.setSkuID}
              setChosenAmount={this.setChosenAmount}
              thumbnails={this.state.thumbnails}

              original_price={this.state.original_price}
              sale_price={this.state.sale_price}
              setOriginalPrice={this.setOriginalPrice}
              setSalePrice={this.setSalePrice}

              setMainPhotoIndex={this.setMainPhotoIndex}
              mainPhotoIndex={this.state.mainPhotoIndex}
            />
            <NewSize
              chosenSize={this.state.chosenSize}
              chosenAmount={this.state.chosenAmount}
              availableSizes={this.state.availableSizes}
              setChosenSize={this.setChosenSize}
              setAvailableAmount={this.setAvailableAmount}
              setSkuID={this.setSkuID}
              setChosenAmount={this.setChosenAmount}
            />
            <NewAmount
              chosenSize={this.state.chosenSize}
              availableAmount={this.state.availableAmount}
              setChosenAmount={this.setChosenAmount}
              chosenAmount={this.state.chosenAmount}
            />
            {/* {Rename NewButton to AddToCart} */}
            <NewButton
              chosenSize={this.state.chosenSize}
              chosenAmount={this.state.chosenAmount}
              skuID={this.state.skuID}
              showWarning={this.state.showWarning}
              availableAmount={this.state.availableAmount}
            />
          </div>

        </div>

        <div
          onClick={e => {
            this.clickDescription()
          }}
          className="OVMain2">
          <div className="OVDescription">
            {this.props.renderStars()}
            <div className="ProductTitle" >{this.state.info.name}</div>
            <div className="Category">{this.state.info.category}</div>
            <div className="Slogan">{this.state.info.slogan}</div>
            <div className="Description">{this.state.info.description}</div>
          </div>
          {features}
        </div>
        <br></br>
        <Modal
          clickModal={this.clickModal}
          showModal={this.state.showModal}
          setShowModal={this.setShowModal}
          currentStyleInfo={this.state.currentStyleInfo}
          thumbnails={this.state.thumbnails}
          thumbnailIndex={this.state.thumbnailIndex}
          mainPhotoIndex={this.state.mainPhotoIndex}
          setThumbnailIndex={this.setThumbnailIndex}
          setMainPhotoIndex={this.setMainPhotoIndex}
          setShowModalPhotoZoom={this.setShowModalPhotoZoom}
          showModalPhotoZoom={this.state.showModalPhotoZoom}
        />
        <br></br>
      </div>
    );
  }
}
export default Overview;
