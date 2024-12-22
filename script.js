// Fetch Tutors
async function fetchTutors({ subject = "", name = "" } = {}) {
  try {
    const response = await fetch(`http://localhost:3000/tutors?subject=${subject}&name=${name}`);
    if (!response.ok) throw new Error("Failed to fetch tutors.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Fetch Subjects
async function fetchSubjects() {
  try {
    const response = await fetch("http://localhost:3000/subjects");
    if (!response.ok) throw new Error("Failed to fetch subjects.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Display Tutors
async function displayResults(filters = {}) {
  const results = await fetchTutors(filters);
  const container = document.getElementById("recommendations");
  container.innerHTML = ""; // Clear previous results

  if (results.length === 0) {
    container.innerHTML = `<p class="text-center text-gray-500">No tutors found.</p>`;
    return;
  }

  results.forEach(tutor => {
    const card = document.createElement("div");
    card.className = "bg-white shadow-md rounded p-4 cursor-pointer";

    card.innerHTML = `
      <h2 class="text-xl font-bold">${tutor.name}</h2>
      <p style='display:none'>Rating: ${tutor.email}</p>
      <p>Subjects: ${tutor.subjects.join(", ")}</p>
      <p>Rating: ⭐${tutor.rating || "No ratings yet"}</p>
    `;

    // Open modal on click
    card.addEventListener("click", () => {
      document.getElementById("tutor-name").value = tutor.name;
      document.getElementById("schedule-modal").classList.remove("hidden");
    });

    container.appendChild(card);
  });
}

// Register a New Tutor
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

// Handle Tutor Registration
document.getElementById("register-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const tutorData = {
    name: document.getElementById("register-name").value,
    email: document.getElementById("register-email").value,
    subjects: document.getElementById("register-subjects").value.split(",").map(subject => subject.trim()),
  };

  const result = await registerTutor(tutorData);

  if (result) {
    Swal.fire({
      title: "Success!",
      text: "You have successfully registered a tutor.",
      icon: "success",
    });
    document.getElementById("register-form").reset();
  } else {
    Swal.fire({
      title: "Error",
      text: "Failed to register the tutor. Please try again.",
      icon: "error",
    });
  }
});

// Rate a Tutor
async function rateTutor(ratingData) {
  try {
    const response = await fetch("http://localhost:3000/rate-tutor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ratingData),
    });

    if (!response.ok) throw new Error("Failed to rate tutor.");
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Handle Tutor Rating
document.getElementById("rate-form")?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const ratingData = {
    tutorId: parseInt(document.getElementById("rate-tutor-id").value, 10),
    rating: parseFloat(document.getElementById("rate-rating").value),
    studentEmail: document.getElementById("rate-student-email").value,
  };

  const result = await rateTutor(ratingData);

  if (result) {
    Swal.fire({
      title: "Success!",
      text: "Your rating has been submitted.",
      icon: "success",
    });
    document.getElementById("rate-form").reset();
  } else {
    Swal.fire({
      title: "Error",
      text: "Failed to submit your rating. Please try again.",
      icon: "error",
    });
  }
});

// Populate Subject Dropdown
async function populateSubjectDropdown() {
  const subjects = await fetchSubjects();
  const dropdown = document.getElementById("subjectDropdown");

  // Add default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "All Subjects";
  dropdown.appendChild(defaultOption);

  subjects.forEach(subject => {
    const option = document.createElement("option");
    option.value = subject;
    option.textContent = subject;
    dropdown.appendChild(option);
  });
}

// Event Listeners for Filters
document.getElementById("subjectDropdown").addEventListener("change", function () {
  const filters = {
    subject: this.value,
    name: document.getElementById("search").value,
  };
  displayResults(filters);
});

document.getElementById("search").addEventListener("input", function () {
  const filters = {
    subject: document.getElementById("subjectDropdown").value,
    name: this.value,
  };
  displayResults(filters);
});


// Initial Load
window.onload = async () => {
  await populateSubjectDropdown();
  await displayResults();
};