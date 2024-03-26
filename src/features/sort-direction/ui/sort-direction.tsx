import { Dispatch, SetStateAction } from "react";

interface SortDirectionProps {
    sortDirection: SortDirection;
    setSortDirection: Dispatch<SetStateAction<SortDirection>>;
}

export type SortDirection = "ASC" | "DESC";

export const SortDirection: React.FC<SortDirectionProps> = ({
    setSortDirection,
    sortDirection,
}) => {
    return (
        <div className="flex flex-col items-center">
            <label htmlFor="">Сортировка:</label>
            <select
                id="1"
                className="text-black w-44 rounded-md"
                onChange={(e) =>
                    setSortDirection(e.target.value as SortDirection)
                }
                value={sortDirection}
            >
                <option value="ASC">цена возрастание</option>
                <option value="DESC">цена убывание</option>
            </select>
        </div>
    );
};
