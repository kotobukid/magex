<template lang="pug">
    .melody_generator
        piano-roll(:cells="cells" @cells-changed="cells_changed")
        form
            table
                colgroup
                    col(style="width: 100px;")
                    col(style="width: 100px;")
                tbody
                    tr
                        th Config
                        td
                            select(v-model="config")
                                option(value="basic_rnn") basic_rnn
                                option(value="attention_rnn") attention_rnn
                                option(value="lookback_rnn") lookback_rnn
                    tr
                        th Bars
                        td
                            select(v-model="bars")
                                option(:value="32") 2
                                option(:value="64") 4
                                option(:value="128") 8
                                option(:value="256") 16
                    tr
                        td(colspan="2")
                            input(
                                type="submit"
                                value="generate"
                                style="margin-left: 102px;"
                                @click.prevent="generate"
                                :disabled="prevent_double_submit"
                            )
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PianoRoll from './piano_roll.vue';
import {Cell} from "../types";
import _ from "lodash";
import axios, {AxiosResponse} from 'axios';

@Component({
    components: {
        'piano-roll': PianoRoll,
    },
})
export default class App extends Vue {
    config: string = 'basic_rnn';
    bars: number = 32;
    cells: Cell[] = [] // 16
    prevent_double_submit: boolean = false;

    cells_changed(cells: Cell[]): void {
        this.cells = cells;
    }

    dump_cells(): number[] {
        const all_cells: number[] = [-2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2, -2,] // 16
        const cells: Cell[] = _.sortBy(this.cells, 'col');

        _.each(cells, (c: Cell) => {
            all_cells[c.col] = c.row;
            for (let i = 1; i < c.note_length; i++) {
                if (c.col + i < 16) {
                    all_cells[c.col + i] = -1;
                }
            }
        });
        return all_cells;
    }

    generate(): void {
        if (this.prevent_double_submit) {
            return;
        }
        this.prevent_double_submit = true;
        const primer_melody = this.dump_cells();
        axios.post('/generate.json', {
            primer_melody,
            config: this.config,
            bars: this.bars
        }).then((res: AxiosResponse<{ success: boolean }>) => {
            this.prevent_double_submit = false;
            console.log(res.data.success);
        });
    }
}
</script>

<style lang="less">
</style>
