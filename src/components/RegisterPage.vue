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
              v-model="username"
              outlined
              label="Username"
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
              submit
            </v-btn>
            <v-btn @click="clear">
              clear
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

  export default {
    name: "RegisterPage",
    data: () => ({
      loading: false,
      username: "",
      email: "",
      password: "",
      about: "",
      form: {}
    }),

    methods: {
      submit () {
        console.log(this.email, this.password)
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