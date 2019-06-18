<template>
    <div class="page-table scrollable">

        <h1 class="animated fadeInDown">Customers Table</h1>
        <customer_index></customer_index>

    </div>
</template>
<script>

    import customer_index from '@/components/customer/customer_index'

    export default {
        name: "Customers",
        data() {
            return {


            }
    },
        methods: {
            addClicked(){
                this.$router.push('customers/add');
            },
        },
        created(){


           this.token=this.$store.getters.token;



                },
        components: {


            customer_index

        }


    }

</script>

<style scoped>


</style>