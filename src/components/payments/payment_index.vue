<template>
    <!--Payments Table-->
    <div>

        <el-row id="space">
            <el-button  type="primary" v-on:click="addClicked" icon="el-icon-plus">Add New</el-button>
            <el-button type="warning" icon="el-icon-info" v-on:click="exportXlsx">Export Excel</el-button>
        </el-row>

        <div class="table-box card-base card-shadow--medium">
            <el-table :data="tableData" height="475" style="width: 100%">

                <el-table-column
                        prop="payment_id"
                        sortable
                        label="ID"
                        width="60"
                ></el-table-column>
                <el-table-column
                        prop="receipt_no"
                        label="Receipt no"
                        width="150"></el-table-column>
                <el-table-column
                        prop="currency"
                        label="Currency"
                        width="150"></el-table-column>
                <el-table-column
                        prop="amount"
                        label="Amount"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="paid_by"
                        label="Paid by"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="payment_type"
                        label="Payment type"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="payment_channel"
                        label="Payment channel"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="sales_type"
                        label="Sales type"
                        sortable
                        width="180"
                ></el-table-column>
                <el-table-column
                        prop="agent_code"
                        label="Agent code"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="payment_date"
                        label="Payment date"
                        width="150"></el-table-column>
                <el-table-column
                        prop="mobile_number"
                        label="Mobile no"
                        width="150"></el-table-column>
                <el-table-column
                        prop="credit_card_number"
                        label="Credit card"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="bank_account_no"
                        label="Bank sccount no"
                        width="150"></el-table-column>
                <el-table-column
                        prop="transaction_details"
                        label="Transactionn details"
                        width="180"></el-table-column>
                <el-table-column
                        prop="bank_account"
                        label="Bank account"
                        width="200"
                ></el-table-column>
                <el-table-column
                        prop="policy_no"
                        label="Policy no"
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
        name: "Payment_index",
        data() {
            return {
                tableData:[],
                message: '',
                token: '',
                form:{},
                id:'',
                url:'',
                excelForm:[]



            }
        },

        created(){
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getPayments();

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
            getPayments(){
                let url = this.url + '/payments';
               // let url = 'http://142.93.172.106:3002/api/products';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.tableData=response.data.data;
                    this.excelForm = Object.values(this.tableData);

                });
            },
            exportXlsx(){
                var paymentsWs = XLSX.utils.json_to_sheet(this.excelForm);
                // Workbook
                var paymentsWb = XLSX.utils.book_new();
                //Add worksheet to workbook
                XLSX.utils.book_append_sheet(paymentsWb,paymentsWs);
                XLSX.writeFile(paymentsWb, 'Payments.xlsx');

            },

            addClicked(){
                this.$router.push('payments/add');

            },
            handleDelete(index, row) {
                let url = this.url + '/payments/' + row.payment_id;
               // let url = 'http://142.93.172.106:3002/api/products/' + row.product_id;
                this.axios.delete(url , {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response)=> {
                    this.tableData.splice(index,1);
                    this.message=response.data.message;
                    this.delete();
                    this.getPayments();
                });
            },

            handleEdit(index,row){
                this.form=row;
                this.id=this.form.payment_id;
                this.$router.push('/payments/edit/'+this.id);
            },

            delete() {
                this.$notify({
                    title: 'Deleted',
                    message: this.message,
                    type: 'Delete'
                });
            },
//
        }





    }
</script>

<style scoped>
    #space{
        padding-bottom: 10px;
    }
</style>