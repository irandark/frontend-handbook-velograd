import {
    Bike,
    BookOpenText,
    FilePenLine,
    UserRound,
    Wrench,
} from "lucide-react";

export const dynamicCategories = [
    {
        id: 1,
        title: "Велосипеды",
        icon: <Bike />,
    },
    {
        id: 2,
        title: "Аксессуары",
        icon: <Wrench />,
    },
];

export const staticCategories = [
    {
        id: 1,
        title: "Справочная информация",
        icon: <BookOpenText />,
        link: "http://localhost:3001/handbook",
    },

    {
        id: 2,
        title: "Управление товарами",
        icon: <FilePenLine />,
        link: "http://localhost:3001/editing",
    },
    {
        id: 3,
        title: "Управление аккаунтами",
        icon: <UserRound />,
        link: "http://localhost:3001/accounts",
    },
];
