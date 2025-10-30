import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ items }) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4" />
          </Link>

          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-blue-600 transition-colors text-gray-700 hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium truncate max-w-[200px] sm:max-w-none">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}