import React, { useState, useRef } from 'react';
import { Settings, Image as ImageIcon, Palette, Layout, ChevronLeft, Upload } from 'lucide-react';

const DEFAULT_BGS = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2564&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542401886-65d6c61db217?q=80&w=2564&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2564&auto=format&fit=crop'
];

const SettingsPopup = ({ setBackground }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showBgMenu, setShowBgMenu] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    // Create a canvas to compress the image
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    // Max resolution (e.g., 1920x1080) to fit in localStorage limits
                    const MAX_WIDTH = 1920;
                    const MAX_HEIGHT = 1080;
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);

                    // Compress to JPEG with 0.8 quality
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);

                    try {
                        setBackground(`url('${dataUrl}')`);
                    } catch (err) {
                        console.error("Image too large for localStorage even after compression:", err);
                        alert("Image is too large to save. Please try a smaller file.");
                    }
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="absolute bottom-8 right-8 flex flex-col-reverse items-end gap-4 z-50 pointer-events-none">
            {/* Toggle Button */}
            <button
                onClick={() => {
                    setIsOpen(!isOpen);
                    setShowBgMenu(false); // Reset submenu when closing
                }}
                className="w-12 h-12 liquid-glass !rounded-full flex items-center justify-center cursor-pointer hover:rotate-90 transition-all duration-500 shadow-xl pointer-events-auto"
                title="Customize Chrome"
            >
                <Settings className="w-5 h-5 text-white/80 hover:text-white transition-colors" />
            </button>

            {/* Settings Menu Overlay */}
            <div
                className={`w-64 liquid-glass p-4 flex flex-col gap-2 shadow-2xl transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
                    }`}
            >
                {/* Main Menu */}
                <div className={`flex flex-col gap-2 transition-transform duration-300 ${showBgMenu ? 'hidden' : 'block'}`}>
                    <div className="text-white/90 font-medium px-2 py-1 mb-1">Customize page</div>
                    <div className="h-px w-full bg-white/10 mb-2" />

                    <button
                        onClick={() => setShowBgMenu(true)}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors w-full"
                    >
                        <ImageIcon className="w-4 h-4" />
                        <span>Change background</span>
                    </button>

                    <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors w-full opacity-50 cursor-not-allowed">
                        <Palette className="w-4 h-4" />
                        <span>Theme color (Coming soon)</span>
                    </button>

                    <button className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/10 text-white/80 hover:text-white transition-colors w-full opacity-50 cursor-not-allowed">
                        <Layout className="w-4 h-4" />
                        <span>Layout density (Coming soon)</span>
                    </button>
                </div>

                {/* Background Customization Sub-Menu */}
                <div className={`flex flex-col gap-3 transition-transform duration-300 ${showBgMenu ? 'block' : 'hidden'}`}>
                    <div className="flex items-center gap-2 mb-1">
                        <button
                            onClick={() => setShowBgMenu(false)}
                            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <ChevronLeft className="w-5 h-5 text-white/80" />
                        </button>
                        <div className="text-white/90 font-medium">Background</div>
                    </div>

                    <div className="h-px w-full bg-white/10" />

                    <div className="text-white/70 text-sm px-1">Curated Images</div>
                    <div className="grid grid-cols-2 gap-2">
                        {DEFAULT_BGS.map((bg, idx) => (
                            <button
                                key={idx}
                                onClick={() => setBackground(`url('${bg}')`)}
                                className="h-16 rounded-xl overflow-hidden hover:ring-2 hover:ring-white/50 transition-all"
                            >
                                <img src={bg} alt={`Background ${idx + 1}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>

                    <div className="text-white/70 text-sm px-1 mt-2">Solid Color</div>
                    <div className="flex items-center gap-3 px-1">
                        <input
                            type="color"
                            onChange={(e) => setBackground(e.target.value)}
                            className="w-8 h-8 rounded cursor-pointer bg-transparent border-none outline-none"
                            title="Pick a solid color"
                        />
                        <span className="text-white/80 text-sm">Custom Color</span>
                    </div>

                    <div className="h-px w-full bg-white/10 my-1" />

                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-colors w-full"
                    >
                        <Upload className="w-4 h-4" />
                        <span>Upload from device</span>
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </div>
            </div>
        </div>
    );
};

export default SettingsPopup;
