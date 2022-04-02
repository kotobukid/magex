<template lang="pug">
    .chord_grid grid

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Bar} from "../types";
import _ from 'lodash';
import {chord_name} from "../music";


@Component
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
}

</script>

<style scoped lang="less">
.chord_grid {
    min-height: 400px;
}
</style>