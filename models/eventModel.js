const pool = require('../database/db');

class Event {
    constructor(id, title, date, time, description) {
        this.id = id;
        this.title = title;

        // Format the date
        const eventDate = new Date(date);
        this.date = `${eventDate.toLocaleString('default', { month: 'long' })} ${eventDate.getDate()}, ${eventDate.getFullYear()}`;

        // Format the time
        const eventTime = new Date(`1970-01-01T${time}:00`);
        this.time = eventTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

        this.description = description;
    }

// Fetch all events from the database
static async getAllEvents() {
    try {
        const query = 'SELECT * FROM events ORDER BY created_at DESC';  
        const { rows } = await pool.query(query);

        // Format date and time for each event
        const events = rows.map(event => {
            const formattedTime = event.time.substring(0, 5);  
            return new Event(event.id, event.title, event.date, formattedTime, event.description);
        });

        return events;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
}


    // Create a new event in the database
    static async createEvent(title, date, time, description) {
        try {
            const query = 'INSERT INTO events (title, date, time, description) VALUES ($1, $2, $3, $4)';
            await pool.query(query, [title, date, time, description]);
        } catch (error) {
            console.error('Error creating event:', error);
            throw error;
        }
    }

    // Update an existing event in the database
    static async updateEvent(id, title, date, time, description) {
        try {
            const query = 'UPDATE events SET title = $1, date = $2, time = $3, description = $4 WHERE id = $5';
            await pool.query(query, [title, date, time, description, id]);
        } catch (error) {
            console.error('Error updating event:', error);
            throw error;
        }
    }

    // Delete an event from the database
    static async deleteEvent(id) {
        try {
            const query = 'DELETE FROM events WHERE id = $1';
            await pool.query(query, [id]);
        } catch (error) {
            console.error('Error deleting event:', error);
            throw error;
        }
    }
}

module.exports = Event;
