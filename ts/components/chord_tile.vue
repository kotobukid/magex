<template lang="pug">
    .chord_tile(:data-role="bar.role" @click="tile_clicked")
        span.chord_name {{ chord_name }}
        br
        span.scale_key {{ bar_computed.scale_key }}
        //br
        //span.role {{ bar.role }}

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Bar, BarRelative} from "../types";
import _ from 'lodash';
import {chord_name} from "../music";

@Component
export default class ChordTile extends Vue {
    @Prop({default: 60})
    private current_key!: number;

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
    private bar!: BarRelative;

    tile_clicked(): void {
        this.$emit('clicked', {
            scale_key: this.bar_computed.scale_key
        });
    }

    get chord_name(): string {
        return chord_name(this.bar_computed);
    }

    get bar_computed(): Bar {
        return {
            bar_length: this.bar.bar_length,
            role: this.bar.role,
            invert: this.bar.invert,
            scale_key: this.current_key + this.bar.key_offset
        };
    }
}

</script>

<style scoped lang="less">
.chord_tile {
    border: 1px solid grey;
    border-radius: 5px;
    width: 120px;
    height: 45px;
    padding: 5px;
    margin-right: 5px;
    margin-bottom: 5px;

    &:active {
        position: relative;
        top: 1px;
        margin-bottom: 4px;
    }

    &:nth-child(3) {
        margin-right: 0;
    }

    float: left;

    &[data-role="tonic"] {
        background-color: lightblue;
    }

    &[data-role="subdominant"] {
        background-color: lightgrey;
    }

    &[data-role="dominant"] {
        background-color: grey;
    }

    &[data-role="continue"] {
        background-color: lightgreen;
    }

    &[data-role="any"] {
        background-color: white;
    }
}

.chord_name {
    font-weight: bolder;
}
</style>