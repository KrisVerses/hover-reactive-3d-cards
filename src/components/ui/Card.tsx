// Step 1: Import Dependencies
// - Import React and useState from 'react'
//   - React is needed to create components
//   - useState is a hook that lets us track mouse position
// - Import motion from 'framer-motion'
//   - motion provides animated components
//   - We'll use it for smooth 3D rotations
'use client'

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

// Step 2: Define Types
// - Create a CardProps interface
//   - This defines what data our card needs
//   - title: string for the card's heading
//   - description: string for the card's text
//   - imageUrl: optional string for card image
//   - variant: optional string for card variant
//   - icon: optional React node for card icon
interface CardProps {
    title: string;
    description: string;
    imageUrl?: string;
    variant?: 'default' | 'accent' | 'dark';
    icon?: React.ReactNode;
}

// Step 3: Create Card Component
// - Define the component using React.FC (Function Component)
//   - FC is TypeScript's way of typing React components
//   - Pass in our CardProps interface
//   - Destructure props to get title, description, imageUrl, variant, and icon
const Card: React.FC<CardProps> = ({ title, description, imageUrl, variant = 'default', icon }) => {
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

    // Step 5: Scroll Animation Setup
    // - useRef creates a reference to the card's DOM element
    //   - This allows us to track the card's position in the viewport
    //   - The ref is attached to the outer container div
    const cardRef = useRef<HTMLDivElement>(null);

    // - useScroll hook from Framer Motion tracks scroll progress
    //   - target: cardRef tells it which element to track
    //   - offset: ["start end", "end start"] defines when to start/end tracking
    //     - "start end": starts when card's top reaches viewport bottom
    //     - "end start": ends when card's bottom reaches viewport top
    //   - scrollYProgress returns a value from 0 to 1
    //     - 0: card not yet in view
    //     - 1: card fully scrolled into view
    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end start"]
    });

    // Variant-specific configurations
    const variantConfigs = {
        default: {
            stiffness: 300,
            damping: 20,
            bgColor: 'bg-red-500',
            shadowColor: 'rgba(0, 0, 0, 0.2)'
        },
        accent: {
            stiffness: 400,
            damping: 15,
            bgColor: 'bg-blue-500',
            shadowColor: 'rgba(0, 0, 0, 0.3)'
        },
        dark: {
            stiffness: 250,
            damping: 25,
            bgColor: 'bg-gray-800',
            shadowColor: 'rgba(0, 0, 0, 0.4)'
        }
    };

    const config = variantConfigs[variant];

    // Step 6: Mouse Event Handlers
    // This function handles the 3D rotation when mouse moves over the card
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        // Get card's position and size in the viewport
        const cardPosition = e.currentTarget.getBoundingClientRect();

        // Calculate mouse position relative to card's top-left corner
        const mouseX = e.clientX - cardPosition.left;  // Distance from left edge of card
        const mouseY = e.clientY - cardPosition.top;   // Distance from top edge of card

        // Calculate rotation angles (max 10 degrees)
        // For X rotation (up/down):
        // - Subtract half height to center around middle
        // - Divide by height to get -0.5 to 0.5
        // - Multiply by 10 for final angle
        const rotateX = ((mouseY - cardPosition.height / 2) / cardPosition.height) * 10;

        // For Y rotation (left/right):
        // - Same calculation but using width
        const rotateY = ((mouseX - cardPosition.width / 2) / cardPosition.width) * 10;

        // Update state with new rotation angles
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
            ref={cardRef}
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
                    // Shadow calculation:
                    // - mousePosition.y/10: shadow moves up/down based on mouse
                    // - mousePosition.x/10: shadow moves left/right based on mouse
                    // - 20px: shadow blur amount
                    // - config.shadowColor: shadow color from variant config
                    boxShadow: `${mousePosition.y / 10}px ${mousePosition.x / 10}px 20px ${config.shadowColor}`,
                }}
                transition={{
                    type: "spring",
                    stiffness: config.stiffness,
                    damping: config.damping,
                }}
                style={{
                    transformStyle: "preserve-3d"
                }}
            >
                {/* Layer 3: Content Container */}
                {/* - Contains the actual card content */}
                {/* - Applies background and border styles */}
                {/* - Handles content layout */}
                <div className={`relative w-full h-full ${config.bgColor} p-8 border border-gray-200 rounded-2xl`}>
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

                    {/* Floating Icon with Parallax Effect */}
                    {icon && (
                        <motion.div
                            className="absolute top-4 right-4 w-12 h-12"
                            animate={{
                                y: mousePosition.x * 2, // Parallax movement
                                rotateZ: mousePosition.y * 2,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 15,
                            }}
                            style={{
                                zIndex: 20,
                            }}
                        >
                            {icon}
                        </motion.div>
                    )}

                    {/* Card Content with Scroll Animation */}
                    <motion.div
                        className="relative z-10 flex flex-col items-center justify-center h-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.5,
                                delay: scrollYProgress.get() * 0.5 // Stagger based on scroll position
                            }
                        }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
                        <p className="text-white">{description}</p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

// Step 7: Export
// - Export the component as default
// - This allows importing in other files
export default Card;