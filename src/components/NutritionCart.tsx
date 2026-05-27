import React, { useState } from "react";
import { ShoppingCart, Plus, Minus, X, Check, ShoppingBag, Sparkles, Receipt, Trash } from "lucide-react";
import { PRODUCTS_DATA, Product } from "../data";

interface CartItem {
  product: Product;
  quantity: number;
}

export default function NutritionCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [checkedOut, setCheckedOut] = useState(false);
  const [orderCode, setOrderCode] = useState("");

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const applyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.trim().toUpperCase() === "GROWTH10") {
      setAppliedCoupon("GROWTH10");
      setDiscountPercent(10);
      setCoupon("");
    } else if (coupon.trim().toUpperCase() === "TITAN20") {
      setAppliedCoupon("TITAN20");
      setDiscountPercent(20);
      setCoupon("");
    } else {
      alert("유효하지 않은 프로모션 코드입니다! (PROTIEN10, TITAN20 등을 시도해 보세요)");
    }
  };

  const handleCheckout = () => {
    setOrderCode(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
    setCheckedOut(true);
  };

  const resetCartAfterCheckout = () => {
    setCart([]);
    setAppliedCoupon("");
    setDiscountPercent(0);
    setCheckedOut(false);
    setIsOpen(false);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const shippingFee = subtotal > 50000 || subtotal === 0 ? 0 : 3000;
  const total = subtotal - discountAmount + shippingFee;

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative">
      
      {/* Mini floating cart tracker button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-10 right-10 z-40 bg-primary-gold hover:bg-white text-black p-4 inline-flex items-center gap-2 font-mono font-bold text-xs uppercase cursor-pointer border-2 border-black transition-all shadow-[0_4px_20px_rgba(255,215,0,0.4)]"
      >
        <ShoppingCart size={18} />
        <span>MY GEAR CART ({totalItemsCount})</span>
      </button>

      {/* Main shop grid section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTS_DATA.map((product) => (
          <div
            key={product.id}
            className="bg-[#0A0A0A] border border-surface-container-high p-6 flex flex-col justify-between transition-all duration-300 hover:border-primary-gold"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-[9px] bg-primary-gold/15 text-primary-gold px-2 py-0.5 uppercase tracking-wider font-bold">
                  {product.category}
                </span>
                <span className="font-mono text-xs text-primary-gold font-bold">
                  ₩{product.price.toLocaleString()}
                </span>
              </div>

              <h4 className="font-display font-black text-sm text-white uppercase tracking-tight mb-2">
                {product.name}
              </h4>
              <p className="font-sans text-xs text-gray-400 font-medium leading-relaxed mb-6">
                {product.details}
              </p>
            </div>

            <button
              onClick={() => addToCart(product)}
              className="w-full border border-primary-gold hover:bg-primary-gold hover:text-black hover:font-black text-primary-gold text-xs font-mono font-bold uppercase py-3.5 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Plus size={14} /> Add To Basket
            </button>
          </div>
        ))}
      </div>

      {/* Slide out Checkout side panel mockup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end font-sans">
          
          <div 
            className="w-full max-w-md bg-black border-l border-surface-container-high h-full flex flex-col relative"
            style={{ boxShadow: "-10px 0 30px rgba(0,0,0,0.5)" }}
          >
            
            {/* Header portion */}
            <div className="p-6 border-b border-surface-container-high flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-primary-gold" size={18} />
                <h4 className="font-display font-black text-lg text-white uppercase tracking-tighter">
                  TITAN SHOPPING BAG
                </h4>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* Stage checkout invoice display */}
            {checkedOut ? (
              <div className="flex-grow flex flex-col justify-between p-6">
                <div className="space-y-6 text-center py-10">
                  <Receipt size={64} className="text-primary-gold mx-auto animate-bounce animate-pulse" />
                  
                  <div className="space-y-1">
                    <h5 className="font-display font-black text-xl text-primary-gold uppercase">ORDER COMPLETED!</h5>
                    <p className="font-mono text-xs text-white uppercase tracking-widest font-bold">
                      ORDER ID: {orderCode}
                    </p>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed font-semibold px-4 pt-2">
                      하이퍼 보디빌딩 뉴트리션 주문이 접수되었습니다. 최상급 제품 상태를 유지하여 신속히 발송해 드리겠습니다.
                    </p>
                  </div>

                  {/* Summary receipt box */}
                  <div className="border border-surface-container-high bg-surface p-4 text-left space-y-2 font-mono text-xs">
                    <p className="flex justify-between text-gray-500">
                      <span>ORDER QUANTITY:</span>
                      <span className="text-white font-bold">{totalItemsCount} ITEM(S)</span>
                    </p>
                    <p className="flex justify-between text-gray-500">
                      <span>COUPON DISCOUNT:</span>
                      <span className="text-primary-gold font-bold">
                        {discountPercent > 0 ? `-${discountPercent}% (${appliedCoupon})` : "NONE"}
                      </span>
                    </p>
                    <div className="border-t border-surface-container-high pt-2 flex justify-between text-sm text-primary-gold font-black">
                      <span>TOTAL AMT:</span>
                      <span>₩{total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={resetCartAfterCheckout}
                  className="w-full bg-[#FFD700] hover:bg-white text-black font-mono font-bold uppercase py-4 text-xs transition-all cursor-pointer"
                >
                  RETURN TO ELITE PORTAL
                </button>
              </div>
            ) : (
              <div className="flex-grow flex flex-col justify-between overflow-hidden">
                
                {/* Cart scroll box */}
                <div className="flex-grow overflow-y-auto p-6 space-y-4">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 space-y-3">
                      <ShoppingBag size={40} className="opacity-30" />
                      <div>
                        <p className="font-mono text-xs uppercase text-gray-400 font-bold">BAG IS EMPTY</p>
                        <p className="font-sans text-[10px] mt-1 font-semibold">장바구니에 아이템을 채우고 시너지를 가동하세요.</p>
                      </div>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.product.id}
                        className="bg-surface p-4 border border-surface-container-high flex justify-between items-center"
                      >
                        <div className="text-left space-y-1">
                          <h5 className="font-display font-black text-xs text-white uppercase tracking-tight">
                            {item.product.name}
                          </h5>
                          <p className="font-mono text-[10px] text-primary-gold font-bold">
                            ₩{item.product.price.toLocaleString()}
                          </p>
                        </div>

                        {/* Quantity picker */}
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-surface-container-high p-1 bg-black">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="text-gray-400 hover:text-white p-1"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="font-mono text-xs text-white font-bold px-3">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="text-gray-400 hover:text-white p-1"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-gray-500 hover:text-red-500 p-1"
                          >
                            <Trash size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Lower billing area and coupon controller */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-surface-container-high bg-[#050505] space-y-4">
                    
                    {/* Enter coupon */}
                    <form onSubmit={applyPromoCode} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="PROMO CODE (e.g. TITAN20)"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        className="flex-grow bg-surface border border-surface-container-high text-xs px-3 py-2.5 text-white font-mono focus:outline-none focus:border-primary-gold uppercase placeholder:text-gray-600 font-bold"
                      />
                      <button
                        type="submit"
                        className="bg-primary-gold hover:bg-white text-black font-mono text-xs font-bold px-4 uppercase transition-all"
                      >
                        APPLY
                      </button>
                    </form>

                    {appliedCoupon && (
                      <p className="font-mono text-[10px] text-green-500 font-bold text-left">
                        COUPON APPLIED: {appliedCoupon} (-{discountPercent}%)
                      </p>
                    )}

                    {/* Numeric breakdown */}
                    <div className="space-y-2 border-t border-surface-container-high pt-3 font-mono text-xs">
                      <div className="flex justify-between text-gray-500">
                        <span>SUBTOTAL:</span>
                        <span className="text-white font-bold">₩{subtotal.toLocaleString()}</span>
                      </div>
                      
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-green-500">
                          <span>DISCOUNT:</span>
                          <span>-₩{discountAmount.toLocaleString()}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-gray-500">
                        <span>DELIVERY CHARGE:</span>
                        <span className="text-white font-bold">{shippingFee === 0 ? "FREE" : `₩${shippingFee.toLocaleString()}`}</span>
                      </div>

                      <div className="flex justify-between text-sm text-primary-gold font-black border-t border-surface-container-high pt-2">
                        <span>TOTAL AMOUNT:</span>
                        <span>₩{total.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full bg-[#FFD700] hover:bg-white text-black font-mono font-bold uppercase py-4.5 text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
                    >
                      <Check size={16} /> ORDER NOW
                    </button>
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
