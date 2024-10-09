"use client";
import Navbar from '@/components/navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="main p-8">
        
        <div className="dashboard-grid">
          <div className="card bg-yellow-400">
            <div className="card-content">
              <h2>Customers</h2>
              <span>👥</span>
            </div>
            <button>View Details &rarr;</button>
          </div>
          <div className="card bg-yellow-400">
            <div className="card-content">
              <h2>Customers</h2>
              <span>👥</span>
            </div>
            <button>View Details &rarr;</button>
          </div>
          <div className="card bg-green-400">
            <div className="card-content">
              <h2>At a Glance</h2>
              <span>👁️</span>
            </div>
            <button>View Details &rarr;</button>
          </div>
          <div className="card bg-red-400">
            <div className="card-content">
              <h2>Disconnect Meter</h2>
              <span>🔌</span>
            </div>
            <button>View Details &rarr;</button>
          </div>
          <div className="card bg-green-500">
            <div className="card-content">
              <h2>SMS Summary</h2>
              <span>💬</span>
            </div>
            <button>View Details &rarr;</button>
          </div>
          <div className="card bg-yellow-500">
            <div className="card-content">
              <h2>Due</h2>
              <span>⌛</span>
            </div>
            <button>View Details &rarr;</button>
          </div>
        </div>
        <aside className="committee-members">
          <h3 className="text-xl font-semibold">Current Committee Members</h3>
          <ul>
            {/* Example Members */}
            <li>
              <span>First Middle Last</span>
              <small>Chairperson</small>
              <small>9--------</small>
            </li>
            <li>
              <span>First Middle Last</span>
              <small>Post</small>
              <small>9---------</small>
            </li>
            <li>
              <span>First Middle Last</span>
              <small>Post</small>
              <small>9---------</small>
            </li>
            {/* Add more members as needed */}
          </ul>
        </aside>
      </main>
    </div>
  );
}
