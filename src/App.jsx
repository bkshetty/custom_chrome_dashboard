import React from 'react';
import EdgePanelHandle from './components/EdgePanelHandle';
import WidgetGrid from './components/WidgetGrid';
import BookmarksList from './components/BookmarksList';
// We will import your Clock and other components here later
// import Clock from './components/Clock';

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
        <div className="w-4/5 h-14 liquid-glass !rounded-full"></div>

      </div>

      {/* 4. BOTTOM LEFT - Widget Grid Container */}
      <WidgetGrid />

      {/* 5. BOTTOM CENTER - The Dock */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 liquid-glass !rounded-[2rem] p-3 flex gap-3">
        {/* Mapping out 6 placeholder icons for the dock */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            // We don't use the full liquid-glass here, just a slight transparency so they pop against the dock's glass
            className="w-12 h-12 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-colors cursor-pointer"
          ></div>
        ))}
      </div>

      {/* 6. BOTTOM RIGHT - List / Bookmarks */}
      <BookmarksList />

    </div>
  );
}

export default App;