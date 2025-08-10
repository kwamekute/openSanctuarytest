import property from '../assets/property.png'

export default function HomeListings() {
    return (
        <>
            <div className="w-full px-6">
                <div className="py-6">
                    <span className="text-[20px] font-semibold leading-6 text-[#222222]">Popular Spaces</span>
                </div>
                <div className="flex justify-between">
                    {[...Array(6)].map((_, i) => (
                        <>
                            <div key={i} className="h-[200px] w-[200px] border-red rounded-[5%]">
                                <img src={property} alt="property" className="h-auto w-auto rounded-[5%]" />
                                <p className="text-[14px] font-bold leading-[20.02px] text-[#222222]">
                                    Toronto
                                </p>
                                <p className="text-[14px] font-normal leading-[20.02px] text-[#222222]">
                                    West-Wing Spaces
                                </p>
                                <p className="text-[14px] font-normal leading-[20.02px] text-[#222222]">
                                    100 guests
                                </p>
                                <p className="text-[14px] font-normal leading-[20.02px] text-[#222222]">
                                    $20/hr
                                </p>
                            </div>

                        </>
                    ))}
                </div>


            </div>
        </>
    )
}