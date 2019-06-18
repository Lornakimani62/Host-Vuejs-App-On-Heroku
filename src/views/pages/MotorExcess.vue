<template>
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown" style="padding-left: 450px">Motor Excess</h1>
        <div id="space"></div>
        <motor_excess_index></motor_excess_index>
    </div>
</template>

<script>
    import motor_excess_index from "../../components/motor_excess/motor_excess_index";

    export default {
        name: "MotorExcesss",
        data(){
            return {

            }
        },
        methods: {},
        components: {
            motor_excess_index,

        }
    }
</script>

<style scoped>

</style>