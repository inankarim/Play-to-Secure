import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QuizReflectionModal = ({ isOpen, reflection, onClose, sendMessageToAI }) => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: reflection }, // Initial reflection as AI message
  ]);

  if (!isOpen) return null; // Don't render the modal if it's not open

  const handleSendMessage = async () => {
    if (!chatInput) return;

    // Add user message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: chatInput },
    ]);

    // Send message to AI
    try {
      const response = await sendMessageToAI(chatInput);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: response },
      ]);
    } catch (error) {
      console.error('Error with AI message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Sorry, I couldn’t understand that.' },
      ]);
    }

    // Clear input
    setChatInput('');
  };

  return (
    <motion.div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Explanation & AI Chat</h2>
        
        {/* Reflection */}
        <p className="text-lg text-gray-600 mb-6">{reflection}</p>
        
        {/* Chat Area */}
        <div className="h-48 overflow-y-auto border-t border-b p-4 mb-6 bg-gray-100 rounded-lg">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className={message.sender === 'user' ? 'text-right' : 'text-left'}>
                <div
                  className={`inline-block p-2 rounded-lg max-w-xs ${
                    message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            className="input input-bordered flex-1"
            placeholder="Ask a question..."
          />
          <button
            onClick={handleSendMessage}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-colors"
          >
            Send
          </button>
        </div>

        {/* Done Button */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default QuizReflectionModal;
