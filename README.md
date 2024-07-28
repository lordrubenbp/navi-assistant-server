# Navi Assistant Server

Navi Assistant Server is the backend service for the Navi Assistant project, providing essential functionalities such as user management, project handling, and integration with various APIs to enhance the application development experience.

## Table of Contents

- [Description](#description)
- [Components](#components)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Import Dialogflow ES Agent](#import-dialogflow-es-agent)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Description

The NAVI Assistant server, implemented using [Node.js](https://nodejs.org/), is responsible for business logic and data management, providing the necessary services to the web browser extension. Its functions include text localization in server responses and the reception, processing, and sending of real-time responses to the data sent by the extension. Moreover, the server offers methods to perform CRUD operations in the database, where user activity logs are stored. It integrates the [Dialogflow](https://cloud.google.com/dialogflow/) platform to create personalized responses and features a static code analysis tool written in Python. It also includes a comparator that matches the user's code with the guided project's code during project development.


## Components

- **Register**. This component, like its counterpart in the browser extension, contains the necessary classes and methods for creating objects that conform to the established data model, but in TypeScript. When the server receives information from the web extension, this component helps structure the incoming data.

- **Locale**. This component contains the methods required to localize the various texts that form the server's responses. It uses the `i18n` library and JSON files where all translations for each supported language are stored.

- **App**. This component is essential because, using the `Express` tool, it can receive, process, and send appropriate real-time responses to data sent by the web extension via `Socket.IO`. This process includes activities such as guided project management, qualitative and quantitative evaluation of projects, and data storage in the database. Additionally, this component provides the necessary infrastructure to access multimedia content on the server host, used in responses from the web extension's chatbot, and to access the tool's web page.

- **Controller**. This component uses the `Sequelize` tool to provide the methods necessary for performing CRUD operations in the tool's database, which stores user usage records.

- **Cards Creator**. The function of this component is to provide various templates for creating the response cards displayed in the chatbot. Each method in this component provides a different pattern based on the Dialogflow Messenger documentation.

- **Dialogflow Webhook**. This component integrates the Dialogflow platform with the server, allowing for the creation of personalized and automated responses for users. When a user interacts with the NAVI Assistant chatbot, their input is sent to Dialogflow for processing. If the detected intent's response indicates that the server should find the response, the platform will send the user's input to this server component. There, the information will be processed, and a personalized response will be sent back to Dialogflow, which will then display the server's response to the user in the chatbot.

- **Python Caller**. This component is responsible for executing the static code analysis tool `dr-app-inventor` written in Python. Thanks to the `python-shell` module used by this component, it is not necessary to rewrite the `dr-app-inventor` tool's code.

- **Compare Form**. This component is only used by the `App` component when the user is working on a guided project in the chatbot. Its task is to compare the design workspace code created by the user with that of the guided project. The result of this comparison is a series of natural language instructions indicating what changes the user should make in the design workspace to match the guided project code, whether adding, removing, or modifying elements.

- **Compare Blocks**. Like the previous component, this one is also only used by the `App` component when the user is carrying out a guided project in the chatbot. Its function is to compare the block workspace code generated by the user with that of the guided project. The result of this comparison is a series of natural language steps indicating what the user should add, remove, or change in the block workspace to align with the guided project code.


## Installation

Follow these steps to set up the server:

1. Clone this repository:
    ```bash
    git clone https://github.com/lordrubenbp/navi-assistant-server.git
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
 
## Import Dialogflow ES Agent

To import the `NAVI_ASSISTANT_AGENT.zip` file containing a Dialogflow ES conversational agent, follow these steps:

1. Log in to your Dialogflow ES account at [Dialogflow Console](https://dialogflow.cloud.google.com/).
2. Create a new agent or select an existing agent.
3. Go to the agent's settings by clicking the gear icon next to the agent's name.
4. In the "Export and Import" tab, select "Import".
5. Click "Select file" and upload the `NAVI_ASSISTANT_AGENT.zip` file.
6. Confirm that you want to import the file. This will overwrite the current agent with the contents of the uploaded file.

Once the import is complete, the agent will be ready for configuration and use within Dialogflow ES.

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
