import { MouseEvent, useRef, useState } from "react";

interface SliderProps {
    className?: string;
    children: React.ReactNode;
}

export const Slider = ({ children, className }: SliderProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);

    const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);

        setStartX(e.clientX - (sliderRef.current?.offsetLeft ?? 0));
        setScrollLeft(sliderRef.current?.scrollLeft ?? 0);
    };

    const onMouseLeave = () => {
        setIsDragging(false);
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        e.preventDefault();

        const x = e.clientX - (sliderRef.current?.offsetLeft ?? 0);
        const walk = (x - startX) * 1.2;

        if (sliderRef.current) {
            sliderRef.current.scrollLeft = scrollLeft - walk;
        }
    };

    return (
        <div
            ref={sliderRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            className={`flex overflow-hidden cursor-grab active:cursor-grabbing ${className}`}
        >
            {children}
        </div>
    );
};
