import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../Utils/Data";
import { motion } from "framer-motion"
import RowContainer from "./RowContainer";
import { useStateValue } from "../Context/StateProvider";

const MenuContainer = () => {
  const [filter, setFilter] = useState("chicken");

//   useEffect(() => {},[filter]);
//   const ChangeCategory =(e) =>{  
//   }

const [{ foodItems }, dispatch] = useStateValue();

  return (
    <section className="w-full my-6 " id="menu">
      <div className="w-full items-center justify-center">
        <p
          className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg
          before:content before:w-16 before:h-1 before:-bottom-2 before:left-0  
          before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 "
        >
          Our Hot Dishes
        </p>
        <div
          className="w-full flex items-center justify-start lg:justify-center gap-8
            py-6 overflow-x-scroll scrollbar-none "
        >
          {categories &&
            categories.map((category) => (
              <motion.div
              whileTap={{
                scale: 0.88
              }}
                key={category.id}
                className={`group ${filter === category.urlParamName ? "bg-red-500": "bg-card" } w-24 min-w-[94px] h-28 rounded-lg cursor-pointer
                drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-red-500
                `}
                // classname end values removed : duration-150 transition-all ease-in-out
                onClick={()=>setFilter(category.urlParamName)}
              >
                <div className={`w-10 h-10 rounded-full shadow-lg ${filter === category.urlParamName? "bg-white" : "bg-red-500"} 
                group-hover:bg-white flex items-center justify-center `}>

                  <IoFastFood className={`${filter === category.urlParamName ? "text-textColor" : "text-white"} 
                  group-hover:text-textColor text-lg`} />
                </div>
                <p className="text-sm text-textColor group-hover:text-white">
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>

        <div className="w-full">
              <RowContainer flag={false} data={foodItems?.filter((n) => n.category == filter)} />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
