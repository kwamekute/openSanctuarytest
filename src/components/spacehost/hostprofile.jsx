export default function HostProfile(Props){

     const orgName = Props.user?.organization?.name || 'Test Church';
     const avatarLetter = orgName ? orgName.charAt(0).toUpperCase() : '?';
    return(
        <>
        <div className="flex h-screen">

             {/* left panel */}
            <div className="w-[35%] py-10 px-16">
                <h1 className="pb-6">Profile</h1>
                <div className="pl-2 ml-6 h-[65px]  w-[220px] bg-[#F2F2F2] rounded-lg flex items-center gap-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#E19179] text-white cursor-pointer hover:bg-[#DE846A]">
                        <p className='text-[14px] font-normal leading-[20.02px] text-white"'>{avatarLetter}</p>
                    </div>
                    <p className="text-base font-medium leading-5 text-gray-900">About Us</p>
                </div>
            </div>

            {/* vertical line */}
            <div class="h-full w-px bg-gray-300"></div>  

            {/* Right Panel */}      
            <div className="w-[65%] py-10 px-16">
                <h1 className="pb-6">About Us</h1>
                <div className="flex flex-col gap-2 items-center justify-center pl-2 h-[230px]  w-[350px] rounded-lg flex items-center rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-[#E19179] text-white cursor-pointer hover:bg-[#DE846A]">
                        <p className='text-[38px] font-bold leading-[30.02px] text-white"'>{avatarLetter}</p>
                    </div>
                    <h1 className="text-gray-900">{orgName}</h1>
                    <p>Organisation/Host</p>
                </div>
            </div>
    </div>
        </>
    )
}