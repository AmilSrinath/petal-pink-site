import { useCart } from "../ProductDetailPage/CartContext";
import ContactInfo from "./ContactInfo";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import { useState } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import logo from "../../shared/Logo/Logo";

// Define the types for the product and cart items
interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
}
interface CartItem {
    product: Product;
    quantity: number;
}

const CheckoutPage = () => {
    const [tabActive, setTabActive] = useState<"ContactInfo" | "ShippingAddress" | "PaymentMethod">("ContactInfo");
    const { cart, updateQuantity, removeFromCart } = useCart();

    const shippingEstimate = 5.00;
    const [validContactInfo, setValidContactInfo] = useState(false);
    const [validShippingAddress, setValidShippingAddress] = useState(false);
    const [validPaymentMethod, setValidPaymentMethod] = useState(false);

    const subtotal = cart.reduce((acc: number, item: CartItem) => acc + item.product.price * item.quantity, 0);
    const orderTotal = subtotal + shippingEstimate;

    const handleScrollToEl = (id: string) => {
        const element = document.getElementById(id);
        setTimeout(() => {
            element?.scrollIntoView({ behavior: "smooth" });
        }, 80);
    };

    const renderProduct = (item: CartItem, index: number) => {
        const { product, quantity } = item;
        const { image, price, name } = product;
        const productSubtotal = price * quantity;

        return (
            <div key={index} className="relative flex py-7 first:pt-0 last:pb-0">
                <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <img src={image} alt={name} className="h-full w-full object-contain object-center" />
                </div>

                <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
                    <div>
                        <div className="flex justify-between">
                            <div className="flex-[1.5]">
                                <h3 className="text-base font-semibold">{name}</h3>
                                <div className="mt-1.5 sm:mt-2.5 flex text-xm text-slate-600 dark:text-slate-300">
                                    LKR {price}
                                </div>
                            </div>
                            <div className="hidden flex-1 sm:flex justify-end">
                                <div>LKR {productSubtotal}</div>
                            </div>
                        </div>
                        <div className="flex mt-auto pt-4 items-end justify-between text-sm">
                            <div className="hidden sm:flex text-center relative items-center">
                                {/* Decrease Quantity Button */}
                                <button
                                    className="px-2 py-1 border border-slate-200 dark:border-slate-700 rounded-md"
                                    onClick={() => updateQuantity(product.id, Math.max(1, quantity - 1))}  // Ensure it doesn't go below 1
                                >
                                    -
                                </button>
                                {/* Quantity Display */}
                                <span className="mx-2">{quantity}</span>
                                {/* Increase Quantity Button */}
                                <button
                                    className="px-2 py-1 border border-slate-200 dark:border-slate-700 rounded-md"
                                    onClick={() => updateQuantity(product.id, quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                            {/* Remove from Cart */}
                            <a
                                href="#"
                                className="relative z-10 flex items-center mt-3 font-medium text-primary-6000 hover:text-primary-500 text-sm"
                                onClick={() => removeFromCart(product.id)}
                            >
                                <span>Remove</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderLeft = () => {
        return (
            <div className="space-y-8">
                <div id="ContactInfo" className="scroll-mt-24">
                    <ContactInfo
                        isActive={tabActive === "ContactInfo"}
                        onOpenActive={() => {
                            setTabActive("ContactInfo");
                            handleScrollToEl("ContactInfo");
                        }}
                        onCloseActive={() => {
                            setTabActive("ShippingAddress");
                            handleScrollToEl("ShippingAddress");
                        }}
                        setValidContactInfo={setValidContactInfo}
                    />
                </div>

                <div id="ShippingAddress" className="scroll-mt-24">
                    <ShippingAddress
                        isActive={tabActive === "ShippingAddress"}
                        onOpenActive={() => {
                            setTabActive("ShippingAddress");
                            handleScrollToEl("ShippingAddress");
                        }}
                        onCloseActive={() => {
                            setTabActive("PaymentMethod");
                            handleScrollToEl("PaymentMethod");
                        }}
                        setValidShippingAddress={setValidShippingAddress}
                    />
                </div>

                <div id="PaymentMethod" className="scroll-mt-24">
                    <PaymentMethod
                        isActive={tabActive === "PaymentMethod"}
                        onOpenActive={() => {
                            setTabActive("PaymentMethod");
                            handleScrollToEl("PaymentMethod");
                        }}
                        onCloseActive={() => setTabActive("PaymentMethod")}
                        setValidPaymentMethod={setValidPaymentMethod}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className="nc-CheckoutPage">
            <main className="container py-16 lg:pb-28 lg:pt-20">
                <div className="mb-16">
                    <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">Checkout</h2>
                </div>

                <div className="flex flex-col lg:flex-row">
                    <div className="flex-1">{renderLeft()}</div>

                    <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16"></div>

                    <div className="w-full lg:w-[36%]">
                        <h3 className="text-lg font-semibold">Order summary</h3>
                        <div className="mt-8 divide-y divide-slate-200/70 dark:divide-slate-700">
                            {cart.map(renderProduct)}
                        </div>

                        <div className="mt-10 pt-6 text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200/70 dark:border-slate-700">
                            <div className="mt-4 flex justify-between py-2.5">
                                <span>Subtotal</span>
                                <span className="font-semibold text-slate-900 dark:text-slate-200">{`${subtotal.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between py-2.5">
                                <span>Shipping estimate</span>
                                <span className="font-semibold text-slate-900 dark:text-slate-200">{`${shippingEstimate.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between font-semibold text-slate-900 dark:text-slate-200 text-base pt-4">
                                <span>Order total</span>
                                <span>{`${orderTotal.toFixed(2)}`}</span>
                            </div>
                        </div>
                        <ButtonPrimary
                            href="/"
                            className="mt-8 w-full"
                            disabled={!(validContactInfo && validShippingAddress && validPaymentMethod)}
                        >
                            Confirm order
                        </ButtonPrimary>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CheckoutPage;