<template>
    <!--Create Policy-->
    <div class="page-table scrollable">
        <el-form ref="form"  :model="form" :rules="rules"  label-width="200px">
            <h2 class="animated fadeInDown" >Add a new Policy</h2>

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
                        <el-dropdown-item  v-bind:key="cover.motor_cover_id" v-for="cover in covers" :command=cover.cover_name>{{cover.cover_name}}</el-dropdown-item>
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
                <el-input type="number" v-model="form.premium"></el-input>
            </el-form-item>

            <el-form-item label="DOB" prop="applicant_dob">
                <el-col :span="11">
                    <el-date-picker value-format="yyyy-MM-dd" type="date" placeholder="Pick a date" v-model="form.applicant_dob" style="width: 70%;"></el-date-picker>
                </el-col></el-form-item>

            <el-form-item label="Applicant name" prop="applicant_name">
                <el-input v-model="form.applicant_name"></el-input>
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

            <el-form-item label="DL no" prop="applicant_dlno">
                <el-input type="number" v-model="form.applicant_dlno"></el-input>
            </el-form-item>

            <el-form-item  label="DL Photo:" prop="applicant_dlphoto">
                <input type="file" ref="applicant_dlphoto" @change="selectDlPhoto"/>
            </el-form-item>

            <el-form-item label="Make" prop="make">
                <el-input v-model="form.make"></el-input>
            </el-form-item>

            <el-form-item label="Model" prop="model">
                <el-input v-model="form.model"></el-input>
            </el-form-item>

            <el-form-item label="Engine no" prop="engine_no">
                <el-input v-model="form.engine_no"></el-input>
            </el-form-item>

            <el-form-item label="Chassis no" prop="chassis_no">
                <el-input v-model="form.chassis_no"></el-input>
            </el-form-item>

            <el-form-item label="Body type" prop="body_type">
                <el-input v-model="form.body_type"></el-input>
            </el-form-item>

            <el-form-item label="Vehicle registration no" prop="v_reg_no">
                <el-input v-model="form.v_reg_no"></el-input>
            </el-form-item>

            <el-form-item label="T Registration no" prop="t_reg_no">
                <el-input v-model="form.t_reg_no"></el-input>
            </el-form-item>

            <el-form-item label="Year of manufacture" prop="yr_of_manufacture">
                <el-date-picker v-model="form.yr_of_manufacture" type="year" placeholder="Pick a year"></el-date-picker>
            </el-form-item>

            <el-form-item label="Vehicle carrying capacity" prop="v_carrying_capacity">
                <el-input v-model="form.v_carrying_capacity"></el-input>
            </el-form-item>

            <el-form-item label="T carrying capacity" prop="t_carrying_capacity">
                <el-input v-model="form.t_carrying_capacity"></el-input>
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

            <el-form-item prop="included_benefits">
                <el-row>
                    <el-checkbox v-model="form.included_benefits">Included benefits</el-checkbox>
                    <el-checkbox v-model="form.included_excess">Included Excess</el-checkbox>
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
        name: "motor_policy_create",
        data(){
            return  {

                form: {
                    cover_name: 'Covers',
                    activation_status: 'PENDING',
                    applicant_idfront: '',
                    product_name:'Products',

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

                    application_date: [
                        { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                    ],
                    start_date: [
                        { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                    ],
                    end_date: [
                        { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
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
        created(){
            this.token=this.$store.getters.token;
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
                formData.append('applicant_idfront',this.form.applicant_idfront);
                formData.append('applicant_idback',this.form.applicant_idback);
                formData.append('applicant_photo',this.form.applicant_photo);
                formData.append('applicant_dlno',this.form.applicant_dlno);
                formData.append('applicant_dlphoto',this.form.applicant_dlphoto);
                formData.append('make',this.form.make);
                formData.append('model',this.form.model);
                formData.append('engine_no',this.form.engine_no);
                formData.append('chassis_no',this.form.chassis_no);
                formData.append('body_type',this.form.body_type);
                formData.append('v_reg_no',this.form.v_reg_no);
                formData.append('t_reg_no',this.form.t_reg_no);
                formData.append('yr_of_manufacture',this.form.yr_of_manufacture);
                formData.append('v_carrying_capacity',this.form.v_carrying_capacity);
                formData.append('t_carrying_capacity',this.form.t_carrying_capacity);
                formData.append('application_date',this.form.application_date);
                formData.append('start_date',this.form.start_date);
                formData.append('end_date',this.form.end_date);
                formData.append('included_benefits',this.form.included_benefits);
                formData.append('included_excess',this.form.included_excess);
                formData.append('activation_status',this.form.activation_status);
                formData.append('activation_comments',this.form.activation_comments);
                formData.append('activated_by',this.form.activated_by);
                formData.append('activated_on',this.form.activated_on);

                let url = this.url + '/motorpolicies';
                this.axios.post(url, formData, {headers: {'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer '+this.token
                    }}).then((response)=> {
                    if (response.status == 200){
                        this.message=response.data.message;
                        this.success();
                        this.$router.push('/motorpolicies/pending');
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

                    let url = this.url + '/motorpolicies/excel';
                    this.axios.post(url, formData, {headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+this.token
                        }}).then((response)=> {
                        if (response.status == 200){

                            this.message=response.data.message;
                            this.success();
                            this.$router.push('/motorpolicies/pending');
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
            selectDlPhoto() {
                this.form.applicant_dlphoto = this.$refs.applicant_dlphoto.files[0];
            },
            selectFileBack(){
                this.form.applicant_idback=this.$refs.applicant_idback.files[0];

            },
            selectFilePhoto(){
                this.form.applicant_photo=this.$refs.applicant_photo.files[0];

            },


            getCovers(){
                let url = this.url + '/motorcovers';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.covers=response.data.data;


                }).catch(err =>{


                    console.log(err);
                    if (err === 'Error: Request failed with status code 500') {

                        this.message='Token Expired. Please Log in';
                        this.error()
                        this.$router.push('/login');

                    }else{
                        this.message='Oops! Something went wrong. Please Sign in';
                        this.error()
                        this.$router.push('/login');

                    }
                });
            }, getProducts(){

                let url = this.url+ '/products';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.products=response.data.data;

                })

            },
            handleProduct(command){
                this.form.product_name=command;
            },
            handleCovers(command){
                this.form.cover_name=command
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
                this.$router.push('/motorpolicies/pending');
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

</style>