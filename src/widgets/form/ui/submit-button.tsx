interface SubmitButtonProps {
    title: string;
    className?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
    title,
    className,
}) => {
    return (
        <div className="flex flex-col">
            <button
                className={`bg-gradient-to-r from-amber-700 to-amber-600 p-2 
                    rounded-xl hover:opacity-70 transition
                    cursor-pointer h-10 w-fit self-start + ${className}`}
                type="submit"
            >
                {title}
            </button>
        </div>
    );
};
