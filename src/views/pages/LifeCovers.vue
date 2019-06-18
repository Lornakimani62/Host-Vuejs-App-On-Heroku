<template>
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown" style="padding-left: 450px">Life Covers</h1>
        <div id="space"></div>
        <life_covers_index></life_covers_index>
    </div>
</template>

<script>
    import Life_covers_index from '../../components/life_covers/life_cover_index'
    export default {
        name: "LifeCovers",
        data(){
            return {

            }
        },
        methods: {},
        components: {
            Life_covers_index,

        }
    }
</script>

<style scoped>

</style>