<template lang="pug">
    .app
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
                                option(value="loopback_rnn") loopback_rnn
                    tr
                        th Bundle
                        td
                            select(v-model="bundle")
                                option(value="basic_rnn") basic_rnn
                                option(value="attention_rnn") attention_rnn
                                option(value="loopback_rnn") loopback_rnn
                                option(value="mono_rnn") mono_rnn
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
                            input(type="submit" value="generate" style="margin-left: 102px;" @click.prevent="generate")
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import PianoRoll from './components/piano_roll.vue';
import {Cell} from "./types";
import _ from "lodash";
import axios, {AxiosResponse} from 'axios';

@Component({
    components: {
        'piano-roll': PianoRoll,
    },
})
export default class App extends Vue {
    config: string = 'basic_rnn';
    bundle: string = 'basic_rnn';
    bars: number = 32;
    cells: Cell[] = [] // 16

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
        const primer_melody = this.dump_cells();
        axios.post('/generate.json', {
            primer_melody,
            config: this.config,
            bundle: this.bundle,
            bars: this.bars
        }).then((res: AxiosResponse<{ success: boolean }>) => {
            console.log(res.data.success);
        })
    }
}
</script>

<style lang="less">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
