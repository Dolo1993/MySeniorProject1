const PDFDocument = require('pdfkit');
const fs = require('fs');

function generatePDF(submission) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const filePath = `membership_forms/${submission.id}.pdf`;
        const stream = fs.createWriteStream(filePath);
        
        doc.pipe(stream);
        
        // submission details to the PDF document
        doc.text(`Name: ${submission.fullname}`);
        doc.text(`Email: ${submission.email}`);
        doc.text(`Phone: ${submission.phone}`);
        doc.text(`Date of Birth: ${submission.dob}`);
        doc.text(`Place of Birth: ${submission.placeofbirth}`);
        doc.text(`University: ${submission.university}`);
        doc.text(`Interests: ${submission.interests}`);
        doc.text(`Comments: ${submission.comments}`);
        
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
