import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  name: string;
  tagline: string;
  logoUrl: string;
  slug: string;
}

export function ProductCard({ name, tagline, logoUrl, slug }: ProductCardProps) {
  return (
    <Link 
      href={`/product/${slug}`}
      className="group block bg-white rounded-xl border border-slate-200 p-6 transition-all duration-300 hover:shadow-lg hover:border-slate-300"
    >
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-20 h-20 relative rounded-lg overflow-hidden border border-slate-100 p-1 bg-white flex items-center justify-center">
          {logoUrl ? (
            <img 
              src={logoUrl} 
              alt={`${name} logo`}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-2xl">
              {name.charAt(0)}
            </div>
          )}
        </div>
        
        <div>
          <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-slate-500 line-clamp-2 mt-1">
            {tagline}
          </p>
        </div>
      </div>
    </Link>
  );
}
