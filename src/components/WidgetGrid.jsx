import React, { useState } from 'react';
import { LayoutGrid } from 'lucide-react';

const WidgetGrid = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="absolute bottom-8 left-8 flex flex-col-reverse items-start gap-5 pointer-events-none z-10">
            {/* Visibility Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 liquid-glass !rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-xl pointer-events-auto group"
            >
                <LayoutGrid className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
            </button>

            {/* Widget Grid Container */}
            <div
                className={`flex gap-4 h-[280px] transition-all duration-500 origin-bottom-left pointer-events-auto ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
                    }`}
            >
                {/* Tall Left Panel */}
                <div className="w-40 h-full liquid-glass flex flex-col p-4 shadow-xl">
                    <div className="w-full h-24 rounded-2xl bg-white/10 mb-auto" />
                    <div className="w-4/5 h-3 rounded-full bg-white/20 mt-4" />
                    <div className="w-1/2 h-3 rounded-full bg-white/20 mt-2" />
                </div>

                {/* Stacked Right Panels */}
                <div className="flex flex-col gap-4 w-40 h-full">
                    <div className="flex-1 liquid-glass flex items-center justify-center shadow-xl">
                        <div className="w-12 h-12 rounded-full bg-white/10" />
                    </div>
                    <div className="flex-1 liquid-glass p-4 shadow-xl flex flex-col justify-end gap-2">
                        <div className="w-full h-4 rounded-full bg-white/10" />
                        <div className="w-2/3 h-4 rounded-full bg-white/10" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WidgetGrid;
