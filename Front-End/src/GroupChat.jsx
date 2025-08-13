import { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';

/* ======= demotax (localStorage mini DB) ======= */
const KEY = 'demotax_db_v1_v2';
const seedUsers = [
  { _id: 'u1', name: 'Sal Sabil',            avatarUrl: 'https://i.pravatar.cc/100?img=11' },
  { _id: 'u2', name: 'Inan Karim Chowdhury', avatarUrl: 'https://i.pravatar.cc/100?img=12' },
  { _id: 'u3', name: 'Faiyaz Ahmed',         avatarUrl: 'https://i.pravatar.cc/100?img=13' },
  { _id: 'u4', name: 'Shantanu Barua',       avatarUrl: 'https://i.pravatar.cc/100?img=14' },
  { _id: 'u5', name: 'Md, Irtiza Hossain',   avatarUrl: 'https://i.pravatar.cc/100?img=15' },
  { _id: 'u6', name: 'Tasnia Juha',          avatarUrl: 'https://i.pravatar.cc/100?img=16' },
  { _id: 'u7', name: 'Esha Singh',           avatarUrl: 'https://i.pravatar.cc/100?img=5'  },
  { _id: 'u8', name: 'Farhan Ali',           avatarUrl: 'https://i.pravatar.cc/100?img=6'  }
];
function load() {
  const raw = localStorage.getItem(KEY);
  if (!raw) {
    const initial = { users: seedUsers, groups: [], currentUserId: 'u1' };
    localStorage.setItem(KEY, JSON.stringify(initial));
    return initial;
  }
  try { return JSON.parse(raw); }
  catch {
    const f = { users: seedUsers, groups: [], currentUserId: 'u1' };
    localStorage.setItem(KEY, JSON.stringify(f));
    return f;
  }
}
function save(db){ localStorage.setItem(KEY, JSON.stringify(db)); }
function uid(prefix='grp'){ return `${prefix}_${Math.random().toString(36).slice(2,8)}${Date.now().toString(36).slice(-4)}`; }
const demotax = {
  users(){ return load().users; },
  currentUser(){ const db = load(); return db.users.find(u => u._id === db.currentUserId) || db.users[0]; },
  createGroup({ name, memberIds }) {
    const db = load();
    const g = { _id: uid(), name: name || '', memberIds, createdBy: db.currentUserId, createdAt: new Date().toISOString() };
    db.groups.unshift(g); save(db); return g;
  }
};
/* ============================================== */

export default function GroupChat() {
  const me = useMemo(() => demotax.currentUser(), []);
  const [groupName, setGroupName] = useState('');
  const [query, setQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [visible, setVisible] = useState(demotax.users());
  const debounceRef = useRef();

  // search filter (debounced)
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const q = query.trim().toLowerCase();
      const all = demotax.users();
      const filtered = !q ? all : all.filter(u => u.name.toLowerCase().includes(q));
      setVisible(filtered);
    }, 150);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const reset = () => {
    setGroupName('');
    setQuery('');
    setSelectedIds(new Set());
    setVisible(demotax.users());
  };

  const toggle = (id) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const canCreate = selectedIds.size >= 2;
  const onCreate = () => {
    if (!canCreate) return toast('Pick at least 2 people ❗');
    const ids = Array.from(new Set([...selectedIds, me._id]));
    demotax.createGroup({ name: groupName, memberIds: ids });
    toast.success('Group created ✔️');
    reset();
  };

  return (
    // FULL SCREEN wrapper
    <div className="h-screen w-screen bg-white flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 flex items-center justify-between bg-yellow-400 px-4 py-3 shadow-sm">
        <button onClick={reset} className="text-blue-800 font-medium hover:underline">
          Cancel
        </button>
        <div className="text-lg font-semibold text-black flex items-center gap-1">
          New group <span role="img" aria-label="group">👥</span>
        </div>
        <button
          className={`font-semibold ${canCreate ? 'text-blue-800 hover:underline' : 'text-black/40 cursor-not-allowed'}`}
          onClick={onCreate}
          disabled={!canCreate}
          title={!canCreate ? 'Pick at least 2 people' : 'Create group'}
        >
          {canCreate ? `Create (${selectedIds.size})` : 'Create'}
        </button>
      </div>

      {/* Group name row */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-yellow-300 bg-yellow-100">
        <input
          value={groupName}
          onChange={(e)=>setGroupName(e.target.value)}
          className="flex-1 bg-transparent outline-none placeholder:text-black/60 text-black"
          placeholder="Group Name (optional)"
        />
        <span className="text-black/60 select-none">{'>'}</span>
      </div>

      {/* Sticky Search */}
      <div className="sticky top-[60px] z-10 px-4 py-3 border-b bg-white">
        <div className="rounded-md bg-slate-200/70 px-3 py-2 flex items-center gap-2">
          <span className="text-slate-500">🔎</span>
          <input
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-transparent outline-none text-slate-800 placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* Suggested label */}
      <div className="px-4 pt-2 text-xs text-slate-500">Suggested</div>

      {/* Scrollable list area */}
      <div className="flex-1 overflow-auto">
        {visible.map((u, idx) => (
          <div key={u._id}>
            <button
              onClick={() => toggle(u._id)}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-50"
            >
              <img src={u.avatarUrl} alt={u.name} className="h-9 w-9 rounded-full object-cover" />
              <div className="flex-1 text-left">
                <div className="text-[15px] text-slate-900">{u.name}</div>
              </div>
              {selectedIds.has(u._id) && <span className="text-green-600 text-lg">✔️</span>}
            </button>
            {idx < visible.length - 1 && <div className="mx-16 border-t border-slate-200" />}
          </div>
        ))}
        {visible.length === 0 && (
          <div className="px-4 py-10 text-center text-sm text-slate-500">No matches</div>
        )}
      </div>
    </div>
  );
}
