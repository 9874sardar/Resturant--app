import React from "react";
import HomeContainer from "./HomeContainer";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import RowContainer from "./RowContainer";
import { useStateValue } from "../Context/StateProvider";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import MenuContainer from "./MenuContainer";

function MainContainer() {
  const [{ foodItems }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {}, [scrollValue]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center ">
      <HomeContainer />

      <section className="w-full my-6 ">
        <div className="w-full flex items-center justify-between">
          <p
            className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg
          before:content before:w-32 before:h-1 before:-bottom-2 before:left-0
          before:bg-gradient-to-tr from-orange-400 to-orange-600 transition-all ease-in-out duration-100 "
          >
            Our fresh & health fruits
          </p>
          <div className="hidden md:flex items-center">
            {/* //Two different buttons */}
            <motion.div
              whiletap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer
             hover:shadow-lg flex items-center justify-center "
              onClick={() => setScrollValue(-200)}
            >
              <MdChevronLeft className="text-lg text-white" />
            </motion.div>
            <motion.div
              whiletap={{ scale: 0.75 }}
              className="w-8 h-8 rounded-lg bg-orange-300 hover:bg-orange-500 cursor-pointer
             hover:shadow-lg flex items-center justify-center "
              onClick={() => setScrollValue(200)}
            >
              <MdChevronRight className="text-lg text-white" />
            </motion.div>
          </div>
        </div>
        <RowContainer
          scrollValue={scrollValue}
          flag={false}
          data={foodItems?.filter((n) => n.category === "fruits")}
        />
        {/* //if the value is true it will act as fruit section
        //if the value is false it will act as main menu section */}
      </section>

      <MenuContainer/>
    </div>
  );
}

export default MainContainer;
