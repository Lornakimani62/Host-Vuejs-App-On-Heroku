<template>
    <div>
        <div class=" table-box card-base card-shadow--medium">
            <el-table :data="tableData" height="475" width="100%">

                <el-table-column
                        prop="user_role_type_id"
                        sortable
                        label="ID"
                        width="60"
                ></el-table-column>

                <el-table-column
                        prop="role_name"
                        sortable
                        label="Role name"
                        width="250"

                ></el-table-column>
                <el-table-column
                        prop="added_by"
                        label="Added by"
                        width="200"></el-table-column>
                <el-table-column
                        prop="added_on"
                        label="Added on"
                        width="250"></el-table-column>
                        sortable
                <el-table-column label="Operations" width="180">

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
        name: "userrole_type_index",
        data(){
            return {
                tableData: [],
                token:'',
                form:{}
            }
        },
        methods:{
            getRoleType(){
                let url = this.url + '/userroletypes';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.tableData=response.data.data;


                });
            },
            handleDelete(index, row) {

                let url = this.url + '/userroletypes/' + row.user_role_type_id;
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
                this.id=this.form.user_role_type_id
                this.$router.push('/userroletype/edit/'+this.id);
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
            this.getRoleType();
        }
    }


</script>

<style scoped>
    .table-box{
    }
    .card-base{
    }
</style>