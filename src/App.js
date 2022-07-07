import logo from './logo.svg';
import './App.css';
import Registration from './Pages/Registration';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Home from './Components/Home';
import Addpost from './Pages/Addpost';
import Profile from './Pages/Profile';
import Checkpost from './Pages/CheckPost';
import Serch from './Pages/Serch';
import Panding from './Pages/Panding';
import { useSelector } from 'react-redux';

function App() {
  const UserData = useSelector((state) => state.Login);

  let routes = (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
    </Routes>
  )

  if (UserData.data[0] != null) {
    routes = (
      <Routes>
        <Route path="/dashboard" element={<Home />} />
        <Route path="/dashboard/addpost" element={<Addpost />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/checkpost" element={<Checkpost />} />
        <Route path="/dashboard/serch" element={<Serch />} />
        <Route path="/dashboard/profile/panding" element={<Panding />} />
        <Route path='/' element={<Home />} />
        <Route path="/registration" element={<Home />} />
      </Routes>
    )
  }
  return (
    <div className="App">
      {routes}
    </div>
  );
}

export default App;
