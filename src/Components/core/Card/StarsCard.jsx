import React from 'react';
import { Card } from "flowbite-react";
import stars from "../../../assets/star-shape.png";

function StarsCard({children}) {
    return (
        <Card className="max-w-sm relative drop-shadow-sm">
            <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white z-10">
                Welcome back, Carlos! <span className="ml-2 text-3xl">👋</span>
            </h5>
            {children}
            <img className="pointer-events-none absolute inset-0 z-0" src={stars} alt="stars"/>
        </Card>
    );
}

export default StarsCard;