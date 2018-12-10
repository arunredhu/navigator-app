import { fetchApiData } from '../api/api-service';
import API_SETTINGS from '../../config/api.js';

// Service to send routes to the API 
export const sendRoutes = (body) => {
	return fetchApiData(
		API_SETTINGS.MOCK_API['URL'], "POST", 
		API_SETTINGS.MOCK_API.NAVIGATOR_SUB_PATH,
		body
  );
}

// Service to receive routes from the API 
export const fetchRoutes = (token) => {
  return fetchApiData(
		API_SETTINGS.MOCK_API['URL'], "GET", 
		API_SETTINGS.MOCK_API.NAVIGATOR_SUB_PATH + '/' + token
  );
 }