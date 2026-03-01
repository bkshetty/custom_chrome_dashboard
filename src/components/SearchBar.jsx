import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        }
    };

    return (
        <form
            onSubmit={handleSearch}
            className="w-4/5 h-14 liquid-glass !rounded-full flex items-center px-6 gap-4 shadow-xl transition-all pointer-events-auto"
        >
            <Search className="w-5 h-5 text-white/70 shrink-0" />
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the web..."
                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/50 text-lg w-full"
                autoFocus
            />
        </form>
    );
};

export default SearchBar;
