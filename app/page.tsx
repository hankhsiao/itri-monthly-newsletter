import { Header } from '@/app/components/Header';
import { ContentTable } from '@/app/components/ContentTable';
import { TechInformation } from '@/app/components/TechInformation';
import { headerInfo } from '@/app/data/header';
import { fetchArticlesFromSheet } from '@/app/data/fetchArticles';

export default async function Home() {
  const techArticles = await fetchArticlesFromSheet();
  
  return (
    <div className="min-h-screen bg-white">
      <Header info={headerInfo} />
      <ContentTable articles={techArticles} />
      <TechInformation articles={techArticles} />
      
      <footer className="w-full border-t border-gray-200 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center text-gray-600 text-sm">
          <p>&copy; 2025 Industrial Technology Research Institute (ITRI). All rights reserved.</p>
          <p className="mt-2">
            For more information, visit{' '}
            <a href="https://www.itri.org.tw" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
              www.itri.org.tw
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
