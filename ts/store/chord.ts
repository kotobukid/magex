import Vuex from "vuex";
import {State} from "./chord_types";
import {Bar} from "../types";

const state: State = {
    patterns: [],
    current_pattern: 0
}

const chord_store = {
    namespaced: true,
    state,
    mutations: {
        append_tile(state: State, info: { bar: Bar }): void {
            if (state.patterns[state.current_pattern]) {
                state.patterns[state.current_pattern].items.push(info.bar);
            } else {
                state.patterns.push({
                    items: [info.bar]
                });
                state.current_pattern = state.patterns.length - 1;
            }
        }
    },
    getters: {
        patterns(state: State): {items: Bar[]}[] {
            return state.patterns;
        }
    }
};

export default chord_store;