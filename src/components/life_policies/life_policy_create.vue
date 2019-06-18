<template>
    <!--Create Policy-->
    <div class="page-table scrollable">

        <el-form ref="form"  :model="form" :rules="rules"  label-width="200px">
            <h2 class="animated fadeInDown" >Add Policy</h2>
            <el-form-item label="Upload Excel" prop="import" >
                <input type="file" ref="xlsx" @change="selectFile"/>
                <el-button type="warning" icon="el-icon-info" v-on:click="uploadXlsx">Import Excel</el-button>
            </el-form-item>

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
                <el-dropdown placement="bottom-start" v-model="form.product" @command="handleProducts" >
                    <span class="el-dropdown-link">{{form.product}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  v-bind:key="product.product_id" v-for="product in products" :command=product.product_name>{{product.product_name}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>

            <el-form-item label="Premium" prop="premium">
                <el-input type="number" v-model="form.premium"></el-input>
            </el-form-item>

            <el-form-item label="DOB" prop="applicant_dob">
                <el-col :span="11">
                    <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="Pick a date" v-model="form.applicant_dob" style="width: 70%;"></el-date-picker>
                </el-col></el-form-item>

            <el-form-item label="Applicant name" prop="applicant_name">
                <el-input v-model="form.applicant_name"></el-input>
            </el-form-item>

            <el-form-item label="Applicant email" prop="applicant_email">
                <el-input  v-model="form.applicant_email"></el-input>
            </el-form-item>

            <el-form-item label="Applicant Phone no" prop="applicant_phone_number">
                <el-input type="number" v-model="form.applicant_phone_number"></el-input>
            </el-form-item>

            <el-form-item label="Applicant ID no" prop="applicant_idno">
                <el-input type="number" v-model="form.applicant_idno"></el-input>
            </el-form-item>

            <el-form-item  label="Upload application ID Front:" prop="applicant_idfront">
                <input type="file" ref="applicant_idfront" @change="selectFileFront"/>
            </el-form-item>

            <el-form-item  label="Upload application ID Back:" prop="applicant_idback">
                <input type="file" ref="applicant_idback" @change="selectFileBack"/>
            </el-form-item>

            <el-form-item label="Applicant Photo" prop="applicant_photo">
                <input type="file" ref="applicant_photo" @change="selectFilePhoto"/>
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

                <el-form-item label="Rider Benefits" prop="rider_included">
                    <el-row>
                        <el-checkbox v-model="form.rider1_included">Rider 1 included</el-checkbox>
                        <el-checkbox v-model="form.rider2_included">Rider 2 included</el-checkbox>
                        <el-checkbox v-model="form.rider3_included">Rider 3 included</el-checkbox>
                    </el-row>
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
        name: "life_policy_create",
        data(){
            return  {
                form: {
                    cover_name: 'Covers',
                    product: 'Products',
                    activation_status: 'PENDING',
                    applicant_idfront: '',
                    activated_on:'01/02/2018',
                    rider1_included:false,
                    rider2_included:false,
                    rider3_included:false
                },
                notificationForm: {
                    email:'',
                    phone_number:''
                },
                covers:[],
                products:[],
                message: '',
                token: '',
                xlsx: '',
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
                    applicant_dob: [
                        { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                    ],
                    applicant_name: [
                        {required: true, message: 'Please enter applicant\'s name', trigger: 'blur'},
                    ],
                    applicant_idno: [
                        {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    ],
                    applicant_email: [
                        {type: 'email',required: true, message: 'Please enter an email', trigger: 'blur'}
                    ],
                    applicant_phone_number: [
                        {required: true, message: 'Please enter phone number', trigger: 'blur'},
                    ],
                    application_date: [
                        { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                    ],
                    start_date: [
                        { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                    ],
                    end_date: [
                        { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                    ],
                    declaration_goodhealth: [
                        {required: true, message: 'Please enter declaration of health', trigger: 'blur'},
                    ],

                    notin_goodhealth: [
                        {required: true, message: 'Please enter declaration of health', trigger: 'blur'},
                    ],
                    // rider_included: [
                    //     {required: true, message: 'Please choose at least one', trigger: 'blur'},
                    // ]
                    //
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
        created(){
            this.token=this.$store.getters.token;
            this.notificationToken=this.$store.getters.notificationToken;
            this.notificationUrl=this.$store.getters.notificationUrl;
            this.url=this.$store.getters.url;
            this.getCovers();
            this.getProducts();
        },
        methods: {
            // Validate and submit
            onSubmit(){

                const formData = new FormData();
                formData.append('policy_no', this.form.policy_no);
                formData.append('cover_name',this.form.cover_name);
                formData.append('product_name',this.form.product_name);
                formData.append('premium',this.form.premium);
                formData.append('applicant_dob',this.form.applicant_dob);
                formData.append('applicant_name',this.form.applicant_name);
                formData.append('applicant_idno', this.form.applicant_idno);
                formData.append('applicant_phone_number', this.form.applicant_phone_number);
                formData.append('applicant_email', this.form.applicant_email);
                formData.append('applicant_idfront',this.form.applicant_idfront);
                formData.append('applicant_idback',this.form.applicant_idback);
                formData.append('applicant_photo',this.form.applicant_photo);
                formData.append('application_date',this.form.application_date);
                formData.append('start_date',this.form.start_date);
                formData.append('end_date',this.form.end_date);
                formData.append('declaration_goodhealth',this.form.declaration_goodhealth);
                formData.append('notin_goodhealth',this.form.notin_goodhealth);
                formData.append('rider1_included',this.form.rider1_included);
                formData.append('rider2_included',this.form.rider2_included);
                formData.append('rider3_included',this.form.rider3_included);
                formData.append('activation_status',this.form.activation_status);
                formData.append('activation_comments',this.form.activation_comments);
                formData.append('activated_by',this.form.activated_by);
                formData.append('activated_on',this.form.activated_on);
                let url = this.url + '/lifepolicies';
                this.axios.post(url, formData, {headers: {'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer '+this.token
                    }}).then((response)=> {
                    if (response.status == 200){
                        this.notificationForm.email=this.form.applicant_email;
                        this.notificationForm.phone_number=this.form.applicant_phone_number;

                        this.emailNotification();
                        this.smsNotification();
                        this.message=response.data.message;
                        this.success();
                        this.$router.push('/lifepolicies/pending');
                    }
                    else if (response.status != 200){
                        this.message=response.data.message;
                        this.error();
                    }
                }).catch(err =>{
                    if (err.status === 'Please log in') {
                        this.message='Token Expired. Please Log in';
                        this.error()
                        this.$router.push('/login');

                    }else{
                        this.message='Oops! Something went wrong. Please try Again!';
                        this.error()
                    }
                });



            },
            selectFile() {
                this.xlsx = this.$refs.xlsx.files[0];
            },
            uploadXlsx(){

                if (this.xlsx != ''){
                    const formData = new FormData();
                    formData.append('xlsx',this.xlsx);
                    let url = this.url + '/lifepolicies/excel';
                    this.axios.post(url, formData, {headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+this.token
                        }}).then((response)=> {
                        if (response.status == 200){

                            this.message=response.data.message;
                            this.success();
                            this.$router.push('/lifepolicies/pending');
                            this.xlsx='';
                        }
                        else if (response.status == 400){
                            this.error();
                        }
                    }).catch(err =>{

                        if (err.status === 'Please log in') {
                            this.message='Token Expired. Please Log in';
                            this.error()
                            this.$router.push('/login');

                        }else{
                            this.message='Oops! Something went wrong. Please try Again!';
                            this.error()
                        }
                    });
                }else{
                    this.message='Please select a file';
                    this.error();
                }
            },

            selectFileFront(){
                this.form.applicant_idfront=this.$refs.applicant_idfront.files[0];
            },
            selectFileBack(){
                this.form.applicant_idback=this.$refs.applicant_idback.files[0];

            },selectFilePhoto(){
                this.form.applicant_photo=this.$refs.applicant_photo.files[0];

            },

            getCovers(){
                let url = this.url + '/lifecovers';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.covers=response.data.data;
                }).catch(err =>{

                    if (err.status === 'Please log in') {
                        this.message='Token Expired. Please Log in';
                        this.error()
                        this.$router.push('/login');

                    }else{
                        this.message='Oops! Something went wrong. Please try Again!';
                        this.error()
                    }
                });
            },
            getProducts(){

                let url = this.url+ '/products';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.products=response.data.data;

                })

            },

            //Email notification
            emailNotification(){
                let url =this.notificationUrl + '/email/pendingpolicy';
                this.axios.post(url, this.notificationForm, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.notificationToken
                    }
                }).then((response) => {
                    if (response.status == 200) {
                    }
                });

            },

            //SMS NOTIFICATION
            smsNotification(){
                let url =this.notificationUrl + '/message/pendingpolicy';
                this.axios.post(url, this.notificationForm, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.notificationToken
                    }
                }).then((response) => {
                    if (response.status == 200) {

                    }
                });

            },



            handleCovers(command){
                this.form.cover_name=command
            },
            handleProducts(command){
                this.form.product=command
            },
            handleActivation(command){
                this.form.activation_status=command
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            success() {
                this.$notify({
                    title: 'Success',
                    message: this.message,
                    type: 'success'
                });},
            cancelClicked(){
                this.$router.back();
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
