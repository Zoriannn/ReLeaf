// DashboardPage component
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Aos from 'aos';
import Layout from './general/Layout';
import { SettingActions } from './reducers/settingReducer';

function DashboardPage({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [init, setInit] = useState(false);
 const bgImageUrl = useSelector((state) => state.setting.bgImageUrl);



  useEffect(() => {
    dispatch(SettingActions.setLoading(false));
    Aos.init();
  }, []);

  return (
    <Layout>
      {/* Top bar */}
      <div className="w-full bg-green-500 text-white flex items-center justify-between p-2">
        {/* Leafcoin Section */}
        <div className="flex items-center space-x-2">
          <img src="/images/releaf_coin.png" alt="Leafcoin" className="w-6 h-6" />
          <span>20.0</span>
        </div>

        {/* Game-related Info */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <img
              src="/images/profile_icon.png"
              alt="Player Profile"
              className="w-8 h-8 rounded-full"
            />
            <span>John Doe</span>
          </div>

          <div className="flex items-center">
            <span className="text-sm">Level 11</span>
          </div>
        </div>
      </div>

      {/* Main content with background image */}
      <div
        className="flex flex-col justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bgImageUrl}')` }}
      >
        {/* Add your game content here */}
      </div>
    </Layout>
  );
}

export default DashboardPage;