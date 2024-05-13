import { StrictMode , React } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage.jsx';
import AdminPage from './components/AdminPage.jsx';
import LeagueOfHeroesPage from './components/LeagueOfHeroesPage.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import Dashboard from './components/Dashboard.jsx';
import AgentDashboard from './components/AgentDashboard.jsx'
import AdminDashboard from './components/AdminDashboard.jsx';

function App() {
  return (
    <StrictMode>
    <Routes>
      <Route exact path="/" element={<LoginPage/>} />
      <Route exact path="/admin" element={<AdminPage/>} />
      <Route exact path="/loh" element={<LeagueOfHeroesPage/>} />
      <Route exact path="/dashboard" element={<Dashboard/>}></Route>
      <Route exact path="/agentdashboard" element={<AgentDashboard/>}></Route>
      <Route exact path="/admindashboard" element={<AdminDashboard/>} />
      <Route element={<NotFoundPage/>} />
    </Routes>
    </StrictMode>
  );
}

export default App;