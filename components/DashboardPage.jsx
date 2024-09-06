import React, { useRef, useState, useEffect, useMemo } from 'react';

import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import Aos from 'aos';
import Layout from './general/Layout';
import { SettingActions } from './reducers/settingReducer';


function DashboardPage({ data }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [init, setInit] = useState(false);

  useEffect(() => {
    dispatch(SettingActions.setLoading(false));
    Aos.init();
   
  }, []);

  



  return (
    <Layout>

      <div className="h-full w-full">
       
      </div>

    </Layout>
  );
}

export default DashboardPage;
