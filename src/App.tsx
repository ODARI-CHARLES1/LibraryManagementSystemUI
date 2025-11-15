import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import type { ReactNode } from 'react';
import Dashboard from "./Pages/Dashboard";
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Books from './Pages/Books';
import Users from './Pages/Users';
import Admins from './Pages/Admins';
import Notifications from './Pages/Notifications';
import Records from './Pages/Records';
import Settings from './Pages/Settings';
import Help from './Pages/Help';
import appContext from './Contexts/AppContext';

if (localStorage.getItem("sideActive")) { ;
} else {
  const sideActiveInitial: number = 0;
  localStorage.setItem("sideActive", JSON.stringify(sideActiveInitial));
}
if(localStorage.getItem("Period")){
  ;
}
else{
  localStorage.setItem("Period","select Period")
}

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useContext(appContext);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <div className="bg-gray-100 h-screen transition-colors">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/books" element={<ProtectedRoute><Books /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="/admins" element={<ProtectedRoute><Admins /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/records" element={<ProtectedRoute><Records /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><Help /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
