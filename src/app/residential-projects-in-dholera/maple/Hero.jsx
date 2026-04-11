import Image from 'next/image'
import React from 'react'
import westwynEstate1 from "@/app/assets/residential/estate1.webp";
import westwynEstate1M from "@/app/assets/residential/estate1M.webp";

export default function Hero() {
  return (
    <>
        <Image
            src={westwynEstate1}
            alt="WestWyn Estate - Your Gateway to Smart Investment"
        />
    </>
  )
}