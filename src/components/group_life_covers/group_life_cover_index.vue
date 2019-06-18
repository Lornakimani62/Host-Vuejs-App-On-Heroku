<template>
    <!--GL Covers Table-->
    <div>
        <el-row id="space">
            <el-button  type="primary" v-on:click="addClicked" icon="el-icon-plus">Add New</el-button>
            <el-button type="warning" icon="el-icon-info" v-on:click="exportXlsx">Export Excel</el-button>
        </el-row>

        <div class="table-box card-base card-shadow--medium">
            <el-table :data="tableData" height="475" style="width: 100%">
                <el-table-column
                        prop="gl_cover_id"
                        sortable
                        label="ID"
                        width="60"
                ></el-table-column>
                <el-table-column
                        prop="cover_name"
                        label="Cover name"
                        width="150"></el-table-column>
                <el-table-column
                        prop="currency"
                        label="Currency"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="annual_premium"
                        label="Annual Premium"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="amount_insured"
                        label="Amount Insured"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="benefit1_name"
                        label="Benefit name"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="benefit1_desc"
                        label="Benefit Description"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="benefit1_amount"
                        label="Benefit Amount"
                        sortable
                        width="180"
                ></el-table-column>
                <el-table-column
                        prop="benefit2_name"
                        label="Benefit name"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="benefit2_desc"
                        label="Benefit Description"
                        width="150"></el-table-column>
                <el-table-column
                        prop="benefit2_amount"
                        label="Benefit amount"
                        width="150"></el-table-column>
                <el-table-column
                        prop="benefit3_name"
                        label="Benefit name"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="benefit3_desc"
                        label="Benefit Description"
                        width="150"></el-table-column>
                <el-table-column
                        prop="benefit3_amount"
                        label="Benefit amount"
                        width="150"></el-table-column>
                <el-table-column
                        prop="benefit4_name"
                        label="Benefit name"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="benefit4_desc"
                        label="Benefit Description"
                        width="150"></el-table-column>
                <el-table-column
                        prop="benefit4_amount"
                        label="Benefit amount"
                        width="150"></el-table-column>
                <el-table-column
                        prop="benefit5_name"
                        label="Benefit name"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="benefit5_desc"
                        label="Benefit Description"
                        width="150"></el-table-column>
                <el-table-column
                        prop="benefit5_amount"
                        label="Benefit amount"
                        width="150"></el-table-column>
                <el-table-column
                        prop="benefit6_name"
                        label="Benefit name"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="benefit6_desc"
                        label="Benefit Description"
                        width="150"></el-table-column>
                <el-table-column
                        prop="benefit6_amount"
                        label="Benefit amount"
                        width="150"></el-table-column>
                <el-table-column
                        prop="benefit7_name"
                        label="Benefit name"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="benefit7_desc"
                        label="Benefit Description"
                        width="150"></el-table-column>
                <el-table-column
                        prop="benefit7_amount"
                        label="Benefit amount"
                        width="150"></el-table-column>
                <el-table-column
                        prop="product"
                        label="Product"
                        sortable
                        width="150"></el-table-column>

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
        name: "group_life_cover_index",
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
            this.getCovers();

        },


        methods: {

            getCovers(){
                let url = this.url + '/glcovers';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.tableData=response.data.data;
                    this.excelForm = Object.values(this.tableData);

                }).catch(err =>{
                    this.$router.push('/login');
                });
            },

            exportXlsx(){

                var coversIdWs = XLSX.utils.json_to_sheet(this.excelForm);
                // Workbook
                var coversyWb = XLSX.utils.book_new();
                //Add worksheet to workbook
                XLSX.utils.book_append_sheet(coversyWb,coversIdWs);
                XLSX.writeFile(coversyWb, 'GL_Covers.xlsx');

            },

            addClicked(){
                this.$router.push('glcovers/add');
            },

            handleDelete(index, row) {

                let url = this.url + '/glcovers/' + row.gl_cover_id;
                this.axios.delete(url , {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response)=> {
                    this.message=response.data.message;
                    this.delete();
                    this.tableData.splice(index,1);

                    this.getCovers();
                }).catch(err =>{
                    this.$router.push('login');
                });
            },

            handleEdit(index,row){
                this.form=row;
                this.id=this.form.gl_cover_id;
                this.$router.push('/glcovers/edit/'+this.id);
            },


            delete() {
                this.$notify({
                    title: 'Deleted',
                    message: this.message,
                    type: 'Success'
                });
            },

            onSubmit() {
                let url = this.url + '/glcovers/' + this.form.gl_cover_id;
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