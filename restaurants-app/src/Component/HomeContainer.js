import React from "react";
import BikeDelivery from "../img/delivery.png";
import HeroBg from "../img/heroBg.png";
import { heropData } from "../Utils/Data";

function HomeContainer() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-center gap-2 justify-center  bg-orange-100 px-4 py-1 rounded-full ">
          <p className="text-base text-orange-500 font-semibold ">
            Bike Delivery
          </p>
          <div className="w-8 h-8 rounded-full overflow-hidden drop-shadow-xl ">
            <img
              src={BikeDelivery}
              className="w-full h-full bg-white object-contain"
              alt="Bike Delivery"
            />
          </div>
        </div>
        <p className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor">
          The Fastest Delivery in{" "}
          <span className="text=[3rem] lg:text=[5rem] text-orange-600 ">
            Your City
          </span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
          soluta, unde, tempore quibusdam eveniet, quas suscipit similique optio
          vitae corrupti excepturi voluptatum veritatis explicabo sint culpa in
          earum. Accusamus, corporis.
        </p>

        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full
        px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100 md:w-auto"
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex item-center relative">
        <img
          src={HeroBg}
          className=" h-420 w-full lg:h-650 lg:w-auto ml-auto"
          alt="Hero-bg"
        />
        <div className="w-full h-full absolute flex items-center justify-center lg:px-32 top-0 left-0 py-4 gap-4 flex-wrap">
          { heropData && heropData.map(n =>( 
          <div key={n.id} className=" lg:w-190 p-4 bg-red-500 bg-cardOverlay backdrop-blur-md 
          rounded-3xl flex items-center justify-center flex-col drop-shadow-lg">
            <img src={n.imageSrc} alt="icecream-1" className="w-20 lg:w-40 -mt-10 lg:-mt-20" />
            <p className="text-base lg:text-xl font-semibold mt-2 text-textColor ">{n.name}</p>
            <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
              {n.desciption}
            </p>

            <p className="text-md font-semibold text-headingColor">
              <span className="text-md text-red-600">$</span> {n.price}
            </p>
          </div>))}
        </div>
      </div>
    </section>
  );
}

export default HomeContainer;
