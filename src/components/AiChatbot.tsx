import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, Minimize2, Maximize2, RotateCcw, Copy, Check, Sparkles, MessageCircle, ChevronDown, User, AlertCircle } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

interface AiChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export const N8N_CHAT_WEBHOOK_URL = 'https://kavithaambati.app.n8n.cloud/webhook/b23c6e14-a39e-4071-8939-b1a1049ca014/chat';
export const LOCAL_PROXY_URL = '/api/n8n-chat';

export const AiChatbot: React.FC<AiChatbotProps> = ({
  isOpen,
  onToggle,
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: "Namaste! 🙏 Welcome to **Russia Explorer AI Assistant**.\n\nI can help you plan your complete Russia trip from India within your ₹5,00,000 budget! Ask me about:\n- ✈️ **Flights from Delhi, Mumbai & Bengaluru**\n- 🏛️ **Moscow & St. Petersburg Tour Packages**\n- 📑 **16-Day Russian e-Visa for Indian Passports**\n- 🍛 **Authentic Indian Veg & Jain dining options**\n- 💳 **Currency exchange & Mir card payments**\n\nHow can I help you explore Russia today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [hasInteracted, setHasInteracted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate or retrieve persistent sessionId
  useEffect(() => {
    let currentSession = sessionStorage.getItem('russia_explorer_n8n_session');
    if (!currentSession) {
      currentSession = `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      sessionStorage.setItem('russia_explorer_n8n_session', currentSession);
    }
    setSessionId(currentSession);
  }, []);

  // Handle external prompt triggering (e.g. from buttons on the page)
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim()) {
      sendMessage(initialPrompt);
      if (onClearInitialPrompt) {
        onClearInitialPrompt();
      }
    }
  }, [initialPrompt]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isLoading) return;

    setHasInteracted(true);
    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const payload = {
        chatInput: trimmed,
        sessionId: sessionId || 'default_session',
      };

      // Try local proxy first (bypasses browser CORS)
      let response: Response;
      try {
        response = await fetch(LOCAL_PROXY_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        // Fallback to direct n8n webhook URL
        response = await fetch(N8N_CHAT_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        // Try direct as secondary attempt if proxy gave non-200
        response = await fetch(N8N_CHAT_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const data = await response.json();
      
      // Parse output from n8n response format
      let botResponse = '';
      if (typeof data === 'string') {
        botResponse = data;
      } else if (data.output) {
        botResponse = data.output;
      } else if (data.text) {
        botResponse = data.text;
      } else if (data.response) {
        botResponse = data.response;
      } else if (data.message) {
        botResponse = data.message;
      } else {
        botResponse = JSON.stringify(data);
      }

      const assistantMsg: Message = {
        id: `bot_${Date.now()}`,
        sender: 'assistant',
        text: botResponse || "I received your request. Let me know if you would like me to check flight schedules or Russian visa details!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('n8n Chat Webhook Error:', error);
      const fallbackMsg: Message = {
        id: `err_${Date.now()}`,
        sender: 'assistant',
        text: "I'm having a brief connection delay reaching our cloud server. In the meantime, our live India tour desk is active on WhatsApp at **+91 98110 54220** for immediate package and flight assistance.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleResetChat = () => {
    const newSession = `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    sessionStorage.setItem('russia_explorer_n8n_session', newSession);
    setSessionId(newSession);
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: "Conversation refreshed. How may I assist your Russian travel plans today?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  // Quick prompt chips
  const suggestedPrompts = [
    'How do I apply for the 16-Day Russian e-Visa?',
    'What flights are available from Delhi to Moscow?',
    'Can I get pure vegetarian or Jain food in Russia?',
    'Suggest a 7-day trip under ₹2,50,000 for 2 adults',
    'How do I exchange Indian currency for Rubles?',
  ];

  // Simple formatting helper for markdown bold and bullet lines
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return lines.map((line, lineIdx) => {
      // Parse **bold** parts
      const parts = line.split(/(\*\*.*?\*\*)/g);
      const renderedParts = parts.map((part, partIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={partIdx} className="font-bold text-white">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      return (
        <div key={lineIdx} className={line === '' ? 'h-2' : 'min-h-[1.2em]'}>
          {renderedParts}
        </div>
      );
    });
  };

  return (
    <>
      {/* Floating Trigger Launcher Button */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={onToggle}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-rose-600 via-rose-500 to-indigo-600 text-white shadow-xl shadow-rose-950/50 hover:shadow-rose-700/40 transition-all duration-300 hover:scale-105 cursor-pointer border border-white/20"
          aria-label="Open Russia Explorer AI Chatbot"
        >
          {/* Animated pulse ring */}
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400"></span>
          </span>

          <Bot className="h-5 w-5 transition-transform group-hover:rotate-12" />
          
          <div className="text-left">
            <span className="block text-xs font-bold leading-none tracking-tight">
              Ask Russia AI
            </span>
            <span className="block text-[10px] text-rose-200/90 leading-tight">
              24/7 Smart Travel Assistant
            </span>
          </div>
        </button>
      </div>

      {/* Main Chatbot Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 ease-out flex flex-col overflow-hidden rounded-2xl border border-white/20 bg-[#0C1220]/95 backdrop-blur-xl shadow-2xl ${
            isExpanded
              ? 'bottom-4 right-4 left-4 top-4 sm:left-auto sm:w-[680px] sm:h-[85vh]'
              : 'bottom-20 left-4 sm:left-6 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Top Bar / Header */}
          <div className="flex items-center justify-between px-4 py-3.5 bg-[#141C2E] border-b border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-600 to-indigo-600 text-white font-bold shadow-md">
                <Bot className="h-4 w-4" />
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-[#141C2E]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif-heading text-sm font-bold text-white">
                    Russia Explorer AI
                  </h3>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Live n8n Cloud
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Instant Tour, Flight &amp; e-Visa Consultation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Restart conversation"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Restore size' : 'Expand window'}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors hidden sm:block"
              >
                {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
              </button>

              <button
                onClick={onToggle}
                title="Close chat"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Webhook Connectivity Info Banner */}
          <div className="px-4 py-1.5 bg-[#090D16] border-b border-white/5 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1.5 truncate">
              <Sparkles className="h-3 w-3 text-rose-400 shrink-0" />
              <span>Connected to n8n Webhook: <strong>b23c6e14</strong></span>
            </span>
            <span className="text-emerald-400 font-mono shrink-0">Online</span>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} group`}
                >
                  <div
                    className={`relative max-w-[85%] rounded-2xl p-3.5 leading-relaxed transition-all ${
                      isUser
                        ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-tr-none shadow-md'
                        : 'bg-[#162033] border border-white/10 text-slate-200 rounded-tl-none shadow'
                    }`}
                  >
                    <div className="text-[12px] leading-relaxed break-words whitespace-pre-wrap">
                      {renderFormattedText(msg.text)}
                    </div>

                    <div className="mt-2 flex items-center justify-between gap-3 text-[10px] text-slate-400/80">
                      <span>{msg.timestamp}</span>

                      {!isUser && (
                        <button
                          onClick={() => handleCopy(msg.text, msg.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:text-white"
                          title="Copy response"
                        >
                          {copiedId === msg.id ? (
                            <Check className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Loader Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#162033] border border-white/10 text-rose-400 shrink-0">
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="rounded-2xl rounded-tl-none bg-[#162033] border border-white/10 px-4 py-3 flex items-center gap-1.5 shadow">
                  <span className="h-2 w-2 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="h-2 w-2 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="h-2 w-2 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[11px] text-slate-400 ml-1.5">Consulting Russia Explorer AI...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips (Visible before extensive interaction) */}
          {messages.length <= 3 && !isLoading && (
            <div className="px-4 py-2 border-t border-white/5 bg-[#0e1524]">
              <div className="text-[10px] uppercase font-semibold text-slate-400 mb-1.5">
                Suggested Questions:
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {suggestedPrompts.slice(0, 3).map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(prompt)}
                    className="px-2.5 py-1 text-[11px] rounded-lg bg-white/5 hover:bg-rose-950/40 border border-white/10 hover:border-rose-500/40 text-slate-300 hover:text-white whitespace-nowrap transition-colors cursor-pointer text-left shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Bar */}
          <div className="p-3 bg-[#111827] border-t border-white/10 shrink-0">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask about Russia packages, e-visa, flights..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                className="flex-1 bg-[#1a2336] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-rose-500 transition-colors"
              />

              <button
                onClick={() => sendMessage(inputText)}
                disabled={!inputText.trim() || isLoading}
                className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all cursor-pointer ${
                  inputText.trim() && !isLoading
                    ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-950'
                    : 'bg-white/5 text-slate-500 cursor-not-allowed border border-white/10'
                }`}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400/80 px-1">
              <span>Powered by n8n Webhook Chatbot</span>
              <span>All packages capped under ₹5,00,000</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
