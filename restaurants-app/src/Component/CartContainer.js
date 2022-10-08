import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { RiRefreshFill } from "react-icons/ri";
import { BiMinus, BiPlus } from "react-icons/bi";
import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";
import { actionType } from "../Context/reducer";
import EmptyCart from "../img/emptyCart.svg";
import CardItems from "./CardItems";

function CartContainer() {
  const [{ user, cartShow, cartItem }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(()=>{
    let totalPrice = cartItem.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
    console.log(tot);
  }, [tot, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });

    localStorage.setItem("cartItems", JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        {/* **************************************************************
         Fix needed */}
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p
          whiletap={{ scale: 0.75 }}
          className="text-textColor text-lg font-semibold"
        >
          Cart
        </p>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex item-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md
           cursor-pointer text-textColor text-base"
           onClick={clearCart}
        >
          Clear <RiRefreshFill />{" "}
        </motion.p>
      </div>

      {/* bottom section */}
      {cartItem && cartItem.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* Cart item section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* cart item */}
            {cartItem &&
              cartItem.map((item) => 
              // <CardItem key={item.id} item={item} setFlag={setFlag} />
              <CardItems key={item.id} item={item} setFlag={setFlag} flag={flag} />
              )}
          </div>
          {/* cart total section */}
          <div
            className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly
        px-8 py-2"
          >
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub total</p>
              <p className="text-gray-400 text-lg">$ {tot}</p>
            </div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 2.5</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              {/* 2.5 is delivery charge */}
              <p className="text-gray-200 text-xl font-semibold"> $ {tot + 2.5} </p>
            </div>

            {user ? (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-orange-500 text-gray-50 text-lg my-2
                hover:shadow-lg "
              >
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-orange-500 text-gray-50 text-lg my-2
            hover:shadow-lg "
              >
                Login to checkout
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="The cart is empty" />
          <p className="text-xl text-textColor font-semibold ">
            Add Some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default CartContainer;
