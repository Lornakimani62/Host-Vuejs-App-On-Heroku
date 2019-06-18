<template>
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown" style="padding-left: 450px">Personal Accident Claims</h1>
        <div id="space"></div>
        <pa_claims_index></pa_claims_index>

    </div>
</template>


<script>

    import Pa_claims_index from "../../components/pa_claims/pa_claims_index";
    export default {
        name: "PA_Claims",
        data(){
            return {

            }
        },
        methods: {

        },
        components: {
            Pa_claims_index,


        }
    }
</script>
<style scoped>
    #space{
        padding-bottom: 10px;
    }
</style>