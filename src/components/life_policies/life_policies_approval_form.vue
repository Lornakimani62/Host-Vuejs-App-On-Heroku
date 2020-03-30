<template>
    <div class="page-table scrollable">
        <el-form ref="form"  :model="form" :rules="rules"  label-width="200px">
            <!-- <h2 class="animated fadeInDown" >Add new Policy</h2> -->
            <el-form-item label="Policy no" prop="policy_no">
                <el-input disabled v-model="form.policy_no"></el-input>
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
        <el-input  type="textarea" v-model="form.activation_comments"></el-input>
    </el-form-item>

    <el-form-item label="Activated by" prop="activated_by">
        <el-input v-model="form.activated_by"></el-input>
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
    import XLSX from 'xlsx';

    export default {
        name:"life_policies_approve",
        data(){
            return{
                id: '',
                disabled: 'true',
                form: {

                },
                notificationForm: {
                    email:'',
                    phone_number:''
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
                                this.notificationForm.email=this.form.applicant_email;
                                this.notificationForm.phone_number=this.form.applicant_phone_number;
                               if(this.form.activation_status==='APPROVED'){
                                    // this.emailNotification();
                                    // this.smsNotification();
                                }
                                this.message=response.data.message;
                                this.success();
                                this.$router.push('/lifepolicies/approved');
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
                let url = this.url + '/policies/'+this.$route.params.id;
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.form=response.data.data;
                }).catch(err =>{
                });
            },

            //Email notification
            emailNotification(){
                let url =this.notificationUrl + '/email/approvedpolicy';
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
                              let url =this.notificationUrl + '/message/approvedpolicy';
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
            cancelClicked(){
                this.$router.back();
            },
            handleActivation(command){
                this.form.activation_status=command
                if (command == 'APPROVED'){
                    this.disabled = 'false'
                }else{
                    this.disabled = 'true'
                }
            }
        },
        created(){
            this.id=this.$route.params.id;
            this.token=this.$store.getters.token;
            this.notificationToken=this.$store.getters.notificationToken;
            this.notificationUrl=this.$store.getters.notificationUrl;
            this.url=this.$store.getters.url;
            this.getPolicy();
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


