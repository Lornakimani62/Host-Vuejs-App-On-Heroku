<template>
    <!--Create Claim-->
    <div class="page-table scrollable">
        <el-form ref="form" :rules="rules" :model="form"  label-width="180px">

            <h2 class="animated fadeInDown" >Edit a Claim</h2>



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

            <!--<el-form-item label="Applicant ID No" prop="applicant_idno">-->
                <!--<el-input type="number" v-model="form.applicant_idno"></el-input>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="Applicant ID front" prop="applicant_idfront">-->
                <!--<input type="file" ref="applicant_idfront" @change="selectIdFront"/>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="Applicant ID back" prop="applicant_idfront">-->
                <!--<input type="file" ref="applicant_idback" @change="selectIdFront"/>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="Applicant Photo" prop="applicant_photo">-->
                <!--<input type="file" ref="applicant_photo" @change="selectPhoto"/>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="Supporting Doc 1" prop="supporting_doc1">-->
                <!--<input type="file" ref="supporting_doc1" @change="selectdoc1"/>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="Supporting Doc 2" prop="supporting_doc2">-->
                <!--<input type="file" ref="supporting_doc2" @change="selectdoc2"/>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="Supporting Doc 3" prop="supporting_doc3">-->
                <!--<input type="file" ref="supporting_doc3" @change="selectdoc3"/>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="Supporting Doc 4" prop="supporting_doc4">-->
                <!--<input type="file" ref="supporting_doc4" @change="selectdoc4"/>-->
            <!--</el-form-item>-->

            <!--<el-form-item label="Supporting Doc 5" prop="supporting_doc5">-->
                <!--<input type="file" ref="supporting_doc5" @change="selectdoc5"/>-->
            <!--</el-form-item>-->

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
                <el-col :span="11">
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
        name: "motor_claims_edit",
        data(){
            return{
                id: '',
                currencies: [],
                products: [],
                form: {
                    claim_currency: 'Currency',
                    review_status: 'Review status',
                    approval_status: 'Approval status'
                },
                token: '',
                message: '',
                policyDetails:{},
                url: '',
                rules: {
                    // cover_name: [
                    //     {required: true, message: 'Please enter cover name', trigger: 'blur'},
                    // ],
                    // cover_desc: [
                    //     {required: true, message: 'Please enter cover description', trigger: 'blur'},
                    // ],
                    // currency: [
                    //     {required: true, message: 'Please enter currency name', trigger: 'blur'},
                    //     {min: 3, message: 'Currency code should have 3 characters', trigger: 'blur'}
                    // ],
                    //
                    // benefit1_name: [
                    //     {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    // ],
                    // benefit1_desc: [
                    //     {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    // ],
                    // benefit1_amount: [
                    //     {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    // ],
                    // benefit2_name: [
                    //     {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    // ],
                    // benefit2_desc: [
                    //     {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    // ],
                    // benefit2_amount: [
                    //     {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    // ],
                    // benefit3_name: [
                    //     {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    // ],
                    // benefit3_desc: [
                    //     {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    // ],
                    // benefit3_amount: [
                    //     {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    // ],
                    // benefit4_name: [
                    //     {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    // ],
                    // benefit4_desc: [
                    //     {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    // ],
                    // benefit4_amount: [
                    //     {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    // ],
                    // benefit5_name: [
                    //     {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    // ],
                    // benefit5_desc: [
                    //     {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    // ],
                    // benefit5_amount: [
                    //     {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    // ],
                    // benefit6_name: [
                    //     {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    // ],
                    // benefit6_desc: [
                    //     {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    // ],
                    // benefit6_amount: [
                    //     {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    // ],
                    // benefit7_name: [
                    //     {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    // ],
                    // benefit7_desc: [
                    //     {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    // ],
                    // benefit7_amount: [
                    //     {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    // ],
                    // product: [
                    //     {required: true, message: 'Please enter product', trigger: 'blur'},
                    // ],
                }

            }
        },

        methods: {
            cancelClicked(){
                this.$router.push('/motorclaims');
            },

            onSubmit(form){
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
                        let url = this.url + '/motorclaims/'+this.id ;
                        this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+this.token
                            }}).then((response)=> {
                            if (response.status == 200){
                                this.message=response.data.message;
                                this.success();
                                this.$router.push('/motorclaims');
                            }
                        }).catch(err =>{
                            this.$router.push('login');
                        });
                    }else{
                        this.message='Try Again';
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
            getProducts(){
                let url = this.url + '/products';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.products=response.data.data;
                }).catch(err =>{
                    this.$router.push('login');
                });
            },

            handleCurrency(command){
                this.form.currency=command;
            },
            handleProduct(command){
                this.form.product=command;
            },
            handleCovers(command){
                this.form.cover_name=command;
            },
            selectIdFront(){
                this.form.applicant_idfront=this.$refs.applicant_idfront.files[0];
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

            success() {
                this.$notify({
                    title: 'Success',
                    message: this.message,
                    type: 'success'
                });
            },

            getClaim(){
                let url = this.url+'/motorclaims/'+this.$route.params.id;
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
            this.getProducts();
            this.getCurrencies();
        }

    }
</script>

<style scoped>

</style>