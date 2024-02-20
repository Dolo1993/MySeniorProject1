// Sample events data
const eventsData = [
    {
        id: 1,
        title: 'Event 1',
        date: '2023-12-31',
        time: '12:00 PM',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        image: 'images/event1.jpg'
    },
    {
        id: 2,
        title: 'Event 2',
        date: '2024-01-15',
        time: '2:30 PM',
        description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
        image: 'images/event2.jpg'
    }
];

//  Rendering the events page
exports.renderEventsPage = (req, res) => {
    res.render('events', { events: eventsData });
};
