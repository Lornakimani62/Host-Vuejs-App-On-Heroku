<template>
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown">Travel policies</h1>


        <travel_policy_index></travel_policy_index>
    </div>
</template>


<script>

    import Travel_policy_index from "../../components/travel_policies/travel_policies_index";
    export default {
        name: "Travel_policies",
        data(){
            return {

            }
        },
        methods: {

        },
        computed:{
           fun(){

               console.log(this.$store.getters.userRole);
           },
            created(){
                this.fun();
            }
        },
        components: {
            Travel_policy_index

        }
    }
</script>
<style scoped>
    #space{
        padding-bottom: 10px;
    }
</style>