import React, { Component } from 'react';
import { gmap } from '../../services/maps';
import MSG from '../../config/error.json';
import './InputControl.css';

class InputControl extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      'dropLocation': '',
      'startLocation': '',
      'dropError': '',
      'startError': ''
    };

    this.startLocation = React.createRef();
    this.dropLocation = React.createRef();

    this.msg = Object.create(MSG);
    
    // Properties for creating input field
    this.inputProperties = [
      {
        title: 'Start Location', 
        ref: this.startLocation,
        name: 'start-location',
        errorstate: () => this.state.startError, 
        func: (e) => this.handleChange(e) 
      },
      { 
        title: 'Drop Location',
        ref: this.dropLocation, 
        name: 'drop-location',
        errorstate: () => this.state.dropError, 
        func: (e) => this.handleChange(e)
      }
    ];
  }
  
  componentDidMount() {
    this.initializeSearchBox();
  }

  // Initialize the Gmaps Searchbox plugin and attach to input field
  initializeSearchBox = async () => {
    const { gmap } = this.props;
    const map = await gmap();

    new map.places.SearchBox(this.startLocation.current);
    new map.places.SearchBox(this.dropLocation.current);
  }

  // Method to Handle changes to Drop location
  handleChange = (e) => {
    const nameProperty = e.target.name;
    const inputValue = e.target.value.trim();
    let inputValueState = '';
    let inputError = ''
    let inputErrorState = '';

    switch(nameProperty) {
      case('start-location'): {
        inputValueState = 'startLocation'; // State Name
        inputErrorState = 'startError' // State Name
        inputError =  inputValue === '' ? this.msg.INVALID_START_LOCATION : ''
        break;
      }
      case('drop-location'): {
        inputValueState = 'dropLocation'; // State Name
        inputErrorState = 'dropError' // State Name
        inputError =  inputValue === '' ? this.msg.INVALID_DROP_LOCATION : ''
        break;
      }
      default: {}
    }  
    
    this.setState({
      [inputValueState]: inputValue,
      [inputErrorState]: inputError
    })
  }
  
  // Submit Values to Google Maps / parent Method
  handleSubmit = () => {
    const  startLocation = this.startLocation.current.value;
    const dropLocation = this.dropLocation.current.value;
    const  isStartError = startLocation.length === 0 || false;
    const isDropError =  dropLocation.length === 0 || false;
    const dropError = isDropError ? this.msg.INVALID_DROP_LOCATION : '';
    const startError = isStartError ? this.msg.INVALID_START_LOCATION : '';

    this.setState({
      dropError,
      startError
    });

    if (!isDropError && !isStartError) {
      return [startLocation, dropLocation];
    } else {
     return false;
    }
  }
  
  // Method to reset the form
  handleReset = () => {
    const startLocation = '';
    const dropLocation = '';
    const startError = '';
    const dropError = '';
    const msg = ''
    const routesData = [];

    this.startLocation.current.value = startLocation;
    this.dropLocation.current.value = dropLocation;

    this.setState({
      startLocation,
      dropLocation,
      startError,
      dropError,
      msg,
      routesData
    });  
  }


  render() {
    return (
      this.inputProperties.map((item, index) => (
        <div className='rows' key={index}>
          <p>{ item.title }</p>
          <input 
            type="text" 
            ref={item.ref}
            name={item.name}
            className={`input-control${Boolean(item.errorstate()) ? ' error' : ''}`}
            onChange={item.func}
          />
          <div className='error'>&nbsp;{item.errorstate()}</div>
        </div>
      ))
    );
  } 
}

export default InputControl;

InputControl.defaultProps = {
  gmap
}