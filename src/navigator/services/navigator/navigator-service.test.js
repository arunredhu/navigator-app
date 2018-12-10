import * as ApiService from '../api/api-service';
import { sendRoutes, fetchRoutes } from './navigator-service';

describe('navigator-services', () => {
  
  test('sendRoutes() should receive sample token', async () => {
    const sampleToken = '3000';
    const requestBody = {};
    const apiService = jest.spyOn(ApiService, 'fetchApiData');

    apiService.mockImplementation(() =>
        Promise.resolve({ token: sampleToken })
    );

    const response = await sendRoutes(requestBody); // method being tested

    expect(response.token).toBe(sampleToken);
    apiService.mockRestore();
  });

  test('sendRoutes() return an error message in case of failed api request', async () => {
    const sampleMsg = 'Internal Server Error';
    const requestBody = {};
    const apiService = jest.spyOn(ApiService, 'fetchApiData');

    apiService.mockImplementation(() =>
        new Promise(() => {
          throw new Error();
        }).catch((e) => sampleMsg)
    );

    const response = await sendRoutes(requestBody); // method being tested

    expect(response).toBe(sampleMsg);
    apiService.mockRestore();
  });

  test('fetchRoutes() should recieve JSON data ', async () => {
    const sampleData = {
      status: 'success',
      path: [
          ['22.372081', '114.107877'],
          ['22.326442', '114.167811'],
          ['22.284419', '114.159510']
      ],
      total_distance: 20000,
      total_time: 1800
    };

    const apiService = jest.spyOn(ApiService, 'fetchApiData');

    apiService.mockImplementation(() =>
        Promise.resolve(sampleData)
    );

    const response = await fetchRoutes(); // method being tested

    expect(response.status).toBe(sampleData.status);
    expect(response.path[0].length).toBe(sampleData.path[0].length);
    apiService.mockRestore();
  });

  test('fetchRoutes() return an error message in case of failed api request', async () => {
    const sampleMsg = 'Internal Server Error';
    const apiService = jest.spyOn(ApiService, 'fetchApiData');

    apiService.mockImplementation(() =>
        new Promise(() => {
          throw new Error();
        }).catch((e) => sampleMsg)
    );

    const response = await fetchRoutes(); // method being tested

    expect(response).toBe(sampleMsg);
    apiService.mockRestore();
  });

  test('fetchRoutes() returns the status correctly', async () => {
    const sampleData = {
      "status": "in progress"
    };
    const apiService = jest.spyOn(ApiService, 'fetchApiData');

    apiService.mockImplementation(() =>
      Promise.resolve(sampleData)
    );

    const response = await fetchRoutes(); // method being tested

    expect(response.status).toBe(sampleData.status);
    apiService.mockRestore();
  });
})