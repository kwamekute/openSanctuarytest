import logo from '../assets/logo.png';
import { HiMenu, HiX } from "react-icons/hi";   // 💙 added HiX for close icon
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SearchBar from './searchbar';
import { useState } from 'react'; // 💙 added useState

export default function Header(Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const isHostPage = location.pathname === '/host';
  const isAddListingPage = location.pathname === '/host/listing/create';
  const isHomePage = location.pathname === '/';
  const isHostProfilePage = location.pathname === '/host/profile';
  const headerHeight = isHomePage ? 'h-40' : 'h-20';

  const user = Props.user || null;

  const isOrgUser = user && user.role === "organization";

  // 💙 state to control menu open/close
  const [menuOpen, setMenuOpen] = useState(false);

  console.log("User in Header:", user ? user.account_id : "no user yet");

  const handleHostClick = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/me", {
      credentials: "include", // 🟦 include cookies/session
    });
    const data = await response.json();

    if (data.success && data.account) {
      navigate("/host"); // ✅ logged in
    } else {
      navigate("/login"); // ❌ not logged in
    }
  } catch (err) {
    console.error("Error checking session:", err);
    navigate("/login");
  }
};

  let button;
  switch (true) {
    case isAddListingPage:
      button = <button onClick={() => navigate('/host')}>Save and Exit</button>;
      break;
    case isHostPage:
      button = <button onClick={() => navigate('/')}>Find a space</button>;
      break;
    case isHomePage:
      button = <button onClick={handleHostClick}>Host a space</button>;
  }

  const orgName = Props.user?.organization?.name || '?';
  const avatarLetter = orgName ? orgName.charAt(0).toUpperCase() : '?';

  return (
    <>
      <div className={`sticky top-0 z-50 ${headerHeight} border-b border-gray-300 px-6 flex flex-col items-center justify-around bg-[#FBFBFB]`}>
        <div className='w-full flex items-center justify-between'>

          {/* Left Section: Logo */}
          <div className='flex items-center space-x-2 text-[#DE846A]'>
            <img src={logo} alt="Logo" className="h-8 w-auto" />
            {!isAddListingPage && (
              <span
                onClick={() => navigate('/')}
                style={{ cursor: 'pointer' }}
              >
                OpenSantuary
              </span>
            )}
          </div>

          {/* Host tabs */}
          {(isHostPage || isHostProfilePage) && (
            <div className="text-[14px] font-medium leading-[18px] text-gray-500 flex gap-7">
              <span
                onClick={() => Props.SetActiveTab('Requests')}
                className={`hover:text-[#222222] pb-1 cursor-pointer ${Props.tab === 'Requests' ? 'border-b-2 border-[#DE846A] text-[#222222]' : ''}`}
              >
                Requests
              </span>
              <span
                onClick={() => Props.SetActiveTab('Listings')}
                className={`hover:text-[#222222] pb-1 cursor-pointer ${Props.tab === 'Listings' ? 'border-b-2 border-[#DE846A] text-[#222222]' : ''}`}
              >
                Listings
              </span>
            </div>
          )}

          {/* Right Section: Host + Menu */}
          <div className='flex items-center space-x-5'>
            {button}

            {(isHostPage || isHostProfilePage) && (
              <div
                onClick={() => Props.SetActiveTab('HostProfile')}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E19179] text-white cursor-pointer hover:bg-[#DE846A]"
              >
                <p className='text-[14px] font-normal leading-[20.02px] text-white'>{avatarLetter}</p>
              </div>
            )}

            {!isAddListingPage && isOrgUser &&(
              <div
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                onClick={() => setMenuOpen(true)}  // 💙 open menu
              >
                <HiMenu className="text-2xl text-gray-700" />
              </div>
            )}
          </div>
        </div>

        {/* Search Bar Section Appears only on home page */}
        {isHomePage && <SearchBar />}
      </div>

      {/* 💙 Slide Menu */}
      <div
        className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
          menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* 💙 Backdrop */}
        <div
          className="absolute inset-0 bg-black bg-opacity-30"
          onClick={() => setMenuOpen(false)}
        ></div>

        {/* 💙 Panel */}
        <div
          className={`relative w-64 h-full bg-white shadow-lg p-4 transform transition-transform duration-300 ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">{orgName}</h2>
            <HiX
              className="text-2xl text-gray-600 cursor-pointer hover:text-black"
              onClick={() => setMenuOpen(false)}  // 💙 close menu
            />
          </div>

          <div className="flex flex-col space-y-4">
            <button
              onClick={() => {
                Props.SetActiveTab('HostProfile');
                setMenuOpen(false);  
              }}
              className="text-gray-700 hover:text-black text-left"
            >
              Profile
            </button>
            {/* <button
              onClick={() => {
                navigate('/host/profile');
                setMenuOpen(false);
              }}
              className="text-gray-700 hover:text-black text-left"
            >
              Profile
            </button> */}
          </div>

          {/* 💙 Logout at bottom */}
          <div className="mt-auto absolute bottom-4 left-0 w-full px-4">
            <button
              onClick={Props.handleLogout}
              className="w-full py-2 bg-[#DE846A] text-white rounded-md hover:bg-[#c56b54] transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// import logo from '../assets/logo.png';
// import { HiMenu } from "react-icons/hi";
// import { useNavigate } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';
// import SearchBar from './searchbar';

// export default function Header(Props) {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const isHostPage = location.pathname === '/host';
//     const isAddListingPage = location.pathname === '/host/listing/create';
//     const isHomePage = location.pathname === '/';
//     const isHostProfilePage = location.pathname === '/host/profile';
//     const headerHeight = isHomePage ? 'h-40' : 'h-20';

//     const user = Props.user || null;

// // ✅ Prevent crash by logging safely
// console.log("User in Header:", user ? user.account_id : "no user yet");

// const handleHostClick = () => {
//   if (user && user.account_id) {
//     navigate('/host');
//   } else {
//     navigate('/login');
//   }
// };

//     let button;
//     switch (true) {
//         case isAddListingPage:
//             button = <button onClick={() => navigate('/host')}>Save and Exit</button>;
//             break;
//         case isHostPage:
//             button = <button onClick={() => navigate('/')}>Find a space</button>;
//             break;
//         case isHomePage:
//             button = <button onClick={handleHostClick}>Host a space</button>;
//     }

//     const orgName = Props.user?.organization?.name || '?';
//   const avatarLetter = orgName ? orgName.charAt(0).toUpperCase() : '?';

//     return (
//         <>
//             <div className={`sticky top-0 z-50 ${headerHeight} border-b border-gray-300 px-6 flex flex-col items-center justify-around bg-[#FBFBFB]`}>
//                 <div className='w-full flex items-center justify-between'>

//                     {/* Left Section: Logo */}

//                     <div className='flex items-center space-x-2 text-[#DE846A]'>
//                         <img src={logo} alt="Logo" className="h-8 w-auto" />
//                         {
//                             isAddListingPage ? '' : 
//                             <span 
//                             onClick={() => navigate('/')}
//                             style={{ cursor: 'pointer' }}
//                             >
//                                 OpenSantuary
//                             </span>
//                         }

//                     </div>

//                     {/* Host tabs  */}
//                     {
//                          (isHostPage || isHostProfilePage) &&
//                         <>
//                             <div className="text-[14px] font-medium leading-[18px] text-gray-500 flex gap-7">

//                                 <span onClick={() => Props.SetActiveTab('Requests')} className={`hover:text-[#222222]  pb-1 cursor-pointer ${Props.tab == 'Requests' ? 'border-b-2 border-[#DE846A] text-[#222222]' : ''
//                                     }`}>Requests</span>
//                                 <span onClick={() => Props.SetActiveTab('Listings')} className={`hover:text-[#222222]  pb-1 cursor-pointer ${Props.tab == 'Listings' ? 'border-b-2 border-[#DE846A] text-[#222222]' : ''
//                                     }`}>Listings</span>
//                             </div>
//                         </>
//                     }



//                     {/* Right Section: Host + Menu */}

//                     <div className='flex items-center space-x-5'>
//                         {
//                             button
//                         }

//                         {
//                             (isHostPage || isHostProfilePage) &&
//                             <>
//                                 <div onClick={() => Props.SetActiveTab('HostProfile')} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E19179] text-white cursor-pointer hover:bg-[#DE846A]">
//                                     <p className='text-[14px] font-normal leading-[20.02px] text-white"'>{avatarLetter}</p>
//                                 </div>
//                             </>
//                         }

//                         {
//                             !isAddListingPage && <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
//                                 <HiMenu className="text-2xl text-gray-700" />
//                             </div>
//                         }


//                     </div>
//                 </div>


//                 {/* Search Bar Section Appears only on home page*/}
//                 {isHomePage &&
//                     <>
//                         <SearchBar />
//                     </>}

//                 {/* UI items for Host page only */}


//             </div >
//         </>
//     )
// }