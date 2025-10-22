'use client'


import { CartItemsType, ShippingFormInputs } from "@/types"
import { ArrowRight, Trash2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import Image from 'next/image';
import ShippingForm from "@/components/ShippingForm"
import PaymentForm from "@/components/PaymentForm"

const steps = [
    {
        id: 1,
        title: "Shopping Cart"
    },
    {
        id: 2,
        title: "Shipping Address"
    }
    , {
        id: 3,
        title: "Payment Details"
    }
]

const cartItems: CartItemsType = [
    {
        id: 1,
        name: "Adidas CoreFit T-Shirt",
        shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: 39.9,
        sizes: ["s", "m", "l", "xl", "xxl"],
        colors: ["gray", "purple", "green"],
        images: {
            gray: "/products/1g.png",
            purple: "/products/1p.png",
            green: "/products/1gr.png",
        },
        quantity: 1,
        selectedSize: 'm',
        selectedColor: 'gray'
    },
    {
        id: 2,
        name: "Puma Ultra Warm Zip",
        shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: 59.9,
        sizes: ["s", "m", "l", "xl"],
        colors: ["gray", "green"],
        images: { gray: "/products/2g.png", green: "/products/2gr.png" },
        quantity: 1,
        selectedSize: 'm',
        selectedColor: 'gray'
    },
    {
        id: 3,
        name: "Nike Dri Flex T-Shirt",
        shortDescription:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        description:
            "Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit. Lorem ipsum dolor sit amet consect adipisicing elit lorem ipsum dolor sit.",
        price: 29.9,
        sizes: ["s", "m", "l"],
        colors: ["white", "pink"],
        images: { white: "/products/4w.png", pink: "/products/4p.png" },
        quantity: 1,
        selectedSize: 'm',
        selectedColor: 'pink'
    }

]


const CartPage = () => {

    const searchParams = useSearchParams()
    const router = useRouter()
    const activeStep = parseInt(searchParams.get("step") || '1')
     const [shippingForm, setShippingForm] = useState<ShippingFormInputs>();
    return (
        <div className="flex flex-col gap-8 items-center mt-12">
            <h1 className="text-2xl font-medium">Your Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                {steps.map((step) => {
                    const isActive = step.id === activeStep;

                    return (
                        <div
                            key={step.id}
                            className={`flex items-center gap-2 pb-4 ${isActive ? 'border-b-2 border-gray-800' : ''
                                }`}
                        >
                            <div
                                className={`w-6 h-6 rounded-full text-white text-xs flex items-center justify-center ${isActive ? 'bg-gray-800' : 'bg-gray-200'
                                    }`}
                            >
                                {step.id}
                            </div>
                            <p
                                className={`text-sm font-medium ${isActive ? 'text-gray-800' : 'text-gray-500'
                                    }`}
                            >
                                {step.title}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="w-full flex-col flex lg:flex-row gap-16 ">
                {/* STEPS */}
                <div className=" w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8 ">
                    {activeStep === 1 ? (cartItems.map(item => (
                        // SINGLE CART ITEM
                        <div className=" flex items-center justify-between" key={item.id}>

                            {/* IMAGE AND DETAILS */}
                            <div className=" flex gap-8 ">
                                <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">

                                    {item.selectedColor && item.images[item.selectedColor] && (

                                        <Image
                                            src={item.images[item.selectedColor]}
                                            alt={item.name}
                                            fill
                                            className="object-contain"
                                        />
                                    )}

                                </div>
                                {/* ITEM DETAILS */}
                                <div className="flex flex-col justify-between">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-medium">{item.name}</p>
                                        <p className="text-xs text-gray-500">Quantity:{" "} {item.quantity}</p>
                                        <p className="text-xs text-gray-500">Size:{" "} {item.selectedSize}</p>
                                        <p className="text-xs text-gray-500">Color: {" "}{item.selectedColor}</p>
                                    </div>
                                    <p className="font-medium ">${item.price.toFixed(2)}</p>
                                </div>
                            </div>
                            {/* DELETE BUTTON */}
                            <button className="w-8 h-8 rounded-full bg-red-100 text-red-400 flex items-center justify-center cursor-pointer hover:bg-red-200 transition-all ">
                                <Trash2 className="w-3 h-3" />
                            </button>
                        </div>
                    ))) : activeStep === 2 ?   <ShippingForm setShippingForm={setShippingForm} /> : activeStep === 3 && shippingForm ? <PaymentForm /> : <p className="text-sm text-gray-500">Please fill in the shipping form to continue</p>}

                </div>

                {/* DETAILS */}
                <div className="w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">
                    <h2 className="font-semibold">Cart Details</h2>
                    <div className="flex flex-col gap-4 ">
                        <div className=" flex justify-between text-sm">
                            <p className=" text-gray-500"> Subtotal</p>
                            <p className=" font-medium">${cartItems.reduce((acc, item) =>
                                acc + item.price * item.quantity, 0
                            ).toFixed(2)}</p>

                        </div>
                        <div className=" flex justify-between text-sm">
                            <p className=" text-gray-500"> Discount(10%)</p>
                            <p className=" font-medium"> $10</p>

                        </div>
                        <div className=" flex justify-between text-sm">
                            <p className=" text-gray-500"> Shipping fee</p>
                            <p className=" font-medium"> $10</p>

                        </div>
                        <hr className="border-gray-200" />
                        <div className=" flex justify-between">
                            <p className=" text-gray-800 font-semibold">Total</p>
                            <p className=" font-medium">${cartItems.reduce((acc, item) =>
                                acc + item.price * item.quantity, 0
                            ).toFixed(2)}</p>
                        </div>
                    </div>
                    {activeStep === 1 && <button onClick={() => {
                        router.push(`/cart?step=2`, { scroll: false })
                    }} className="w-full bg-gray-800 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-900 transition-all">
                        Continue
                        <ArrowRight className="w-3 h-3" />
                    </button>}

                </div>
            </div>
        </div>
    );

}

export default CartPage