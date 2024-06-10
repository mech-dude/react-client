import { StrictMode , React } from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import LoginPage from './pages/LoginPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import LeagueOfHeroesPage from './pages/LeagueOfHeroesPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AgentDashboard from './pages/AgentDashboard.jsx'

function App() {
  return (
    <StrictMode>
    <Routes>
      <Route exact path="/" element={<LoginPage/>} />
      <Route exact path="/admin" element={<AdminPage/>} />
      <Route exact path="/loh" element={<LeagueOfHeroesPage/>} />
      <Route exact path="/dashboard" element={<Dashboard/>}></Route>
      <Route exact path="/agentdashboard" element={<AgentDashboard/>}></Route>
      <Route element={<NotFoundPage/>} />
    </Routes>
    </StrictMode>
  );
}

export default App;