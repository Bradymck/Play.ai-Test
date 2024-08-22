import React, { useState, useRef, useEffect } from 'react';

const PlayAIComponent = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const wsRef = useRef(null);

  useEffect(() => {
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const connectWebSocket = () => {
    const ws = new WebSocket(`wss://api.play.ai/v1/talk/${process.env.REACT_APP_PLAY_AI_AGENT_ID}`);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      ws.send(JSON.stringify({
        type: 'setup',
        apiKey: process.env.REACT_APP_PLAY_AI_API_KEY
      }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, message]);
    };

    ws.onclose = () => {
      setIsConnected(false);
    };
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0 && wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          const reader = new FileReader();
          reader.onload = () => {
            const base64Data = reader.result.split(',')[1];
            wsRef.current.send(JSON.stringify({
              type: 'audioIn',
              data: base64Data
            }));
          };
          reader.readAsDataURL(event.data);
        }
      };
      mediaRecorder.start(1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const handleConnect = () => {
    if (!isConnected) {
      connectWebSocket();
      startRecording();
    } else {
      if (wsRef.current) {
        wsRef.current.close();
      }
    }
  };

  return (
    <div>
      <button onClick={handleConnect}>
        {isConnected ? 'Disconnect' : 'Connect to Play.ai'}
      </button>
      <div>
        <h3>Messages:</h3>
        {messages.map((msg, index) => (
          <pre key={index}>{JSON.stringify(msg, null, 2)}</pre>
        ))}
      </div>
    </div>
  );
};

export default PlayAIComponent;