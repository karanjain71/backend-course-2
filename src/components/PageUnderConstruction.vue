<template>
    <v-card class="mx-auto mt-10 px-4 py-4" max-width="500" max-height="600" elevation="4">
        <v-card-title >
            Coming Soon...
        </v-card-title>
        <v-img
            src="../assets/images/underconstruction.jpg"
            height="400"
        ></v-img>
        <v-card-text>This will be worth the wait, we promise to come live soon.</v-card-text>
        <v-card-actions class="justify-center py-5">
            <v-btn @click.stop="gotoHome()" color="#6FA0D8">Back to Home</v-btn>
        </v-card-actions>
    </v-card>
    
</template>

<script>

    import consts from '../helpers/constants.js';

    export default {
        name: "PageUnderConstruction",
        data: () => ({
            consts: consts,
        }),
        methods: {
            gotoHome() {
                this.$router.push({ path: '/' });
            }
        }
    }
</script>