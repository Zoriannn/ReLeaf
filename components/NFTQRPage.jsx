import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import Layout from './general/Layout';
import Image from 'next/image';
import { releafCoin, releafNft } from '../images';
import { useDispatch } from 'react-redux';
import { SettingActions } from './reducers/settingReducer';
import { useRouter } from 'next/router';

function NFTQRPage() {
  const [qrResult, setQrResult] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  
  const handleScan = (data) => {
    if (data) {
      setQrResult(data);
      console.log('Scanned QR Code:', data);
    }
  };

  const handleError = (err) => {
    // Error handler for QR scanner
  };

  const handleCloseModal = () => {
    dispatch(SettingActions.setBgImageUrl('/images/4.png'));
    setQrResult(null); // Close the modal when clicking outside or on the close button
    dispatch(SettingActions.setLoading(true));
    setTimeout(() => {
      router.push('/dashboard');
    }, 2000);
  };

  return (
    <Layout>
      <div className="relative w-full h-screen">
        {/* Full-screen QR Reader */}
        <div className="w-full h-full rounded-xl">
          <QrReader
            delay={300}
            onResult={(result, error) => {
              if (!!result) {
                handleScan(result?.text);
              }
              if (!!error) {
                handleError(error);
              }
            }}
            constraints={{ facingMode: 'environment' }} // Use the back camera
            style={{ width: '100%', height: '100%' }}
          />

          <div className="absolute top-0 left-10 transform text-3xl z-50 font-bold">
            Claim Merchant NFT
          </div>

          {/* Instructions at the bottom */}
          <div className="absolute w-full bottom-20 py-3 bg-white px-4 text-center shadow-lg rounded-b-2xl">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 mb-2 text-green-500">
                {/* Icon for better visual appeal */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-full h-full">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6 4H6M12 6v6m6-6H6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-700">Please scan your item's QR code</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-md">
                Scan the QR code on the back of your sustainable goods to prove you bought sustainable items from our merchants. You will find this QR code inside of the merchant packaging or under bottle caps
              </p>
            </div>
          </div>
        </div>

        {/* Modal for QR Code Result */}
        {qrResult && (
          <>
            {/* Backdrop overlay */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-20"
              onClick={handleCloseModal} // Close the modal when clicking on the backdrop
            ></div>

            {/* Modal Content */}
            <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-11/12 max-w-md bg-white rounded-lg shadow-lg p-6 z-30 animate-fade-in">
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={handleCloseModal}
              >
                ✕
              </button>

              {/* Leaf NFT Image */}
              <div className="flex justify-center">
                <Image
                  src={releafNft} // Assuming you have an image for the Leaf NFT
                  alt="Leaf NFT"
                  className="w-24 h-24 animate-bounce-slow"
                />
              </div>

              {/* Success Message */}
              <h2 className="text-center text-xl font-semibold text-gray-800 mb-2">
                You're eligible to claim a Leaf NFT!
              </h2>
              <p className="text-center text-gray-600 mb-4">
                Congratulations! You just made the world a better place, and you're eligible to claim your Leaf NFT now.
              </p>

              {/* Claim Button */}
              <div className="flex justify-center">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
                  onClick={handleCloseModal} // Assuming clicking the button closes the modal or triggers the claim process
                >
                  Claim Leaf NFT
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}

export default NFTQRPage;