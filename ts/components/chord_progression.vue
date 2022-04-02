<template lang="pug">
    .chord_progression
        .sidebar
            .config
                label
                    span キー:&nbsp;
                    select(v-model="current_key")
                        option(:value="60") C
                        option(:value="61") C♯/D♭
                        option(:value="62") D
                        option(:value="63") D♯/E♭
                        option(:value="64") E
                        option(:value="65") F
                        option(:value="66") F♯/G♭
                        option(:value="67") G
                        option(:value="68") G♯/A♭
                        option(:value="69") A
                        option(:value="70") A♯/B♭
                        option(:value="71") B
            .suggests
                chord-tile(v-for="b in bars_suggests" :bar="b" :current_key="current_key" :key="b.key_offset" @clicked="append_bar")
        .main
            chord-grid

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Bar, BarRelative} from "../types";
import _ from 'lodash';
import ChordTile from "./chord_tile.vue";
import ChordGrid from "./chord_grid.vue";


@Component({
    components: {
        'chord-tile': ChordTile,
        'chord-grid': ChordGrid
    }
})
export default class ChordProgression extends Vue {
    current_key: number = 60;

    bars_suggests: BarRelative[] = [
        {
            bar_length: 1,
            role: 'tonic',
            invert: 0,
            key_offset: 0
        },
        {
            bar_length: 1,
            role: 'subdominant',
            invert: 0,
            key_offset: 5
        },
        {
            bar_length: 1,
            role: 'dominant',
            invert: 0,
            key_offset: 7
        },
        {
            bar_length: 1,
            role: 'any',
            invert: 0,
            key_offset: 3
        },
    ];

    append_bar(info: { bar: Bar }): void {
        this.$store.commit('chord/append_tile', info);
    }

}

</script>

<style scoped lang="less">
.chord_progression {
    width: 1610px;
}

.sidebar {
    width: 410px;
    float: left;
}

.main {
    width: 1200px;
    float: left;
    background-color: #efefef;
}


.config {
    margin-bottom: 5px;
}

.suggests {
    width: 410px;
}
</style>