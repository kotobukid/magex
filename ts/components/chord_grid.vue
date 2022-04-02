<template lang="pug">
    .chord_grid
        .pattern(v-for="p in patterns")
            chord-tile-absolute(v-for="bar in p.items" :bar="bar")

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Bar} from "../types";
import _ from 'lodash';
import {chord_name} from "../music";
import ChordTileAbsolute from "./chord_tile_absolute.vue";


@Component({
    components: {
        'chord-tile-absolute': ChordTileAbsolute
    }
})
export default class ChordGrid extends Vue {
    @Prop({
        default: () => {
            return {
                bar_length: 1,
                role: 'any',
                invert: 0,
                scale_key: 60
            }
        }
    })
    private bar!: Bar;

    get chord_name(): string {
        return chord_name(this.bar);
    }

    get patterns(): any[] {
        return this.$store.getters['chord/patterns'];
    }
}

</script>

<style scoped lang="less">
.chord_grid {
    padding: 5px;
    min-height: 400px;
}
</style>