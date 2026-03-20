import { useState, useRef, useEffect } from "react";
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import ReactMarkdown from "react-markdown";
import { Mic, MicOff, Send, Image as ImageIcon, Loader2, Phone, MessageCircle } from "lucide-react";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(false);
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const chat = ai.chats.create({
        model: "gemini-3.1-pro-preview",
        config: { systemInstruction: "You are a helpful customer service assistant for Ghana Rickshaw Rides." },
      });
      const response = await chat.sendMessage({ message: userMsg });
      setMessages((prev) => [...prev, { role: "model", text: response.text || "" }]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "model", text: "Sorry, an error occurred." }]);
    } finally {
      setLoading(false);
    }
  };

  const toggleLiveAudio = async () => {
    if (isLive) {
      sessionRef.current?.close();
      audioContextRef.current?.close();
      setIsLive(false);
      return;
    }

    try {
      audioContextRef.current = new AudioContext({ sampleRate: 16000 });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const source = audioContextRef.current.createMediaStreamSource(stream);
      const processor = audioContextRef.current.createScriptProcessor(4096, 1, 1);
      
      source.connect(processor);
      processor.connect(audioContextRef.current.destination);

      sessionRef.current = await ai.live.connect({
        model: "gemini-2.5-flash-native-audio-preview-12-2025",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: "Zephyr" } } },
          systemInstruction: "You are a helpful voice assistant for Ghana Rickshaw Rides.",
        },
        callbacks: {
          onopen: () => {
            setIsLive(true);
            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcm16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                pcm16[i] = Math.max(-1, Math.min(1, inputData[i])) * 32767;
              }
              const base64 = btoa(String.fromCharCode(...new Uint8Array(pcm16.buffer)));
              sessionRef.current?.sendRealtimeInput({ audio: { data: base64, mimeType: 'audio/pcm;rate=16000' } });
            };
          },
          onmessage: async (msg: LiveServerMessage) => {
            const base64Audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && audioContextRef.current) {
              const binary = atob(base64Audio);
              const bytes = new Uint8Array(binary.length);
              for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
              
              const audioBuffer = await audioContextRef.current.decodeAudioData(bytes.buffer);
              const source = audioContextRef.current.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(audioContextRef.current.destination);
              source.start();
            }
          },
          onclose: () => setIsLive(false),
          onerror: (err) => console.error(err),
        }
      });
    } catch (err) {
      console.error("Live API Error:", err);
      setIsLive(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-100 bg-green-50 rounded-t-xl flex justify-between items-center">
        <h3 className="font-semibold text-green-800">Customer Service</h3>
        <button
          onClick={toggleLiveAudio}
          className={`p-2 rounded-full transition-colors ${isLive ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}
        >
          {isLive ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
      </div>

      <div className="bg-white border-b border-gray-100 p-3 flex gap-2 justify-center">
        <a href="tel:0501731966" className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-green-50 text-gray-700 hover:text-green-700 rounded-full text-sm font-medium transition-colors border border-gray-200">
          <Phone size={16} />
          Call 0501731966
        </a>
        <a href="https://wa.me/233501731966" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-green-50 text-gray-700 hover:text-green-700 rounded-full text-sm font-medium transition-colors border border-gray-200">
          <MessageCircle size={16} />
          WhatsApp
        </a>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2 ${m.role === 'user' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
              <ReactMarkdown>{m.text}</ReactMarkdown>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-2xl px-4 py-2 text-gray-500 flex items-center gap-2">
              <Loader2 className="animate-spin" size={16} /> Thinking...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask a question..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 disabled:opacity-50"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
