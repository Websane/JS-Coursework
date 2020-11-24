import {BACK_VIEW} from "./types";

export function backView(back, scrollPosition) {
        return {
                type: BACK_VIEW,
                back,
                scrollPosition,
        }
}