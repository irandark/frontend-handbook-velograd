import { Bike, BookOpenText, Wrench } from "lucide-react";

export const categories = [
    {
        id: 1,
        title: "Велосипеды",
        icon: <Bike />,
        link: "/about",
    },
    {
        id: 2,
        title: "Аксы",
        icon: <Wrench />,
        link: "/accessories",
    },
    {
        id: 3,
        title: "Справочная информация",
        icon: <BookOpenText />,
        link: "/handbook",
    },
];
