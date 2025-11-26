import { HeaderInfo } from '@/app/data/types';

interface HeaderProps {
  info: HeaderInfo;
}

export function Header({ info }: HeaderProps) {
  return (
    <header className="w-full border-b border-gray-200 bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-2">
            {info.title}
          </h1>
          <p className="text-gray-600 text-lg">
            Volume {info.vol} • {info.date}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-semibold text-gray-700">Editor</span>
            <p className="text-gray-600">{info.editor}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Publisher</span>
            <p className="text-gray-600">{info.publisher}</p>
          </div>
          <div>
            <span className="font-semibold text-gray-700">Website</span>
            <p>
              <a
                href={info.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                ITRI
              </a>
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
