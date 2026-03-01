import React, { useState, useEffect } from 'react';
import EdgePanelHandle from './components/EdgePanelHandle';
import WidgetGrid from './components/WidgetGrid';
import BookmarksList from './components/BookmarksList';
import SearchBar from './components/SearchBar';
import Dock from './components/Dock';
import SettingsPopup from './components/SettingsPopup';
import GoogleAppsMenu from './components/GoogleAppsMenu';

const DEFAULT_BG = "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')";

function App() {
  const [background, setBackground] = useState(() => {
    const savedBg = localStorage.getItem('customChromeBackground');
    return savedBg || DEFAULT_BG;
  });

  const handleSetBackground = (newBg) => {
    setBackground(newBg);
    localStorage.setItem('customChromeBackground', newBg);
  };

  return (
    <div
      className="w-screen h-screen relative overflow-hidden transition-all duration-700"
      style={{
        backgroundImage: background.startsWith('url') ? background : 'none',
        backgroundColor: background.startsWith('url') ? 'transparent' : background,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >

      {/* 1. TOP LEFT - Edge Panel Handle & Profile Info */}
      <EdgePanelHandle />

      {/* 2. TOP RIGHT - Google Apps Menu */}
      <GoogleAppsMenu />

      {/* 3. CENTER GROUP - Clock & Search Bar */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] flex flex-col items-center gap-6 w-full max-w-3xl">

        {/* The Big Center Panel (Replace this div with your <Clock /> component later) */}
        <div className="w-full h-40 liquid-glass"></div>

        {/* Pill-shaped Search Bar */}
        <SearchBar />

      </div>

      {/* 4. BOTTOM LEFT - Widget Grid Container */}
      <WidgetGrid />

      {/* 5. BOTTOM CENTER - Custom macOS-style Dock */}
      <Dock />

      {/* 6. BOTTOM RIGHT - Settings Customization Button */}
      <SettingsPopup setBackground={handleSetBackground} />

      {/* 6. BOTTOM RIGHT - List / Bookmarks */}
      <BookmarksList />

    </div>
  );
}

export default App;