<template>
    <div class="page-table scrollable">
        <el-form ref="form" :rules="rules" :model="form" label-width="150px">
            <h2 class="animated fadeInDown" >Add new Claim</h2>
            <el-form-item label="Claim Ref No" prop="claim_refno">
                <el-input type="number" v-model="form.claim_refno"></el-input>
            </el-form-item>
            <el-form-item label="Claim Type" prop="claim_type">
                <el-input v-model="form.claim_type"></el-input>
            </el-form-item>
            <el-form-item label="Claim Description" prop="claim_description">
                <el-input type="textarea" v-model="form.claim_description"></el-input>
            </el-form-item>
            <el-form-item label="Review Status">
                <el-dropdown @command="handleReview">
                    <span class="el-dropdown-link">{{form.review_status}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="PENDING">PENDING</el-dropdown-item>
                        <el-dropdown-item  command="APPROVED">APPROVED</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>
            <el-form-item label="Claim Estimate" prop="claim_est_amount">
                <el-input type="number" v-model="form.claim_est_amount"></el-input>
            </el-form-item>
            <el-form-item label="Approved amount" prop="claim_appr_amount">
                <el-input type="number" v-model="form.claim_appr_amount"></el-input>
            </el-form-item>
            <el-form-item label="Claim Date" prop="claim_date">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="Pick a date" v-model="form.claim_date" style="width: 70%;"></el-date-picker>
                </el-col>
            </el-form-item>

            <el-form-item label="Policy No" prop="policy_no">
                <el-input type="number" v-model="form.policy_no"></el-input>
            </el-form-item>
            <el-form-item label="Applicant name" prop="applicant_name">
                <el-input v-model="form.applicant_name"></el-input>
            </el-form-item>

            <el-form-item label="Applicant ID No" prop="applicant_idno">
                <el-input type="number" v-model="form.applicant_idno"></el-input>
            </el-form-item>
            <el-form-item label="Applicant email" prop="applicant_email">
                <el-input  v-model="form.applicant_email"></el-input>
            </el-form-item>

            <el-form-item label="Applicant Phone no" prop="applicant_phone_number">
                <el-input type="number" v-model="form.applicant_phone_number"></el-input>
            </el-form-item>

            <el-form-item label="Review Status">
                <el-dropdown @command="handleReview">
                    <span class="el-dropdown-link">{{form.review_status}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="PENDING">PENDING</el-dropdown-item>
                        <el-dropdown-item  command="APPROVED">APPROVED</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>
            <el-form-item label="Review Comments" prop="review_comments">
                <el-input type="textarea" v-model="form.review_comments"></el-input>
            </el-form-item>
            <el-form-item label="Reviewed By" prop="reviewed_by">
                <el-input v-model="form.reviewed_by"></el-input>
            </el-form-item>
            <el-form-item label="Reviewed on" prop="reviewed_on">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="Pick a date" v-model="form.reviewed_on" style="width: 70%;"></el-date-picker>
                </el-col>

            </el-form-item>
            <!--<el-form-item label="Approval Status">-->
                <!--<el-dropdown @command="handleApproval">-->
                    <!--<span class="el-dropdown-link">{{form.approval_status}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></span>-->
                    <!--<el-dropdown-menu slot="dropdown">-->
                        <!--<el-dropdown-item command="PENDING">PENDING</el-dropdown-item>-->
                        <!--<el-dropdown-item  command="NEWLY SUBMITTED">NEWLY SUBMITTED</el-dropdown-item>-->
                        <!--<el-dropdown-item  command="AWAITING INFORMATION">AWAITING INFORMATION</el-dropdown-item>-->
                        <!--<el-dropdown-item  command="REOPENED">REOPENED</el-dropdown-item>-->
                        <!--<el-dropdown-item  command="REJECTED">REJECTED</el-dropdown-item>-->
                        <!--<el-dropdown-item  command="REJECTED">APPROVED</el-dropdown-item>-->
                    <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="Approval Comments" prop="approval_comments">-->
                <!--<el-input type="textarea" v-model="form.approval_comments"></el-input>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="Approved on" prop="approved_on">-->
                <!--<el-col :span="11">-->
                    <!--<el-date-picker type="date" placeholder="Pick a date" v-model="form.approved_on" style="width: 70%;"></el-date-picker>-->
                <!--</el-col>-->
            <!--</el-form-item>-->


            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">SAVE</el-button>
                <el-button  @click="cancelClicked">CLOSE</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    export default {
        name: "life_claim_edit",
        data(){
            return{
                id: '',
                form: {
                    claim_currency: 'Currency',
                    review_status: 'Review status',
                    approval_status: 'Approval status'
                },
                currencies: [],
                token: '',
                message: '',
                url:'',
                rules: {
                    claim_refno: [
                        {required: true, message: 'Please enter claim ref no', trigger: 'blur'}
                    ],
                    claim_type: [
                        {required: true, message: 'Please enter claim type', trigger: 'blur'}
                    ],
                    claim_description: [
                        {required: true, message: 'Please enter claim description', trigger: 'blur'}
                    ],

                    claim_est_amount: [
                        {required: true, message: 'Please enter claim estimate amount', trigger: 'blur'}
                    ],

                    // claim_date: [
                    //     { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                    // ],
                    policy_no: [
                        {required: true, message: 'Please enter policy no', trigger: 'blur'}
                    ],
                    applicant_name: [
                        {required: true, message: 'Please enter applicant\'s name', trigger: 'blur'}
                    ],
                    applicant_email: [
                        {type: 'email',required: true, message: 'Please enter an email', trigger: 'blur'}
                    ],
                    applicant_phone_number: [
                        {required: true, message: 'Please enter phone number', trigger: 'blur'},
                    ],
                    applicant_idno: [
                        {required: true, message: 'Please enter applicant\'s ID no', trigger: 'blur'},
                        {min: 8, max: 8, message: 'Please enter a valid 8 Digit ID no', trigger: 'blur'},
                    ],

                    review_status: [
                        {required: true, message: 'Please input agent code', trigger: 'blur'}
                    ],
                    review_comments: [
                        {required: true, message: 'Please enter review comments', trigger: 'blur'}
                    ],
                    reviewed_by: [
                        {required: true, message: 'Please enter a name', trigger: 'blur'}
                    ],

                    approved_by: [
                        {required: true, message: 'Please enter a name', trigger: 'blur'}
                    ],

                }
            }
        },
        methods: {
            cancelClicked(){
                this.$router.back();
            },
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {

                        let url = this.url+'/lifeclaims/'+this.id ;
                        this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+this.token
                            }}).then((response)=> {
                            if (response.status == 200){
                                this.message=response.data.message;
                                this.success();
                                this.$router.push('/lifeclaims/new');
                            }
                        }).catch(err =>{
                            this.$router.push('login');
                        });}else{
                        this.message='Fill all required entries';
                        this.error();
                        return false;
                    }
                });
            }, getCurrencies(){
                let url = this.url+'/currencies';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.currencies=response.data.data;


                }).catch(err =>{
                    this.$router.push('login');
                });
            },
            handleCurrency(command){
                this.form.claim_currency=command;
            },
            handleReview(command){
                this.form.review_status=command
            },
            handleApproval(command){
                this.form.approval_status=command
            },
            success() {
                this.$notify({
                    title: 'Success',
                    message: this.message,
                    type: 'success'
                });},
            error() {
                this.$notify({
                    title: 'Error',
                    message: this.message,
                    type: 'error'
                });
            },
            getClaim(){
                let url = this.url+'/lifeclaims/'+this.$route.params.id;
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.form=response.data.data;

                }).catch(err =>{
                    this.$router.push('login');
                });

            }
        },
        created(){
            this.id=this.$route.params.id;
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getClaim();
        }
    }
</script>

<style scoped>

</style>