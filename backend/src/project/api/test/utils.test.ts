const request = require('supertest');
import app from '../../../app-config';
import { advanceTo, clear } from 'jest-date-mock';

describe('Test projectSubmissionLockout middleware', () => {

  afterEach(() => {
    clear();
  });

  it('should return 403 if current time is after submission end time', async () => {
    // Mock the Date object to return a time after the submission end time
    // global.Date = jest.fn(() => new Date(Date.UTC(2023, 9, 17, 7, 0, 0)).valueOf()) as any;
    advanceTo(new Date(Date.UTC(2023, 9, 16, 7, 0, 0)));

    const response = await request(app)
      .post('/api/projects/hyperdrive_project');

    expect(response.status).toBe(403);
    expect(response.text).toBe('Project submission has ended!');
  });

  // it('should return 200 if current time is before submission end time', async () => {
  //   // Mock the Date object to return a time before the submission end time
  //   global.Date = jest.fn(() => new Date(Date.UTC(2022, 8, 16, 7, 0, 0))) as any;

  //   const response = await request(app).post('/submit');

  //   expect(response.status).toBe(200);
  //   expect(response.text).toBe('Project submitted');
  // });
});