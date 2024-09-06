import React, { useState } from 'react';
import Layout from './general/Layout';
import Image from 'next/image';
import { releafBadge, releafNft } from '../images'; // Assuming releafNft is imported correctly
import { useDispatch } from 'react-redux';
import { SettingActions } from './reducers/settingReducer';
import { useRouter } from 'next/router';

function ARPage() {
  const [showModal, setShowModal] = useState(false); // To manage the modal visibility
  const dispatch = useDispatch();
  const router = useRouter();

  const handleOpenModal = () => {
    setShowModal(true); // Show the modal when "Leaf AR" is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal when the "✕" button is clicked
    dispatch(SettingActions.setBgImageUrl('/images/5.png'));
    dispatch(SettingActions.setLoading(true));
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  const handleNavigate = () => {
    dispatch(SettingActions.setBgImageUrl('/images/5.png'));
    dispatch(SettingActions.setLoading(true));
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <Layout>
      <div className="relative w-full h-screen">
        {/* Clickable Leaf AR text */}
        <div className="absolute top-0 left-32 transform text-3xl z-50 font-bold cursor-pointer" onClick={handleOpenModal}>
          Leaf AR
        </div>

        {/* Image background */}
        <img src='/images/trashbingif.gif' alt="AR Image" />

        {/* Modal */}
        {showModal && (
          <>
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20"
              onClick={handleCloseModal} // Navigates when clicking outside the modal
            ></div>

            {/* Modal Content */}
            <div className="fixed bottom-36 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md bg-white rounded-lg shadow-lg p-6 z-30 animate-fade-in">
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={handleCloseModal} // Closes the modal
              >
                ✕
              </button>

              {/* Leaf NFT Image */}
              <div className="flex justify-center">
                <Image
                  src={releafBadge} // Assuming you have an image for the Leaf NFT
                  alt="Leaf NFT"
                  width={200}
                  height={200}
                  className="w-20 h-20 animate-bounce-slow"
                />
              </div>

              {/* Success Message */}
              <h2 className="text-center text-xl font-semibold text-gray-800 mb-2">
  You've received a surprise virtual asset!
</h2>
<p className="text-center text-gray-600 mb-4">
  Congratulations! You've made a positive impact, and we've added a new surprise asset to your account. Visit your asset page to see what's new!
</p>

{/* Claim Button */}
<div className="flex justify-center">
  <button
    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
    onClick={handleCloseModal} // Closes the modal
  >
    Go to Asset Page
  </button>
</div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default ARPage;