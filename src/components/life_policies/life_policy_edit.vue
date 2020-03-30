<template>
    <!--Create Policy-->
    <div class="page-table scrollable">

        <el-form ref="form"  :model="form" :rules="rules"  label-width="200px">
            <h2 class="animated fadeInDown" >Edit Policy</h2>

            <el-form-item label="Policy no" prop="policy_no">
                <el-input v-model="form.policy_no"></el-input>
            </el-form-item>

            <el-form-item label="Choose cover:" prop="currency">
                <el-dropdown placement="bottom-start" v-model="form.cover_name" @command="handleCovers" >
                    <span class="el-dropdown-link">{{form.cover_name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  v-bind:key="cover.pa_cover_id" v-for="cover in covers" :command=cover.cover_name>{{cover.cover_name}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>

            <el-form-item label="Choose product:" prop="product">
                <el-dropdown placement="bottom-start" v-model="form.product_name" @command="handleProduct" >
                    <span class="el-dropdown-link">{{form.product_name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  v-bind:key="product.product_id" v-for="product in products" :command=product.product_name>{{product.product_name}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>

            <el-form-item label="Premium" prop="premium">
                <el-input  v-model="form.premium"></el-input>
            </el-form-item>

            <el-form-item label="DOB" prop="applicant_dob">
                <el-col :span="11">
                    <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="Pick a date" v-model="form.applicant_dob" style="width: 70%;"></el-date-picker>
                </el-col></el-form-item>

            <el-form-item label="Applicant name" prop="applicant_name">
                <el-input v-model="form.applicant_name"></el-input>
            </el-form-item>

            <el-form-item label="Applicant ID no" prop="applicant_idno">
                <el-input  v-model="form.applicant_idno"></el-input>
            </el-form-item>



            <el-form-item label="Application Date" prop="application_date">
                <el-col :span="11">
                    <el-date-picker  value-format="yyyy-MM-dd" type="date" placeholder="Pick a date" v-model="form.application_date" style="width: 70%;"></el-date-picker>
                </el-col></el-form-item>

            <el-form-item label="Start Date" prop="start_date">
                <el-col :span="11">
                    <el-date-picker  value-format="yyyy-MM-dd" type="date" placeholder="Pick a date" v-model="form.start_date" style="width: 70%;"></el-date-picker>
                </el-col></el-form-item>

            <el-form-item label="End Date" prop="end_date">
                <el-col :span="11">
                    <el-date-picker  value-format="yyyy-MM-dd" type="date" placeholder="Pick a date" v-model="form.end_date" style="width: 70%;"></el-date-picker>
                </el-col>
            </el-form-item>

            <el-form-item label="Declaration of Good Health" prop="declaration_goodhealth">
                <el-input autosize type="textarea" v-model="form.declaration_goodhealth"></el-input>
            </el-form-item>

            <el-form-item label="Not in Good Health" prop="notin_goodhealth">
                <el-input v-model="form.notin_goodhealth"></el-input>
            </el-form-item>

            <el-form-item label="Rider Benefits" prop="rider1_included">
                <el-row>
                    <el-checkbox v-model="form.rider1_included">Rider 1 included</el-checkbox>
                    <el-checkbox v-model="form.rider2_included">Rider 2 included</el-checkbox>
                    <el-checkbox v-model="form.rider3_included">Rider 3 included</el-checkbox>
                </el-row>
            </el-form-item>

            <el-form-item label="Approval Status">
                <el-dropdown @command="handleActivation">
                    <span class="el-dropdown-link">{{form.activation_status}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="PENDING">PENDING</el-dropdown-item>
                        <el-dropdown-item  command="APPROVED">APPROVED</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>`

            <el-form-item label="Activation comments" prop="activation_comments">
                <el-input type="textarea" v-model="form.activation_comments"></el-input>
            </el-form-item>

            <el-form-item label="Activated by" prop="activated_by">
                <el-input  v-model="form.activated_by"></el-input>
            </el-form-item>

            <el-form-item label="Activated on" prop="activated_on">

                <el-col :span="11">
                    <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="Pick a date" v-model="form.activated_on" style="width: 70%;"></el-date-picker>
                </el-col></el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">SAVE</el-button>
                <el-button  @click="cancelClicked">CLOSE</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>

<script>
    export default {
        name: "life_policy_edit",
        data(){
            return{
                id: '',
                form: {
                    cover_name: '',
                    product: '',
                },
                covers:[],
                products:[],
                token: '',
                message: '',
                // Form validation rules
                rules: {
                    // policy_no: [
                    //     {required: true, message: 'Please enter policy no', trigger: 'blur'},
                    // ],
                    // cover_name: [
                    //     {required: true, message: 'Please enter cover name', trigger: 'blur'},
                    // ],
                    // product_name: [
                    //     {required: true, message: 'Please enter product name', trigger: 'blur'},
                    // ],
                    // premium: [
                    //     {required: true, message: 'Please enter  premium', trigger: 'blur'},
                    // ],
                    // applicant_dob: [
                    //     { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                    // ],
                    // applicant_name: [
                    //     {required: true, message: 'Please enter applicant\'s name', trigger: 'blur'},
                    // ],
                    // applicant_idno: [
                    //     {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    // ],
                    // applicant_photo: [
                    //     {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    // ],
                    // application_date: [
                    //     { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                    // ],
                    // start_date: [
                    //     { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                    // ],
                    // end_date: [
                    //     { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                    // ],
                    // declaration_goodhealth: [
                    //     {required: true, message: 'Please enter declaration of health', trigger: 'blur'},
                    // ],
                    //
                    // notin_goodhealth: [
                    //     {required: true, message: 'Please enter declaration of health', trigger: 'blur'},
                    // ],
                    // previous_pacovers: [
                    //     {required: true, message: 'Please enter pa cover', trigger: 'blur'},
                    // ],
                    // previous_paunderwritter: [
                    //     {required: true, message: 'Please enter underwriter', trigger: 'blur'},
                    // ],
                    // activation_status: [
                    //     {required: true, message: 'Please enter activation status', trigger: 'blur'},
                    // ],
                    // activation_comments: [
                    //     {required: true, message: 'Please enter activation comments', trigger: 'blur'},
                    // ],
                    // activated_by: [
                    //     {required: true, message: 'Please enter name', trigger: 'blur'},
                    // ],
                    // activated_on: [
                    //     { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                    // ],
                }

            }
        },
        methods: {
            // Validate and submit
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let url = this.url + '/policies/'+this.id ;
                        this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+this.token
                            }}).then((response)=> {
                            if (response.status == 200){
                                this.message=response.data.message;
                                this.success();
                                this.$router.push('/lifepolicies/pending');

                            }
                        }).catch(err =>{
                            this.$router.push('login');
                        });
                    }else{
                        this.message='Fill all required entries';
                        this.error();
                        return false;
                    }
                });
            },

            success() {
                this.$notify({
                    title: 'Success',
                    message: this.message,
                    type: 'success'
                });},
            getPolicy(){
                let url = this.url + '/lifepolicies/'+this.$route.params.id;
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.form=response.data.data;
                }).catch(err =>{
                    this.$router.push('login');
                });

            },
            getCovers(){
                let url = this.url + '/lifecovers';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.covers=response.data.data;
                }).catch(err =>{
                    this.$router.push('login');
                });
            },
            getProduct(){

                let url = this.url+ '/products';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.products=response.data.data;
                }).catch(err =>{
                    this.$router.push('login');
                });

            },

            handleProduct(command){
                this.form.product_name=command;
            },
            handleCovers(command){
                this.form.cover_name=command
            },
            handlePreviousCovers(command){
                this.form.previous_pacovers=command
            },
            handlePreviousUnderwriter(command){
                this.form.previous_paunderwritter=command
            },

            cancelClicked(){
                this.$router.back();
            },
            handleActivation(command){
                this.form.activation_status=command
            }
        },
        created(){
            this.id=this.$route.params.id;
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getCovers();
            this.getPolicy();
            this.getProduct();
            this.getUnderwriters();
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