import Link from "next/link";
import { Search, ChevronDown, Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo & Label */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight text-[#0f172a]">VC Stack</span>
          </Link>
          <span className="hidden md:block text-[10px] uppercase tracking-widest text-slate-400 font-semibold border-l pl-4">
            Powered by GoingVC
          </span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md relative group hidden sm:block">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors">
            <Search size={18} />
          </div>
          <input
            type="search"
            placeholder="Search for product"
            className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all"
          />
        </div>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="/all-categories" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Categories
          </Link>
          <div className="flex items-center gap-1 cursor-pointer group">
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Resources</span>
            <ChevronDown size={14} className="text-slate-400 group-hover:text-slate-600" />
          </div>
          <Link href="/blog" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Blog
          </Link>
          <Link href="/newsletter" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Newsletter
          </Link>
        </div>

        {/* Mobile Menu & Search Icon */}
        <div className="flex lg:hidden items-center gap-2">
          <button className="p-2 text-slate-600 sm:hidden">
            <Search size={20} />
          </button>
          <button className="p-2 text-slate-600">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
