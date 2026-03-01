import React, { useState } from 'react';
import { List as ListIcon } from 'lucide-react';

const BookmarksList = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="absolute bottom-28 right-8 flex flex-col-reverse items-end gap-4 pointer-events-none z-10">
            {/* Visibility Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 liquid-glass !rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-xl pointer-events-auto group"
            >
                <ListIcon className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
            </button>

            {/* Bookmarks Container */}
            <div
                className={`flex flex-col items-end gap-3 transition-all duration-500 origin-bottom-right pointer-events-auto ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
                    }`}
            >
                {/* The tiny header bar */}
                <div className="w-48 h-3 liquid-glass !rounded-full mb-1 shadow-lg"></div>

                {/* The 4 List Items */}
                {[1, 2, 3, 4].map((item) => (
                    <div key={item} className="w-48 h-16 liquid-glass flex items-center px-4 gap-4 shadow-lg hover:bg-white/10 transition-colors cursor-pointer group/item">
                        <div className="w-8 h-8 rounded-full bg-white/10 group-hover/item:bg-white/20 transition-colors shrink-0" />
                        <div className="flex flex-col gap-2 flex-1">
                            <div className="w-full h-2 rounded-full bg-white/20 group-hover/item:bg-white/30 transition-colors" />
                            <div className="w-2/3 h-1.5 rounded-full bg-white/10 group-hover/item:bg-white/20 transition-colors" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookmarksList;
