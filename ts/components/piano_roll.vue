<template lang="pug">
    svg.piano-roll(viewBox="0 0 480 400" width="480" height="400")
        text(x="10" y="20" @click="wipe_cells") wipe
        g(transform="translate(0, 750)")
            g(transform="matrix(1, 0, 0, -1.8, 0, 0)")
                g(v-for="row in rows" :data-row="row % 12")
                    rect.cell(v-for="col in cols" :x="col * CELL_W" :y="row * CELL_H" width="30" :height="CELL_H" @pointerdown="start_drawing(row, col)")
                g.active_cells
                    rect.active_cell(v-for="ac in active_cells" :width="CELL_W * ac.note_length - 5" :height="CELL_H" :x="ac.col * CELL_W" :y="ac.row * CELL_H" @click="reject_active(ac)")
                rect.event_catcher(
                    v-if="drawing"
                    @pointerup="commit_drawing"
                    @pointerleave="commit_drawing"
                    x="-10000" y="-10000" width="20000" height="20000" @pointermove="draw_move($event)"
                )
                rect.drawing(
                    v-if="drawing"
                    :x="drawing_start.col * CELL_W"
                    :y="drawing_start.row * CELL_H"
                    :width="drawing_start.note_length * CELL_W"
                    :height="CELL_H"
                )
                g.guide
                    line.octave_base(x1="0" x2="480" y1="0" y2="0")
                    line.octave_base(x1="0" x2="480" :y1="12 * CELL_H" :y2="12 * CELL_H")
                    line.octave_base(x1="0" x2="480" :y1="2 * 12 * CELL_H" :y2="2 * 12 * CELL_H")
                    line.octave_base(x1="0" x2="480" :y1="3 * 12 * CELL_H" :y2="3 * 12 * CELL_H")
                    line.octave_base(x1="0" x2="480" :y1="4 * 12 * CELL_H" :y2="4 * 12 * CELL_H")
                    line.octave_base(x1="0" x2="480" :y1="5 * 12 * CELL_H" :y2="5 * 12 * CELL_H")
                    line.octave_base(x1="0" x2="480" :y1="6 * 12 * CELL_H" :y2="6 * 12 * CELL_H")
                    line.octave_base(x1="0" x2="480" :y1="7 * 12 * CELL_H" :y2="7 * 12 * CELL_H")
                    line.bar(:x1="4 * CELL_W" :x2="4 * CELL_W" y1="225" y2="375")
                    line.bar(:x1="2 * 4 * CELL_W" :x2="2 * 4 * CELL_W" y1="225" y2="375")
                    line.bar(:x1="3 * 4 * CELL_W" :x2="3 * 4 * CELL_W" y1="225" y2="375")
                    line.bar(:x1="4 * 4 * CELL_W" :x2="4 * 4 * CELL_W" y1="225" y2="375")
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import _ from 'lodash';
import {Cell} from "../types";

const NUM_NAME = {
    '60': 'C5'
}

@Component
export default class PianoRoll extends Vue {
    @Prop({
        default: []
    }) private cells!: Cell[];

    rows: number[] = _.range(45, 75)
    cols: number[] = _.range(0, 16)

    CELL_W = 30;
    CELL_H = 5;

    drawing: boolean = false;
    drawing_start: Cell = {
        row: -1,
        col: -1,
        note_length: 1
    }

    start_drawing(row: number, col: number): void {
        this.drawing_start = {
            row, col,
            note_length: 1
        };
        this.drawing = true;
    }

    move_delta_x: number = 0;
    move_delta_y: number = 0;

    draw_move(e: PointerEvent): void {
        this.move_delta_x += e.movementX;
        this.move_delta_y += e.movementY;
        this.drawing_start.note_length = Math.max(1, Math.floor(this.move_delta_x / this.CELL_W));
    }

    commit_drawing(): void {
        this.drawing = false;
        this.make_active(
            this.drawing_start.col,
            this.drawing_start.row,
            Math.max(1, Math.floor(this.move_delta_x / this.CELL_W))
        );
        this.move_delta_x = 0;
        this.move_delta_y = 0;
    }

    make_active(col: number, row: number, note_length: number): void {
        this.active_cells.push({col, row, note_length});
    }

    get active_cells(): Cell[] {
        return this.cells;
    }

    set active_cells(value: Cell[]) {
        this.$emit('cells-changed', value);
    }

    reject_active(ac: Cell): void {
        this.active_cells = _.reject(this.active_cells, (c: Cell) => {
            return c.col === ac.col && c.row === ac.row;
        });
    }

    wipe_cells(): void {
        this.active_cells = [];
    }
}
</script>

<style scoped lang="less">
svg.piano-roll {
    width: 480px;
    height: 400px;
    border: 1px solid grey;
}

.cell {
    stroke: grey;
    stroke-width: 1px;
    fill: #9defd9;

    &:hover {
        fill: pink;
    }

    [data-row="1"] &, [data-row="3"] &, [data-row="6"] &, [data-row="8"] &, [data-row="10"] &, [data-row="13"] &, [data-row="15"] &, [data-row="17"] & {
        fill: #5ebb9f;

        &:hover {
            fill: pink;
        }
    }
}

.active_cell {
    fill: red;
    stroke: none;
    opacity: 0.5;

    &:hover {
        fill: pink;
        stroke: red;
    }
}

line.octave_base, line.bar {
    fill: none;
    stroke-width: 1px;
    stroke: black;
}

g.guide {
    pointer-events: none;
    user-select: none;
}

rect.drawing {
    fill: black;
    stroke: red;
    stroke-width: 1;
    pointer-events: none;
    user-select: none;
}

rect.event_catcher {
    fill: transparent;
}
</style>