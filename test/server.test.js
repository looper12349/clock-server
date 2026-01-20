const request = require('supertest');
const { app, server } = require('../src/server');

describe('Clock Server API', () => {
  afterAll((done) => {
    server.close(done);
  });

  describe('GET /health', () => {
    it('should return 200 and healthy status', async () => {
      const response = await request(app).get('/health');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('should return valid ISO timestamp', async () => {
      const response = await request(app).get('/health');
      
      const timestamp = new Date(response.body.timestamp);
      expect(timestamp).toBeInstanceOf(Date);
      expect(timestamp.toString()).not.toBe('Invalid Date');
    });
  });

  describe('GET /datetime', () => {
    it('should return 200 and datetime information', async () => {
      const response = await request(app).get('/datetime');
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('date');
      expect(response.body).toHaveProperty('time');
      expect(response.body).toHaveProperty('iso');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('should return valid date format', async () => {
      const response = await request(app).get('/datetime');
      
      expect(typeof response.body.date).toBe('string');
      expect(response.body.date.length).toBeGreaterThan(0);
    });

    it('should return valid time format', async () => {
      const response = await request(app).get('/datetime');
      
      expect(typeof response.body.time).toBe('string');
      expect(response.body.time).toMatch(/\d{2}:\d{2}:\d{2}/);
    });

    it('should return valid ISO timestamp', async () => {
      const response = await request(app).get('/datetime');
      
      const isoDate = new Date(response.body.iso);
      expect(isoDate).toBeInstanceOf(Date);
      expect(isoDate.toString()).not.toBe('Invalid Date');
    });

    it('should return valid Unix timestamp', async () => {
      const response = await request(app).get('/datetime');
      
      expect(typeof response.body.timestamp).toBe('number');
      expect(response.body.timestamp).toBeGreaterThan(0);
    });
  });
});
