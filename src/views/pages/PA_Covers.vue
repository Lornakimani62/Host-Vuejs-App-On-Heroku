<template>
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown" style="padding-left: 450px">Personal Accident Covers</h1>
        <div id="space"></div>
        <pa_covers></pa_covers>

    </div>
</template>


<script>

    import Pa_covers from "../../components/pa_covers/pa_covers_index";
    export default {
        name: "PA_Claims",
        data(){
            return {
            }
        },
        methods: {

        },
        components: {
            Pa_covers,


        }
    }
</script>
<style scoped>
    #space{
        padding-bottom: 10px;
    }
</style>