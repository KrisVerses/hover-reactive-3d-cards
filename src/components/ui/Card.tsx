// Step 1: Import Dependencies
// - Import React and useState from 'react'
//   - React is needed to create components
//   - useState is a hook that lets us track mouse position
// - Import motion from 'framer-motion'
//   - motion provides animated components
//   - We'll use it for smooth 3D rotations
'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Step 2: Define Types
// - Create a CardProps interface
//   - This defines what data our card needs
//   - title: string for the card's heading
//   - description: string for the card's text
//   - imageUrl: optional string for card image
interface CardProps {
    title: string;
    description: string;
    imageUrl?: string;
}

// Step 3: Create Card Component
// - Define the component using React.FC (Function Component)
//   - FC is TypeScript's way of typing React components
//   - Pass in our CardProps interface
//   - Destructure props to get title, description, and imageUrl
const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
    // Step 4: Mouse Position Tracking
    // - Use useState to create mousePosition state
    //   - Initialize with { x: 0, y: 0 }
    //   - This will store our rotation angles and mouse coordinates
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0,
        mouseX: 0,
        mouseY: 0
    });

    // Step 5: Mouse Event Handlers
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const cardPosition = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - cardPosition.left;
        const mouseY = e.clientY - cardPosition.top;

        // Calculate rotation angles (max 10 degrees)
        const rotateX = ((mouseY - cardPosition.height / 2) / cardPosition.height) * 10;
        const rotateY = ((mouseX - cardPosition.width / 2) / cardPosition.width) * 10;

        // Update state with both rotation angles and mouse coordinates
        setMousePosition({
            x: rotateX,
            y: rotateY,
            mouseX: mouseX,
            mouseY: mouseY
        });
    };

    // Reset rotation when mouse leaves card
    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0, mouseX: 0, mouseY: 0 });
    };

    return (
        // Layer 1: Outer Container
        // - Provides perspective for 3D effect
        // - Sets fixed dimensions
        // - Acts as the 3D space container
        <div
            className="relative w-[400px] h-[400px]"
            style={{ perspective: "1000px" }}
        >
            {/* Layer 2: 3D Transform Container */}
            {/* - Handles mouse events */}
            {/* - Applies 3D rotations */}
            {/* - Uses Framer Motion for smooth animations */}
            <motion.div
                className="relative w-full h-full cursor-pointer rounded-2xl"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{
                    rotateX: mousePosition.x,
                    rotateY: mousePosition.y,
                    // Add dynamic shadow based on rotation
                    boxShadow: `${mousePosition.y / 10}px ${mousePosition.x / 10}px 20px rgba(0, 0, 0, 0.2)`,
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,  // Controls how responsive the rotation is
                    damping: 20,      // Controls how quickly rotation settles
                }}
                style={{
                    transformStyle: "preserve-3d"
                }}
            >
                {/* Layer 3: Content Container */}
                {/* - Contains the actual card content */}
                {/* - Applies background and border styles */}
                {/* - Handles content layout */}
                <div className="relative w-full h-full bg-red-500 p-8 border border-gray-200 rounded-2xl">
                    {/* Cursor-following lighting effect */}
                    {/* This creates a spotlight effect that follows the mouse cursor */}
                    {/* - absolute positioning ensures it covers the entire card */}
                    {/* - inset-0 makes it stretch to all edges */}
                    {/* - pointer-events-none prevents it from interfering with mouse events */}
                    {/* - opacity-100 makes it fully visible */}
                    {/* - transition-opacity ensures smooth opacity changes */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-100 transition-opacity duration-300"
                        style={{
                            // radial-gradient creates a circular light effect
                            // - circle at ${mouseX}px ${mouseY}px positions the center at cursor
                            // - rgba(255,255,255,0.3) creates a white light at 30% opacity
                            // - transparent 70% fades out to transparent at 70% radius
                            background: `radial-gradient(circle at ${mousePosition.mouseX}px ${mousePosition.mouseY}px, rgba(255,255,255,0.3) 0%, transparent 70%)`,
                        }}
                    />

                    {/* Depth highlights */}
                    {/* This creates a dynamic gradient that shifts with card rotation */}
                    {/* - Creates a sense of depth by simulating light hitting the card */}
                    {/* - The angle changes based on the card's rotation */}
                    {/* - Helps reinforce the 3D effect */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-100 transition-opacity duration-300"
                        style={{
                            // linear-gradient creates a directional light effect
                            // - ${mousePosition.x * 10}deg rotates the gradient based on card tilt
                            // - rgba(255,255,255,0.2) creates a subtle white highlight at 20% opacity
                            // - transparent 100% fades out to transparent
                            background: `linear-gradient(${mousePosition.x * 10}deg, rgba(255,255,255,0.2) 0%, transparent 100%)`,
                        }}
                    />

                    {/* Card Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center h-full">
                        {/* Optional: Add entrance animation */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
                            <p className="text-gray-600 text-white">{description}</p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// Step 7: Export
// - Export the component as default
// - This allows importing in other files
export default Card;