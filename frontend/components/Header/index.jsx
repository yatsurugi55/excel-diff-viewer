import React from 'react';
import { FileText } from 'lucide-react';
import { Coffee } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-blue-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Coffee className="h-8 w-8 text-blue-600" />
          <div className="ml-3">
            <h1 className="text-2xl font-bold text-gray-900">CoffeeMerge</h1>
            <p className="text-sm text-gray-500">Excelファイルの差分を表示</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
