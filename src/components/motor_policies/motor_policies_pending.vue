<template>
    <!--Motor Policies Table-->
    <div class="page-table scrollable">
        <h1 class="animated fadeInDown">Motor Policies</h1>
        <el-row id="space">
            <el-button  type="primary" v-on:click="addClicked" icon="el-icon-plus">Add New</el-button>
            <el-button type="success" icon="el-icon-info" v-on:click="exportXlsx">Export Excel</el-button>
        </el-row>
        <div class="table-box card-base card-shadow--medium">
            <el-table :data="tableData" height="600" style="width: 100%">
                <el-table-column
                        prop="motor_policies_id"
                        sortable
                        label="ID"
                        width="60"
                ></el-table-column>

                <el-table-column
                        prop="policy_no"
                        label="Policy no"
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
                        prop="premium"
                        label="Premium"
                        width="150"
                ></el-table-column>

                <el-table-column
                        prop="applicant_dob"
                        label="Applicant DOB"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="applicant_name"
                        label="Applicant name"
                        width="150"
                ></el-table-column>

                <el-table-column
                        prop="applicant_idno"
                        label="Applicant ID"
                        sortable
                        width="180"
                ></el-table-column>

                <el-table-column
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
                        width="150"></el-table-column>

                <el-table-column
                        prop="applicant_dlno"
                        label="Applicant DL no"
                        width="150"></el-table-column>

                <el-table-column
                        prop="make"
                        label="Make"
                        width="150"></el-table-column>

                <el-table-column
                        prop="model"
                        label="Model"
                        width="150"></el-table-column>

                <el-table-column
                        prop="engine_no"
                        label="Engine no"
                        width="150"></el-table-column>
                <el-table-column
                        prop="chassis_no"
                        label="Chassis no"
                        width="150"></el-table-column>
                <el-table-column
                        prop="body_type"
                        label="Body type"
                        width="150"></el-table-column>
                <el-table-column
                        prop="v_reg_no"
                        label="Vehicle Reg no"
                        width="150"></el-table-column>
                <el-table-column
                        prop="t_reg_no"
                        label="T reg no"
                        width="150"></el-table-column>
                <el-table-column
                        prop="yr_of_manufacture"
                        label="Year of manufacture"
                        width="150"></el-table-column>
                <el-table-column
                        prop="v_carrying_capacity"
                        label="Vehicle carrying capacity"
                        width="150"></el-table-column>
                <el-table-column
                        prop="t_carrying_capacity"
                        label="T carrying capacity"
                        width="150"></el-table-column>
                <el-table-column
                        prop="application_date"
                        label="Application date"
                        width="150"
                ></el-table-column>
                <el-table-column
                        prop="start_date"
                        label="Start date"
                        width="150"></el-table-column>
                <el-table-column
                        prop="end_date"
                        label="End date"
                        width="150"></el-table-column>
                <el-table-column
                        prop="included_benefits"
                        label="Included benefits"
                        width="150"></el-table-column>
                <el-table-column
                        prop="included_excess"
                        label="Included excess"
                        width="150"></el-table-column>
                <el-table-column
                        prop="activation_status"
                        label="Activation Status"
                        width="150"></el-table-column>
                <!--<el-table-column-->
                        <!--prop="activation_comments"-->
                        <!--label="Activation comments"-->
                        <!--width="160"></el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="activated_by"-->
                        <!--label="Activated by"-->
                        <!--width="150"-->
                        <!--&gt;</el-table-column>-->
                <!--<el-table-column-->
                        <!--prop="activated_on"-->
                        <!--label="Activated on"-->
                        <!--width="150"></el-table-column>-->


                <el-table-column fixed="right" label="Operations" width="250">

                    <template slot-scope="scope">

                        <el-button size="mini" slot="reference" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                        <el-button style="padding-right: 10px" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>

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
        name: "motor_policies_pending",

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

                let url = this.url  + '/motorpoliciespending';
                this.axios.get(url
                    , {headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+ this.token
                        }}).then((response) => {
                    this.tableData=response.data.data;
                    this.excelForm = Object.values(this.tableData);

                });
            },

            exportXlsx(){
                var policiesIdWs = XLSX.utils.json_to_sheet(this.excelForm);
                // Workbook
                var policiesyWb = XLSX.utils.book_new();
                //Add worksheet to workbook
                XLSX.utils.book_append_sheet(policiesyWb,policiesIdWs);
                XLSX.writeFile(policiesyWb, 'Motor Policies.xlsx');

            },

            addClicked(){
                this.$router.push('/motorpolicies/add');
            },
            handleDelete(index, row) {

                let url = this.url + '/motorpolicies/' + row.motor_policies_id;
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
                this.id=this.form.motor_policies_id;
                this.$router.push('/motorpolicies/edit/'+this.id);
            },

            handleApprove(index,row){
                this.form=row;
                this.id=this.form.motor_policies_id;
                this.$router.push('/motorpolicies/approve/'+this.id);
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




