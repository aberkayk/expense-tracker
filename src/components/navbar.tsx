"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { navbarItems } from "@/lib/constants";
import { ThemeSwitcher } from "./theme-switcher";

const Navbar = () => {
  return (
    <nav
      className={cn(
        "sticky bg-white top-0 z-50 hidden md:flex h-[60px] min-h-[60px] px-8 shadow-sm bg-background border-black/10"
      )}
    >
      <div className="h-full w-full xl:container items-center justify-between flex">
        <div className="flex gap-x-8 items-center">
          {navbarItems.map((item, index) => (
            <Link
              className={cn(
                "border-transparent py-[6px] text-base font-semibold capitalize hover:underline"
              )}
              href={item.href}
              key={index.toString()}
            >
              <p>{item.label}</p>
            </Link>
          ))}
        </div>
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;