import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Emocog Blog
            </Link>
            <nav className="flex space-x-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/posts', label: 'Posts' },
                ...(user ? [{ to: '/posts/new', label: 'New Post' }] : []),
                ...(user ? [{ to: '/my-posts', label: 'My Posts' }] : []),
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.to)
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-3">
            {user ? (
              <>
                <span className="text-gray-700 font-medium">
                  {user.display_name}
                </span>
                <Link
                  to="/profile"
                  className="text-blue-600 text-sm hover:underline"
                >
                  프로필
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  로그인
                </Link>
                <Link
                  to="/register"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
