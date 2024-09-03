import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './App.css';

function App() {
  const [showChatBox, setShowChatBox] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'PersonalAi Assistant', text: 'Hello! How can I help?' },
    // { sender: 'User', text: 'I need some help.' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleChatBox = () => {
    setShowChatBox(!showChatBox);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      // Add user message to the chat
      setMessages([...messages, { sender: 'User', text: newMessage }]);
      setNewMessage('');
      setIsTyping(true);

      // Simulate AI typing delay and response
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: 'PersonalAi Assistant',
            text: generateAIResponse(newMessage),
          },
        ]);
      }, 2000); // Simulate 2-second AI response delay
    }
  };

  // AI Response Generator with shorter responses
  const generateAIResponse = (userInput) => {
    const normalizedInput = userInput.toLowerCase();
    if (normalizedInput.includes('help')) {
      return 'What do you need help with?';
    } else if (normalizedInput.includes('how are you')) {
      return 'I’m doing well! How about you?';
    } else if (normalizedInput.includes('account')) {
      return 'Need help with your account?';
    } else if (normalizedInput.includes('features')) {
      return 'Looking for features?';
    } else if (normalizedInput.includes('troubleshooting')) {
      return 'Let me help with that issue.';
    } else if (normalizedInput.includes('thanks') || normalizedInput.includes('thank you')) {
      return 'You’re welcome!';
    } else if (normalizedInput.includes('goodbye') || normalizedInput.includes('bye')) {
      return 'Goodbye!';
    } else {
      return "Can you tell me more?";
    }
  };

  const getInitials = (name) => name.charAt(0).toUpperCase();

  const getAvatarColor = (name) => {
    const colors = ['#708090', '#FF5733', '#FF33A1', '#FFFFFF', '#FFD700'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Kifiya</h1>
      </header>
      <div className="App-body">
        <p>PersonalAi Assistant</p>
      </div>
      <button className="sms-button" onClick={toggleChatBox}>
        💬
      </button>

      {showChatBox && (
        <div className="chatbox-modal">
          <div className="chatbox-header">
            <div
              className="header-avatar"
              style={{ backgroundColor: getAvatarColor('Kifiya Ai Support') }}
            >
              {getInitials('Kifiya Ai Support')}
            </div>
            <h3>Kifiya Ai Support</h3>
            <FaTimes className="close-icon" onClick={toggleChatBox} />
          </div>
          <div className="chatbox-content">
            <div className="chatbox-messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    message.sender === 'User' ? 'user-message' : 'assistant-message'
                  }`}
                >
                  {message.sender !== 'User' && (
                    <div
                      className="message-avatar"
                      style={{ backgroundColor: getAvatarColor(message.sender) }}
                    >
                      {getInitials(message.sender)}
                    </div>
                  )}
                  <div className="message-content">
                    <p>{message.text}</p>
                  </div>
                  {message.sender === 'User' && (
                    <div
                      className="message-avatar"
                      style={{ backgroundColor: getAvatarColor(message.sender) }}
                    >
                      {getInitials(message.sender)}
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="typing-indicator">
                  <p>PersonalAi Assistant is typing...</p>
                </div>
              )}
            </div>
            <div className="chatbox-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
