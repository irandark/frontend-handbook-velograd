import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    className: string;
}

export const Modal = ({ children, isOpen, className }: ModalProps) => {
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
            <div className={className}>{children}</div>,
            modalContainer
        )
    );
};
