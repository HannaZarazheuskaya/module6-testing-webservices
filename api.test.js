import assert from 'node:assert/strict';
import baseUrl from './config.js';
import { credentials, createBooking, updateBooking } from './test-data.js';

describe('Manage booking using specific token', () => {

    let token;
    let bookingId;
    
    before('should create token', async() => {
        const response = await fetch(`${baseUrl}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });

        token = (await response.json()).token;
    });


    it('should create a booking', async() => {

        const response = await fetch(`${baseUrl}/booking`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createBooking)
        });

        assert.strictEqual(response.status, 200);
        assert.ok(response.headers.get('content-type').includes('application/json'));

        const receivedData = await response.json();
        assert.ok(receivedData.bookingid, 'Id not created');
        
        assert.strictEqual(receivedData.booking.firstname, createBooking.firstname, 'First Name does not match');
        assert.strictEqual(receivedData.booking.lastname, createBooking.lastname, 'Last Name does not match');
        
        bookingId = receivedData.bookingid;
        console.log(`Booking id is ${bookingId}`);
    });


    it('should get created booking by id', async() => {

        const response = await fetch(`${baseUrl}/booking/${bookingId}`);
        assert.strictEqual(response.status, 200);
        assert.ok(response.headers.get('content-type').includes('application/json'));

        const receivedData = await response.json();
        assert.strictEqual(receivedData.firstname, createBooking.firstname, 'First Name does not match');
        assert.strictEqual(receivedData.lastname, createBooking.lastname, 'Last Name does not match');
    });

    
    it('should partially update created booking', async() => {
        const response = await fetch(`${baseUrl}/booking/${bookingId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Cookie': `token=${token}`
            },
            body: JSON.stringify(updateBooking)
        });

        assert.strictEqual(response.status, 200);
        assert.ok(response.headers.get('content-type').includes('application/json'));

        const receivedData = await response.json();
        assert.strictEqual(receivedData.additionalneeds, updateBooking.additionalneeds, 'Additional Needs updated successfully');
    });


    it('should remove previously created booking', async() => {
        
        const response = await fetch(`${baseUrl}/booking/${bookingId}`, {
            method: 'DELETE',
            headers: {
                'Cookie': `token=${token}`
            }
        });

        assert.strictEqual(response.status, 201);
        const responseMsg = await response.text();
        assert.strictEqual(responseMsg, 'Created', 'Response message does not match');

    });

});