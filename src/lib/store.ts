import { writable } from "svelte/store";

export const initBoard = writable([
  {
    id: 0,
    name: "Zod",
    colour: "rgb(215, 34, 21)",
    items: [{ id: "0-1", name: "Chelsea" }],
  },
  {
    id: 1,
    name: "Good",
    colour: "rgb(222, 122, 9)",
    items: [{ id: "1-1", name: "Tottenham" }],
  },
  {
    id: 2,
    name: "Mediocre",
    colour: "rgb(28, 164, 28)",
    items: [{ id: "2-1", name: "Arsenal" }],
  },
  {
    id: 3,
    name: "Terrible",
    colour: "rgb(57, 137, 223)",
    items: [{ id: "3-1", name: "Liverpool" }],
  },
]);
