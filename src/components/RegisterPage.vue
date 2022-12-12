<template>
    <v-card 
        rounded
        class="mx-auto my-12 p-10"
        max-width="600"
    >
      <div class="container">
        <h3 class="align-center mt-8 ml-6">Please Register to continue</h3>
      </div>
      <v-form class="mx-8 mt-4" v-model="form">
        <v-container>
          <v-row>
            <v-text-field
              v-model="name"
              outlined
              label="Name"
              required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="email"
              outlined
              label="Email"
              required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="password"
              outlined
              label="Password"
              required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-text-field
              v-model="about"
              outlined
              label="About"
              required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-btn
              class="mr-4"
              @click="submit"
            >
              Register
            </v-btn>
            <v-btn
              class="mr-4"
              @click="registerWithGoogle"
            >
              Register with Google
            </v-btn>
          </v-row>
          <v-row>
            <p class="text-muted mt-8" >If you are previously logged in, please login <span style="color:blue;">
            <a @click="loginPage">here</a>
            </span> </p>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
  </template>

<script>
  import {postRegister} from "@/helpers/backend_helper"

  export default {
    name: "RegisterPage",
    data: () => ({
      loading: false,
      name: "",
      email: "",
      password: "",
      about: "",
      form: {}
    }),

    methods: {
      async submit () {
        const payload = {
          "name": this.name,
          "email": this.email,
          "password": this.password,
          "about": this.about
        }
        const response = await postRegister(payload)
        console.log(response)
      },
      clear () {
        this.email = ''
        this.password = ''
        this.username = ''
        this.about = ''
      },

      loginPage(){
        this.$router.push("/login")
      }
    },
  }
</script>