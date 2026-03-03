import React, { useState, useEffect } from 'react';
import EdgePanelHandle from './components/EdgePanelHandle';
import WidgetGrid from './components/WidgetGrid';
import TodoList from './components/TodoList';
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSetBackground = (newBg) => {
    setBackground(newBg);
    localStorage.setItem('customChromeBackground', newBg);
  };

  return (
    <div
      className="flex w-screen h-screen overflow-hidden relative"
      style={{
        backgroundImage: background.startsWith('url') ? background : 'none',
        backgroundColor: background.startsWith('url') ? 'black' : background,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div
        className={`h-screen relative overflow-hidden transition-all duration-500 ease-in-out ${isSettingsOpen ? 'w-[calc(100vw-340px)]' : 'w-full'}`}
      >
        <EdgePanelHandle />
        <GoogleAppsMenu />

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[110%] flex flex-col items-center gap-6 w-full max-w-3xl">
          <div className="w-full h-40 liquid-glass"></div>
          <SearchBar />
        </div>

        <WidgetGrid />
        <Dock />
        <TodoList />
      </div>

      <SettingsPopup
        setBackground={handleSetBackground}
        isOpen={isSettingsOpen}
        setIsOpen={setIsSettingsOpen}
      />
    </div>
  );
}

export default App;