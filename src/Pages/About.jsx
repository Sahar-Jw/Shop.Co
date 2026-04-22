import React, { useState, useEffect } from 'react'
import Hero from '../components/Hero/Hero'
import Section from '../components/Section/Section'
import Title from '../components/Title/Title'
import Testimonials from '../components/Testimonials/Testimonials'
import MainBtn from '../components/MainBtn/MainBtn'
import { Link } from 'react-router-dom'

export default function About() {

    const storyInfo = [
        'Founded in 2020 with passion for fashion.',
        'Curated collection from 200+ global brands.',
        'Serving 30,000+ customers worldwide.',
        'Committed to quality, style, and satisfaction.'
    ];

    return (
        <>
            <Section style={'lg:px-17.5 px-10 lg:py-[70px] py-[50px] flex flex-col items-center justify-content border-b border-gray-300'}>
                <Title title={'OUR JOURNEY'} style={'lg:mb-[24px] mb-[20px]'} />
                <div className=" flex flex-col items-center space-y-3 lg:mb-12 mb-4">
                    {storyInfo.map((text, index) => (
                        <p key={index} className="lg:text-lg text-[14px] text-gray-700 leading-relaxed hover:scale-105 transition-transform duration-300">
                            {text}
                        </p>
                    ))}
                    <Link to={'/shop'} className="w-max block lg:mt-8 mt-4">
                        <MainBtn style={'px-[24px] lg:text-[14px] text-[13px]'} btn={'EXPLORE COLLECTION'} />
                    </Link>
                </div>
            </Section>
            <Section style={'lg:px-17.5 px-10 lg:py-[70px] py-[50px] flex flex-col items-center border-b border-gray-300'}>
                <Title title={'WHAT SETS US APART'} style={'lg:mb-[24px] mb-[20px]'} />
                <div className="grid grid-cols-1 md:grid-cols-3 lg:gap-12 gap-7 max-w-5xl w-full">
                    <div className="group p-8 hover:bg-gray-50 rounded-xl transition-all duration-300 hover:shadow-lg border border-gray-200 hover:scale-[1.02]">
                        <h3 className="lg:text-[20px] text-[16px] font-bold lg:mb-3 mb-2 text-gray-900">Premium Quality</h3>
                        <p className="text-gray-700 text-[14px] lg:text-[16px] leading-relaxed">Handpicked from trusted brands worldwide.</p>
                    </div>
                    <div className="group p-8 hover:bg-gray-50 rounded-xl transition-all duration-300 hover:shadow-lg border border-gray-200 hover:scale-[1.02]">
                        <h3 className="lg:text-[20px] text-[16px] font-bold lg:mb-3 mb-2 text-gray-900">Fast & Reliable</h3>
                        <p className="text-gray-700 text-[14px] lg:text-[16px] leading-relaxed">Express delivery to your door in days.</p>
                    </div>
                    <div className="group p-8 hover:bg-gray-50 rounded-xl transition-all duration-300 hover:shadow-lg border border-gray-200 hover:scale-[1.02]">
                        <h3 className="lg:text-[20px] text-[16px] font-bold lg:mb-3 mb-2 text-gray-900">Customer Love</h3>
                        <p className="text-gray-700 text-[14px] lg:text-[16px] leading-relaxed">24/7 support and hassle-free returns.</p>
                    </div>
                </div>
            </Section>
            <Section style={'lg:px-17.5 px-10 lg:py-[30px] py-[20px] flex flex-col items-center bg-black text-white'}>
                <p className={'lg:text-[20px] text-[16px] font-medium lg:mb-4 mb-2 text-center'} >
                    READY TO SHOP?
                </p>
                <div className="text-xl mb-2 max-w-3xl text-center">
                    <p className="lg:text-[16px] text-[14px] lg:mb-4 mb-2 text-center max-w-2xl">
                        Join thousands who trust SHOP.CO for their fashion needs. Style starts here.
                    </p>
                </div>
                <Link to={'/shop'} className="w-max">
                    <MainBtn style={'px-[32px] lg:text-[13px] text-[12px] hover:text-white border border-white'} btn={'START SHOPPING'} />
                </Link>
            </Section>
            <Section style={'lg:px-17.5 px-10 lg:py-[70px] py-[50px] flex flex-col items-center'}>
                <Title title={'OUR CUSTOMERS SPEAK'} />
                <Testimonials />
            </Section>
        </>
    )
}
