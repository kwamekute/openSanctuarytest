import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";
export default function footer() {
    return (
        <>
            <div className="w-full h-16 border-t border-gray-300 flex items-center justify-between px-6 text-sm">

                {/* Left: Legal Links */}
                <div className="h-5 flex items-center space-x-2 text-sm">
                    <a href="#">© 2025 OpenSanctuary</a>
                    <span>•</span>
                    <a href="#">Terms</a>
                    <span>•</span>
                    <a href="#">Privacy</a>
                </div>

                {/* Right: Social Icons */}
                <div className="flex items-center space-x-4 text-lg">
                    <a href="#" className="hover:text-black"><FaInstagram /></a>
                    <a href="#" className="hover:text-black"><FaXTwitter /></a>
                    <a href="#" className="hover:text-black"><FaFacebookF /></a>
                </div>
            </div>
        </>
    )
}