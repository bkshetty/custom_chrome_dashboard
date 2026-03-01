import React, { useState } from 'react';
import { Settings, Image, Palette, Layout } from 'lucide-react';

const SettingsPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="absolute bottom-8 right-8 flex flex-col-reverse items-end gap-4 z-50">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-12 h-12 liquid-glass !rounded-full flex items-center justify-center cursor-pointer hover:rotate-90 transition-all duration-500 shadow-xl"
                title="Customize Chrome"
            >
                <Settings className="w-5 h-5 text-white/80 hover:text-white transition-colors" />
            </button>

            {/* Settings Menu Overlay */}
            <div
                className={`w-56 liquid-glass p-4 flex flex-col gap-2 shadow-2xl transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
                    }`}
            >
                <div className="text-white/90 font-medium px-2 py-1 mb-1">Customize page</div>

                <div className="h-px w-full bg-white/10 mb-2" />

                <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors w-full">
                    <Image className="w-4 h-4" />
                    <span>Change background</span>
                </button>

                <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors w-full">
                    <Palette className="w-4 h-4" />
                    <span>Theme color</span>
                </button>

                <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors w-full">
                    <Layout className="w-4 h-4" />
                    <span>Layout density</span>
                </button>
            </div>
        </div>
    );
};

export default SettingsPopup;
