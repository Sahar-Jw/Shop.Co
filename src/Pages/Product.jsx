import { Link, useParams } from "react-router-dom";
import Stars from "../components/Stars/Stars";
import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import MainBtn from "../components/MainBtn/MainBtn";
import { toast } from "react-toastify";
import { useCart } from "../contexts/CartContext";
import ProductSkeleton from "../components/Skeletons/ProductSkeleton";
import "react-toastify/dist/ReactToastify.css";

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { cart, setCart } = useCart();

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                setLoading(true);
                const res = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await res.json();
                setProduct(data);
            } catch (error) {
                console.error('Fetch error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProductById();
    }, [id]);

const handleAddToCart = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Please login to add to cart! Sign in at top right.", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }
        const itemToAdd = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.image,
            quantity: quantity
        };
        const existingItemIndex = cart.findIndex(item => item.id === itemToAdd.id);
        let newCart;
        if (existingItemIndex > -1) {
            newCart = cart.map((item, index) => 
                index === existingItemIndex 
                    ? { ...item, quantity: item.quantity + quantity } 
                    : item
            );
        } else {
            newCart = [...cart, itemToAdd];
        }
        setCart(newCart);
        toast.success(`Added ${quantity} ${product.title} to cart!`, {
            position: "top-right",
            autoClose: 3000,
        });
    };

    if (loading) {
        return <ProductSkeleton />;
    }

    if (!product || !product.id) {
        return <div className="px-17.5 py-10 flex items-center justify-center text-red-500">Product not found</div>;
    }

    return (
        <div className="lg:px-17.5 p-10 lg:py-20 flex flex-col lg:flex-row lg:gap-20 gap-3.5">
            <img src={product?.image} alt={product?.title}  className="lg:w-1/3 lg:h-100 w-50 h-50 p-10 m-auto rounded-2xl bg-gray"/>
            <div className=" lg:w-1/2">
                <h1 className="font-bold lg:text-[24px] text-[16px] lg:mb-4 mb-2">{product?.title}</h1>
                <div className="flex items-center gap-3 lg:mb-3 mb-2">
                    <Stars rate={product?.rating.rate} />
                    <small className="text-gray-500 text-[13px]">
                        {product?.rating.rate} / 5
                    </small>
                </div>
                <div className="flex gap-9 items-center lg:mb-5 mb-2">
                    <p className="font-semibold lg:text-[18px] text-[16px]">
                        $ {product?.price.toFixed(2)}
                    </p>
                    {product?.price < 50 ? (
                        <p className='text-red-500 bg-[#fab9b9] rounded-2xl px-3 py-1 text-[10px] font-semibold'>
                            On Sale
                        </p>
                    ) : null}
                </div>
                <p className="border-b border-gray-300 lg:mt-5 mt-3 mb-5 pb-5 text-[14px] lg:text-[16px]">
                    {product?.description}
                </p>
                <div className="flex gap-5 items-center">
                    <div className="rounded-full  lg:h-12 h-9 p-2.5 flex items-center gap-2 w-max border border-gray bg-gray">
                    <button onClick={() => { setQuantity((prev) => prev + 1)}} className="cursor-pointer">
                        <GoPlus />
                    </button>
                    <input 
                        readOnly
                        className="bg-transparent border-none w-12 text-center text-[14px] font-semibold focus:outline-none" 
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    />
                    <button onClick={() => { setQuantity((prev) => prev > 1 ? prev - 1 : 1)}} className="cursor-pointer">
                        <FiMinus />
                    </button>
                </div>
                <button className="w-full" onClick={handleAddToCart}>
                    <MainBtn style={' w-full text-[14px] '} btn={'Add to Cart'}></MainBtn>
                </button>
                </div>
                
            </div>
        </div>
    )
}
