import { Link, useLocation } from 'react-router-dom';

const Header = (): JSX.Element => {
  const location = useLocation();

  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-xl font-bold text-gray-900">
              Vibe Boilerplate
            </Link>
            <nav className="flex space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Home
              </Link>
              <Link
                to="/items"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/items')
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Items
              </Link>
            </nav>
          </div>
          <div className="text-sm text-gray-500">Ready for your MVP</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
