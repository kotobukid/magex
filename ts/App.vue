<template lang="pug">
    .app
        .global_menu
            a(href="#" @click.prevent="application = 'melody_generator'" :class="is_content_active('melody_generator')") Melody
            .sep
            a(href="#" @click.prevent="application = 'chord_progression'" :class="is_content_active('chord_progression')") Chord Progression
        melody-generator(v-if="application === 'melody_generator'")
        chord-progression(v-if="application === 'chord_progression'")
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Cell} from "./types";
import _ from "lodash";
import axios, {AxiosResponse} from 'axios';
import MelodyGenerator from './components/melody_generator.vue';
import ChordProgression from "./components/chord_progression.vue";

@Component({
    components: {
        'melody-generator': MelodyGenerator,
        'chord-progression': ChordProgression
    },
})
export default class App extends Vue {
    application = 'melody_generator';

    get is_content_active(): Function {
        return (application: string): 'active' | '' => {
            return application === this.application ? 'active' : '';
        }
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

.global_menu {
    margin: 8px 0;

    a {
        text-decoration: none;
        color: blue;
        padding: 4px;
        font-size: 1rem;
        line-height: 1rem;

        &.active {
            border: 1px solid blue;
            background-color: lightblue;
        }

        &:hover {
            text-decoration: underline;
            color: green;
            background-color: lightblue;
        }
    }

    .sep {
        display: inline-block;
        margin: 0 3px;

        &:before {
            content: '|'
        }
    }
}
</style>
