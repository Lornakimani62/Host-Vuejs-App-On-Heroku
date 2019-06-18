<template>
    <!--Motor Excess Table-->
    <div>
        <el-row id="space">
            <el-button  type="primary" v-on:click="addClicked" icon="el-icon-plus">Add New</el-button>
            <el-button type="warning" icon="el-icon-info" v-on:click="exportXlsx">Export Excel</el-button>
        </el-row>

        <div class="table-box card-base card-shadow--medium">
            <el-table :data="tableData" height="475" style="width: 100%">

                <el-table-column
                        prop="motor_excess_id"
                        sortable
                        label="ID"
                        width="60"
                ></el-table-column>
                <el-table-column
                        prop="excess_name"
                        label="Excess name"
                        width="150"></el-table-column>
                <el-table-column
                        prop="excess_desc"
                        label="Excess Description"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="percentage_value"
                        label="% Value"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="currency"
                        label="Currency"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="excess_amount"
                        label="Excess amount"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="cover"
                        label="Covers"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="product"
                        label="Product"
                        sortable
                        width="180"
                ></el-table-column>

                <el-table-column fixed="right" label="Operations" width="150">

                    <template slot-scope="scope">
                        <el-button size="mini" slot="reference" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button style="padding-right: 10px" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>

                    </template>
                </el-table-column>

            </el-table>
        </div>
    </div>
</template>

<script>
    import XLSX from 'xlsx';


    export default {
        name: "motor_excess-index",
        data() {
            return {
                tableData:[],
                message: '',
                token: '',
                form:{},
                id:'',
                url:'',
                excelForm: []
            }
        },

        created(){
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getExcess();
        },


        methods: {

            getExcess(){
                let url = this.url + '/motorexcess';
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

                var excessIdWs = XLSX.utils.json_to_sheet(this.excelForm);
                // Workbook
                var excessWb = XLSX.utils.book_new();
                //Add worksheet to workbook
                XLSX.utils.book_append_sheet(excessWb,excessIdWs);
                XLSX.writeFile(excessWb, 'Motor Excess.xlsx');

            },

            addClicked(){
                this.$router.push('motorexcess/add');
            },

            handleDelete(index, row) {
                let url = this.url + '/motorexcess/' + row.motor_excess_id;
                this.axios.delete(url , {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response)=> {
                    this.message=response.data.message;
                    this.delete();
                    this.tableData.splice(index,1);
                    this.getCovers();
                })
            },

            handleEdit(index,row){
                this.form=row;
                this.id=this.form.motor_excess_id;
                this.$router.push('/motorexcess/edit/'+this.id);
            },


            delete() {
                this.$notify({
                    title: 'Deleted',
                    message: this.message,
                    type: 'Success'
                });
            },

            onSubmit() {
                let url = this.url + '/motorexcess/' + this.form.motor_excess_id;
                this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+this.token
                    }}).then((response)=> {
                    this.status == true;
                    if (response.status == 200){
                        this.message=response.data.message;
                        this.success();

                    }
                }).catch(err =>{
                    this.$router.push('login');
                });
            }
        },





    }
</script>

<style scoped>
    #space{
        padding-bottom: 10px;
    }
</style>