import React, { useState } from 'react';
import { Grip } from 'lucide-react';

const GOOGLE_APPS = [
    { name: 'Account', url: 'https://myaccount.google.com', icon: 'https://ssl.gstatic.com/gb/images/a/1f.png' },
    { name: 'Search', url: 'https://google.com', icon: 'https://www.gstatic.com/images/branding/product/1x/gsa_48dp.png' },
    { name: 'Maps', url: 'https://maps.google.com', icon: 'https://www.gstatic.com/images/branding/product/1x/maps_48dp.png' },
    { name: 'YouTube', url: 'https://youtube.com', icon: 'https://www.gstatic.com/images/branding/product/1x/youtube_48dp.png' },
    { name: 'Play', url: 'https://play.google.com', icon: 'https://www.gstatic.com/images/branding/product/1x/play_48dp.png' },
    { name: 'News', url: 'https://news.google.com', icon: 'https://www.gstatic.com/images/branding/product/1x/news_48dp.png' },
    { name: 'Gmail', url: 'https://mail.google.com', icon: 'https://www.gstatic.com/images/branding/product/1x/gmail_48dp.png' },
    { name: 'Meet', url: 'https://meet.google.com', icon: 'https://www.gstatic.com/images/branding/product/1x/meet_48dp.png' },
    { name: 'Chat', url: 'https://chat.google.com', icon: 'https://www.gstatic.com/images/branding/product/1x/chat_48dp.png' },
    { name: 'Drive', url: 'https://drive.google.com', icon: 'https://www.gstatic.com/images/branding/product/1x/drive_48dp.png' },
    { name: 'Calendar', url: 'https://calendar.google.com', icon: 'https://www.gstatic.com/images/branding/product/1x/calendar_48dp.png' },
    { name: 'Photos', url: 'https://photos.google.com', icon: 'https://www.gstatic.com/images/branding/product/1x/photos_48dp.png' }
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
                className={`w-12 h-12 liquid-glass !rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-xl group ${isOpen ? 'ring-2 ring-white/30 bg-white/10' : 'hover:bg-white/10'}`}
                title="Google apps"
            >
                <Grip className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
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
                            <div className="w-14 h-14 liquid-glass !rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all shadow-lg p-3">
                                <img
                                    src={app.icon}
                                    alt={app.name}
                                    className="w-full h-full object-contain"
                                />
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
