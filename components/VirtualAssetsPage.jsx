import React, { useState } from 'react';
import Layout from './general/Layout';
import Image from 'next/image';
import { sampleNFT, sampleShirt, sampleCollectible } from '../images'; // Sample asset images
import Modal from 'react-modal'; // We'll use react-modal for the modal popup

Modal.setAppElement('#__next'); // Ensure accessibility with ReactModal

function VirtualAssetsPage() {
  // Example asset list data
  const [assets] = useState([
    { id: 1, name: 'NFT Artwork', description: 'A rare digital artwork.', image: sampleNFT, type: 'NFT' },
    { id: 2, name: 'Virtual Shirt', description: 'Virtual shirt for the metaverse.', image: sampleShirt, type: 'Clothing' },
    { id: 3, name: 'Limited Collectible', description: 'Special limited edition item.', image: sampleCollectible, type: 'Collectible' },
    { id: 4, name: 'NFT Sculpture', description: 'A 3D NFT sculpture.', image: sampleNFT, type: 'NFT' },
    { id: 5, name: 'Exclusive Outfit', description: 'Outfit for your virtual avatar.', image: sampleShirt, type: 'Clothing' },
    { id: 6, name: 'Rare Collectible', description: 'A rare digital collectible.', image: sampleCollectible, type: 'Collectible' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  // Filter and search logic
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
      <div className="relative w-full h-screen bg-gray-100 px-4 py-6">
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

        {/* Table of Assets */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-green-500 text-white">
                <th className="py-2 px-4">Image</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.length > 0 ? (
                filteredAssets.map((asset) => (
                  <tr key={asset.id} className="border-b">
                    {/* Asset Image */}
                    <td className="py-2 px-4">
                      <Image src={asset.image} alt={asset.name} width={80} height={80} className="rounded-lg" />
                    </td>

                    {/* Asset Name */}
                    <td className="py-2 px-4">
                      <span className="font-semibold text-gray-800">{asset.name}</span>
                    </td>

                    {/* Asset Type */}
                    <td className="py-2 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        asset.type === 'NFT'
                          ? 'bg-purple-100 text-purple-800'
                          : asset.type === 'Clothing'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {asset.type}
                      </span>
                    </td>

                    {/* View Details Button */}
                    <td className="py-2 px-4 text-center">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => openModal(asset)}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-gray-500">No assets found</td>
                </tr>
              )}
            </tbody>
          </table>
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
                  src={selectedAsset.image}
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