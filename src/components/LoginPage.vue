<template>
    <v-card 
        rounded
        class="mx-auto my-12 p-10"
        max-width="600"
    >
      <div class="container">
        <h3 class="align-center mt-8 ml-6">Please Login to continue</h3>
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
            <v-text-field
              v-model="password"
              outlined
              label="Password"
              required
            ></v-text-field>
          </v-row>
          <v-row>
            <v-checkbox
              v-model="rememberMe"
              label="Remember Me"
            ></v-checkbox>
          </v-row>
          <v-row>
            <v-btn
              class="mr-4"
              @click="submit"
            >
              Login
            </v-btn>
            <v-btn @click="clear">
              Login With Google
            </v-btn>
          </v-row>
          <v-row>
            <p class="text-muted mt-8" >If you are new, then please register <span style="color:blue;">
            <a @click="registerPage">here</a>
            </span> </p>
          </v-row>
        </v-container>
        
      </v-form>
    </v-card>
  </template>

<script>
import {postLogin} from "@/helpers/backend_helper"
  export default {
    name: "LoginPage",
    data: () => ({
      loading: false,
      selection: 1,
      email: "",
      password: "",
      rememberMe: false,
    }),

    methods: {
       async submit () {
        const response = await postLogin(this.email, this.password)
        localStorage.setItem('token', response.token);

        console.log(response)
      },
      clear () {
        this.email = ''
        this.password = ''
        this.rememberMe = false
      },

      registerPage(){
        this.$router.push("/register")
      }
    },



    // computed: {
    //   checkboxErrors () {
    //     const errors = []
    //     if (!this.$v.checkbox.$dirty) return errors
    //     !this.$v.checkbox.checked && errors.push('You must agree to continue!')
    //     return errors
    //   },
    //   selectErrors () {
    //     const errors = []
    //     if (!this.$v.select.$dirty) return errors
    //     !this.$v.select.required && errors.push('Item is required')
    //     return errors
    //   },
    //   nameErrors () {
    //     const errors = []
    //     if (!this.$v.name.$dirty) return errors
    //     !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
    //     !this.$v.name.required && errors.push('Name is required.')
    //     return errors
    //   },
    //   emailErrors () {
    //     const errors = []
    //     if (!this.$v.email.$dirty) return errors
    //     !this.$v.email.email && errors.push('Must be valid e-mail')
    //     !this.$v.email.required && errors.push('E-mail is required')
    //     return errors
    //   },
    // },
  }
</script>