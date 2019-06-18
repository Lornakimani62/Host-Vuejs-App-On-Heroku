<template>
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown" style="padding-left: 450px">Motor Covers</h1>
        <div id="space"></div>
        <motor_covers_index></motor_covers_index>
    </div>
</template>

<script>
    import motor_covers_index from "../../components/motor_cover/motor_cover_index";

    export default {
        name: "MotorCovers",
        data(){
            return {

            }
        },
        methods: {},
        components: {
            motor_covers_index,

        }
    }
</script>

<style scoped>

</style>