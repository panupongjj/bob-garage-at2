import './AdminSidebar.scss';

const AdminSidebar = ({ activeSection, setActiveSection, user, onLogout }) => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__header">
        <h2 className="admin-sidebar__title">Admin Dashboard</h2>
        <p className="admin-sidebar__user">{user?.name}</p>
      </div>

      <nav className="admin-sidebar__nav">
        <button
          className={`admin-sidebar__nav-item ${activeSection === 'list' ? 'active' : ''}`}
          onClick={() => setActiveSection('list')}
        >
          📋 Services List
        </button>
        <button
          className={`admin-sidebar__nav-item ${activeSection === 'add' ? 'active' : ''}`}
          onClick={() => setActiveSection('add')}
        >
          ➕ Add Service
        </button>
      </nav>

      <div className="admin-sidebar__footer">
        <button onClick={onLogout} className="admin-sidebar__logout">
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;

