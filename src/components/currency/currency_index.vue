<template>
    <div>

        <el-row id="space">
            <el-button  type="primary" v-on:click="addClicked" icon="el-icon-plus">Add New</el-button>
            <el-button type="warning" icon="el-icon-info" v-on:click="exportXlsx">Export Excel</el-button>
         </el-row>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">

        <div class=" table-box card-base card-shadow--medium">
            <!--Displays the currency table-->

            <el-table :data="tableData" height="475" width="100%">
                <el-table-column
                        prop="currency_id"
                        sortable
                        label="ID"
                ></el-table-column>
                <el-table-column
                        prop="currency_code"
                        label="Currency Code">
                </el-table-column>
                <el-table-column
                        prop="currency_name"
                        label="Currency Name"
                ></el-table-column>
                <el-table-column label="Operations" width="150">
                    <template slot-scope="scope">
                        <el-button size="mini" slot="reference" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>
        </el-col>
    </div>
</template>

<script>
    export default {
        name: "currency_index",
        data(){
            return {
                tableData: [],
                token:'',
                form:[],
                url: '',
                excelForm:[]
            }
        },
        methods:{
            //Gets all the currency tables values from the db and assigns them to tableData to be displayed
            getCurrency(){
                let url = this.url + '/currencies';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.tableData=response.data.data;
                    this.excelForm = Object.values(this.tableData);

                }).catch(err =>{
                    this.$router.push('login');
                });
            },
            exportXlsx(){
                 var currencyIdWs = XLSX.utils.json_to_sheet(this.excelForm);
                 // Workbook
                var currencyWb = XLSX.utils.book_new();
                //Add worksheet to workbook
                XLSX.utils.book_append_sheet(currencyWb,currencyIdWs);
                XLSX.writeFile(currencyWb, 'Currency.xlsx');

            },

            addClicked(){
                this.$router.push('currency/add');
            },
            // Sends a delete req to the api for the selected row and splices it from the table
            handleDelete(index, row) {

                let url = this.url + '/currencies/' + row.currency_id;
                this.axios.delete(url , {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response)=> {
                    this.delete();
                    this.tableData.splice(index,1);
                    this.message=response.data.message;
                    this.getCurrency();
                }).catch(err =>{
                    this.$router.push('login');
                });
            },
            // Assigns the selected row unique id to the route params to allow for editing
            handleEdit(index,row){
                this.form=row;
                this.id=this.form.currency_id;
                this.$router.push('/currency/edit/'+this.id);
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
            this.getCurrency();


        }
    }


</script>

<style scoped>
    .table-box{
    }
    .card-base{
    }
    #space{
        padding-bottom: 10px;
    }
</style>