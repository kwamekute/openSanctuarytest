import { FaPlus } from "react-icons/fa6";
import property from '../../assets/property.png'
import { useNavigate } from "react-router-dom";


export default function HostListings() {

    const navigate = useNavigate();
    return (
        <>
            <div className="flex justify-between w-full h-20 py-5 px-16">
                <h1>Your Listings</h1>
                <div onClick={() => navigate('/host/listing/create')} className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                    <FaPlus className="text-md text-gray-700" />
                </div>
            </div>
            <div className=" w-full flex flex-col items-center justify-center gap-4">
                <img src={property} alt="property" className="h-[200px] rounded-[5%] py-12" />
                <p class="text-[16px] font-normal leading-[20px] text-[#222222] font-sans">
                    list your space on OpenSanctuary to start receiving reservation requests.
                </p>
                <button onClick={() => navigate('/host/listing/create')} className="bg-gray-200 hover:bg-gray-300">Create Listing</button>
            </div>
        </>
    )
}