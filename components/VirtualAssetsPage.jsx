import React, { useState } from 'react';
import Layout from './general/Layout';
import Image from 'next/image';
import { NFT_1 } from '../images';
import Modal from 'react-modal'; 

Modal.setAppElement('#__next');

function VirtualAssetsPage() {
  const [assets] = useState([
    { id: 1, name: 'NFT Artwork', description: 'A rare digital artwork.', image: NFT_1, type: 'NFT', imageURL: '/images/NFT_1.jpg' },
    { id: 2, name: 'Virtual Shirt', description: 'Virtual shirt for the metaverse.', image: NFT_1, type: 'Clothing', imageURL: '/images/virtualshirt.png' },
    { id: 3, name: 'Limited Collectible', description: 'Special limited edition item.', image: NFT_1, type: 'Collectible', imageURL: '/images/limited.png' },
    { id: 4, name: 'NFT Sculpture', description: 'A 3D NFT sculpture.', image: NFT_1, type: 'NFT', imageURL: '/images/NFT_sculpture.png' },
    { id: 5, name: 'Exclusive Outfit', description: 'Outfit for your virtual avatar.', image: NFT_1, type: 'Clothing', imageURL: '/images/exclusive.png' },
    { id: 6, name: 'Rare Collectible', description: 'A rare digital collectible.', image: NFT_1, type: 'Collectible', imageURL: '/images/rareNFT.jpg' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || asset.type === filter;
    return matchesSearch && matchesFilter;
  });

  const openModal = (asset) => {
    setSelectedAsset(asset);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedAsset(null);
  };

  return (
    <Layout>
      <div className="relative w-full h-screen bg-green-150 px-4 py-6">
        {/* Title */}
        <h1 className="text-center text-3xl font-bold mb-6 text-gray-800">My Virtual Assets</h1>

        {/* Search Bar and Filter */}
        <div className="flex justify-center items-center space-x-4 mb-8">
          <input
            type="text"
            className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search assets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="NFT">NFTs</option>
            <option value="Clothing">Clothing</option>
            <option value="Collectible">Collectibles</option>
          </select>
        </div>

        {/* Grid of Assets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAssets.length > 0 ? (
            filteredAssets.map((asset) => (
              <div
                key={asset.id}
                className="bg-white rounded-lg shadow-lg p-4 cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={() => openModal(asset)}
              >
                <div className="flex justify-center mb-4">
                  <Image
                    src={asset.imageURL}
                    alt={asset.name}
                    width={150}
                    height={150}
                    className="rounded-lg"
                  />
                </div>
                <h2 className="text-center text-xl font-semibold text-gray-800 mb-2">{asset.name}</h2>
                <p className="text-center text-gray-600">{asset.description}</p>
                <div className="text-center mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    asset.type === 'NFT'
                      ? 'bg-purple-100 text-purple-800'
                      : asset.type === 'Clothing'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {asset.type}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-4 text-gray-500">No assets found</div>
          )}
        </div>

        {/* Modal for Asset Details */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="bg-white rounded-lg shadow-lg p-6 max-w-lg mx-auto mt-24"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
        >
          {selectedAsset && (
            <>
              <div className="flex justify-center mb-4">
                <Image
                  src={selectedAsset.imageURL}
                  alt={selectedAsset.name}
                  width={150}
                  height={150}
                  className="rounded-lg"
                />
              </div>
              <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">{selectedAsset.name}</h2>
              <p className="text-center text-gray-600 mb-4">{selectedAsset.description}</p>
              <div className="text-center">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 ease-in-out"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </>
          )}
        </Modal>
      </div>
    </Layout>
  );
}

export default VirtualAssetsPage;