
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { generateText } from '../services/geminiService';
import { ChatMessage } from '../types';
import { SYSTEM_INSTRUCTION_CHATBOT } from '../constants';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (input.trim() === '') return;

    const newUserMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        content: msg.text,
      }));

      const response = await generateText(input, chatHistory, SYSTEM_INSTRUCTION_CHATBOT);

      const newModelMessage: ChatMessage = {
        id: Date.now().toString() + '-model',
        sender: 'model',
        text: response,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, newModelMessage]);
    } catch (error: any) {
      console.error('Error generating content:', error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString() + '-error',
        sender: 'model',
        text: `عذراً، حدث خطأ أثناء معالجة طلبك. ${error.message || 'الرجاء المحاولة مرة أخرى لاحقاً.'}`,
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [input, messages]); // `messages` is a dependency here for reconstructing chat history

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSendMessage();
    }
  }, [handleSendMessage, isLoading]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 bg-secondary-gold text-primary-dark p-4 rounded-full shadow-lg hover:bg-yellow-600 transition duration-300 ease-in-out flex items-center justify-center text-2xl"
        aria-label={isOpen ? 'إغلاق المحادثة' : 'فتح المحادثة'}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-dots'}`}></i>
      </button>

      {isOpen && (
        <div className="fixed bottom-20 left-6 z-40 bg-white rounded-lg shadow-xl w-80 md:w-96 h-[400px] flex flex-col border border-gray-200">
          <div className="p-4 bg-primary-dark text-white rounded-t-lg flex justify-between items-center">
            <h3 className="text-lg font-semibold">مساعد المؤسسة الافتراضي</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-secondary-gold text-xl"
            >
              &times;
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4 space-y-4 text-right">
            {messages.length === 0 && (
              <p className="text-gray-500 text-center">مرحباً! كيف يمكنني مساعدتك اليوم؟</p>
            )}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] p-3 rounded-lg shadow-md ${
                    msg.sender === 'user'
                      ? 'bg-secondary-gold text-primary-dark'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className="block text-xs text-gray-500 mt-1">
                    {msg.timestamp.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[75%] p-3 rounded-lg bg-gray-100 text-gray-800 shadow-md">
                  <span className="dot-pulse"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t border-gray-200 flex items-center">
            <input
              type="text"
              className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-dark text-right"
              placeholder="اكتب رسالتك..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              className="bg-primary-dark text-white p-2 rounded-lg mr-2 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-primary-dark disabled:opacity-50"
              disabled={isLoading}
              aria-label="إرسال رسالة"
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </div>
        </div>
      )}

      {/* Basic dot pulse animation for loading */}
      <style jsx>{`
        .dot-pulse {
          position: relative;
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background-color: #999;
          color: #999;
          animation: dotPulse 1.5s infinite ease-in-out;
        }
        .dot-pulse::before,
        .dot-pulse::after {
          content: '';
          display: inline-block;
          position: absolute;
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background-color: #999;
          color: #999;
        }
        .dot-pulse::before {
          left: -12px;
          animation: dotPulseBefore 1.5s infinite ease-in-out;
        }
        .dot-pulse::after {
          left: 12px;
          animation: dotPulseAfter 1.5s infinite ease-in-out;
        }
        @keyframes dotPulseBefore {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          33% {
            transform: scale(0.3);
            opacity: 0.5;
          }
          66% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes dotPulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          33% {
            transform: scale(1);
            opacity: 1;
          }
          66% {
            transform: scale(0.3);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes dotPulseAfter {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          33% {
            transform: scale(1);
            opacity: 1;
          }
          66% {
            transform: scale(1);
            opacity: 1;
          }
          100% {
            transform: scale(0.3);
            opacity: 0.5;
          }
        }
      `}</style>
    </>
  );
};

export default Chatbot;
