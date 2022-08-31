<template>
    <div class="home">
        <Publication />
    </div>
    <div class="endPage"></div>
</template>

<script>
import Publication from '@/components/Publication.vue'

export default {
    name: 'Home',
    components: {
        Publication
    }
}
</script>

<style scoped>
.endPage {
    height: 100px;
}
</style>
