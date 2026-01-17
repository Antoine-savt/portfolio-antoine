import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Bot } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const GeminiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Bonjour ! Je suis Lumina, l\'IA de ce portfolio. Je peux vous parler des projets, de la stack technique ou des compétences du développeur. Que voulez-vous savoir ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Add placeholder for streaming response
    setMessages(prev => [...prev, { role: 'model', text: '', isStreaming: true }]);

    await sendMessageToGemini(userMessage, (streamedText) => {
        setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage.role === 'model' && lastMessage.isStreaming) {
                lastMessage.text = streamedText;
            }
            return newMessages;
        });
    });

    setIsLoading(false);
    setMessages(prev => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage.isStreaming) delete lastMessage.isStreaming;
        return newMessages;
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[350px] sm:w-[400px] h-[500px] glass-panel rounded-2xl flex flex-col overflow-hidden shadow-2xl animate-float transition-colors duration-300">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-primary/20 to-secondary/20 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center mr-3 relative">
                <Sparkles size={16} className="text-white animate-pulse" />
                <div className="absolute inset-0 bg-indigo-500 blur-md opacity-50 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h3 className="text-slate-900 dark:text-white font-bold text-sm">Lumina AI</h3>
                <p className="text-xs text-indigo-500 dark:text-indigo-300">Assistant Virtuel</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50 dark:bg-transparent">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary text-slate-900 font-medium rounded-tr-none' 
                      : 'bg-white dark:bg-white/10 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none'
                  }`}
                >
                  {msg.text}
                  {msg.isStreaming && <span className="inline-block w-1.5 h-3 ml-1 bg-slate-400 dark:bg-white animate-pulse"/>}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/20">
            <div className="flex items-center bg-white dark:bg-slate-900/50 rounded-full border border-slate-300 dark:border-white/10 px-4 py-2 shadow-sm dark:shadow-none">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Posez une question sur le portfolio..."
                className="flex-1 bg-transparent outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                disabled={isLoading}
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className={`ml-2 p-2 rounded-full transition-colors ${
                  input.trim() ? 'text-primary hover:bg-slate-100 dark:hover:bg-white/10' : 'text-slate-400 dark:text-slate-600'
                }`}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all duration-300 hover:scale-110"
      >
        <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 animate-ping"></div>
        {isOpen ? <X size={24} /> : <Bot size={28} />}
        
        {/* Notification dot if closed */}
        {!isOpen && messages.length > 1 && (
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900"></span>
        )}
      </button>
    </div>
  );
};

export default GeminiChat;