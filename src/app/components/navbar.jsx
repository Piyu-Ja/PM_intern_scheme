import Button from "./button";
import Link from "next/link";
import {Target} from "lucide-react";

export default function Navbar() {
  return (
    <>
      {/* Navbar Container */}
        <div
            className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ease-in-out
            bg-white backdrop-blur-sm border-b-2 border-gray-200/20 shadow-sm
            flex justify-between items-center-safe px-6 md:h-[8vh] h-[7vh]`}
        >
            {/* Logo */}
            <h1 className="md:text-[3vh] text-[2.5vh] text-gray-700 font-extrabold antialiased font-bebas">
            Code Ronin
            </h1>


            {/* CTA Button (Desktop) */}
            <div className="flex items-center  ">
            <Button text="Dashboard" type="button" className_="w-fit h-fit px-5 py-2 font-bold text-white border-amber-500 bg-orange-500"/>
            <Link href={"/"} className="text-amber-500 w-fit h-fit flex text-center font-bold mx-4"><Target/>Recommen.</Link>
            </div>

        
        </div>
      
    </>
  )
}
