<template>
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown">User role management</h1>
        <el-button  type="primary" v-on:click="addClicked" icon="el-icon-plus">Add New</el-button>
        <div id="space"></div>
        <userrole_type_index></userrole_type_index>

    </div>
</template>

<script>
    import Userrole_type_index from "../../components/userrole_type/userrole_type_index";

    export default {
        name: "Userrole_type",
        data(){
            return {

            }
        },
        methods: {
            addClicked(){

                this.$router.push('/userroletype/add');
            },
        },
        components: {
            Userrole_type_index
        }
    }
</script>
<style scoped>
    #space{
        padding-bottom: 10px;
    }
</style>