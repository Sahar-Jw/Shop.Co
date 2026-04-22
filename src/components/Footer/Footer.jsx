import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
    const linkIcons = [<FaTwitter />, <FaFacebookF />, <FaInstagram />, <FaGithub />];
    return (
        <footer className="lg:px-17.5 px-10 py-10 bg-gray mt-4">
            <div className="flex flex-col lg:flex-row justify-between border-b border-[#c7c5c5] pb-10 mb-10">
                <div className="lg:w-1/4 w-full mb-10 lg:mb-0">
                    <h1 className="lg:text-[34px] text-[24px] font-bold">
                        Shop.Co
                    </h1>
                    <p className="text-[14px] text-[#595959] font-light mt-2 mb-6">
                        We have clothes that suits your style and which you’re proud to wear. From women to men.
                    </p>
                    <div className="flex gap-3">
                        {
                            linkIcons.map((icon,index) => (
                                <p key={index} className="w-8 h-8 rounded-full bg-white border border-[#dfdede] flex items-center justify-center text-sm text-black hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">
                                    {icon}
                                </p>
                            ))
                        }
                    </div>
                </div>
                <div className="mb-5 lg:mb-0">
                    <h1 className="text-[16px] font-semibold " style={{ letterSpacing: '3px' }}>
                        COMPANY
                    </h1>
                    <ul className="mt-2 flex flex-col gap-1 text-[14px] font-light">
                        <a href="#" className="w-max">
                            <li className="cursor-pointer text-[#595959] hover:text-black transition-all duration-300">
                                About
                            </li>
                        </a>
                        <a href="#" className="w-max">
                            <li className="cursor-pointer text-[#595959] hover:text-black transition-all duration-300">
                                Features
                            </li>
                        </a>
                        <a href="#" className="w-max">
                            <li className="cursor-pointer text-[#595959] hover:text-black transition-all duration-300">
                                Works
                            </li>
                        </a>
                        <a href="#" className="w-max">
                            <li className="cursor-pointer text-[#595959] hover:text-black transition-all duration-300">
                                Career
                            </li>
                        </a>
                    </ul>
                </div>
                <div className="mb-5 lg:mb-0">
                    <h1 className="text-[16px] font-semibold " style={{ letterSpacing: '3px' }}>
                        HELP
                    </h1>
                    <ul className="mt-2 flex flex-col gap-1 text-[14px] font-light">
                        <a href="#" className="w-max">
                            <li className="cursor-pointer text-[#595959] hover:text-black transition-all duration-300">
                                Customer Support
                            </li>
                        </a>
                        <a href="#" className="w-max">
                            <li className="cursor-pointer text-[#595959] hover:text-black transition-all duration-300">
                                Delivery Details
                            </li>
                        </a>
                        <a href="#" className="w-max">
                            <li className="cursor-pointer text-[#595959] hover:text-black transition-all duration-300">
                                Terms & Conditions
                            </li>
                        </a>
                        <a href="#" className="w-max">
                            <li className="cursor-pointer text-[#595959] hover:text-black transition-all duration-300">
                                Privacy Policy
                            </li>
                        </a>
                    </ul>
                </div>
                <div className="mb-5 lg:mb-0">
                    <h1 className="text-[16px] font-semibold " style={{ letterSpacing: '3px' }}>
                        FAQ
                    </h1>
                    <ul className="mt-2 flex flex-col gap-1 text-[14px] font-light">
                        <a href="#" className="w-max">
                            <li className="cursor-pointer text-[#595959] hover:text-black transition-all duration-300">
                                Account
                            </li>
                        </a>
                        <a href="#" className="w-max">
                            <li className="cursor-pointer text-[#595959] hover:text-black transition-all duration-300">
                                Manage Deliveries
                            </li>
                        </a>
                        <a href="#" className="w-max">
                            <li className="cursor-pointer text-[#595959] hover:text-black transition-all duration-300">
                                Orders
                            </li>
                        </a>
                        <a href="#" className="w-max">
                            <li className="cursor-pointer text-[#595959] hover:text-black transition-all duration-300">
                                Payments
                            </li>
                        </a>
                    </ul>
                </div>
                <div className="">
                    <h1 className="text-[16px] font-semibold " style={{ letterSpacing: '3px' }}>
                        RESOURCES
                    </h1>
                    <ul className="mt-2 flex flex-col gap-1 text-[14px] font-light">
                        <a href="#" className="w-max">
                            <li className="cursor-pointer text-[#595959] hover:text-black transition-all duration-300">
                                Free eBooks
                            </li>
                        </a>
                        <a href="#" className="w-max">
                            <li className="cursor-pointer text-[#595959] hover:text-black transition-all duration-300">
                                Development Tutorial
                            </li>
                        </a>
                        <a href="#" className="w-max">
                            <li className="cursor-pointer text-[#595959] hover:text-black transition-all duration-300">
                                How To - Blog
                            </li>
                        </a>
                        <a href="#" className="w-max">
                            <li className="cursor-pointer text-[#595959] hover:text-black transition-all duration-300">
                                Youtube Playlist
                            </li>
                        </a>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-7 justify-between">
                <p className="text-[14px] text-[#595959]">
                    Shop.co © 2000-2023, All Rights Reserved  <span className="font-bold text-black">BY Sahar Jw</span> 
                </p>
                <div className="flex gap-4">
                    <a href="#" className="cursor-pointer">
                        <img src="/assets/img/visa.png" alt="Visa" />
                    </a>
                    <a href="#" className="cursor-pointer">
                        <img src="/assets/img/mastercard.png" alt="Mastercard" />
                    </a>
                    <a href="#" className="cursor-pointer">
                        <img src="/assets/img/paypal.png" alt="PayPal" />
                    </a>
                    <a href="#" className="cursor-pointer">
                        <img src="/assets/img/applepay.png" alt="Apple Pay" />
                    </a>
                    <a href="#" className="cursor-pointer">
                        <img src="/assets/img/gpay.png" alt="Google Pay" />
                    </a>
                </div>
            </div>
        </footer>
    )
}
