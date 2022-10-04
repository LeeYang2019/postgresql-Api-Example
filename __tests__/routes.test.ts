import app from '../src/server';
import supertest from 'supertest';

describe('GET /', () => {
    it('should send back some data', async () => {
        const result = supertest(app).get('/');
        expect(res.body.message).toBe('hello');
    })
})