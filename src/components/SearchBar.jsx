import React, { useState } from 'react';
import { Search } from 'lucide-react';

// Custom SVG for Google Mic
const MicIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
    </svg>
);



const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [isListening, setIsListening] = useState(false);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        if (query.trim()) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    };

    const handleVoiceSearch = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Voice search is not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setQuery(transcript);
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(transcript)}`;
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            setIsListening(false);
        };

        recognition.onend = () => setIsListening(false);

        recognition.start();
    };



    return (
        <form
            onSubmit={handleSearch}
            className="w-4/5 h-14 liquid-glass !rounded-full flex items-center px-6 gap-4 shadow-xl transition-all pointer-events-auto group"
        >
            <Search className="w-5 h-5 text-white/70 shrink-0" />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isListening ? "Listening..." : "Search the web..."}
                className={`flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/50 text-lg w-full ${isListening ? 'text-red-300 placeholder:text-red-300 animate-pulse' : ''}`}
                autoFocus
            />

            <div className="flex items-center gap-1 shrink-0">
                <button
                    type="button"
                    onClick={handleVoiceSearch}
                    className={`p-2 rounded-full transition-colors flex items-center justify-center ${isListening ? 'text-red-400 bg-red-400/20 shadow-[0_0_15px_rgba(248,113,113,0.4)]' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
                    title="Search by voice"
                >
                    <MicIcon className="w-5 h-5" />
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
