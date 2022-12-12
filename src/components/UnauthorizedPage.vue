<template>
    <v-card class="mx-auto mt-10 px-4 py-4" max-width="500" max-height="600" elevation="4">
        <v-card-title >
            Unauthorized
        </v-card-title>
        <v-card-subtitle class="mt-1">
            You do you not enough permissions to access this page.
        </v-card-subtitle>
        <v-card-text>
            <div >
                For any questions, please contact us at <a :href="consts.DL">{{consts.DL_NAME}} (External)</a>
            </div >
        </v-card-text>
        <v-btn @click.stop="goToCalendar()" color="#6FA0D8" class="mx-4 my-2">
            Return to Home
        </v-btn>
    </v-card>
    
</template>

<script>

import consts from '../helpers/constants.js';

    export default {
        data: () => ({
            consts: consts,
        }),
        methods: {
            goToCalendar(){
                this.$router.push('/')
            }
        }
    }
</script>