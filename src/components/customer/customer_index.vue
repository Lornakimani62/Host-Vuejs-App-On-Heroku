<template>
    <!--Customer Table-->
<div>

    <el-row id="space">
        <!-- <el-button  type="primary" v-on:click="addClicked" icon="el-icon-plus">Add New</el-button> -->
        <el-button type="warning" icon="el-icon-info" v-on:click="exportXlsx">Export Excel</el-button>
    </el-row>

    <div class="table-box card-base card-shadow--medium">
        <el-table :data="tableData" height="475" style="width: 100%">

            <el-table-column
                    prop="customer_id"
                    sortable
                    label="ID"
                    width="60"
            ></el-table-column>

            <el-table-column
                    prop="first_name"
                    label="First Name"
                    width="100"></el-table-column>

            <el-table-column
                    prop="last_name"
                    label="Last Name"
                    width="100"></el-table-column>
            <el-table-column
                    prop="id_no"
                    label="ID No"
                    width="100"
            ></el-table-column>
            <el-table-column
                    prop="kra_pin"
                    label="KRA Pin"
                    width="150"
            ></el-table-column>
            <el-table-column
                    prop="occupation"
                    label="Occupation"
                    width="120"></el-table-column>
            <el-table-column
                    prop="mobile_no"
                    label="Mobile No"
                    width="110"></el-table-column>
            <el-table-column
                    prop="email"
                    label="Email"
                    width="200"></el-table-column>
            <el-table-column
                    prop="location"
                    label="Location"
                    width="100"></el-table-column>
            <el-table-column
                    prop="postal_address"
                    label="Postal Address"
                    width="150"></el-table-column>
            <el-table-column
                    prop="postal_code"
                    label="Postal Code"
                    width="100"></el-table-column>
            <el-table-column
                    prop="town"
                    label="Town"
            ></el-table-column>
            <el-table-column
                    prop="nok_fullname"
                    label="NOK Name"
                    width="180"></el-table-column>
            <el-table-column
                    prop="nok_mobileno"
                    label="NOK Mobile No"
                    width="120"></el-table-column>
            <el-table-column
                    prop="nok_relation"
                    label="NOK Relation"
                    width="120"></el-table-column>
            <el-table-column
                    prop="sales_channel"
                    label="Sales Channel"
                    width="120"></el-table-column>

            <el-table-column fixed="right" label="Operations" width="150">

                <template slot-scope="scope">
                    <el-button size="mini" slot="reference" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button style="padding-right: 10px" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>

    <!--Edit Form-->


</div>

</template>

<script>
    import XLSX from 'xlsx';

    export default {
        name: "customer_index",
        data() {
            return {
                tableData:[],
                message: '',
                token: '',
                form:{},
                id:'',
                agent_code:'',
                username: '',
                url: '',
                excelForm:[]
            }
        },

        created(){
            this.token=this.$store.getters.token;
            this.username=this.$store.getters.username;
            this.url=this.$store.getters.url;

            this.getCustomers();

        },

        methods: {
            // Get al the customers table data from the api and assigns it to the tableData object which is accessed and rendered to the user
            getCustomers() {
                let url = this.url + '/customers';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.tableData=response.data.data;
                    this.excelForm=Object.values(this.tableData);
                }).catch(err =>{
                    this.$router.push('login');
                });
            },

            getUser() {
                let url = this.url+'/users/' + this.username;
                this.axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then((response) => {

                    this.agent_code = response.data.data.agent_code;


                }).catch(err =>{
                    this.$router.push('login');
                });

            },

            exportXlsx(){
                var customersIdWs = XLSX.utils.json_to_sheet(this.excelForm);


                // Workbook
                var customerWb = XLSX.utils.book_new();
                //Add worksheet to workbook

                XLSX.utils.book_append_sheet(customerWb,customersIdWs);
                XLSX.writeFile(customerWb, 'Customers.xlsx');

            },

            addClicked(){
                this.$router.push('customers/add');
            },

            //Delete request is sent to the api and the selected row deleted from the db and spliced form the table

            handleDelete(index, row) {

                let url = this.url + '/customers/' + row.customer_id;
                this.axios.delete(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.token
                    }
                }).then((response) => {

                    this.message = response.data.message;

                    this.tableData.splice(index, 1);
                    this.delete();
                    this.getCustomers();
                }).catch(err =>{
                    this.$router.push('login');
                });
            },
// Assigns the unique customer id as a router params :id which will be edited in the customer_edit
            handleEdit(index, row) {
                this.form = row;
                this.id = this.form.customer_id;
                this.$router.push('/customers/edit/' + this.id);
            },


            delete() {
                this.$notify({
                    title: 'Deleted',
                    message: this.message,
                    type: 'Success'
                });
            }
 
            }



    }
</script>

<style scoped>
    #space {
        padding-bottom: 15px;
    }
</style>