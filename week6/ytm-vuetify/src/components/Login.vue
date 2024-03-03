<template>
  <div>
    <v-img
        class="mx-auto my-6"
        max-width="228"
        src="data:image/png;base64,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"
    ></v-img>

    <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
        >
          Forgot login password?</a>
      </div>

      <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-card
          class="mb-12"
          color="surface-variant"
          variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
        </v-card-text>
      </v-card>

      <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
      >
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <a
            class="text-blue text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
        >
          Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    visible: false,
  }),
}
</script>