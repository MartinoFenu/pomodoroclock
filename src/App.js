import React from 'react';
import PomodoroClock from './Components/PomodoroClock/PomodoroClock';
import Settings from './Components/Settings/Settings';
import './App.css';
import useApp from './hooks/useApp';
import Footer from './Components/Footer/Footer';
import CookieBanner from './Components/CookieBanner/CookieBanner';

const App = () => {

  const app = useApp();
  return (
    <div className={`App ${app.theme}`}>
      <div className="appContainer">
        <Settings
          defVal={app.defValues}
          handleSettings={app.handleSettings}
          handleCheckbox={app.handleCheckbox} />
        <PomodoroClock
          showOnTitle={app.showOnTitle}
          audioSettings={app.audio} />

      </div>
      <Footer />
      {app.showCookieBanner ? <CookieBanner
        giveConsent={app.handleCookieBanner} /> : null}
    </div>
  );
}

export default App;
