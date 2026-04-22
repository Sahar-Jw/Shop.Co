import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero/Hero'
import Section from '../components/Section/Section'
import Title from '../components/Title/Title'
import MainBtn from '../components/MainBtn/MainBtn'
import { IoMdCall, IoMdMail, IoMdPin } from 'react-icons/io'

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple client-side handling (simulate send)
        console.log('Contact form submitted:', formData);
        setStatus('Thank you! Your message has been sent. We\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus(''), 5000);
    };

    const info = [
        { icon: <IoMdMail />, text: 'hello@shop.co', desc: 'Send us an email' },
        { icon: <IoMdCall />, text: '+1 (555) 123-4567', desc: 'Call us anytime' },
        { icon: <IoMdPin />, text: '123 Fashion St, Style City', desc: 'Visit our store' },
    ];

    return (
        <>
            <Section style={'px-17.5 py-[70px]'}>
                <Title title={'Contact Information'} style={'mb-[40px] text-center'} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {info.map((item, index) => (
                        <div key={index} className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all duration-300">
                            <div className="text-[26px] mb-3">{item.icon}</div>
                            <h3 className="text-[16px] font-bold mb-2">{item.text}</h3>
                            <p className="text-gray-600 text-[14px]">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>
            <Section style={'px-17.5 py-[70px] bg-gray-50'}>
                <Title title={'Send us a Message'} style={'mb-[40px] text-center'} />
                <div className="max-w-2xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="Your name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-vertical"
                                placeholder="Tell us about your inquiry..."
                            ></textarea>
                        </div>
                        <MainBtn btn="Send Message" style={"px-4 w-full md:w-max mx-auto block"} />
                    </form>
                    {status && (
                        <div className="mt-8 p-6 bg-green-100 border border-green-400 text-green-700 rounded-xl text-center">
                            {status}
                        </div>
                    )}
                </div>
            </Section>
            <Section style={'px-17.5 py-[30px] flex flex-col items-center bg-black text-white'}>
                <p className="text-[16px] mb-4 text-center max-w-2xl">
                    Ready to shop? Check out our latest collection.
                </p>
                <Link to="/shop" className="w-max">
                    <MainBtn btn="START SHOPPING" style={"px-[32px] text-[13px] hover:text-white border border-white"} />
                </Link>
            </Section>
        </>
    )
}
