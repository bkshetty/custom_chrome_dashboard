import React, { useState } from 'react';
import { Cloud, User } from 'lucide-react';

const EdgePanelHandle = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="absolute top-12 left-0 z-50">
            {/* The Handle / Pull Tab */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="absolute left-0 top-0 w-8 h-32 liquid-glass !rounded-l-none !rounded-r-2xl border-l-0 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-colors shadow-2xl z-20"
            >
                <div className="w-1.5 h-12 bg-white/50 rounded-full" />
            </div>

            {/* The Panel Content */}
            <div
                className={`absolute left-10 top-0 w-72 liquid-glass p-5 flex flex-col gap-5 shadow-2xl transition-all duration-500 origin-left z-10 ${isOpen ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 -translate-x-8 pointer-events-none'
                    }`}
            >
                {/* Profile Section */}
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                        <User className="w-7 h-7 text-white/80" />
                    </div>
                    <div>
                        <div className="text-white/90 font-medium text-lg">Good Morning</div>
                        <div className="text-white/50 text-base">Welcome back</div>
                    </div>
                </div>

                <div className="h-px w-full bg-white/10 my-1" />

                {/* Weather Section */}
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shadow-inner">
                        <Cloud className="w-7 h-7 text-blue-200" />
                    </div>
                    <div>
                        <div className="text-white/90 font-medium text-2xl">72°F</div>
                        <div className="text-white/50 text-base">Partly Cloudy</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EdgePanelHandle;
