import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, AlertCircle } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { enviarParaIA } from '../services/aiServices';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatIA = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Olá! Sou sua assistente de IA especializada em psicologia. Como posso ajudá-lo hoje?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { id: Date.now(), type: 'user', content: inputMessage, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await enviarParaIA(currentInput, messages);
      const botMessage = { id: Date.now() + 1, type: 'bot', content: aiResponse, timestamp: new Date() };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError(err.message);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: `Desculpe, ocorreu um erro: ${err.message}`,
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally { setIsLoading(false); }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    'Como lidar com pacientes com ansiedade?',
    'Técnicas para terapia infantil',
    'Abordagens para terapia de casal',
    'Sinais de alerta em depressão'
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 min-h-screen bg-gradient-to-b from-dark to-dark/90">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-extrabold text-white/70 mb-1">Chat com IA</h1>
        <p className="text-white/70 text-lg">Assistente especializada em psicologia para apoiar sua prática clínica</p>
      </div>

      {/* Chat Card */}
      <Card className="flex flex-col h-[650px] bg-gradient-to-tr from-white/5 to-white/10 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden shadow-lg">
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence initial={false}>
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${message.type === 'user' ? 'bg-light text-dark' : 'bg-accent text-white'} shadow-md`}>
                    {message.type === 'user' ? <User size={18} /> : <Bot size={18} />}
                  </div>

                  <div className={`rounded-2xl px-5 py-3 ${message.type === 'user' ? 'bg-light text-dark' : message.isError ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-white/10 text-white'} backdrop-blur-md`}>
                    {message.type === 'user' ? (
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    ) : (
                      <div className="text-sm leading-relaxed"><MarkdownRenderer content={message.content} /></div>
                    )}
                    <p className="text-xs opacity-50 mt-1 text-right">
                      {message.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-[80%]">
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shadow-md">
                  <Bot size={18} />
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 flex items-center space-x-2">
                  <Loader2 size={16} className="animate-spin text-accent" />
                  <span className="text-sm text-white/70">Pensando...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-white/20 p-4 bg-white/5 backdrop-blur-lg rounded-b-3xl flex items-center space-x-3">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua pergunta sobre psicologia..."
            className="flex-1 resize-none border border-white/20 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent bg-white/10 text-white placeholder-white/50"
            rows={2}
            disabled={isLoading}
          />
          <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isLoading} className="bg-accent hover:bg-accent/90 p-3 rounded-xl transition-all shadow-lg flex items-center justify-center">
            <Send size={20} className="text-white"/>
          </Button>
        </div>
      </Card>

      {/* Error Notification */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-red-50 border border-red-300 rounded-xl flex items-center space-x-2 shadow-sm"
        >
          <AlertCircle size={20} className="text-red-500" />
          <span className="text-red-700">{error}</span>
        </motion.div>
      )}

      {/* Suggested Questions */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-white mb-3">Perguntas Sugeridas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setInputMessage(question)}
              className="text-left p-4 bg-white/10 border border-white/20 rounded-2xl hover:bg-white/20 hover:border-accent transition-all shadow-md text-white"
              disabled={isLoading}
            >
              <span className="text-sm">{question}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
