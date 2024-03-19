export const SubmitButton = () => {
    return (
        <div className="flex flex-col">
            <button
                className="bg-gradient-to-r from-amber-700 to-amber-600 p-2 
                    rounded-xl hover:opacity-70 transition
                    cursor-pointer h-10 w-1/6 self-start ml-4"
                type="submit"
            >
                Создать товар
            </button>
        </div>
    );
};
