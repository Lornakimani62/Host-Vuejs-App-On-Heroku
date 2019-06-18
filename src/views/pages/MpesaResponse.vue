<template>
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown">M-pesa responses</h1>

        <div id="space"></div>
        <mpesaresponses_index></mpesaresponses_index>

    </div>
</template>


<script>

    import Mpesaresponses_index from "../../components/mpesa_responses/mpesaResponse_index";
    export default {
        name: "MpesaResponse",
        data(){
            return {

            }
        },
        methods: {

        },
        components: {
            Mpesaresponses_index
        }
    }
</script>
<style scoped>
    #space{
        padding-bottom: 10px;
    }
</style>
