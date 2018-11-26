<template>
  <form>
    <div class="field">
      <div class="control is-large">
        <input :class="{ 'hasError': $v.city.$error }" class="input is-large" v-model.trim="$v.city.$model"
        autocomplete="shipping locality" required type="text" placeholder="City" ref="city" autofocus>
        <div v-if="$v.city.$anyError">
          <p class="error" v-if="!$v.city.required">City is required.</p>
          <p class="error" v-if="!$v.city.minLength">City must have at 4 least letters.</p>
        </div>

      </div>
    </div>

    <div class="field">
      <div class="control is-large">
        <input :class="{ 'hasError': $v.country.$error }" class="input is-large" v-model.trim="$v.country.$model"
        autocomplete="shipping country" required type="text" placeholder="Country">
        <div v-if="$v.country.$anyError">
          <p class="error" v-if="!$v.country.required">Country is required.</p>
          <p class="error" v-if="!$v.country.minLength">City must have at 2 least letters.</p>
        </div>

      </div>
    </div>

    <button class="button is-block is-info is-large is-fullwidth" @click.prevent="emitLocationData">Get Weather</button>
  </form>
</template>

<script>
import { eventBus } from '../events.js';
import { required, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'Form',
  data () {
    return {
      city: '',
      country: ''
    };
  },
  validations: {
    city: {
      required,
      minLength: minLength(4)
    },
    country: {
      required,
      minLength: minLength(2)
    }
  },
  created () {
    let _this = this;
    eventBus.$on('ResetApp', function () {
      _this.city = '';
      _this.country = '';
      _this.$v.$reset();
      _this.$refs.city.focus();
    });
  },
  methods: {
    emitLocationData: function () {
      if (this.city.length === 0) {
        this.$v.city.$touch();
      }

      if (this.country.length === 0) {
        this.$v.country.$touch();
      }

      if (!this.$v.country.$anyError && !this.$v.city.$anyError) {
        this.$emit('locationData', { 'city': this.city, 'country': this.country });
      }
    }
  }
};

</script>

<style scoped>
  form .button:hover {
      background-color: rgb(45, 250, 52);
  }
</style>
