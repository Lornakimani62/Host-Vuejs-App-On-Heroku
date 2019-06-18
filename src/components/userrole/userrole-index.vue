<template>
    <div>
        <div class=" table-box card-base card-shadow--medium">
            <el-table :data="tableData" height="475" width="100%">

                <el-table-column
                        prop="user_role_id"
                        sortable
                        label="ID"
                        width="60"
                ></el-table-column>

                <el-table-column
                        prop="username"
                        sortable
                        label="Username"
                        width="250"
                ></el-table-column>
                <el-table-column
                        prop="role_name"
                        label="Role"
                        width="200"></el-table-column>
                <el-table-column
                        prop="added_by"
                        label="Added by"
                        width="250"></el-table-column>
                <el-table-column
                        prop="added_on"
                        label="Added on"
                        width="230"></el-table-column>

                <el-table-column fixed="right" label="Operations" width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" slot="reference" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userrole-index",
        data(){
            return {
                tableData: [],
                token:'',
                form:{},
                url: ''
            }
        },
        methods:{
            getRole(){
                let url = this.url + '/userroles';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.tableData=response.data.data;


                });
            },
            handleDelete(index, row) {

                let url = this.url + '/userroles/' + row.user_role_id;
                this.axios.delete(url , {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response)=> {
                    this.message=response.data.message;
                    this.delete();
                    this.tableData.splice(index,1);
                    this.getRole();
                });
            },
            handleEdit(index,row){
                this.form=row;
                this.id=this.form.user_role_id
                this.$router.push('/userroles/edit/'+this.id);
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
            this.url=this.$store.getters.url;
            this.getRole();
        }
    }


</script>

<style scoped>
    .table-box{
    }
    .card-base{
    }
</style>