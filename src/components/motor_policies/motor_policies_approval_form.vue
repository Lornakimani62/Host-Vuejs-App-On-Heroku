<template>
    <div class="page-table scrollable">
        <el-form ref="form"  :model="form" :rules="rules"  label-width="200px">
            <h2 class="animated fadeInDown" >Approve Policy</h2>
            <el-form-item label="Policy no" prop="policy_no">
                <el-input v-model="form.policy_no"></el-input>
            </el-form-item>
            <el-form-item label="Activation Status">
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
        name: "motor_policies_approval_form",
        data(){
            return{
                id: '',
                currencies: [],
                products: [],
                covers: [],

                form: {
                    approval_status: 'Approval status',
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

        methods:{
            getPolicy(){
                let url = this.url+'/motorpolicies/'+this.$route.params.id;
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.form=response.data.data;

                }).catch(err =>{
                    this.$router.push('login');
                });
            },

            onSubmit(form){
                this.$refs[form].validate((valid) => {
                    if (valid) { let url = this.url + '/motorpolicies/'+this.id ;
                        this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+this.token
                            }}).then((response)=> {
                            if (response.status == 200){
                                this.message=response.data.message;
                                this.success();
                                this.$router.push('/motorpolicies/approved');
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

            handleActivation(command){
                this.form.activation_status=command
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
        },

        created(){
            this.id=this.$route.params.id;
            this.token=this.$store.getters.token;
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