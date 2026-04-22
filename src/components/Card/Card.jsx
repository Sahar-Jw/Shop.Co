import React from 'react'
import Stars from '../Stars/Stars'
import { Link } from 'react-router-dom'

export default function Card({link}) {
    return (
        <Link to={`/product/${link.id}`}>
        <div className='lg:w-70 w-40 rounded-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer'>
            <img src={link.image} alt="" className='w-full mb-3 lg:h-70 h-40 bg-gray lg:p-15 p-6 rounded-2xl'/>
            <div>
                <h1 className='lg:text-[14px] text-[12px] font-bold mb-2'>
                    {link.title}
                </h1>
                <div className="flex flex-col lg:flex-row lg:gap-5 gap-0">
                        <p className='flex items-center gap-1'>
                            <Stars rate={link.rating.rate}/>
                            <small>
                                {link.rating.rate} / 5
                            </small>
                        </p>
                        <small className='text-[#1e1e1e] text-[12px] font-light'>
                                {link.rating.count} reviews
                            </small>
                    </div>
                        <p className='text-[#1e1e1e] text-[12px] font-light mb-2'>
                            {link.category}
                        </p>
                <div className="flex justify-between">
                    <p className='text-[#363636] text-[14px] font-semibold'>
                        ${link.price}
                    </p>
                    {link.price < 50 ? (
                        <p className='text-red-500 bg-[#fab9b9] rounded-2xl px-2 py-1 text-[10px] font-semibold'>
                            On Sale
                        </p>
                    ) : null}
                </div>
            </div>
        </div>
        </Link>
    )
}
