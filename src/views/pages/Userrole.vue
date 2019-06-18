<template>
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown" >User role management</h1>
        <el-button  type="primary" v-on:click="addClicked" icon="el-icon-plus">Add New</el-button>
        <div id="space"></div>
        <userrole_index></userrole_index>
    </div>
</template>

<script>
    import Userrole_index from "../../components/userrole/userrole-index";

    export default {
        name: "Userrole",
        data(){
            return {

            }
        },
        methods: {
            addClicked(){
                this.$router.push('/userroles/add');
            },
        },
        components: {
            Userrole_index
        }
    }
</script>
<style scoped>
    #space{
        padding-bottom: 10px;
    }
</style>