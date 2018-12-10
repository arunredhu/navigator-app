import React, { Component } from 'react';
import MsgBox from '../msgBox';
import InputControl from '../inputControl';
import Preloader from '../preloader'
import { sendRoutes, fetchRoutes } from '../../services/navigator';
import API_SETTINGS from '../../config/api.js';
import ERROR_MSG from '../../config/error.js';
import PropTypes from 'prop-types';
import './SearchForm.css';

class SearchForm extends Component {

  constructor() {
    super();
  
    this.state = {
      loading: false,
      msg: '',
      routesData: []
    }
  
    this.inputControl = React.createRef();
    this.apiConfig = Object.create(API_SETTINGS.MOCK_API);
    this.msg = Object.create(ERROR_MSG);
    this.startDropLocation = [];
  }

  // Method to toggle the preloader
  togglePreloader = (value) => this.setState({loading: value});

  // Method to check the form values
  handleSubmit = () => {
    const result = this.inputControl.current.handleSubmit();

    this.clearMsgNRoutes();
    
    if (result) {
      this.startDropLocation = result;
      this.submitRoute(this.startDropLocation);
    }
  }

  // Method to clear all form fields
  handleReset = () => {
    this.inputControl.current.handleReset();
    this.clearMsgNRoutes();
  }

  // Method to submit Route to the mock API and get access token
  submitRoute = async (latlng = this.startDropLocation) => {
    this.togglePreloader(true);
    const result = await sendRoutes({latlng});

    if( !result.token ) {
      this.togglePreloader(false);
      this.setState({ msg:  this.msg.API_SERVER_ERROR });
    } else {
      this.getRoutes(result);
    }
  }
  
  // Method to filter Api responses and invoke associated method
  checkResponse = (res) => {
    let msg = this.msg.API_SERVER_ERROR;
    let routesData = [];

    if (res) {
      switch(res.status) {
        case(this.apiConfig.MSG_IN_PROGRESS): {
          msg = res.status;
          this.submitRoute();
          break;
        }
        case(this.apiConfig.MSG_SUCCESS): {
          routesData = [res.total_distance, res.total_time];
          msg = res.status;
          this.props.mapCoordinates(res.path);
          break;
        }
        default: {
          msg = res.error || res.status || this.msg.API_SERVER_ERROR;
          break;
        }
      }
    }

    this.setState({ 
      msg,
      routesData 
    });
  }

  // Method to check the access token and then request for user cordinates
  getRoutes = async (key) => {
    let res = await fetchRoutes(key.token);

    this.togglePreloader(false);
    
    this.checkResponse(res);
  } 
  
  // Method to clear msg box and the current generated Google Map route 
  clearMsgNRoutes = () => {
    const routesData = [];
    const msg = '';

    this.setState({
      routesData,
      msg
    });

    this.props.clearMapDirection();
  }
  
  render() {
    const { loading, msg, routesData } = this.state;
    return (
      <div className='input-container'>
        <Preloader enable = {loading} />
        <InputControl ref={this.inputControl} />
        <MsgBox msg={msg} routesData={routesData} />
        <div className='clear'></div>
        <div className="form-control">
          <button className="btn" onClick={this.handleSubmit}>Submit</button> 
          <button onClick={this.handleReset} className="btn">Reset</button>
        </div>
      </div>
    );
  }
}

export default SearchForm;

SearchForm.propTypes = {
  "mapCoordinates": PropTypes.func,
  "clearMapDirection": PropTypes.func
}


