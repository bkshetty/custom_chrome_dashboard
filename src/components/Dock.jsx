import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';

const INITIAL_SHORTCUTS = [
    { id: '1', name: 'Google', url: 'https://google.com', icon: 'https://www.google.com/favicon.ico' },
    { id: '2', name: 'YouTube', url: 'https://youtube.com', icon: 'https://www.youtube.com/favicon.ico' },
    { id: '3', name: 'GitHub', url: 'https://github.com', icon: 'https://github.com/favicon.ico' }
];

const Dock = () => {
    const [shortcuts, setShortcuts] = useState(() => {
        const savedShortcuts = localStorage.getItem('customChromeDockShortcuts');
        return savedShortcuts ? JSON.parse(savedShortcuts) : INITIAL_SHORTCUTS;
    });
    const [isAdding, setIsAdding] = useState(false);
    const [newUrl, setNewUrl] = useState('');
    const [newName, setNewName] = useState('');

    useEffect(() => {
        localStorage.setItem('customChromeDockShortcuts', JSON.stringify(shortcuts));
    }, [shortcuts]);

    const handleAddShortcut = (e) => {
        e.preventDefault();
        if (shortcuts.length >= 8 || !newUrl || !newName) return;

        // Fetch a high-quality favicon using Google's S2 API
        let iconUrl = '';
        try {
            const urlObj = new URL(newUrl.startsWith('http') ? newUrl : `https://${newUrl}`);
            iconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${urlObj.origin}`;
        } catch {
            iconUrl = 'https://www.google.com/s2/favicons?sz=64&domain_url=google.com'; // fallback
        }

        const newShortcut = {
            id: Date.now().toString(),
            name: newName,
            url: newUrl.startsWith('http') ? newUrl : `https://${newUrl}`,
            icon: iconUrl
        };

        setShortcuts([...shortcuts, newShortcut]);
        setIsAdding(false);
        setNewUrl('');
        setNewName('');
    };

    const handleRemoveShortcut = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setShortcuts(shortcuts.filter(s => s.id !== id));
    };

    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-20 pointer-events-none">

            {/* Add Shortcut Modal */}
            {isAdding && (
                <form
                    onSubmit={handleAddShortcut}
                    className="liquid-glass p-4 rounded-3xl flex flex-col gap-3 shadow-2xl origin-bottom mb-2 pointer-events-auto"
                >
                    <input
                        type="text"
                        placeholder="Name (e.g. Netflix)"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white outline-none focus:border-white/50 w-64 placeholder:text-white/50"
                        autoFocus
                        required
                    />
                    <input
                        type="text"
                        placeholder="URL (e.g. netflix.com)"
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        className="bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white outline-none focus:border-white/50 w-64 placeholder:text-white/50"
                        required
                    />
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            type="button"
                            onClick={() => setIsAdding(false)}
                            className="px-4 py-2 rounded-xl hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white transition-colors"
                        >
                            Add
                        </button>
                    </div>
                </form>
            )}

            {/* The Dock Base */}
            <div className="liquid-glass !rounded-[2rem] p-3 flex flex-wrap justify-center gap-3 shadow-2xl pointer-events-auto">
                {shortcuts.map((shortcut) => (
                    <a
                        key={shortcut.id}
                        href={shortcut.url}
                        className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all cursor-pointer flex items-center justify-center group relative hover:-translate-y-2"
                        title={shortcut.name}
                    >
                        <img
                            src={shortcut.icon}
                            alt={shortcut.name}
                            className="w-6 h-6 object-contain"
                            onError={(e) => {
                                // Fallback icon if favicon fails to load
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <div className="hidden absolute inset-0 items-center justify-center text-white/50 font-bold text-xl uppercase">
                            {shortcut.name.charAt(0)}
                        </div>

                        {/* Hover Remove Button */}
                        <button
                            onClick={(e) => handleRemoveShortcut(e, shortcut.id)}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full items-center justify-center hover:bg-red-600 transition-colors shadow-lg opacity-0 group-hover:opacity-100 hidden group-hover:flex"
                        >
                            <X className="w-3 h-3 text-white" />
                        </button>
                    </a>
                ))}

                {/* Add New Button */}
                {shortcuts.length < 8 && (
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="w-12 h-12 bg-white/5 border border-white/10 border-dashed rounded-xl hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer flex items-center justify-center hover:-translate-y-2 group"
                        title="Add Shortcut"
                    >
                        <Plus className="w-6 h-6 text-white/50 group-hover:text-white/80 transition-colors" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default Dock;
