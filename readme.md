# Tutor Recommendation System

## Overview
The Tutor Recommendation System is a web application designed to assist users in finding and rating tutors based on their expertise and subject specialization. The platform enables users to:

- Search and filter tutors by name and subject.
- Register new tutors with detailed information.
- Rate tutors and update their average ratings dynamically.
- View and select from a dynamically populated list of subjects.

This project is powered by a Node.js backend using Express.js for routing and JSON files for data storage. The responsive frontend is crafted with HTML, CSS, and JavaScript.

---

## Features

### User Features
- **Tutor Search:**
  - Filter tutors by name and subject.
  - View detailed profiles and ratings of tutors.

- **Tutor Registration:**
  - Add new tutors with their name, email, subject, and profile description.

- **Rating System:**
  - Rate tutors on a scale of 1 to 5.
  - Automatically calculate and update the average rating of each tutor.

### Admin Features
- **Dynamic Subject List:**
  - Automatically fetch and display unique subjects based on registered tutors.

- **Data Management:**
  - Store and manage tutors’ data in a JSON file on the server.

---

## Technologies Used

### Frontend
- **HTML5:** For structuring the web pages.
- **CSS3:** For styling and visual design.
- **JavaScript:** For interactivity and API integration.

### Backend
- **Node.js:** For server-side logic and routing.
- **Express.js:** For building APIs and handling requests.
- **JSON:** For storing tutor data persistently.

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/tutor-recommendation-system.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd tutor-recommendation-system
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`.

---

## API Endpoints

### GET `/api/tutors`
Fetch the list of tutors. Supports optional query parameters for filtering.
- **Query Parameters:**
  - `name` (string): Filter tutors by name.
  - `subject` (string): Filter tutors by subject.

### GET `/api/subjects`
Returns a list of unique subjects based on registered tutors.

### POST `/api/tutors`
Registers a new tutor.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "subject": "Mathematics",
    "profile": "Experienced math tutor with a decade of experience."
  }
  ```

### POST `/api/tutors/:id/rate`
Rates a tutor and updates their average rating.
- **Request Body:**
  ```json
  {
    "rating": 5
  }
  ```

---

## Folder Structure

```
.
├── public
│   ├── index.html      # Main frontend page
│   ├── styles.css      # Styling for the application
│   └── app.js          # Frontend logic
├── data
│   └── tutors.json     # JSON file storing tutor data
├── server.js           # Main server file
├── routes
│   ├── tutors.js       # API routes for tutors
│   └── subjects.js     # API routes for subjects
├── package.json        # Node.js dependencies and scripts
└── README.md           # Project documentation
```

---

## Future Enhancements

- **Database Integration:** Replace JSON file storage with a database (e.g., MongoDB or SQLite) for improved scalability and concurrency.
- **Authentication:** Implement user authentication to secure tutor registration and rating.
- **Pagination:** Add pagination or infinite scrolling to handle large tutor lists.
- **UI Enhancements:** Upgrade the user interface using frameworks like Bootstrap or Tailwind CSS.
- **Advanced Filters:** Enable multi-criteria search and filtering options for better tutor discovery.

---

## Contributing

1. **Fork the repository.**
2. **Create a new branch:**
   ```bash
   git checkout -b feature-name
   ```
3. **Commit your changes:**
   ```bash
   git commit -m "Add a new feature"
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature-name
   ```
5. **Open a pull request.**

