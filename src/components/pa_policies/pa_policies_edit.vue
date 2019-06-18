<template>
    <!--Edit Policy-->
    <div class="page-table scrollable">
         <el-form ref="form" :model="form" :rules="rules" label-width="150px">
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
                    <el-date-picker type="date" placeholder="Pick a date" v-model="form.applicant_dob" style="width: 70%;"></el-date-picker>
                </el-col></el-form-item>
            <el-form-item label="Applicant name" prop="applicant_name">
                <el-input v-model="form.applicant_name"></el-input>
            </el-form-item>
            <el-form-item label="Applicant ID no" prop="applicant_idno">
                <el-input  v-model="form.applicant_idno"></el-input>
            </el-form-item>

            <el-form-item label="Application Date" prop="application_date">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="Pick a date" v-model="form.application_date" style="width: 70%;"></el-date-picker>
                </el-col></el-form-item>
            <el-form-item label="Start Date" prop="start_date">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="Pick a date" v-model="form.start_date" style="width: 70%;"></el-date-picker>
                </el-col></el-form-item>
            <el-form-item label="End Date" prop="end_date">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="Pick a date" v-model="form.end_date" style="width: 70%;"></el-date-picker>
                </el-col></el-form-item>

            <el-form-item label="Declaration of Good Health" prop="declaration_goodhealth">
                <el-input type="textarea" v-model="form.declaration_goodhealth"></el-input>
            </el-form-item>

            <el-form-item label="Not in Good Health" prop="notin_goodhealth">
                <el-input v-model="form.notin_goodhealth"></el-input>
            </el-form-item>

             <el-form-item label="Previous Covers:" prop="currency">
                 <el-dropdown placement="bottom-start" v-model="form.previous_pacovers" @command="handlePreviousCovers" >
                     <span class="el-dropdown-link">{{form.previous_pacovers}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                     <el-dropdown-menu slot="dropdown">
                         <el-dropdown-item  v-bind:key="cover.pa_cover_id" v-for="cover in covers" :command=cover.cover_name>{{cover.cover_name}}</el-dropdown-item>
                     </el-dropdown-menu>
                 </el-dropdown>
             </el-form-item>

             <el-form-item label="Previous underwriter:" prop="currency">
                 <el-dropdown placement="bottom-start" v-model="form.previous_paunderwritter" @command="handlePreviousUnderwriter" >
                     <span class="el-dropdown-link">{{form.previous_paunderwritter}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                     <el-dropdown-menu slot="dropdown">
                         <el-dropdown-item  v-bind:key="underwriter.underwritter_code" v-for="underwriter in underwriters" :command=underwriter.underwritter_name>{{underwriter.underwritter_name}}</el-dropdown-item>
                     </el-dropdown-menu>
                 </el-dropdown>
             </el-form-item>

            <!--<el-form-item label="Approval Status">-->
                <!--<el-dropdown @command="handleActivation">-->
                    <!--<span class="el-dropdown-link">{{form.activation_status}}<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></span>-->
                    <!--<el-dropdown-menu slot="dropdown">-->
                        <!--<el-dropdown-item command="PENDING">PENDING</el-dropdown-item>-->
                        <!--<el-dropdown-item  command="APPROVED">APPROVED</el-dropdown-item>-->
                    <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="Activation comments" prop="activation_comments">-->
                <!--<el-input type="textarea" v-model="form.activation_comments"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="Activated by" prop="activated_by">-->
                <!--<el-input  v-model="form.activated_by"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="Activated on" prop="activated_on">-->
                <!--<el-col :span="11">-->
                    <!--<el-date-picker type="date" placeholder="Pick a date" v-model="form.activated_on" style="width: 70%;"></el-date-picker>-->
                <!--</el-col></el-form-item>-->

            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">SAVE</el-button>
                <el-button  @click="cancelClicked">CLOSE</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    export default {
        name: "pa_policies_edit",
        data(){
            return{
                id: '',
                form: {
                    cover_name: 'Covers',
                    product_name: 'Products',
                    activation_status: 'Activation status',
                    previous_pacovers: 'Previous Covers',
                    previous_paunderwritter: 'Previous Underwriter',
                },
                covers:[],
                products:[],
                underwriters:[],
                token: '',
                message: '',
                // Form validation rules
                rules: {
                    policy_no: [
                        {required: true, message: 'Please enter policy no', trigger: 'blur'},
                    ],
                    cover_name: [
                        {required: true, message: 'Please enter cover name', trigger: 'blur'},
                    ],
                    product_name: [
                        {required: true, message: 'Please enter product name', trigger: 'blur'},
                    ],
                    premium: [
                        {required: true, message: 'Please enter  premium', trigger: 'blur'},
                    ],

                    applicant_name: [
                        {required: true, message: 'Please enter applicant\'s name', trigger: 'blur'},
                    ],
                    applicant_idno: [
                        {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    ],
                    applicant_photo: [
                        {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    ],

                    declaration_goodhealth: [
                        {required: true, message: 'Please enter declaration of health', trigger: 'blur'},
                    ],

                    notin_goodhealth: [
                        {required: true, message: 'Please enter declaration of health', trigger: 'blur'},
                    ],
                    previous_pacovers: [
                        {required: true, message: 'Please enter pa cover', trigger: 'blur'},
                    ],
                    previous_paunderwritter: [
                        {required: true, message: 'Please enter underwriter', trigger: 'blur'},
                    ],
                    activation_status: [
                        {required: true, message: 'Please enter activation status', trigger: 'blur'},
                    ],
                    activation_comments: [
                        {required: true, message: 'Please enter activation comments', trigger: 'blur'},
                    ],
                    activated_by: [
                        {required: true, message: 'Please enter name', trigger: 'blur'},
                    ],
                    activated_on: [
                        { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                    ],
                 }

            }
        },
        methods: {
           // Validate and submit
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                        if (valid) {
                let url = this.url + '/papolicies/'+this.id ;
                this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+this.token
                    }}).then((response)=> {
                    if (response.status == 200){
                        this.message=response.data.message;
                        this.success();
                        this.$router.push('/papolicies/pending');

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
                let url = this.url + '/papolicies/'+this.$route.params.id;
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.form=response.data.data;
                }).catch(err =>{
                    this.$router.push('login');
                });

            },
            getCovers(){
                let url = this.url + '/pacovers';
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
            getUnderwriters(){

                let url = this.url+ '/underwritters';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.underwriters=response.data.data;
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
                this.$router.push('/papolicies/pending');
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