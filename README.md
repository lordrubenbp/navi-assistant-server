# Navi Assistant Server

Navi Assistant Server is the backend service for the Navi Assistant project, providing essential functionalities such as user management, project handling, and integration with various APIs to enhance the application development experience.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Description

Navi Assistant Server is designed to work seamlessly with the Navi Assistant Extension, offering robust backend support. It manages user data, processes project information, and integrates with services like Dialogflow for natural language processing.

## Installation

Follow these steps to set up the server:

1. Clone this repository:
    ```bash
    git clone https://gitlab.com/navi-assistant/Extension.git
    ```
2. Navigate to the project directory:
    ```bash
    cd navi_assistant_server
    ```
3. Install the necessary dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables. Create a `.env` file and add your configuration:
    ```plaintext
    PORT=3000
    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASS=your_database_password
    ```
5. Start the server:
    ```bash
    npm start
    ```

## Usage

After setting up and starting the server, it will be running on the port specified in your `.env` file (default is 3000). The server provides endpoints for various operations required by the Navi Assistant Extension.

## Features

- **User Management**: Handle user registration, authentication, and data management.
- **Dialogflow Integration**: Support for natural language processing to enhance user interactions.
- **Real-time Communication**: Use of websockets for real-time data exchange.
- **Guided Projects**: Provides guided projects that users can follow and compare with their own projects in development to ensure they are on the right track and to assist in troubleshooting.

## API Endpoints

Here are some of the main API endpoints provided by the server:

- **User Endpoints**:
    - `POST /api/register`: Register a new user.
    - `POST /api/login`: Authenticate a user and provide a token.
    - `GET /api/user`: Retrieve user information.

- **Project Endpoints**:
    - `POST /api/projects`: Create a new project.
    - `GET /api/projects`: Get a list of projects.
    - `PUT /api/projects/:id`: Update project information.
    - `DELETE /api/projects/:id`: Delete a project.

- **Dialogflow Endpoints**:
    - `POST /api/dialogflow/webhook`: Handle Dialogflow webhook requests.

## Contributing

Contributions are welcome! To contribute:

1. Fork the project.
2. Create a new branch (`git checkout -b feature-new-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-new-feature`).
6. Open a Pull Request.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

For any questions or inquiries, you can contact us through:

- **Email**: ruben.baena@uca.es
- **Website**: [Navi Assistant](https://naviassistant.com/)
