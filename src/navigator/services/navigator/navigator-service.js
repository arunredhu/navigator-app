import { fetchApiData } from '../api/api-service';
import APICONFIG from '../../config/api.json';

// Service to send routes to the API 
export const sendRoutes = (body) => {
	return fetchApiData(
		APICONFIG.MOCK_API['URL'], 
		APICONFIG.MOCK_API['METHOD_POST'], 
		APICONFIG.MOCK_API.NAVIGATOR_SUB_PATH,
		body
  );
}

// Service to receive routes from the API 
export const fetchRoutes = (token) => {
  return fetchApiData(
		APICONFIG.MOCK_API['URL'], 
		APICONFIG.MOCK_API['METHOD_GET'], 
		APICONFIG.MOCK_API.NAVIGATOR_SUB_PATH + '/' + token
  );
 }