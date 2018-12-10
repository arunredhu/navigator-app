import React from 'react';
import API_SETTINGS from '../../config/api.js';
import ERROR_MSG from '../../config/error.js';
import CancelIcon from './icons/cancel.svg';
import SuccessIcon from './icons/success.svg';
import InfoIcon from './icons/info.svg';
import './MsgBox.css';

const apiMsg = Object.create(API_SETTINGS);
const errorMsg = Object.create(ERROR_MSG);

// Method render the received API data
const informationBox = (info) => {
  return (
    <div className="status">
      <p>Total Distance: <strong>{ info[0] } Km</strong></p>
      <p>Total Time: <strong>{ info[1] } Hrs</strong></p>
    </div>
  )
}

const errorMessageIcon = (msg) => {
  switch(msg) {
    case(errorMsg.API_SERVER_ERROR): {
      return CancelIcon;
    }
    case(apiMsg.MOCK_API.MSG_IN_PROGRESS): {
      return InfoIcon;
    }
    case(apiMsg.MOCK_API.MSG_SUCCESS): {
      return SuccessIcon ;
    }
    default: {
      return InfoIcon ;
    }
  }
}

// Container for error messages and information
const MsgBox = ({msg, routesData}) => {
  return (
    <div>
      { 
        (Boolean(msg) || routesData.length > 0 ) &&
          <div className = 'msg-box'>
            <h2>Status:</h2>
            { 
              Boolean(msg) && 
              <div className="status msg">
                <img src={errorMessageIcon(msg)} height="18" width="18" alt={msg} />
                <span>{`${msg}`}</span>
              </div> 
            }
            { routesData.length > 0 && informationBox(routesData) }
          </div>
      }
    </div>
  );
}

export default MsgBox;