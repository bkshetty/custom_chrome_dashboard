import React, { useState, useEffect } from 'react';
import { LayoutGrid, Mail } from 'lucide-react';

const WidgetGrid = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [emails, setEmails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmails = async () => {
            try {
                const response = await fetch('https://mail.google.com/mail/feed/atom');
                if (!response.ok) throw new Error('CORS or Auth Error');

                const text = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(text, "text/xml");
                const entries = xmlDoc.querySelectorAll('entry');

                const parsedEmails = Array.from(entries).slice(0, 5).map(entry => ({
                    id: entry.querySelector('id').textContent,
                    title: entry.querySelector('title').textContent || '(No Subject)',
                    author: entry.querySelector('author name').textContent,
                    link: entry.querySelector('link').getAttribute('href')
                }));

                setEmails(parsedEmails);
            } catch (error) {
                console.warn("Using mock emails (likely localhost CORS or not logged in):", error);
                // Fallback to mock emails for localhost
                setEmails([
                    { id: '1', title: 'Action Required: Update your account', author: 'Google Security', link: 'https://mail.google.com' },
                    { id: '2', title: 'Your weekly digest is here', author: 'GitHub', link: 'https://mail.google.com' },
                    { id: '3', title: 'Invitation: Project Review @ Tue', author: 'Alex Manager', link: 'https://mail.google.com' },
                    { id: '4', title: 'Re: Design mockups feedback', author: 'Sarah Designer', link: 'https://mail.google.com' },
                    { id: '5', title: 'Your order has shipped!', author: 'Amazon', link: 'https://mail.google.com' }
                ]);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen) {
            fetchEmails();
        }
    }, [isOpen]);

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
                {/* Tall Left Panel - Gmail Widget */}
                <div className="w-72 h-full liquid-glass flex flex-col p-3 shadow-xl overflow-hidden relative">
                    <div className="flex items-center gap-2 mb-2 px-1">
                        <Mail className="w-5 h-5 text-red-400" />
                        <span className="text-white/90 font-medium text-sm">Recent Emails</span>
                    </div>

                    <div className="flex-1 flex flex-col gap-1 overflow-y-auto custom-scrollbar pr-1">
                        {loading && isOpen ? (
                            <div className="flex-1 flex items-center justify-center">
                                <span className="w-5 h-5 border-2 border-white/20 border-t-white/80 rounded-full animate-spin"></span>
                            </div>
                        ) : (
                            emails.map((email) => (
                                <a
                                    key={email.id}
                                    href={email.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col gap-0.5 p-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                                >
                                    <span className="text-[11px] uppercase tracking-wider text-white/50 font-medium truncate group-hover:text-white/70 transition-colors">{email.author}</span>
                                    <span className="text-sm text-white/90 font-medium truncate group-hover:text-white transition-colors">{email.title}</span>
                                </a>
                            ))
                        )}
                    </div>
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
