import React from 'react';
import Link from 'next/link';

export default function BulkLandDholera() {
  return (
    <div className='bg-gradient-to-br from-gray-900 via-slate-800 to-teal-900 min-h-screen pb-8'>
      {/* Bulk Land Section */}
      <div className="pt-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl max-sm:text-3xl font-bold text-white mb-4">
            <span className="text-teal-400">Bulk-Land</span> in Dholera Smart City
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-teal-400 to-teal-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="bg-gradient-to-br from-gray-800/40 to-teal-900/20 rounded-3xl p-8 backdrop-blur-sm border border-teal-500/20 shadow-2xl">
          <div className="text-center mb-8">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Wealthy people don't build their riches through fancy apartments or flashy cars. They quietly buy{' '}
              <span className="font-bold text-teal-400">acres of land</span>, while the world runs after high-rise towers.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Why? Because <span className="font-bold text-teal-400">land is limited, but its value keeps increasing.</span>{' '}
              It's the one asset that quietly grows — without needing to be rebuilt, repainted, or replaced.
            </p>
            <p className="text-2xl font-bold text-teal-400 mb-6">
              This is your chance to do the same — in Dholera Smart City.
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-700/30 to-teal-800/20 p-8 rounded-2xl border border-teal-500/10 mb-8">
            <p className="text-gray-300 text-lg leading-relaxed text-center mb-6">
              The first smart city of India is being built from the ground up, and{' '}
              <span className="font-bold text-teal-400">bulk land is still available at unbelievable prices</span>. But not for long.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed text-center mb-6">
              Imagine owning land today… And tomorrow, seeing{' '}
              <span className="font-bold text-teal-400">schools, malls, movie theatres, warehouses, and hospitals</span>{' '}
              come up around it.
            </p>
            <p className="text-xl font-bold text-center text-teal-400">
              That's not just land — that's a future goldmine.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-gray-700/30 to-teal-800/20 p-6 rounded-2xl border border-teal-500/10">
              <h3 className="text-xl font-bold text-teal-400 mb-4">What We Offer</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                We've got <span className="font-bold text-teal-400">clear-title, town-planning approved</span>{' '}
                bulk land parcels in <span className="font-bold text-teal-400">Dholera Smart City</span>, perfect for:
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mr-3"></div>
                  Builders and developers
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mr-3"></div>
                  NRIs and investors
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mr-3"></div>
                  Business parks, factories, or institutions
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full mr-3"></div>
                  Visionaries like you
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-gray-700/30 to-teal-800/20 p-6 rounded-2xl border border-teal-500/10">
              <h3 className="text-xl font-bold text-teal-400 mb-4">Why Choose Bulk Land?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 mt-1">1</div>
                  <p className="text-gray-300">Maximum appreciation potential as the city develops</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 mt-1">2</div>
                  <p className="text-gray-300">Perfect for large-scale development projects</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 mt-1">3</div>
                  <p className="text-gray-300">Government-approved and ready for development</p>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 mt-1">4</div>
                  <p className="text-gray-300">Strategic location within smart city infrastructure</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Inquire Now Button */}
          <div className="flex justify-center">
            <Link href="/contact">
              <button className="bg-gradient-to-r from-teal-400 to-teal-600 hover:from-teal-500 hover:to-teal-700 px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Inquire Now for Bulk Deals
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}