import { createPortal } from "react-dom";
import { useModalStore } from "../model/store";
import { useEffect, useState } from "react";

export const Modal = ({ children }: React.PropsWithChildren) => {
    const [modalContainer] = useState(document.createElement("div"));
    const { isOpen } = useModalStore();

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
