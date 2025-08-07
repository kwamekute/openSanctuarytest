import logo from '../assets/logo.png';
import { HiMenu } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import SearchBar from './searchbar';

export default function Header(Props) {
    const location = useLocation();
    const navigate = useNavigate();
    const isHostPage = location.pathname === '/host';
    const headerHeight = isHostPage ? 'h-20' : 'h-40';

    return (
        <>
            <div className={` ${headerHeight} border-b border-gray-300 px-6 flex flex-col items-center justify-around bg-[#FBFBFB]`}>
                <div className='w-full flex items-center justify-between'>

                    {/* Left Section: Logo */}

                    <div className='flex items-center space-x-2 text-[#DE846A]'>
                        <img src={logo} alt="Logo" className="h-8 w-auto" />
                        <span>OpenSantuary</span>
                    </div>

                    {/* Host tabs  */}
                    {
                        isHostPage &&
                        <>
                            <div className="text-[14px] font-medium leading-[18px] text-gray-500 flex gap-7">

                                <span onClick={() => Props.SetActiveTab('Requests')} className={`hover:text-[#222222]  pb-1 cursor-pointer ${Props.tab == 'Requests' ? 'border-b-2 border-[#DE846A] text-[#222222]' : ''
                                    }`}>Requests</span>
                                <span onClick={() => Props.SetActiveTab('Listings')} className={`hover:text-[#222222]  pb-1 cursor-pointer ${Props.tab == 'Listings' ? 'border-b-2 border-[#DE846A] text-[#222222]' : ''
                                    }`}>Listings</span>
                            </div>
                        </>
                    }



                    {/* Right Section: Host + Menu */}

                    <div className='flex items-center space-x-5'>
                        {
                            !isHostPage ? (
                                <button onClick={() => navigate('/host')}>Host a space</button>
                            ) : <button onClick={() => navigate('/')}>Find a space</button>
                        }
                        {
                            isHostPage &&
                            <>
                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#DE846A] text-white">
                                    <p className='text-[14px] font-normal leading-[20.02px] text-white"'>K</p>
                                </div>
                            </>
                        }


                        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                            <HiMenu className="text-2xl text-gray-700" />
                        </div>

                    </div>
                </div>


                {/* Search Bar Section Appears only on home page*/}
                {!isHostPage &&
                    <>
                        <SearchBar />
                    </>}

                {/* UI items for Host page only */}
                { }


            </div >
        </>
    )
}