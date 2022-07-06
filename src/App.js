import logo from './logo.svg';
import './App.css';
import Registration from './Pages/Registration';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Components/Home';
import Addpost from './Pages/Addpost';
import Profile from './Pages/Profile';
import Checkpost from './Pages/CheckPost';
import Serch from './Pages/Serch';
import Panding from './Pages/Panding';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/addpost" element={<Addpost />} />
          <Route path="/dashboard/profile" element={<Profile />} />
          <Route path="/checkpost" element={<Checkpost />} />
          <Route path="/dashboard/serch" element={<Serch />} />
          <Route path="/dashboard/profile/panding" element={<Panding />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
