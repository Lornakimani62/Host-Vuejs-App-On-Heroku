<template>
    <!--Products Table-->
    <div>
        <el-row id="space">
            <el-button  type="primary" v-on:click="addClicked" icon="el-icon-plus">Add New</el-button>
            <el-button type="warning" icon="el-icon-info" v-on:click="exportXlsx">Export Excel</el-button>
        </el-row>

        <div class="table-box card-base card-shadow--medium">
            <el-table :data="tableData" height="475" style="width: 100%">

                <el-table-column
                        prop="product_id"
                        sortable
                        label="ID"
                        width="60"
                ></el-table-column>
                <el-table-column
                        prop="product_name"
                        label="Product name"
                        width="150"></el-table-column>

                <el-table-column
                        prop="total_days_covered"
                        label="Total days covered"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="min_eligible_age"
                        label="Minimum age"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="max_eligible_age"
                        label="Maximum age"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="claim_documentation"
                        label="Claim Documentation"
                        width="160"
                ></el-table-column>
                <el-table-column
                        prop="product_icon"
                        label="Product icon"
                        width="150"></el-table-column>
                <el-table-column
                        prop="mpesa_paybill_no"
                        label="M-pesa Paybill"
                        width="150"></el-table-column>
                <el-table-column
                        prop="airtel_paybill_no"
                        label="Airtel Paybill"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="telkom_paybill_no"
                        label="Telkom paybill"
                        width="150"></el-table-column>
                <el-table-column
                        prop="bank_name"
                        label="Bank name"
                        width="150"></el-table-column>
                <el-table-column
                        prop="bank_account"
                        label="Bank account"
                        width="200"
                ></el-table-column>
                <el-table-column
                        prop="underwritter_name"
                        label="Underwriter"
                        width="150"></el-table-column>
                <el-table-column fixed="right" label="Operations" width="150">

                    <template slot-scope="scope">


                        <el-button size="mini" slot="reference" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>


                        <el-button style="  padding-right: 10px" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>




    </div>

</template>

<script>
    import XLSX from 'xlsx';

    export default {
        name: "products_index",
        data() {
            return {
                tableData:[],
                message: '',
                token: '',
                form:{},
                id:'',
                url: ''


            }
        },

        created(){
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getProducts();

        },


        methods: {
            formatter(row, column) {
                return row.address;
            }, filterTag(value, row) {
                return row.tag === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            getProducts(){
                let url = this.url + '/products';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.tableData=response.data.data;
                    this.excelForm = Object.values(this.tableData);

                });
            },
            exportXlsx(){
                var productsIdWs = XLSX.utils.json_to_sheet(this.excelForm);
                // Workbook
                var productsWb = XLSX.utils.book_new();
                //Add worksheet to workbook
                XLSX.utils.book_append_sheet(productsWb,productsIdWs);
                XLSX.writeFile(productsWb, 'Products.xlsx');

            },

            addClicked(){
                this.$router.push('products/add');
            },
            handleDelete(index, row) {

                let url = this.url + '/products/' + row.product_id;
                this.axios.delete(url , {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response)=> {
                    this.message=response.data.message;
                    this.delete();
                    this.tableData.splice(index,1);

                    this.getPayments();
                });
            },

            handleEdit(index,row){
                this.form=row;
                this.id=this.form.product_id;
                this.$router.push('/products/edit/'+this.id);
            },


            delete() {
                this.$notify({
                    title: 'Deleted',
                    message: this.message,
                    type: 'Success'
                });
            },

            onSubmit() {
                let url = this.url + '/products/' + this.form.product_id;
                this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+this.token
                    }}).then((response)=> {
                    this.status == true;
                    if (response.status == 200){
                        this.message='Product updated';
                        this.success();

                    }
                })
            }
        },





    }
</script>

<style scoped>
    #space{
        padding-bottom: 10px;
    }
</style>