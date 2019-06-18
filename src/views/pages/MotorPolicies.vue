<template>
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown" style="padding-left: 450px">Motor Policies</h1>
        <div id="space"></div>
        <motor_policies_index></motor_policies_index>
    </div>
</template>

<script>
    import motor_policies_index from "../../components/motor_policies/motor_policy_index";

    export default {
        name: "MotorPolicies",
        data(){
            return {

            }
        },
        methods: {},
        components: {
            motor_policies_index,

        }
    }
</script>

<style scoped>

</style>