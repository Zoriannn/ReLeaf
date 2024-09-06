import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Aos from "aos";
import {
  FileTextOutlined,
  DollarOutlined,
  ExperimentOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import LoadingModal from "../dialog/LoadingModal";
import AlertModal from "../dialog/AlertModal";

function Layout(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector((state) => state.setting.loading);
  const isAlert = useSelector((state) => state.setting.alert);
  const isLogin = useSelector((state) => state.setting.isLogin);
  const [selected, setSelected] = useState(null); // To track which icon is selected

  useEffect(() => {
    Aos.init();
  }, []);

  const leftMenu = [
    {
      key: 0,
      label: "Receipt",
      icon: <FileTextOutlined className="text-4xl" />, // Icon for Receipt
      action: () => {
        setSelected(0); // Set selected icon
        //dispatch(SettingActions.setLoading(true));
        // router.push("/receipt");
      },
    },
    {
      key: 1,
      label: "NFT",
      icon: <DollarOutlined className="text-4xl" />, // Icon for NFT
      action: () => {
        setSelected(1); // Set selected icon
        //dispatch(SettingActions.setLoading(true));
        // router.push("/nft");
      },
    },
  ];

  const rightMenu = [
    {
      key: 2,
      label: "AR",
      icon: <ExperimentOutlined className="text-4xl" />, // Icon for AR
      action: () => {
        setSelected(2); // Set selected icon
       // dispatch(SettingActions.setLoading(true));
        // router.push("/ar");
      },
    },
    {
      key: 3,
      label: "Asset",
      icon: <DatabaseOutlined className="text-4xl" />, // Icon for Asset
      action: () => {
        setSelected(3); // Set selected icon
        //dispatch(SettingActions.setLoading(true));
        // router.push("/asset");
      },
    },
  ];

  return (
    <>
      <div className="relative min-h-screen  bg-[#d6ffe4]">
        {router.pathname === "/dashboard" ? (
          // Show floating buttons with bobbing effect on /dashboard
          <>
            <div className="z-50 absolute left-0 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
              {leftMenu.map((item) => (
                <button
                  key={item.key}
                  className={`mx-5 w-16 h-16 flex items-center justify-center bg-green-500 rounded-full shadow-lg transition-transform duration-300 button-bobbing ${
                    selected === item.key ? "bg-white text-green-500" : "text-white"
                  }`}
                  onClick={item.action}
                >
                  <div>{item.icon}</div>
                </button>
              ))}
            </div>

            <div className="z-50 absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
              {rightMenu.map((item) => (
                <button
                  key={item.key}
                  className={`mx-5 w-16 h-16 flex items-center justify-center bg-green-500 rounded-full shadow-lg transition-transform duration-300 button-bobbing ${
                    selected === item.key ? "bg-white text-green-500" : "text-white"
                  }`}
                  onClick={item.action}
                >
                  <div>{item.icon}</div>
                </button>
              ))}
            </div>
          </>
        ) : router.pathname !== "/" ? (
          // Show static buttons at the bottom for other routes except root "/"
          <div className="fixed bottom-0 left-0 right-0 bg-green-400 rounded-t-xl pt-3 shadow-xl py-2 flex justify-around items-center z-50">
            {[...leftMenu, ...rightMenu].map((item) => (
              <button
                key={item.key}
                className={`w-16 h-16 flex flex-col items-center justify-centerrounded-full  transition-transform duration-300 p-1 ${
                  selected === item.key ? "bg-white rounded-full text-green-500" : "text-white"
                }`}
                onClick={item.action}
              >
                <div>{item.icon}</div>
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        ) : null} {/* Do not show any buttons when pathname === '/' */}

        {/* Main Content */}
        <div className="w-full md:w-1/3 mx-auto">
          <div className="relative container mx-auto h-full ">
            <div className="mb-auto h-screen">
              <div className="h-screen">
                <div className="relative">{props.children}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <div className="text-white">
        {isLoading && <LoadingModal />}
        {isAlert.length > 0 && (
          <AlertModal message={isAlert[0]?.msg} action={isAlert[1]} />
        )}
      </div>

      {/* CSS for bobbing effect */}
      <style jsx>{`
        .button-bobbing {
          animation: bobbing 2s ease-in-out infinite;
        }

        @keyframes bobbing {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </>
  );
}

export default Layout;