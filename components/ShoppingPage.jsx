import React from 'react';
import Layout from './general/Layout';

const items = [
  { id: 1, name: 'Garden', price: 0.59, image: '/images/garden.jpg' },
  { id: 2, name: 'Building', price: 0.99, image: '/images/building.png' },
  { id: 3, name: 'Pond', price: 1.89, image: '/images/pond.png' },
  { id: 4, name: 'Church', price: 2.99, image: '/images/church.png' },
  { id: 5, name: 'Shopping Mall', price: 3.49, image: '/images/mall.png' },
];

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

const ShoppingPage = ({ userCoins }) => {
  return (
    <Layout>
 <div className="max-w-5xl mx-auto p-8 bg-green-100">
      <header className="mb-8 flex flex-col items-start">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Leaf NFT Shop</h1>
        <p className="text-xl text-gray-700">
          Current LeafCoins: <span className="font-bold text-blue-600">20.0</span>
        </p>
      </header>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
          <li key={item.id} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
            <div className="w-full h-32 relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{item.name}</h2>
              <span className="text-lg font-medium text-gray-900">{formatCurrency(item.price)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </Layout>
   
  );
};

export default ShoppingPage;