import { Timelines } from "../type/Timelines";
import { chapter1Data } from "./chapter1";
import { chapter2Data } from "./chapter2";
import { chapter3Data } from "./chapter3";
import { chapter4Data } from "./chapter4";
import { chapter5Data } from "./chapter5";

export const chapterDatas: Timelines = {
    ...chapter1Data,
    ...chapter2Data,
    ...chapter3Data,
    ...chapter4Data,
    ...chapter5Data,
};
