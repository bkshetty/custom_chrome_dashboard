import React, { useState } from 'react';
import { Grip, User, Search, Map, Youtube, Play, Newspaper, Mail, Video, MessageSquare, HardDrive, Calendar, Image as ImageIcon } from 'lucide-react';

const GOOGLE_APPS = [
    { name: 'Account', url: 'https://myaccount.google.com', Icon: User, color: 'text-blue-400' },
    { name: 'Search', url: 'https://google.com', Icon: Search, color: 'text-white' },
    { name: 'Maps', url: 'https://maps.google.com', Icon: Map, color: 'text-green-400' },
    { name: 'YouTube', url: 'https://youtube.com', Icon: Youtube, color: 'text-red-500' },
    { name: 'Play', url: 'https://play.google.com', Icon: Play, color: 'text-teal-400' },
    { name: 'News', url: 'https://news.google.com', Icon: Newspaper, color: 'text-blue-300' },
    { name: 'Gmail', url: 'https://mail.google.com', Icon: Mail, color: 'text-red-400' },
    { name: 'Meet', url: 'https://meet.google.com', Icon: Video, color: 'text-green-500' },
    { name: 'Chat', url: 'https://chat.google.com', Icon: MessageSquare, color: 'text-green-400' },
    { name: 'Drive', url: 'https://drive.google.com', Icon: HardDrive, color: 'text-yellow-400' },
    { name: 'Calendar', url: 'https://calendar.google.com', Icon: Calendar, color: 'text-blue-500' },
    { name: 'Photos', url: 'https://photos.google.com', Icon: ImageIcon, color: 'text-purple-400' }
];

const GoogleAppsMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="absolute top-8 right-8 z-50">
            {/* The Trigger Button (3x3 dots) */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                onBlur={() => {
                    // Slight delay to allow clicks to register inside the menu
                    setTimeout(() => setIsOpen(false), 200);
                }}
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${isOpen ? 'bg-white/20' : 'hover:bg-white/10'}`}
                title="Google apps"
            >
                <Grip className="w-6 h-6 text-white/90" />
            </button>

            {/* The App Grid Menu */}
            <div
                className={`absolute right-0 top-14 w-[320px] liquid-glass p-4 rounded-3xl shadow-2xl transition-all duration-300 origin-top-right overflow-y-auto max-h-[80vh] ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
                    }`}
            >
                <div className="grid grid-cols-3 gap-y-4 gap-x-2 pt-2">
                    {GOOGLE_APPS.map((app, i) => (
                        <a
                            key={i}
                            href={app.url}
                            className="flex flex-col items-center gap-3 hover:bg-white/5 p-2 rounded-2xl transition-colors cursor-pointer group"
                        >
                            <div className="w-14 h-14 liquid-glass !rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all shadow-lg">
                                <app.Icon className={`w-7 h-7 ${app.color}`} />
                            </div>
                            <span className="text-white/90 text-[13px] font-medium tracking-wide">
                                {app.name}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GoogleAppsMenu;
