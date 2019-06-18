<template>
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown">Motor Benefits</h1>
        <div id="space"></div>
        <motor_benefits_index></motor_benefits_index>
    </div>
</template>

<script>
    import motor_benefits_index from "../../components/motor_benefits/motor_benefits_index";

    export default {
        name: "MotorBenefits",
        data(){
            return {

            }
        },
        methods: {},
        components: {
            motor_benefits_index,

        }
    }
</script>

<style scoped>

</style>