import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
    return (
        <>
            <div className='w-[70%] h-16 border border-gray-300 rounded-full mb-6 shadow-lg pl-8 pr-2 flex items-center justify-between'>
                <div className='flex flex-col'>
                    <label className=" text-[12px] font-medium leading-4 text-[#222222]">Where</label>
                    <input type="text" className="text-[14px] font-normal leading-[18px] text-[#222222]  focus:outline-none focus:ring-0 focus:border-none" placeholder='Search Church locations' />
                </div>
                <div className='border-l-2 border-grey-300 pl-4 flex flex-col '>
                    <label className=" text-[12px] font-medium leading-4 text-[#222222]">Date & Time in</label>
                    <input type="datetime-local" className="text-[14px] font-normal leading-[18px] text-[#222222]  focus:outline-none focus:ring-0 focus:border-none" placeholder='Select Date & time' />
                </div>
                <div className='border-l-2 border-grey-300 pl-4 flex flex-col'>
                    <label className=" text-[12px] font-medium leading-4 text-[#222222]">Date & Time out</label>
                    <input type="datetime-local" className="text-[14px] font-normal leading-[18px] text-[#222222]  focus:outline-none focus:ring-0 focus:border-none" placeholder='Search Date & time' />
                </div>
                <div className='border-l-2 border-grey-300 pl-4 flex flex-col'>
                    <label className=" text-[12px] font-medium leading-4 text-[#222222]">Capacity</label>
                    <select
                        className="appearance-none  text-[14px]
                            focus:outline-none focus:ring-0 focus:border-none"
                        defaultValue=""
                    >
                        <option value="" disabled>Select a range</option>
                        <option value="0-10">0 - 10</option>
                        <option value="10-50">10 - 50</option>
                        <option value="50-100">50 - 100</option>
                        <option value="100+">100+</option>
                    </select>
                </div>
                <div className="w-[48px] h-[48px] flex items-center justify-center rounded-full bg-[#DE846A]">
                    <FiSearch className="text-2xl text-white" />
                </div>
            </div>
        </>
    )
}