import { Link } from 'react-router-dom';
import { useItemCount } from '../hooks/useItems';
import Button from '../components/ui/Button';

const HomePage = (): JSX.Element => {
  const { data: countData, isLoading } = useItemCount();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Vibe Boilerplate
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A fullstack boilerplate ready for your MVP development
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            🚀 Quick Start
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>✅ FastAPI backend with PostgreSQL</li>
            <li>✅ React frontend with TypeScript</li>
            <li>✅ Docker development environment</li>
            <li>✅ Sample CRUD implementation</li>
            <li>✅ Testing setup (pytest + vitest)</li>
            <li>✅ Code quality tools (ruff + eslint)</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            📊 Current Status
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Items:</span>
              <span className="font-semibold">
                {isLoading ? '...' : countData?.count || 0}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">API Status:</span>
              <span className="text-green-600 font-semibold">✅ Running</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Database:</span>
              <span className="text-green-600 font-semibold">✅ Connected</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          Ready to build your MVP?
        </h2>
        <p className="text-gray-600 mb-6">
          Start by exploring the sample Items implementation, then extend it
          with your own features.
        </p>
        <div className="space-x-4">
          <Link to="/items">
            <Button size="lg">Explore Items Demo</Button>
          </Link>
          <a href="/docs" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg">
              View API Docs
            </Button>
          </a>
        </div>
      </div>

      <div className="mt-16 bg-blue-50 p-8 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          🛠️ Development Guidelines
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Backend (FastAPI)
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                • Follow the layered architecture (API → Service → Repository)
              </li>
              <li>• Use SQLAlchemy 2.x with async sessions</li>
              <li>• Write tests with pytest</li>
              <li>• Format code with ruff</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Frontend (React)
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Use TypeScript for type safety</li>
              <li>• React Query for API state management</li>
              <li>• Write tests with Vitest</li>
              <li>• Follow component composition patterns</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 text-sm text-gray-600">
          <p>
            📚 Read the{' '}
            <code className="bg-white px-2 py-1 rounded">
              AGENT_PLAYBOOK.md
            </code>{' '}
            and
            <code className="bg-white px-2 py-1 rounded ml-1">
              _CODING_GUIDELINES.md
            </code>{' '}
            for detailed development rules.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
