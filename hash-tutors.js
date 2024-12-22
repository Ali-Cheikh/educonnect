const fs = require('fs');
const crypto = require('crypto');

// Read the tutors.json file
fs.readFile('tutors.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading tutors.json:', err);
    return;
  }

  // Hash the contents of tutors.json using SHA-256
  const hash = crypto.createHash('sha256').update(data).digest('hex');

  // Save the hash to a file (this will be used for verification later)
  fs.writeFile('tutors-hash.txt', hash, 'utf8', (err) => {
    if (err) {
      console.error('Error saving hash:', err);
      return;
    }
    console.log('Hash saved successfully!');
  });
});
