"use client"

import Link from "next/link";

interface OptionProps {
    name: string,
    route: string,
    isActive: boolean
}
  
export default function LinkedButton({name, route, isActive}: OptionProps) {
    return (
      <Link key={name} href={`/${route}`}>
        {/* Oval Button */}
        <div className={`${isActive ? 'shadow-inset' : 'shadow-relief-16 hover:shadow-relief-12'} px-8 py-3 flex items-center justify-center rounded-3xl cursor-pointer transition ease-in-out duration-300`}>
          <div className="font-bold text-nm-dm-icons text-base uppercase">
              {name}
          </div>
        </div>
      </Link>
    )
  }