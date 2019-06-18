<template>
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown" >Personal Accident Policies</h1>
        <div id="space"></div>
    </div>
</template>

<script>

    import PA_policies from "../../components/pa_policies/pa_policies_approved";
    export default {
        name: "PA_Policy",
        data(){
            return {

            }
        },
        methods: {



        },
        components: {
            PA_policies,

        }
    }
</script>
<style scoped>
    #space{
        padding-bottom: 10px;
    }
</style>