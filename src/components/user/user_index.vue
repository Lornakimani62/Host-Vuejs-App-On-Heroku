<template>
    <div>
        <div class=" table-box card-base card-shadow--medium">
            <el-table :data="tableData" height="475" width="100%">

                <el-table-column
                        prop="id"
                        sortable
                        label="User ID"
                        width="100"
                ></el-table-column>

                <el-table-column
                        prop="fullname"
                        sortable
                        label="Full name"
                        width="170"
                ></el-table-column>
                <el-table-column
                        prop="username"
                        sortable
                        label="Username"
                        width="250">
                     </el-table-column>

                <el-table-column
                        prop="email"
                        label="E-mail"
                        width="210"></el-table-column>

                <el-table-column
                        prop="id_no"
                        label="ID No"
                        width="150"></el-table-column>

                <el-table-column
                        prop="mobile_no"
                        label="Mobile no"
                        width="150"></el-table-column>

                <el-table-column
                        prop="profileurl"
                        label="Profile url"
                        width="150"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "user_index",
        data(){
            return {
                tableData: [],
                token:'',
                form:{},
                url:'',

            }
        },
        methods:{


            getUser(){
                let url = this.authUrl + '/users';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.tableData=response.data.data;


                });
            },




            delete() {
                this.$notify({
                    title: 'Deleted',
                    message: 'Entry Deleted',
                    type: 'Success'
                });
            },
        },
        created(){
            this.token=this.$store.getters.token;
            this.authUrl=this.$store.getters.url;
            this.getUser();
        }
    }


</script>

<style scoped>
    .table-box{


    }
    .card-base{

    }
</style>