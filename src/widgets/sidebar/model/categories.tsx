import {
    Bike,
    BookOpenText,
    FilePenLine,
    UserRound,
    Wrench,
} from "lucide-react";

export const categories = [
    {
        id: 1,
        title: "Велосипеды",
        icon: <Bike />,
        link: "/bicycles",
    },
    {
        id: 2,
        title: "Аксессуары",
        icon: <Wrench />,
        link: "/accessories",
    },
    {
        id: 3,
        title: "Справочная информация",
        icon: <BookOpenText />,
        link: "/handbook",
    },

    {
        id: 4,
        title: "Управление товарами",
        icon: <FilePenLine />,
        link: "/editing",
    },
    {
        id: 5,
        title: "Управление аккаунтами",
        icon: <UserRound />,
        link: "/accounts",
    },
];
