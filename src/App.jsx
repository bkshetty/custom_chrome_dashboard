import React from 'react';
import EdgePanelHandle from './components/EdgePanelHandle';
import WidgetGrid from './components/WidgetGrid';
import BookmarksList from './components/BookmarksList';
import SearchBar from './components/SearchBar';
import Dock from './components/Dock';
import SettingsPopup from './components/SettingsPopup';

function App() {
  return (
    <div
      className="w-screen h-screen relative overflow-hidden bg-cover bg-center transition-all duration-700"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')" }}
    >

      {/* 1. TOP LEFT - Edge Panel Handle & Profile Info */}
      <EdgePanelHandle />

      {/* 2. TOP RIGHT - Settings / Profile Icon */}
      <div className="absolute top-8 right-8 w-14 h-14 liquid-glass !rounded-2xl">
        {/* Component goes here */}
      </div>

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
      <SettingsPopup />

      {/* 6. BOTTOM RIGHT - List / Bookmarks */}
      <BookmarksList />

    </div>
  );
}

export default App;