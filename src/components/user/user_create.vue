<template>
    <div class="page-table scrollable">
        <el-form ref="form" status-icon :rules="rules" :model="form">

            <el-form-item >
                <h2 class="animated fadeInDown" >Add new user</h2>
            </el-form-item>
            <el-form-item prop="fullname" >
                <el-input placeholder="Full name" v-model="form.fullname"></el-input>
            </el-form-item>
            <el-form-item  prop="id_no" >
                <el-input placeholder="ID number" type="number" v-model="form.id_no"></el-input>
            </el-form-item>

            <el-form-item  prop="mobile_no" >
                <el-input placeholder="Mobile no" type="number" v-model="form.mobile_no"></el-input>
            </el-form-item>

            <el-form-item  prop="email" >
                <el-input placeholder="Email" v-model="form.email"></el-input>
            </el-form-item>

            <el-form-item  prop="username" >
                <el-input  placeholder="Username" v-model="form.username"></el-input>
            </el-form-item>

            <el-form ref="pForm" status-icon :rules="pRules" :model="pForm">
                <el-form-item  prop="password">
                    <el-input placeholder="Password" type="password"  v-model="pForm.password"></el-input>
                </el-form-item>
                <el-form-item  prop="confirmPassword">
                    <el-input placeholder="Confirm Password" type="password"  v-model="pForm.confirmPassword"></el-input>
                </el-form-item>
            </el-form>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('form','pForm')" class=" tada animated">SAVE</el-button>
                <el-button  @click="cancelClicked">CLOSE</el-button>
            </el-form-item>


        </el-form>

    </div>
</template>

<script>
    export default {
        name: 'Register',
        data() {

            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the password'));
                } else {
                    if (this.pForm.confirmPassword !== '') {
                        this.$refs.pForm.validateField('confirmPassword');
                    }
                    callback();
                }
            };

            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the password again'));
                } else if (value !== this.pForm.password) {
                    callback(new Error('Two inputs don\'t match!'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    password:''
                },
                pForm: {
                    password: '',
                    confirmPassword: ''
                },
                notificationCredentials: {
                    email:'',
                    phone_number:'',
                    password:'test',
                    username:'cketer'
                },
                token: '',
                authUrl:'',
                notificationAuthUrl:'',
                notificationToken:'',
                dialogImageUrl: '',
                dialogVisible: false,
                //Form validation rules
                rules: {
                    fullname: [
                        {required: true, message: 'Please enter a name', trigger: 'blur'}
                    ],
                    id_no: [
                        {required: true, message: 'Please enter an ID No', trigger: 'blur'},
                        {min: 8, max: 8, message: 'Please enter an 8 digit ID no', trigger: 'blur'}

                    ],
                    email: [
                        {type: "email",required: true, message: 'Please enter an email', trigger: 'blur'}
                    ],
                    mobile_no: [
                        {required: true, message: 'Please enter a mobile no', trigger: 'blur'},
                        {min: 10, max: 10, message: 'Please enter a 10 digit mobile no', trigger: 'blur'}

                    ],
                    username: [
                        {required: true, message: 'Please enter a username', trigger: 'blur'}
                    ]
                },


                //Password validation rules
                pRules: {
                    password: [
                        // {required: true, message: 'Please enter a password', trigger: 'blur'},
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    confirmPassword: [
                        // {required: true, message: 'Please confirm password', trigger: 'blur'},
                        {validator: validatePass2, trigger: 'blur'}
                    ]
                }
            }
        },
        created(){

            this.token=this.$store.getters.token;
            this.authUrl=this.$store.getters.authUrl;
            this.notificationAuthUrl=this.$store.getters.notificationAuthUrl;
            this.notificationUrl=this.$store.getters.notificationUrl;
        },
        methods: {
            onSubmit(form, form2) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.$refs[form2].validate((valid2) => {
                            if (valid2){
                                this.form.password=this.pForm.password;
                                let url =this.authUrl + '/register';
                                this.axios.post(url, this.form, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': 'Bearer ' + this.token
                                    }
                                }).then((response) => {
                                    if (response.status == 200) {
                                        this.message = response.data.message;
                                        this.success();
                                        this.notificationCredentials.email=this.form.email;
                                        this.notificationCredentials.phone_number=this.form.mobile_no;
                                        this.notificationLogin();

                                    } else if (response.status == 400) {
                                        this.error();
                                    }
                                })
                                        .catch(err =>{
                                            this.message='Try Again! Fill in all entries';
                                            this.error();
                                        })
                            }
                        });
                    }
                });
            },

            //Login to messaging API
            notificationLogin(){
                let url=this.notificationAuthUrl+'/login';
                this.axios.post(url,this.notificationCredentials,{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    if (response.status == 200) {
                        this.notificationToken=response.data.token;
                        this.emailNotification();
                        this.smsNotification();
                        this.$store.commit('setNotificationToken',this.notificationToken);
                        this.$router.back();
                    }
                });
            },

            //Email notification
            emailNotification(){
                let url =this.notificationUrl + '/email/registeruser';
                this.axios.post(url, this.notificationCredentials, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.notificationToken
                    }
                }).then((response) => {
                    if (response.status == 200) {
                        this.message = response.data.message
                        this.success();
                    }
                });

            },

            //SMS NOTIFICATION
            smsNotification(){
                let url =this.notificationUrl + '/message/registeruser';
                this.axios.post(url, this.notificationCredentials, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + this.notificationToken
                    }
                }).then((response) => {
                    if (response.status == 200) {
                        this.message = response.data.message;
                        this.success();
                    }
                });

            },
            cancelClicked(){
                this.$router.back();
            },
            success() {
                this.$notify({
                    title: 'Success',
                    message: this.message,
                    type: 'success'
                });
            },
            error() {
                this.$notify({
                    title: 'ERROR',
                    message: this.message,
                    type: 'error'
                });
            },





        }}
</script>

<style scoped>


</style>