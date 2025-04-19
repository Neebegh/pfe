import { useAuth } from '../../context/AuthContext';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="app-container">
      <Navbar user={user} onLogout={logout} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;