import React from 'react';
import Link from 'next/link'; 

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-50 text-gray-900">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-extrabold mb-4">Alarm Performance</h1>
        <p className="mb-8 text-lg text-gray-600">A technical interview task.</p>
        <div className="flex justify-center mb-8">
          <Link href="/calculator" className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">Continue</Link>
        </div>
      </div>
    </div>
  );
}
