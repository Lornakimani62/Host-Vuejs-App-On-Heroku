<template>
    <!--Life Policies Table-->
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown">Life Policies Pending</h1>
        <el-row id="space">
            <!-- <el-button  type="primary" v-on:click="addClicked" icon="el-icon-plus">Add New</el-button> -->
            <el-button type="success" icon="el-icon-info" v-on:click="exportXlsx">Export Excel</el-button>
        </el-row>
        <div class="table-box card-base card-shadow--medium">
            <el-table :data="tableData" height="475" style="width: 100%">
                <el-table-column
                        prop="policy_no"
                        label="Policy Number"
                        width="150"></el-table-column>
                <el-table-column
                        prop="cover_name"
                        label="Cover name"
                        width="150"></el-table-column>
                <el-table-column
                        prop="product_name"
                        label="Product name"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="monthly_premium"
                        label="Premium"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="sum_assured"
                        label="Sum Assured"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="projected_maturity"
                        label="Projected Maturity"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="id_no"
                        sortable
                        label="ID Number"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="age"
                        label="Applicant Age"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="fullname"
                        label="Applicant name"
                        width="150"
                ></el-table-column>
                <!-- <el-table-column
                        prop="applicant_idno"
                        label="Applicant ID"
                        sortable
                        width="180"
                ></el-table-column> -->
                <!-- <el-table-column
                        prop="applicant_idfront"
                        label="Applicant ID Front"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="applicant_idback"
                        label="Applicant ID Back"
                        width="150"></el-table-column>
                <el-table-column
                        prop="applicant_photo"
                        label="Applicant Photo"
                        width="150"></el-table-column> -->
                <!-- <el-table-column
                        prop="application_date"
                        label="Application date"
                        width="150"
                ></el-table-column> -->
                <el-table-column
                        prop="start_date"
                        label="Start date"
                        width="150"></el-table-column>
                <el-table-column
                        prop="end_date"
                        label="End date"
                        width="150"></el-table-column>
                <!-- <el-table-column
                        prop="declaration_goodhealth"
                        label="Declaration fo Good Health"
                        width="150"></el-table-column>
                <el-table-column
                        prop="notin_goodhealth"
                        label="Not in good Health"
                        width="150"></el-table-column> -->
                <!--<el-table-column-->
                        <!--prop="rider1_included"-->
                        <!--label="Rider 1"-->
                        <!--width="150"></el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="rider2_included"-->
                        <!--label="Rider 2"-->
                        <!--width="150"></el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="rider3_included"-->
                        <!--label="Rider 3"-->
                        <!--width="150"></el-table-column>-->

                <el-table-column fixed="right" label="Operations" width="250">

                    <template slot-scope="scope">
<!-- 
                        <el-button size="mini" slot="reference" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button style="padding-right: 10px" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button> -->

                        <el-button type="success" size="mini" slot="reference" @click="handleApprove(scope.$index, scope.row)"><span>Approve</span></el-button>
                    </template>

                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import XLSX from 'xlsx';

    export default {
        name:"life_policies_pending",

        data() {
            return {
                tableData:[],
                message: '',
                token: '',
                form:{},
                id:'',
                url: '',
                excelForm:[],
            }
        },

        created(){
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getPolicies();
        },


        methods: {
            getPolicies(){
                let url =  'https://capex.wazinsure.com:4443/api//pendingpolicies';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+ this.token
                        }}).then((response) => {
                    this.tableData=response.data.data;

                     this.excelForm = Object.values(this.tableData);
                      console.log(this.tableData)
                });
            },

            exportXlsx(){
                var policiesIdWs = XLSX.utils.json_to_sheet(this.excelForm);
                // Workbook
                var policiesyWb = XLSX.utils.book_new();
                //Add worksheet to workbook
                XLSX.utils.book_append_sheet(policiesyWb,policiesIdWs);
                XLSX.writeFile(policiesyWb, 'Life Policies.xlsx');
            },

            addClicked(){
                this.$router.push('/lifepolicies/add');
            },

            handleDelete(index, row) {
                let url = this.url + '/lifepolicies/' + row.policies_id;
                this.axios.delete(url , {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response)=> {
                    this.message=response.data.message;
                    this.delete();
                    this.tableData.splice(index,1);
                    this.getPolicies();
                }).catch(err =>{
                    this.$router.push('/login');
                });
            },

            handleEdit(index,row){
                this.form=row;
                this.id=this.form.policies_id;
                this.$router.push('/lifepolicies/edit/'+this.id);
            },

            handleApprove(index,row){
                this.form=row;
                this.id=this.form.policies_id;
                this.$router.push('/lifepolicies/approve/'+this.id);
            },

            delete() {
                this.$notify({
                    title: 'Deleted',
                    message: this.message,
                    type: 'error'
                });
            }
        }
    }
</script>

<style scoped>
    #space{
        padding-bottom: 10px;
    }
</style>



