import logo from '../assets/logo.png';

export default function Header() {
    return (
        <>
            <div className="h-40 border-b border-gray-300 px-6 flex flex-col items-center justify-around">
                <div >
                    <div className='flex items-center space-x-2 text-[#DE846A]'>
                        <img src={logo} alt="Logo" className="h-8 w-auto" />
                        <span>OpenSantuary</span>
                    </div>

                </div>
                <div className='w-[70%] h-10 border border-gray-300 rounded-full mb-6'></div>
            </div>
        </>
    )
}