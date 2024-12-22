document.getElementById("register-form").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const tutorData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subjects: document.getElementById("subjects").value.split(",").map(subject => subject.trim()),
    };
  
    const result = await registerTutor(tutorData);
  
    if (result) {
      // Show success message with SweetAlert
      Swal.fire({
        title: "Success!",
        text: "You have successfully registered as a tutor.",
        icon: "success",
      });
  
      document.getElementById("register-form").reset();
    } else {
      Swal.fire({
        title: "Error",
        text: "There was an issue registering the tutor. Please try again.",
        icon: "error",
      });
    }
  });
  
  async function registerTutor(tutorData) {
    try {
      const response = await fetch("http://localhost:3000/tutors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tutorData),
      });
  
      if (!response.ok) throw new Error("Failed to register tutor.");
  
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  