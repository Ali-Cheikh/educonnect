document.addEventListener("DOMContentLoaded", async () => {
    const tutorDropdown = document.getElementById("tutor");
    const successMessage = document.getElementById("success-message");
    const errorMessage = document.getElementById("error-message");
  
    // Fetch tutors and populate the dropdown
    async function fetchTutors() {
      try {
        const response = await fetch("http://localhost:3000/tutors");
        if (!response.ok) throw new Error("Failed to fetch tutors.");
        const tutors = await response.json();
        tutors.forEach(tutor => {
          const option = document.createElement("option");
          option.value = tutor.id;
          option.textContent = tutor.name;
          tutorDropdown.appendChild(option);
        });
      } catch (error) {
        console.error(error);
        errorMessage.textContent = "Failed to load tutors. Please try again later.";
        errorMessage.classList.remove("hidden");
      }
    }
  
    // Handle form submission
    document.getElementById("rate-tutor-form").addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const tutorId = tutorDropdown.value;
      const rating = document.getElementById("rating").value;
      const studentEmail = document.getElementById("student-email").value;
  
      // Validate the form inputs
      if (!tutorId || !rating || !studentEmail) {
        errorMessage.textContent = "Please fill in all fields.";
        errorMessage.classList.remove("hidden");
        successMessage.classList.add("hidden");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:3000/rate-tutor", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tutorId, rating, studentEmail }),
        });
  
        if (!response.ok) throw new Error("Failed to submit rating.");
  
        successMessage.textContent = "Rating submitted successfully!";
        successMessage.classList.remove("hidden");
        errorMessage.classList.add("hidden");
      } catch (error) {
        console.error(error);
        successMessage.classList.add("hidden");
        errorMessage.classList.remove("hidden");
        errorMessage.textContent = "Failed to submit rating. Please try again later.";
      }
    });
  
    await fetchTutors();
  });
  