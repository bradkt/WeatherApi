<template>
  <section class="columns hero-body">
    <div class="column is-half is-offset-one-quarter has-text-centered">
      <div class="arrow-container top">
        <svg class="arrow-top">
          <polyline points="0,100 100,50 200,100" />
          Sorry, your browser does not support inline SVG.
        </svg>
      </div>
      <div class="arrow-container bottom">
        <svg class="arrow-bottom">
          <polyline points="0,100 100,50 200,100" />
          Sorry, your browser does not support inline SVG.
        </svg>
      </div>
      <p class="subtitle">{{ displayMessage }}</p>
    </div>
  </section>

</template>

<script>
export default {
  name: 'Placeholder',
  props: {
    requestHadError: {
      required: true,
      default: false
    }
  },
  data () {
    return {
      defaultMessage: 'Enter a location above to get started',
      errorMessage: 'Unable to make Request, Please verify the City and Country is Correct'
    };
  },
  computed: {
    displayMessage: function () {
      return (this.requestHadError ? this.errorMessage : this.defaultMessage);
    }
  }
};
</script>

<style scoped>

section {
  height: 100%;
}

.arrow-container {
  position: absolute;
  width: 100%;
  left: 5%;
}

.arrow-top {
  fill:none;
  stroke:white;
  stroke-width:3
}

.arrow-bottom {
  fill:none;
  stroke: gray;
  stroke-width:3
}

.top {
  bottom: 48%;
}

.bottom {
  bottom: 43%;
}

.subtitle {
  margin: 40px 0 0 0;
  color: white;
}

</style>
