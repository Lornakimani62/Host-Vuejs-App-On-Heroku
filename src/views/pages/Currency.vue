<template>
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown" style="padding-left: 450px">Currency</h1>

        <div id="space"></div>
        <currency_index></currency_index>
    </div>
</template>


<script>

    import Currency_index from "../../components/currency/currency_index";
    export default {
        name: "Currency",
        data(){
             return {

             }
        },
        methods: {

        },
        components: {
            Currency_index,

             }
        }
</script>
<style scoped>

</style>