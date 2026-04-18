import React from 'react';
import Header from '../../components/headquaeters/Header/HeadQuartersHeader';
import Footer from '../../components/officer/footer/footer';

function StatisticsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="pt-20 px-6 pb-10">
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">Statistics</h1>
          <p className="text-gray-600 mb-6">
            This is the headquarters statistics page. Content is loading or under construction.
          </p>
          <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">
            Statistics dashboard content will appear here.
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default StatisticsPage;
