import { useEffect } from "react";
import { Link } from "react-router-dom";
import MainBtn from "../components/MainBtn/MainBtn";
import { useCart } from "../contexts/CartContext";
import Title from "../components/Title/Title";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";

export default function Cart() {
    const { cart, updateCartItem, removeCartItem } = useCart(); 

    const removeItem = (id) => {
        removeCartItem(id);
    };

    const updateQuantity = (id, newQty) => {
        if (newQty < 1) return;
        updateCartItem(id, newQty);
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);

    if (cart.length === 0) {
        return (
            <div className="px-17.5 py-20 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link to="/shop">
                    <MainBtn btn="Continue Shopping" style="p-4" />
                </Link>
            </div>
        );
    }

    return (
        <div className="lg:px-17.5 px-10 lg:py-10 py-8">
            <Title title={'Your Cart'} style={'mb-8'}/>
            <div className="space-y-4 mb-8 flex flex-col lg:flex-row">
                {cart.map((item) => (
                    <div key={item.id} className="flex flex-col lg:flex-row w-full items-center gap-4 p-4 border rounded-lg">
                        <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
                        <div className="flex-1 text-center">
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-gray-500 ">${item.price.toFixed(2)}</p>
                        </div>
                        <div className="rounded-full  h-12 p-2.5 flex items-center gap-2 w-max border border-gray bg-gray">
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="cursor-pointer">
                                <GoPlus />
                            </button>
                            <input 
                                readOnly
                                className="bg-transparent border-none w-12 text-center text-[14px] font-semibold focus:outline-none" 
                                value={item.quantity}
                            />
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="cursor-pointer">
                                <FiMinus />
                            </button>
                        </div>
                        {/* <div className="flex items-center gap-2">
                            <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-8 h-8 border rounded flex items-center justify-center"
                            >
                                -
                            </button>
                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                            <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 border rounded flex items-center justify-center"
                            >
                                +
                            </button>
                        </div> */}
                        <p className="font-semibold lg:text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button 
                            onClick={() => removeItem(item.id)}
                            className="lg:w-max w-full py-3 px-3 rounded-full cursor-pointer bg-red-500 border border-red-500 hover:bg-transparent hover:text-red-500 text-white transition-all delay-100 ease-in"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            <div className="flex lg:w-75 justify-center items-center">
                <div className="text-right">
                    <p className="text-[18px] mb-3 font-semibold">Total: ${total}</p>
                    <MainBtn btn={`Checkout`} style={' px-6 text-[14px]'} />
                </div>
            </div>
            </div>
                <div className='flex justify-center items-center lg:justify-start'>
                    <Link to="/shop" className="lg:mr-4">
                        <MainBtn style={'p-4'} btn="Continue Shopping" />
                    </Link>
                </div>
        </div>
    );
}

