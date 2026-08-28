"use client";

import { useEffect, useRef } from "react";
import MenuItem from "./MenuItem";

interface DropdownMenuProps {
    items: {
        name: string;
        callback: () => void;
        imagePath: string;
    }[];
    closeMenu: () => void;
}

export default function DropdownMenu(
    { items, closeMenu }: DropdownMenuProps
) {
    const menuRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function assertIsNode(e: EventTarget | null): asserts e is Node {
            if (!e || !("nodeType" in e)) {
                throw new Error("Node expected");
            }
        }
        function handleClickOutside({ target }: MouseEvent) {
            assertIsNode(target);
            if (menuRef.current && !menuRef.current.contains(target)) {
                closeMenu();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef, closeMenu])

    return <div data-testid="dropdownMenu" ref={menuRef} className="absolute right-0 top-0">
        <div className="w-32 p-2 flex flex-col gap-1.5 md:gap-3 md:text-2xl text-xl rounded-xl bg-gray-800">
            {
                items.map(item => 
                    <MenuItem 
                        key={item.name}
                        name={item.name}
                        imagePath={item.imagePath}
                        callback={item.callback}
                    />
                )
            }
        </div>
    </div>
}