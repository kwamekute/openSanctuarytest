import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


export default function SearchBar({ onResults }) {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!city.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/listing/filtered", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ city }),
      });

      const data = await response.json();
          console.log("Response:", data);

      if (data.success) {
         navigate("/host/filtered", { state: { listings: data.listings } });
       // onResults?.(data.listings);
      } else {
        console.error("Search failed:", data.message);
      }
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[70%] h-16 border border-gray-300 rounded-full mb-6 shadow-lg pl-8 pr-2 flex items-center justify-between">
      {/* City input */}
      <div className="flex flex-col">
        <label className="text-[12px] font-medium leading-4 text-[#222222]">
          Where
        </label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="text-[14px] font-normal leading-[18px] text-[#222222] focus:outline-none focus:ring-0 focus:border-none"
          placeholder="Search Church locations"
        />
      </div>

      {/* Date/Time fields (not used yet) */}
      <div className="border-l-2 border-grey-300 pl-4 flex flex-col">
        <label className="text-[12px] font-medium leading-4 text-[#222222]">
          Date & Time in
        </label>
        <input
          type="datetime-local"
          className="text-[14px] font-normal leading-[18px] text-[#222222] focus:outline-none focus:ring-0 focus:border-none"
        />
      </div>

      <div className="border-l-2 border-grey-300 pl-4 flex flex-col">
        <label className="text-[12px] font-medium leading-4 text-[#222222]">
          Date & Time out
        </label>
        <input
          type="datetime-local"
          className="text-[14px] font-normal leading-[18px] text-[#222222] focus:outline-none focus:ring-0 focus:border-none"
        />
      </div>

      {/* Capacity dropdown (not used yet) */}
      <div className="border-l-2 border-grey-300 pl-4 flex flex-col">
        <label className="text-[12px] font-medium leading-4 text-[#222222]">
          Capacity
        </label>
        <select
          className="appearance-none text-[14px] focus:outline-none focus:ring-0 focus:border-none"
          defaultValue=""
        >
          <option value="" disabled>
            Select a range
          </option>
          <option value="0-10">0 - 10</option>
          <option value="10-50">10 - 50</option>
          <option value="50-100">50 - 100</option>
          <option value="100+">100+</option>
        </select>
      </div>

      {/* Search button */}
      <button
        onClick={handleSearch}
        disabled={loading}
        className={`w-[48px] h-[48px] flex items-center justify-center rounded-full ${
          loading ? "bg-gray-400" : "bg-[#DE846A]"
        }`}
      >
        <FiSearch className="text-2xl text-white" />
      </button>
    </div>
  );
}

// import { FiSearch } from "react-icons/fi";

// export default function SearchBar() {


//     return (
//         <>
//             <div className='w-[70%] h-16 border border-gray-300 rounded-full mb-6 shadow-lg pl-8 pr-2 flex items-center justify-between'>
//                 <div className='flex flex-col'>
//                     <label className=" text-[12px] font-medium leading-4 text-[#222222]">Where</label>
//                     <input type="text" className="text-[14px] font-normal leading-[18px] text-[#222222]  focus:outline-none focus:ring-0 focus:border-none" placeholder='Search Church locations' />
//                 </div>
//                 <div className='border-l-2 border-grey-300 pl-4 flex flex-col '>
//                     <label className=" text-[12px] font-medium leading-4 text-[#222222]">Date & Time in</label>
//                     <input type="datetime-local" className="text-[14px] font-normal leading-[18px] text-[#222222]  focus:outline-none focus:ring-0 focus:border-none" placeholder='Select Date & time' />
//                 </div>
//                 <div className='border-l-2 border-grey-300 pl-4 flex flex-col'>
//                     <label className=" text-[12px] font-medium leading-4 text-[#222222]">Date & Time out</label>
//                     <input type="datetime-local" className="text-[14px] font-normal leading-[18px] text-[#222222]  focus:outline-none focus:ring-0 focus:border-none" placeholder='Search Date & time' />
//                 </div>
//                 <div className='border-l-2 border-grey-300 pl-4 flex flex-col'>
//                     <label className=" text-[12px] font-medium leading-4 text-[#222222]">Capacity</label>
//                     <select
//                         className="appearance-none  text-[14px]
//                             focus:outline-none focus:ring-0 focus:border-none"
//                         defaultValue=""
//                     >
//                         <option value="" disabled>Select a range</option>
//                         <option value="0-10">0 - 10</option>
//                         <option value="10-50">10 - 50</option>
//                         <option value="50-100">50 - 100</option>
//                         <option value="100+">100+</option>
//                     </select>
//                 </div>
//                 <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-[#DE846A]">
//                     <FiSearch className="text-2xl text-white" />
//                 </div>
//             </div>
//         </>
//     )
// }