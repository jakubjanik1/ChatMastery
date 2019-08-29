<template>
      <clip-loader 
            class="loader" 
            :loading="loading" 
            color="#2ca9f8"
            size="40px"
        />
</template>

<script>
import ClipLoader from 'vue-spinner/src/ClipLoader';

export default {
    name: 'LoadingCircle',
    components: {
        ClipLoader
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="scss" scoped>  
    .loader {
        position: absolute;
        top: calc(50% - 20px);
        left: calc(50% - 20px);
    }    
</style>
