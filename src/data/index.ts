import { Timelines } from "../type/Timelines";
import { chapter1Data } from "./chapter1";
import { chapter2Data } from "./chapter2";
import { chapter3Data } from "./chapter3";

export const chapterDatas: Timelines = {
    ...chapter1Data,
    ...chapter2Data,
    ...chapter3Data,
};
