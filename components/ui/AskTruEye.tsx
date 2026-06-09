'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, RotateCcw } from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

type Role = 'bot' | 'user'
interface Message { role: Role; text: string; options?: string[] }

// ─── Conversation tree ───────────────────────────────────────────────────────

const WELCOME: Message = {
  role: 'bot',
  text: "Hi! I'm TruEye AI Assistant 👋\nHow can I help you today?",
  options: [
    'What is TruEye?',
    'Which AI modules are available?',
    'Does it work with my cameras?',
    'What does it cost?',
    'I want a live demo',
  ],
}

type FlowKey =
  | 'what_is'
  | 'modules'
  | 'cameras'
  | 'pricing'
  | 'demo'
  | 'intrusion'
  | 'crowd'
  | 'face'
  | 'anpr'
  | 'ppe'
  | 'lead_name'
  | 'lead_email'
  | 'lead_done'

const FLOW: Record<FlowKey, Message> = {
  what_is: {
    role: 'bot',
    text: 'TruEye is an AI-powered Video Analytics platform by VertexPlus Technologies.\n\nIt connects to your existing CCTV cameras and converts raw footage into real-time actionable intelligence — security alerts, crowd density, safety compliance, and more.',
    options: ['Which AI modules are available?', 'Does it work with my cameras?', 'I want a live demo'],
  },
  modules: {
    role: 'bot',
    text: 'TruEye has 50+ AI modules. Here are the popular ones:',
    options: ['Intrusion Detection', 'Crowd Analysis', 'Face Recognition', 'Vehicle ANPR', 'PPE Detection'],
  },
  intrusion: {
    role: 'bot',
    text: '🚨 **Intrusion Detection**\n\nDetects unauthorised entry into restricted zones in under 2 seconds. Sends instant alerts to security teams via app, SMS, or email. Works 24/7 without guard fatigue.',
    options: ['Tell me about Crowd Analysis', 'I want a live demo', 'What does it cost?'],
  },
  crowd: {
    role: 'bot',
    text: '👥 **Crowd Analysis**\n\nMonitors occupancy levels, footfall, and crowd density across zones. Triggers alerts when thresholds are breached — ideal for malls, stations, and events.',
    options: ['Tell me about Face Recognition', 'I want a live demo', 'What does it cost?'],
  },
  face: {
    role: 'bot',
    text: '🧑 **Face Recognition**\n\nIdentifies known individuals from a watchlist in real time. Used for VIP access, blacklist detection, and employee attendance — with 99.2% accuracy.',
    options: ['Tell me about Vehicle ANPR', 'I want a live demo', 'What does it cost?'],
  },
  anpr: {
    role: 'bot',
    text: '🚗 **Vehicle ANPR (Automatic Number Plate Recognition)**\n\nReads and logs vehicle number plates in real time. Used for gate automation, parking management, and blacklist alerts at speeds up to 120 km/h.',
    options: ['Tell me about PPE Detection', 'I want a live demo', 'What does it cost?'],
  },
  ppe: {
    role: 'bot',
    text: '🦺 **PPE Detection**\n\nEnsures workers wear helmets, vests, gloves, and masks on factory floors. Raises instant alerts for non-compliance — reducing accidents and regulatory risk.',
    options: ['Which AI modules are available?', 'I want a live demo', 'What does it cost?'],
  },
  cameras: {
    role: 'bot',
    text: 'Yes! TruEye works with your **existing CCTV cameras** — IP cameras, analog (via DVR/NVR), and most major VMS systems.\n\nNo hardware replacement needed. Our team handles integration.',
    options: ['What does it cost?', 'I want a live demo', 'Which AI modules are available?'],
  },
  pricing: {
    role: 'bot',
    text: 'TruEye pricing is customised based on:\n• Number of cameras\n• AI modules selected\n• On-premise vs. cloud deployment\n• Hardware & integration scope\n\nMost deployments start from ₹2,500/camera/month.',
    options: ['I want a live demo', 'What is TruEye?', 'Which AI modules are available?'],
  },
  demo: {
    role: 'bot',
    text: "Great! Let's get you a personalised demo. Can I get your name?",
    options: [],
  },
  lead_name: {
    role: 'bot',
    text: "Nice to meet you! What's your work email address?",
    options: [],
  },
  lead_email: {
    role: 'bot',
    text: '',   // filled dynamically
    options: [],
  },
  lead_done: {
    role: 'bot',
    text: "✅ All set! Our team will reach out within 24 hours to schedule your personalised TruEye demo.\n\nIn the meantime, try our Interactive AI Demo above — it shows live detections in your browser!",
    options: ['What is TruEye?', 'Which AI modules are available?'],
  },
}

const OPTION_MAP: Record<string, FlowKey> = {
  'What is TruEye?': 'what_is',
  'Which AI modules are available?': 'modules',
  'Does it work with my cameras?': 'cameras',
  'What does it cost?': 'pricing',
  'I want a live demo': 'demo',
  'Intrusion Detection': 'intrusion',
  'Tell me about Crowd Analysis': 'crowd',
  'Crowd Analysis': 'crowd',
  'Tell me about Face Recognition': 'face',
  'Face Recognition': 'face',
  'Tell me about Vehicle ANPR': 'anpr',
  'Vehicle ANPR': 'anpr',
  'Tell me about PPE Detection': 'ppe',
  'PPE Detection': 'ppe',
}

// ─── Typing bubble ────────────────────────────────────────────────────────────

function TypingBubble() {
  return (
    <div className="flex gap-1 items-center px-4 py-3 bg-white/[0.06] rounded-2xl rounded-bl-sm w-fit">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#6B7FA3] animate-bounce"
          style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
        />
      ))}
    </div>
  )
}

// ─── Message bubble ──────────────────────────────────────────────────────────

function Bubble({ msg }: { msg: Message }) {
  const isBot = msg.role === 'bot'
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
          isBot
            ? 'bg-white/[0.06] text-[#D4E0F0] rounded-bl-sm'
            : 'bg-[#00D4FF]/20 text-[#F0F4FF] rounded-br-sm border border-[#00D4FF]/20'
        }`}
        dangerouslySetInnerHTML={{
          __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#F0F4FF]">$1</strong>'),
        }}
      />
    </motion.div>
  )
}

// ─── Main chatbot ─────────────────────────────────────────────────────────────

export function AskTruEye() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([WELCOME])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [leadStep, setLeadStep] = useState<null | 'name' | 'email'>(null)
  const [leadName, setLeadName] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [unread, setUnread] = useState(0)

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  // Track unread when closed
  useEffect(() => {
    if (!open) setUnread(u => u + 1)
    else setUnread(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length])

  const pushBot = (msg: Message, delay = 600) => {
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages(prev => [...prev, msg])
    }, delay)
  }

  const handleOption = (option: string) => {
    // User message
    setMessages(prev => [...prev, { role: 'user', text: option }])

    if (option === 'I want a live demo') {
      setLeadStep('name')
      pushBot(FLOW.demo)
      return
    }

    const key = OPTION_MAP[option]
    if (key) pushBot(FLOW[key])
    else pushBot({ role: 'bot', text: "I'm not sure about that — let me connect you with our team!", options: ['I want a live demo'] })
  }

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    setInput('')

    setMessages(prev => [...prev, { role: 'user', text: trimmed }])

    if (leadStep === 'name') {
      setLeadName(trimmed)
      setLeadStep('email')
      pushBot(FLOW.lead_name)
      return
    }

    if (leadStep === 'email') {
      setLeadStep(null)
      const thankYou: Message = {
        ...FLOW.lead_done,
        text: `Thanks, ${leadName}! We've noted your email (${trimmed}).\n\n${FLOW.lead_done.text}`,
        options: FLOW.lead_done.options,
      }
      pushBot(thankYou, 800)
      return
    }

    // Simple keyword fallback
    const lower = trimmed.toLowerCase()
    if (lower.includes('price') || lower.includes('cost') || lower.includes('rate')) {
      pushBot(FLOW.pricing)
    } else if (lower.includes('intru') || lower.includes('restrict')) {
      pushBot(FLOW.intrusion)
    } else if (lower.includes('crowd') || lower.includes('density')) {
      pushBot(FLOW.crowd)
    } else if (lower.includes('face') || lower.includes('recogni')) {
      pushBot(FLOW.face)
    } else if (lower.includes('plate') || lower.includes('anpr') || lower.includes('vehicle')) {
      pushBot(FLOW.anpr)
    } else if (lower.includes('ppe') || lower.includes('helmet') || lower.includes('safety gear')) {
      pushBot(FLOW.ppe)
    } else if (lower.includes('camera') || lower.includes('cctv') || lower.includes('integrat')) {
      pushBot(FLOW.cameras)
    } else if (lower.includes('demo') || lower.includes('trial')) {
      setLeadStep('name')
      pushBot(FLOW.demo)
    } else {
      pushBot({
        role: 'bot',
        text: "That's a great question! For detailed answers, I'd recommend speaking directly with our team.",
        options: ['I want a live demo', 'What is TruEye?', 'Which AI modules are available?'],
      })
    }
  }

  const reset = () => {
    setMessages([WELCOME])
    setLeadStep(null)
    setLeadName('')
    setInput('')
  }

  const lastOptions = [...messages].reverse().find(m => m.role === 'bot' && m.options && m.options.length > 0)?.options ?? []

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!open && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setOpen(true)}
              className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0077AA] shadow-2xl shadow-[#00D4FF]/30 flex items-center justify-center hover:scale-110 transition-transform"
              aria-label="Ask TruEye"
            >
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full animate-ping bg-[#00D4FF]/30" />
              {/* Icon */}
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                <circle cx="13" cy="13" r="11" stroke="white" strokeWidth="1.5" opacity="0.4" />
                <circle cx="13" cy="13" r="6" fill="white" opacity="0.9" />
                <circle cx="13" cy="13" r="3" fill="#0077AA" />
                <path d="M13 2 L13 0 M13 26 L13 24 M0 13 L2 13 M24 13 L26 13" stroke="white" strokeWidth="1" opacity="0.5" />
              </svg>
              {/* Unread badge */}
              {unread > 1 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unread > 9 ? '9+' : unread}
                </span>
              )}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Chat window */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
              className="absolute bottom-0 right-0 w-[340px] sm:w-[380px] bg-[#0A1628] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
              style={{ height: 520 }}
            >
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3 bg-[#060E1E] border-b border-white/10 shrink-0">
                <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0077AA] flex items-center justify-center shrink-0">
                  <svg width="18" height="18" viewBox="0 0 26 26" fill="none">
                    <circle cx="13" cy="13" r="11" stroke="white" strokeWidth="1.5" opacity="0.5" />
                    <circle cx="13" cy="13" r="5" fill="white" opacity="0.9" />
                    <circle cx="13" cy="13" r="2.5" fill="#0077AA" />
                  </svg>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#22C55E] border-2 border-[#060E1E]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#F0F4FF]">Ask TruEye</p>
                  <p className="text-xs text-[#22C55E]">● Online — typically replies instantly</p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={reset}
                    className="p-1.5 rounded-lg text-[#6B7FA3] hover:text-[#F0F4FF] hover:bg-white/5 transition-colors"
                    title="Reset chat"
                  >
                    <RotateCcw size={14} />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1.5 rounded-lg text-[#6B7FA3] hover:text-[#F0F4FF] hover:bg-white/5 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-white/10">
                {messages.map((msg, i) => (
                  <Bubble key={i} msg={msg} />
                ))}
                {typing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <TypingBubble />
                  </motion.div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Quick replies */}
              {lastOptions.length > 0 && !typing && !leadStep && (
                <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
                  {lastOptions.map(opt => (
                    <button
                      key={opt}
                      onClick={() => handleOption(opt)}
                      className="text-xs px-3 py-1.5 rounded-full border border-[#00D4FF]/30 text-[#00D4FF] hover:bg-[#00D4FF]/10 transition-colors whitespace-nowrap"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="px-4 pb-4 pt-2 shrink-0 border-t border-white/10">
                <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2.5 border border-white/10 focus-within:border-[#00D4FF]/40 transition-colors">
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    placeholder={
                      leadStep === 'name' ? 'Your name...' :
                      leadStep === 'email' ? 'Your work email...' :
                      'Type a message...'
                    }
                    className="flex-1 bg-transparent text-sm text-[#F0F4FF] placeholder-[#6B7FA3]/50 outline-none"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="w-7 h-7 rounded-lg bg-[#00D4FF]/20 flex items-center justify-center text-[#00D4FF] hover:bg-[#00D4FF]/30 disabled:opacity-30 transition-all"
                  >
                    <Send size={13} />
                  </button>
                </div>
                <p className="text-[10px] text-[#6B7FA3]/40 text-center mt-2">
                  Powered by TruEye AI · VertexPlus Technologies
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
