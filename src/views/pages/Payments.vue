<template>
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown" style="padding-left: 450px">Payments</h1>
        <div id="space"></div>
       <payment_index></payment_index>
    </div>
</template>


<script>

    import Payment_index from "../../components/payments/payment_index";
    export default {
        name: "Payments",
        data(){
            return {

            }
        },
        methods: {

        },
        components: {
            Payment_index

        }
    }
</script>
<style scoped>

</style>