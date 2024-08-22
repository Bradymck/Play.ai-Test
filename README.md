# Play.ai WebSocket Demo

This project demonstrates a WebSocket connection to the Play.ai API for real-time audio communication.

## Prerequisites

Before you begin, ensure you have met the following requirements:
* You have a Play.ai account and have obtained your API key and Agent ID.
* Node.js and npm are installed on your machine.

## Setup

1. Clone this repository to your local machine.
2. Navigate to the project directory and run `npm install` to install dependencies.
3. Create a `.env` file in the root directory with the following content:

   ```
   REACT_APP_PLAY_AI_AGENT_ID=your_agent_id_here
   REACT_APP_PLAY_AI_API_KEY=your_api_key_here
   ```

   Replace `your_agent_id_here` and `your_api_key_here` with your actual Play.ai Agent ID and API key.

## Running the Application

In the project directory, you can run:

### `npm start`

This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Features

- Real-time WebSocket connection to Play.ai API
- Audio streaming and playback
- Handling of various message types from the API

## Troubleshooting

If you encounter any issues with audio playback or WebSocket connection, check the browser console for error messages and ensure your API credentials are correct in the `.env` file.

## Contributing

Contributions to improve the demo are welcome. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature-name`)
6. Create a new Pull Request

## License

This project is licensed under the MIT License.