import { Link } from "react-router-dom";
import MainBtn from "../MainBtn/MainBtn";

export default function Hero({title,subTitle,info}) {
    return (
        <div className='hero bg-bottom  bg-no-repeat lg:h-[calc(100vh-35px)] h-max'>
            <img src="/assets/img/her.jpg" alt="" className="hidden lg:block h-full w-full -z-1 relative" />
            <div className=" lg:absolute lg:top-51 lg:left-25 lg:w-144.25 p-10">
            <h1 className="font-title mb-4 leading-10 w-full lg:w-100 font-extrabold lg:text-[40px] text-[24px]">
                {title}
            </h1>
            <p className="font-subTitle lg:mb-4 mb-2 font-extralight text-[#929292] lg:text-[18px] text-[16px]">
                {subTitle}
            </p>
            <Link to={'/shop'}>
                <MainBtn style={'lg:px-[24px] px-[14px] py-[8px] text-[13px] mb-4 lg:text-[14px]'} btn={'Shop Now'}/>
            </Link>
            <div className="flex flex-wrap items-center gap-3 ">
                {
                    info.map((i,index) => {
                        return(
                            <div key={index} className="flex flex-col border-r border-r-[#b4b4b4] mb-4 pr-4 nth-last-[1]:border-none">
                                <h2 className="lg:text-[24px] text-[16px] font-medium">
                                    {i.num}
                                </h2>
                                <p className="text-[#929292] lg:text-[18px] text-[14px] font-light">
                                    {i.desc}
                                </p>
                            </div>
                        )
                    })
                }
            </div>
            </div>
        </div>
    )
}
