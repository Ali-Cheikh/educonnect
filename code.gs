function doPost(e) {
  // Parse the incoming data
  var data = JSON.parse(e.postData.contents);
  var tutorEmail = data.tutorEmail;
  var studentEmail = data.studentEmail;
  var tutorName = data.tutorName;
  var date = data.date;
  var time = data.time;

  var subject = "New Session Scheduled";
  var studentMessage = `You have successfully scheduled a session with ${tutorName} on ${date} at ${time}.`;
  var tutorMessage = `You have a new session scheduled with a student on ${date} at ${time}.`;

  // Send the emails
  MailApp.sendEmail({
    to: studentEmail,
    subject: subject,
    body: studentMessage,
  });

  MailApp.sendEmail({
    to: tutorEmail,
    subject: subject,
    body: tutorMessage,
  });

  // Prepare the response with success status
  var response = ContentService.createTextOutput(
    JSON.stringify({ status: "success", message: "Emails sent." })
  ).setMimeType(ContentService.MimeType.JSON);

  // Set CORS headers to allow requests from any origin
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "POST");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");

  return response;
}
