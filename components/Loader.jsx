import React from "react";
import Image from "next/image";
import logo from "/public/club_logo.png";

export default function Loader() {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 ">
                <Image src={logo} alt="Loading..." width={100} height={100} className="object-contain rounded-full animate-spin" />
            </div>
        </div>
    );
}
