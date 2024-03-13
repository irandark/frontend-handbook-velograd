import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
}

export const Modal = ({ children, isOpen }: ModalProps) => {
    const [modalContainer] = useState(document.createElement("div"));

    useEffect(() => {
        document.body.appendChild(modalContainer);

        return () => {
            document.body.removeChild(modalContainer);
        };
    }, [modalContainer]);

    return (
        isOpen &&
        createPortal(
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-zinc-800 z-50">
                {children}
            </div>,
            modalContainer
        )
    );
};
