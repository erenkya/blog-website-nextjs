"use client";

import React, { useState, useRef, useEffect } from "react";

// Tüm menü için context oluştur
const DropdownContext = React.createContext();

export function DropdownMenu({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
            <div ref={menuRef} className="relative inline-block text-left">
                {children}
            </div>
        </DropdownContext.Provider>
    );
}

export function DropdownMenuTrigger({ children }) {
    const { setIsOpen } = React.useContext(DropdownContext);

    return <div onClick={() => setIsOpen((prev) => !prev)}>{children}</div>;
}

export function DropdownMenuContent({ children, align = "start" }) {
    const { isOpen } = React.useContext(DropdownContext);

    if (!isOpen) return null;

    const alignmentClass = align === "end" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0";

    return (
        <div
            className={`absolute z-50 mt-2 w-44 origin-top-right rounded-md bg-white dark:bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${alignmentClass}`}
        >
            <div className="py-1">{children}</div>
        </div>
    );
}

export function DropdownMenuItem({ children, onClick }) {
    const { setIsOpen } = React.useContext(DropdownContext);

    const handleClick = () => {
        onClick?.();
        setIsOpen(false);
    };

    return (
        <button
            onClick={handleClick}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
        >
            {children}
        </button>
    );
}
