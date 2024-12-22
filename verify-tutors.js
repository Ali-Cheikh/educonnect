const fs = require('fs');
const crypto = require('crypto');

// Function to verify if the tutors.json file is unaltered
function verifyTutorsFile() {
  // Read the original hash from tutors-hash.txt
  fs.readFile('tutors-hash.txt', 'utf8', (err, savedHash) => {
    if (err) {
      console.error('Error reading saved hash:', err);
      return;
    }

    // Read the current tutors.json file
    fs.readFile('tutors.json', 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading tutors.json:', err);
        return;
      }

      // Rehash the current content of tutors.json
      const currentHash = crypto.createHash('sha256').update(data).digest('hex');

      // Compare the current hash with the saved hash
      if (savedHash === currentHash) {
        console.log('File is verified and intact!');
      } else {
        console.log('File has been tampered with or altered.');
      }
    });
  });
}

// Call the verify function
verifyTutorsFile();
