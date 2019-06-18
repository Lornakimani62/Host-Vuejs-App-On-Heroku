<template>
        <div class="page-table scrollable">
            <h1 class="animated fadeInDown" style="padding-left: 450px">Life Policies</h1>
            <div id="space"></div>
                <life_index></life_index>
                </div>
</template>

<script>
    import Life_index from "../../components/life_policies/life_policy_index";

    export default {
        name: "GroupLife",
        data(){
            return {

            }
        },
        methods: {



        },
        components: {
            Life_index,

        }
    }
</script>

<style scoped>

</style>