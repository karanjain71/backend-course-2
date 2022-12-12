<template>
    <v-card 
        rounded
        class="mx-auto my-12 p-10"
        max-width="600"
    >
      <div class="container">
        <h3 class="align-center mt-8 ml-6">Please enter your your to reset password</h3>
      </div>
      <v-form class="mx-8 mt-4">
        <v-container>
          <v-row>
            <v-text-field
              v-model="email"
              outlined
              label="Email"
              required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-btn
              class="mr-4 mb-8"
              @click="submit"
            >
              Forgot Password
            </v-btn>
        </v-row>
        </v-container>
        
      </v-form>
    </v-card>
  </template>

<script>
  import {postForgotPassword} from "@/helpers/backend_helper"
  export default {
    name: "ForgotPassword",
    data: () => ({
      email: "",
    }),

    methods: {
      async submit () {
        const payload = {
          "email": this.email
        }
        const response = await postForgotPassword(payload)
        console.log(response)
      },
    },
  }
</script>