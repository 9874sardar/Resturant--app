import React, { useState } from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";
import { useEffect } from "react";
import { useRef } from "react";
import NotFound from '../img/NotFound.svg';
import { actionType } from "../Context/reducer";

const RowContainer = ({ flag, data, scrollValue }) => {
  const [{ cartItem }, dispatch] = useStateValue();
  console.log("data", data);

  const rowContainer = useRef();

  const [items , setItems] = useState([]);

  const addToCart = () =>{
    dispatch({
      type : actionType.SET_CART_ITEMS,
      cartItem : items,
    });
    //for storing the cart items locally in the pc
    localStorage.setItem("cartItem", JSON.stringify(items));
  } 

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(()=>{
    addToCart();
  }, [items])

  return (
    <div
      ref={rowContainer}
      className={`w-full flex items-center gap-3 my-12 ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      { data &&
      data.length > 0 ?
        data.map((item) => (
          <div
            key={item.id}
            className="w-300 h-[225] min-w-[300px] my-12 md:w-340 hover:drop-shadow-lg bg-cardOverlay 
            rounded-lg p-2 backdrop-blur-lg flex flex-col items-center justify-between relative"
          >
            <div className="w-full flex items-center justify-between ">
              {/* <motion.img whileHover={{scale: 1.2}} src="https://firebasestorage.googleapis.com/v0/b/restaurantsapp-5c6e9.appspot.com/o/Images%2F1664469483664%20-%20f1.png?alt=media&token=df591347-58e1-4e93-9193-4483213ddffc"  */}
              <motion.div 
              whileHover={{ scale: 1.2 }}
              className="w-40 -mt-4 h-40 drop-shadow-2xl">
              <img
                className="w-full h-full object-contain"
                src={item?.imageURL}
                
              />
              </motion.div>
              <motion.div
                whiletap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md "
                onClick={()=>setItems([...cartItem, item])}
              >
                <MdShoppingBasket className="text-white" />
              </motion.div>
            </div>

            <div className="w-full flex flex-col items-end justify-end ">
              <p className="text-textColor font-semibold text-base md:text-lg ">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">{item?.calories}</p>
              <div className="flex item-center gap-8 ">
                <p className="text-lg text-headingColor font-semibold ">
                  <span className="text-sm text-red-500"></span>$ {item?.price}
                </p>
              </div>
              {/* WE CAN ADD RATING HERE AS WELL stars rating */}
            </div>
          </div>
        ))
          :
          <div className="w-full flex flex-col item-center justify-center"> 
          <img className="h-340"
          src={NotFound}
          />
          <p className="text-xl text-headingColor font-semibold my-2"> Items Not Available </p>
          </div>
      }
    </div>
  );
};

export default RowContainer;
