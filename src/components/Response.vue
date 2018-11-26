<template>
  <section class="is-info">
    <div class="container has-text-centered">
      <div class="column is-6 is-offset-3">
        <table class="table is-responsive">
          <tbody>
            <tr v-for="(value, key) in weatherData" v-bind:key=key>
              <td class="blue-text">{{ key }}</td>
              <td class="gray-text">{{ value }}</td>
            </tr>
          </tbody>
        </table>
        <button class="button is-block is-large is-fullwidth clear-btn blue-text"
        @click.prevent="emitResetApp">Clear</button>
      </div>
    </div>
  </section>
</template>

<script>
import { eventBus } from '../events.js';

export default {
  name: 'Response',
  props: {
    weatherData: {
      required: true
    }
  },
  data () {
    return {

    };
  },
  methods: {
    emitResetApp: function () {
      eventBus.$emit('ResetApp');
    }
  }
};
</script>

<style scoped>

  section {
    height: 100%;
  }

  .table {
    color: white;
    background: transparent;
    width: 100%;
  }

  .table tr {
    width: 100%;
  }

  .table td, .table th {
      border-bottom-color: rgb(130, 130, 130);
  }

  .clear-btn {
    background: transparent;
    border-color: #209cee;
    color:#209cee;
  }

  .button.is-hovered, .button:hover {
    border-color: #fd4747;
    color: #209cee;
  }
</style>
