import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const NavbarLink = ({ navItems }) => {
  const location = useLocation(); // get current path

  return (
    <div className="hidden md:flex space-x-2">
      {navItems.map((item) => {
        const isActive = location.pathname === item.href; // check if active
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`relative px-3 py-2 font-medium transition-all duration-300 rounded-lg group
              ${isActive ? "text-indigo-600" : "text-gray-700"} 
              hover:text-indigo-600`}
          >
            <span className="relative z-10">{item.name}</span>

            {/* Animated underline */}
            <span
              className={`absolute left-0 bottom-0 h-1 rounded-full transition-all duration-300 
                ${
                  isActive
                    ? "w-full bg-indigo-600"
                    : "w-0 bg-indigo-500 group-hover:w-full"
                }`}
            ></span>

            {/* Optional subtle hover background */}
            <span className="absolute inset-0 rounded-lg bg-indigo-50 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavbarLink;
