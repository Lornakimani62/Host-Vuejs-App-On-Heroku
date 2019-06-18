<template>
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown" style="padding-left: 450px">Products</h1>
        <div id="space"></div>
        <products_index></products_index>
    </div>
</template>


<script>

    import Products_index from "../../components/products/products_index";
    export default {
        name: "Products",
        data(){
            return {

            }
        },
        methods: {

        },
        components: {
            Products_index

        }
    }
</script>
<style scoped>
    #space{
        padding-bottom: 10px;
    }
</style>