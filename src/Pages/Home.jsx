import React, { useEffect, useState } from 'react'
import { useProducts } from '../contexts/ProductsContext'
import SkeletonGrid from '../components/Skeletons/SkeletonGrid'
import Hero from '../components/Hero/Hero'
import Section from '../components/Section/Section'
import Card from '../components/Card/Card'
import MainBtn from '../components/MainBtn/MainBtn'
import Title from '../components/Title/Title'
import Testimonials from '../components/Testimonials/Testimonials'
import { Link } from 'react-router-dom'

export default function Home() {
    const [firstEightproducts,setFirstEightProducts]= useState([]);
    const [categories,setCategories] = useState([]);
    const [topRated,setTopRated] = useState([]);
    const [topSelling,setTopSelling] = useState([]);
    const { products, loading } = useProducts();
    useEffect(() => {
        const firsteightProducts = products.slice(-4);
        setFirstEightProducts(firsteightProducts);
    }, [products]);

    useEffect(()=>{
        const categories = async () => {
            const res = await fetch('https://fakestoreapi.com/products/categories')
            const data = await res.json()
            setCategories(data)
        }
        categories()
    },[]);
    useEffect(() => {
        const sortedData = [...products].sort((a, b) => b.rating.rate - a.rating.rate);
        const topRatedProducts = sortedData.filter((p) => p.rating.rate > 4);
        const topFour = topRatedProducts.slice(0, 4);
        setTopRated(topFour);
    }, [products]);

    useEffect(() => {
        const sortedData = [...products].sort((a, b) => b.rating.count - a.rating.count);
        const topFour = sortedData.slice(0, 4);
        setTopSelling(topFour);
    }, [products]);



    const info = [
        {
            num:'200+',
            desc:'International Brands'
        },
        {
            num:'2,000+',
            desc:'High-Quality Products'
        },
        {
            num:'30,000+',
            desc:'Happy Customers'
        },
    ]
    return (
        <>
            <Hero
            title={'FIND CLOTHES THAT MATCHES YOUR STYLE'}
            subTitle={'Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.'}
            info={info}
            />
            <Section style={'lg:px-17.5 px-10 bg-black py-[24px]'}>
                <div className=" flex justify-between ">
                    <img className='lg:h-6.75 h-2.5' src="/assets/img/versace.png" alt="versace" />
                    <img className='lg:h-6.75 h-2.5' src="/assets/img/zara.png" alt="zara" />
                    <img className='lg:h-6.75 h-2.5' src="/assets/img/gucci.png" alt="gucci" />
                    <img className='lg:h-6.75 h-2.5' src="/assets/img/prada.png" alt="prada" />
                    <img className='lg:h-6.75 h-2.5' src="/assets/img/calvinKlin.png" alt="calvinKlin" />
                </div>
                
            </Section>
            <Section style={'lg:px-17.5 px-10 py-[70px] flex flex-col items-center border-b border-gray-300'}>
                <Title title={'NEW ARRIVALS'} style={'lg:mb-[24px] mb-[16px]'}/>
                {loading ? (
                  <SkeletonGrid count={8} className='mb-12' />
                ) : (
                  <>
                    <div className='mb-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                      {firstEightproducts.map((pro) => (
                        <Card link={pro} key={pro.id}/>
                      ))}
                    </div>
                    <Link to={'/shop'} className='w-max'>
                      <MainBtn style={'px-[24px] mb-4 text-[14px]'} btn={'View All Products'}/>
                    </Link>
                  </>
                )}
            </Section>
            <Section style={'lg:px-17.5 px-10 py-[70px] flex flex-col items-center border-b border-gray-300'}>
                <Title title={'TOP RATED PRODUCTS'} style={'lg:mb-[24px] mb-[16px]'}/>
                {loading ? (
                  <SkeletonGrid count={4} className='mb-12' />
                ) : (
                  <>
                    <div className='mb-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                      {topRated.map((top) => (
                        <Card link={top} key={top.id}/>
                      ))}
                    </div>
                    <Link to={'/shop'} className='w-max'>
                      <MainBtn style={'px-[24px] mb-4 text-[14px]'} btn={'View All Products'}/>
                    </Link>
                  </>
                )}
            </Section>
            <Section style={'lg:px-17.5 px-10 py-[70px] flex flex-col items-center border-b border-gray-300'}>
                <Title title={'TOP SELLING PRODUCTS'} style={'lg:mb-[24px] mb-[16px]'}/>
                {loading ? (
                  <SkeletonGrid count={4} className='mb-12' />
                ) : (
                  <>
                    <div className='mb-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                      {topSelling.map((top) => (
                        <Card link={top} key={top.id}/>
                      ))}
                    </div>
                    <Link to={'/shop'} className='w-max'>
                      <MainBtn style={'px-[24px] mb-4 text-[14px]'} btn={'View All Products'}/>
                    </Link>
                  </>
                )}
            </Section>
            <Section style={'lg:px-17.5 px-10 pt-[30px] pb-[40px] bg-black flex flex-col items-center'}>
                <h2 className='text-[18px] font-bold text-white mb-10'>
                    Shop By Category
                </h2>
                <div className="lg:flex grid grid-cols-2 lg:gap-2.5 justify-items-center gap-6 lg:flex-wrap">
                    {categories.map((cat) => {
                        return(
                            <div className=" w-max" key={cat.id}>
                                <Link to={`/shop/${cat}`} className='lg:px-4 mb-1.5 px-3 text-[14px] py-2 font-semibold rounded-full bg-white border border-white hover:bg-transparent hover:text-white transition-all duration-300'>
                                    {cat}
                                </Link>
                            </div>
                        )
                    })}
                </div>
            </Section>
            <Section style={'lg:px-17.5 px-10 lg:py-[70px] pt-[40px] pb-[60px] flex flex-col items-center'}>
                <Title title={'OUR HAPPY CUSTOMERS'} style={'lg:mb-[24px] mb-[16px]'}/>
                <Testimonials />
            </Section>
        </>
    )
}
