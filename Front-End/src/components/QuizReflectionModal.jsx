import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const QuizReflectionModal = ({ isOpen, reflection, onClose, sendMessageToAI }) => {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize messages with reflection when modal opens
  useEffect(() => {
    if (isOpen && reflection) {
      setMessages([{ sender: 'bot', text: reflection }]);
    }
  }, [isOpen, reflection]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSendMessage = async () => {
    if (!chatInput.trim() || isLoading) return;

    const userMessage = chatInput.trim();
    
    // Add user message to chat
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: userMessage },
    ]);

    // Clear input immediately
    setChatInput('');
    setIsLoading(true);

    // Send message to AI
    try {
      const response = await sendMessageToAI(userMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: response },
      ]);
    } catch (error) {
      console.error('Error with AI message:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Sorry, I couldn\'t process your request. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClose = () => {
    // Reset state when closing
    setMessages([]);
    setChatInput('');
    setIsLoading(false);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50 p-2 md:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-[95vw] h-[95vh] md:w-[85vw] md:h-[85vh] lg:w-[75vw] lg:h-[80vh] flex flex-col overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-4 md:p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl md:text-2xl font-bold">AI Tutor Explanation</h2>
            <p className="text-blue-100 text-sm mt-1">Get detailed explanations and ask follow-up questions</p>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 transition-colors text-2xl md:text-3xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:bg-opacity-20"
          >
            ×
          </button>
        </div>
        
        {/* Chat Messages Area - Takes up most of the space */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="space-y-4 md:space-y-6 max-w-5xl mx-auto">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`max-w-[85%] md:max-w-[80%] p-4 md:p-6 rounded-2xl shadow-lg ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md border border-gray-200'
                  }`}
                >
                  <div className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">
                    {message.text}
                  </div>
                  <div className={`text-xs mt-2 opacity-70 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.sender === 'user' ? 'You' : 'AI Tutor'}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="bg-white p-4 md:p-6 rounded-2xl rounded-bl-md border border-gray-200 shadow-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <div className="text-xs mt-2 text-gray-500 opacity-70">AI Tutor is thinking...</div>
                </div>
              </motion.div>
            )}
            
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input Area - Fixed at bottom */}
        <div className="bg-white border-t border-gray-200 p-4 md:p-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex gap-2 md:gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-3 md:py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base md:text-lg placeholder-gray-400"
                placeholder="Ask a follow-up question about this topic..."
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!chatInput.trim() || isLoading}
                className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-base md:text-lg shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="hidden md:inline">Sending...</span>
                  </div>
                ) : (
                  'Send'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Done Button - Fixed at bottom */}
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <div className="max-w-5xl mx-auto flex justify-end">
            <button
              onClick={handleClose}
              className="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold text-base md:text-lg shadow-lg"
            >
              Continue Quiz →
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuizReflectionModal;