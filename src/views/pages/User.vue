<template>
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown" >User management</h1>
        <el-button  type="primary" v-on:click="addClicked" icon="el-icon-plus">Add New</el-button>
        <div id="space"></div>
        <user_index></user_index>
    </div>
</template>

<script>
    import User_index from "../../components/user/user_index";
    export default {
        name: "User",
        data(){
            return {

            }
        },
        methods: {
            addClicked(){
                this.$router.push('/user/add');
            },
        },
        components: {
            User_index
        }
    }
</script>
<style scoped>
    #space{
        padding-bottom: 10px;
    }
</style>