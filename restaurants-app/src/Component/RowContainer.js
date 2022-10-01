import React from "react";
import { MdShoppingBasket } from "react-icons/md";
import { motion } from "framer-motion";
import { useStateValue } from "../Context/StateProvider";

const RowContainer = ({ flag,data }) => {
    const [{foodItems}, dispatch] = useStateValue();
    console.log("data",data)
  return (
    <div
    // ref={RowContainer}
      className={`w-full flex items-center gap-3 my-12 ${
        flag ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap"
      }`}
    >
        { data && data.map((item) => (
        <div key={item.id} className="w-300 h-auto  my-12 md:w-340 hover:drop-shadow-lg bg-cardOverlay rounded-lg p-2 backdrop-blur-lg">
        <div className="w-full flex items-center justify-between ">
          {/* <motion.img whileHover={{scale: 1.2}} src="https://firebasestorage.googleapis.com/v0/b/restaurantsapp-5c6e9.appspot.com/o/Images%2F1664469483664%20-%20f1.png?alt=media&token=df591347-58e1-4e93-9193-4483213ddffc"  */}
          <motion.img whileHover={{scale: 1.2}} src={item.imageURL}
          className="w-40 -mt-4 drop-shadow-2xl"
          />
          <motion.div whileTap={{ scale: 0.75 }} className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md ">
                <MdShoppingBasket className="text-white" />
          </motion.div>
        </div>

        <div className="w-full flex flex-col items-end justify-end ">
            <p className="text-textColor font-semibold text-base md:text-lg ">Starwberry</p>
            <p className="mt-1 text-sm text-gray-500">45 calories</p>
            <div className="flex item-center gap-8 ">
                <p className="text-lg text-headingColor font-semibold ">
                    <span className="text-sm text-red-500"></span> 5.25
                </p>    


            </div>
            {/* WE CAN ADD RATING HERE AS WELL stars rating */}
        </div>
      </div>))}
      
    </div>
  );
};

export default RowContainer;
