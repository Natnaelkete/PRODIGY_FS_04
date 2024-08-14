# All-random-chat - Real-time Application

All-random-chat is a real-time web application that leverages modern web technologies to provide interactive and dynamic user experiences. This project focuses on real-time data communication, secure authentication, and efficient data management.

## Features

- **Real-time Communication**: Instant updates and notifications using Socket.IO.
- **User Authentication**: Secure login and registration using JWT.
- **Data Management**: Efficient data handling and fetching with React Query.
- **Scalable Backend**: Built with Express and MongoDB for robust performance.
- **Responsive Design**: User-friendly interface across all devices.

## Tech Stack

- **Frontend**: React, React Query
- **Backend**: Node.js, Express.js, MongoDB
- **Real-time**: Socket.IO
- **Authentication**: JWT (JSON Web Token)
- **Database**: MongoDB

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Natnaelkete/PRODIGY_FS_04.git
2. Navigate to the project directory, install dependencies, and set up the frontend:

   ```bash
   cd PRODIGY_FS_04
    npm install
    cd client
    npm install
    cd ..
3. Set up your environment variables:

   ```bash
   MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret

4. Clone the repository:

   ```bash
   git clone https://github.com/Natnaelkete/PRODIGY_FS_04.git
## Project Structure

  ```bash
  PRODIGY_FS_04/
├── client/         # Frontend React application
├── controllers/    # Express controllers
├── models/         # Mongoose models
├── routes/         # API routes
├── middleware/     # Custom middleware
├── utils/          # Utility functions
├── .env.example    # Example environment variables
└── README.md       # Project documentation
