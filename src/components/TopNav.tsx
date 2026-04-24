import { Bell, Search, User } from 'lucide-react';

export default function TopNav() {
  return (
    <header className="h-16 bg-surface/50 backdrop-blur-md border-b border-slate-700/50 flex items-center justify-between px-4 md:px-6 z-10">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
          <input 
            type="text" 
            placeholder="Search transactions, cases, or hashes..." 
            className="w-full bg-slate-800/50 border border-slate-700 text-white text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4 ml-6">
        <button className="relative p-2 text-textMuted hover:text-white transition-colors rounded-full hover:bg-slate-800">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full border border-surface"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-700/50 mx-2"></div>
        
        <button className="flex items-center space-x-3 text-textMuted hover:text-white transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
            <User className="w-4 h-4" />
          </div>
          <span className="hidden md:inline-block text-sm font-medium">Admin SSO</span>
        </button>
      </div>
    </header>
  );
}
