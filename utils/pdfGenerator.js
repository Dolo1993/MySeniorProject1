const PDFDocument = require('pdfkit');
const fs = require('fs');

function generatePDF(submission) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const filePath = `membership_forms/${submission.id}.pdf`;
        const stream = fs.createWriteStream(filePath);
        
        doc.pipe(stream);
        
        // Styling
        doc.font('Helvetica');

        // Submission details with CSS-like styling
        doc.fontSize(12).fillColor('#333').text(`Name: ${submission.fullname}`, { continued: true }).fillColor('#666').text(' ', { continued: true }).fillColor('#000').text(`${submission.fullname}`).moveDown();
        doc.fontSize(12).fillColor('#333').text(`Email: ${submission.email}`);
        doc.fontSize(12).fillColor('#333').text(`Phone: ${submission.phone}`);
        
        // Convert submission.dob to Date object if it's a string
        const dob = submission.dob instanceof Date ? submission.dob : new Date(submission.dob);
        doc.fontSize(12).fillColor('#333').text(`Date of Birth: ${dob instanceof Date ? dob.toDateString() : submission.dob}`);
        
        doc.fontSize(12).fillColor('#333').text(`Place of Birth: ${submission.placeofbirth}`);
        doc.fontSize(12).fillColor('#333').text(`University: ${submission.university}`);
        doc.fontSize(12).fillColor('#333').text(`Interests: ${submission.interests}`);
        doc.fontSize(12).fillColor('#333').text(`Comments: ${submission.comments}`);
        
        doc.end();

        stream.on('finish', () => {
            resolve(filePath);
        });

        stream.on('error', (err) => {
            reject(err);
        });
    });
}

module.exports = { generatePDF };
