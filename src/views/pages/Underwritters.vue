<template>
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown" style="padding-left: 450px">Underwriters</h1>
        <div id="space"></div>
        <underwritters_index></underwritters_index>
    </div>
</template>


<script>

    import Underwritters_index from "../../components/underwritters/underwritters_index";
    export default {
        name: "Underwritters",
        data(){
            return {

            }
        },
        methods: {
            addClicked(){
                this.$router.push('/underwritters/add');
            },
        },
        components: {
            Underwritters_index
        }
    }
</script>
<style scoped>
    #space{
        padding-bottom: 10px;
    }
</style>