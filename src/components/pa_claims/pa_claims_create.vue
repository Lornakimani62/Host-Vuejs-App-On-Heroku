<template>


    <!--Create Claim-->
    <div class="page-table scrollable">
        <el-form ref="form" :rules="rules" :model="form"  label-width="180px">

            <h2 class="animated fadeInDown" >Add a new Claim</h2>

            <el-form-item label="Upload Excel" prop="import" >
                <input type="file" ref="xlsx" @change="selectFile"/>
                <el-button type="warning" icon="el-icon-info" v-on:click="uploadXlsx">Import Excel</el-button>
            </el-form-item>

            <el-form-item label="Claim Ref No" prop="claim_refno">
                <el-input type="text" v-model="form.claim_refno"></el-input>
            </el-form-item>

            <el-form-item label="Claim Type" prop="claim_type">
                <el-input v-model="form.claim_type"></el-input>
            </el-form-item>

            <el-form-item label="Claim Description" prop="claim_description">
                <el-input type="textarea" v-model="form.claim_description"></el-input>
            </el-form-item>

            <el-form-item label="Choose currency:" prop="currency">
                <el-dropdown placement="bottom-start" v-model="form.claim_currency" @command="handleCurrency" >
                    <span class="el-dropdown-link">{{form.claim_currency}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  v-bind:key="currency.currency_code" v-for="currency in currencies" :command=currency.currency_code>{{currency.currency_name}}</el-dropdown-item>
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
                    <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="Pick a date" v-model="form.claim_date" style="width: 70%;"></el-date-picker>
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

            <el-form-item label="Applicant ID front" prop="applicant_idfront">
                <input type="file" ref="applicant_idfront" @change="selectIdFront"/>
            </el-form-item>

            <el-form-item label="Applicant ID back" prop="applicant_idfront">
                <input type="file" ref="applicant_idback" @change="selectIdBack"/>
            </el-form-item>

            <el-form-item label="Applicant Photo" prop="applicant_photo">
                <input type="file" ref="applicant_photo" @change="selectPhoto"/>
            </el-form-item>

            <el-form-item label="Supporting Doc 1" prop="supporting_doc1">
                <input type="file" ref="supporting_doc1" @change="selectdoc1"/>
            </el-form-item>

            <el-form-item label="Supporting Doc 2" prop="supporting_doc2">
                <input type="file" ref="supporting_doc2" @change="selectdoc2"/>
            </el-form-item>

            <el-form-item label="Supporting Doc 3" prop="supporting_doc3">
                <input type="file" ref="supporting_doc3" @change="selectdoc3"/>
            </el-form-item>

            <el-form-item label="Supporting Doc 4" prop="supporting_doc4">
                <input type="file" ref="supporting_doc4" @change="selectdoc4"/>
            </el-form-item>

            <el-form-item label="Supporting Doc 5" prop="supporting_doc5">
                <input type="file" ref="supporting_doc5" @change="selectdoc5"/>
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
                <el-input autosize type="textarea" v-model="form.review_comments"></el-input>
            </el-form-item>

            <el-form-item label="Reviewed By" prop="reviewed_by">
                <el-input v-model="form.reviewed_by"></el-input>
            </el-form-item>

            <el-form-item label="Reviewed on" prop="reviewed_on">
                <el-col :span="11">
                    <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="Pick a date" v-model="form.reviewed_on" style="width: 70%;"></el-date-picker>
                </el-col>
            </el-form-item>

            <el-form-item label="Approval Status">
                <el-dropdown @command="handleApproval">
                    <span class="el-dropdown-link">{{form.approval_status}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="PENDING">PENDING</el-dropdown-item>
                        <el-dropdown-item  command="NEWLY SUBMITTED">NEWLY SUBMITTED</el-dropdown-item>
                        <el-dropdown-item  command="AWAITING INFORMATION">AWAITING INFORMATION</el-dropdown-item>
                        <el-dropdown-item  command="REOPENED">REOPENED</el-dropdown-item>
                        <el-dropdown-item  command="REJECTED">REJECTED</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>

            <el-form-item label="Approval Comments" prop="approval_comments">
                <el-input autosize type="textarea" v-model="form.approval_comments"></el-input>
            </el-form-item>

            <el-form-item label="Approved on" prop="approved_on">
                <el-col>
                    <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="Pick a date" v-model="form.approved_on" style="width: 70%;"></el-date-picker>
                </el-col>
            </el-form-item>

             <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">SAVE</el-button>
                <el-button  @click="cancelClicked">CLOSE</el-button>
            </el-form-item>

        </el-form>

    </div>

</template>

<script>

    export default {
        name: "pa_claims_create",
        data(){
            return  {
                currencies: [],
                form: {
                    claim_currency: 'Currency',
                    review_status: 'Review status',
                    approval_status: 'Approval status'
                },
                message: '',
                policyDetails:{},
                token: '',
                url: '',
                xlsx: '',
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
                    claim_currency: [
                        {required: true, message: 'Please enter claim currency', trigger: 'blur'},
                        {min: 3, max: 3, message: 'Please enter 3 letter code', trigger: 'blur'}
                    ],
                    claim_est_amount: [
                        {required: true, message: 'Please enter claim estimate amount', trigger: 'blur'}
                    ],
                    claim_appr_amount: [
                        {required: true, message: 'Please enter claim approved amount', trigger: 'blur'}
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
                    applicant_idno: [
                        {required: true, message: 'Please enter applicant\'s ID no', trigger: 'blur'},
                        {min: 8, max: 8, message: 'Please enter a valid 8 Digit ID no', trigger: 'blur'},
                    ],
                    applicant_idfront: [
                        {required: true, message: 'Please select a file', trigger: 'blur'}
                    ],
                    applicant_photo: [
                        {required: true, message: 'Please select a file', trigger: 'blur'}
                    ],
                    supporting_doc1: [
                        {required: true, message: 'Please select a file', trigger: 'blur'}
                    ],
                    supporting_doc2: [
                        {required: true, message: 'Please select a file', trigger: 'blur'}
                    ],
                    supporting_doc3: [
                        {required: true, message: 'Please select a file', trigger: 'blur'}
                    ],
                    supporting_doc4: [
                        {required: true, message: 'Please select a file', trigger: 'blur'}
                    ],
                    supporting_doc5: [
                        {required: true, message: 'Please select a file', trigger: 'blur'}
                    ],
                    review_status: [
                        {required: true, message: 'Please select the review status', trigger: 'blur'}
                    ],
                    review_comments: [
                        {required: true, message: 'Please enter review comments', trigger: 'blur'}
                    ],
                    reviewed_by: [
                        {required: true, message: 'Please enter a name', trigger: 'blur'}
                    ],
                    // reviewed_on: [
                    //     { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                    // ],
                    approval_status: [
                        {required: true, message: 'Please select the approval status', trigger: 'blur'}
                    ],
                    approval_comments: [
                        {required: true, message: 'Please enter approval comments', trigger: 'blur'}
                    ],
                    approved_by: [
                        {required: true, message: 'Please enter a name', trigger: 'blur'}
                    ],
                    // approved_on: [
                    //     { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                    // ]

                }
            }
        },
        created(){
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getCurrencies();
        },

        methods: {
            onSubmit(form){
                console.log("Here");
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        const formData = new FormData();
                        formData.append('claim_refno', this.form.claim_refno);
                        formData.append('claim_type',this.form.claim_type);
                        formData.append('claim_description',this.form.claim_description);
                        formData.append('claim_currency',this.form.claim_currency);
                        formData.append('currency_code',this.form.currency_code);
                        formData.append('claim_est_amount',this.form.claim_est_amount);
                        formData.append('claim_appr_amount',this.form.claim_appr_amount);
                        formData.append('claim_date',this.form.claim_date);
                        formData.append('policy_no',this.form.policy_no);
                        formData.append('applicant_name',this.form.applicant_name);
                        formData.append('applicant_idno',this.form.applicant_idno);
                        formData.append('applicant_idfront',this.form.applicant_idfront);
                        formData.append('applicant_idback',this.form.applicant_idback);
                        formData.append('applicant_photo',this.form.applicant_photo);
                        formData.append('supporting_doc1',this.form.supporting_doc1);
                        formData.append('supporting_doc2',this.form.supporting_doc2);
                        formData.append('supporting_doc3',this.form.supporting_doc3);
                        formData.append('supporting_doc4',this.form.supporting_doc4);
                        formData.append('supporting_doc5',this.form.supporting_doc5);
                        formData.append('review_status',this.form.review_status);
                        formData.append('review_comments',this.form.review_comments);
                        formData.append('reviewed_by',this.form.reviewed_by);
                        formData.append('reviewed_on',this.form.reviewed_on);
                        formData.append('approval_status',this.form.approval_status);
                        formData.append('approval_comments',this.form.approval_comments);
                        formData.append('approved_by',this.form.approved_by);
                        formData.append('approved_on',this.form.approved_on);
                        console.log("Form Data");
                        console.log(formData);

                        let url = this.url + '/paclaims';
                this.axios.post(url, formData, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+this.token
                    }}).then((response)=> {
                    if (response.status == 200){

                        this.message=response.data.message;
                        this.success();
                        this.$router.push('/pa_claims');
                    }
                    else if (response.status != 200){
                        this.message=response.data.message;
                        this.error();
                    }
                })
                    }else{
                        this.message='Fill all required entries';
                        this.error();
                        return false;
                    }
                });
            },
            getCurrencies(){
                let url = this.url + '/currencies';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.currencies=response.data.data;


                }).catch(err =>{
                    this.$router.push('login');
                });
            },
            selectFile() {
                this.xlsx = this.$refs.xlsx.files[0];
            },
            uploadXlsx(){

                if (this.xlsx != ''){
                    const formData = new FormData();

                    formData.append('xlsx',this.xlsx);

                    let url = this.url + '/paclaims/excel';
                    this.axios.post(url, formData, {headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+this.token
                        }}).then((response)=> {
                        if (response.status == 200){

                            this.message=response.data.message;
                            this.success();
                            this.$router.push('/pa_claims');
                            this.xlsx='';
                        }
                        else if (response.status == 400){
                            this.error();
                        }
                    }).catch(err =>{
                        this.$router.push('login');
                    });
                }else{
                    this.message='Please select a file';
                    this.error();
                }
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
            selectIdFront(){
                this.form.applicant_idfront=this.$refs.applicant_idfront.files[0];
            },
            selectIdBack(){
                this.form.applicant_idback=this.$refs.applicant_idback.files[0];
            },
            selectPhoto(){
                this.form.applicant_photo=this.$refs.applicant_photo.files[0];

            },
            selectdoc1(){
                this.form.supporting_doc1=this.$refs.supporting_doc1.files[0];

            },selectdoc2(){
                this.form.supporting_doc2=this.$refs.supporting_doc2.files[0];

            },selectdoc3(){
                this.form.supporting_doc3=this.$refs.supporting_doc3.files[0];

            },selectdoc4(){
                this.form.supporting_doc4=this.$refs.supporting_doc4.files[0];

            },selectdoc5(){
                this.form.supporting_doc5=this.$refs.supporting_doc5.files[0];

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
            cancelClicked(){
                this.$router.push('/pa_claims');
            },
            error() {
                this.$notify({
                    title: 'Error',
                    message: this.message,
                    type: 'error'
                });
            }
        }

    }
</script>

<style scoped>

    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }

    .el-icon-arrow-down {
        font-size: 12px;
    }

</style>