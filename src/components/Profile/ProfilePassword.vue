<template>
    <div class="page-profile-edit">
        <!--Edit Form-->
        <el-form :model="form" status-icon :rules="rules" ref="form"   label-width="130px" >

            <el-col>
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item label="New Password" prop="password">
                        <el-input type="password" v-model="form.password"/>
                    </el-form-item>
                </el-col>
            </el-col>

                <el-col>
                    <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                        <el-form-item label="Confirm Password"  prop="confirmPassword">
                            <el-input type="password" v-model="form.confirmPassword"/>
                        </el-form-item>
                    </el-col>
                </el-col>

            <el-col>
                <el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('form')">Submit</el-button>
                    </el-form-item>
                </el-col>
            </el-col>
        </el-form>

    </div>
</template>

<script>
    export default {
        name: "ProfilePassword",
        data(){

            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the password'));
                } else {
                    if (this.form.confirmPassword !== '') {
                        this.$refs.form.validateField('confirmPassword');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the password again'));
                } else if (value !== this.form.password) {
                    callback(new Error('Two inputs don\'t match!'));
                } else {
                    callback();
                }
            };

            return {
                authForm: {

                },
                form: {

                },
                message:'',
                password:'',
                username:'',
                rules: {
                    password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    confirmPassword: [
                        {validator: validatePass2, trigger: 'blur'}
                    ]
                }
            };
        },
        methods:{



            getProfile(){
                let url = this.url + '/users/'+ this.username;
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                        this.authForm=response.data.data;
                    }
                );
            },




            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.form.username=this.authForm.username;

                        let url = this.authUrl + '/resettemppassword';
                        this.axios.put(url, this.form, {headers:{'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+ this.token
                            }}).then((response) => {

                            this.message=response.data.message;
                            this.success();
                            this.form={};

                        });

                    } else {
                        console.log('error submit!!');
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
            resetForm(form) {
                this.$refs[form.resetFields()];
            },

            resizeLabelPosition() {
                if(window.innerWidth <= 768) {
                    this.labelPosition = 'top'
                }
            }
        },

            created(){
                this.token=this.$store.getters.token;
                this.url=this.$store.getters.url;
                this.authUrl=this.$store.getters.authUrl;
                this.authForm.username=this.$store.getters.username;
                this.username=this.$store.getters.username;
                this.getProfile();

            },
            mounted() {
                this.resizeLabelPosition();
                window.addEventListener('resize', this.resizeLabelPosition);
            },
            beforeDestroy() {
                window.removeEventListener('resize', this.resizeLabelPosition);
            }
        }
</script>

<style lang="scss" scoped>
    @import '../../assets/scss/_variables';

    .page-profile-edit {
        .label-switch-box {
            display: block;
            clear: both;
            width: 100%;
            text-align: right;
            margin-bottom: 20px;
        }
        .col-p {
            padding: 0 10px;
            box-sizing: border-box;
        }
        .select-wide {
            width: 100%;
        }
    }
</style>

