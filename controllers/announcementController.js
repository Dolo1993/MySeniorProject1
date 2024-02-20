// Sample announcements data
const announcementsData = [
    {
        id: 1,
        title: 'Announcement 1',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        date: '2023-12-01'
    },
    {
        id: 2,
        title: 'Announcement 2',
        content: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
        date: '2023-12-15'
    }
];

// Rendering the announcement page
exports.renderAnnouncementPage = (req, res) => {
    res.render('announcement', { announcements: announcementsData });
};
