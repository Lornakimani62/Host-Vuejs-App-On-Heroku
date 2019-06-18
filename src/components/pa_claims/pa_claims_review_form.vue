<template>
    <!--Edit Policy-->
    <div class="page-table scrollable">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
            <h2 class="animated fadeInDown" >Review Claim</h2>

            <el-form-item label="Claim Ref No" prop="claim_refno">
                <el-input disabled type="text" v-model="form.claim_refno"></el-input>
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
                        <el-dropdown-item  command="REJECTED">APPROVED</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>

            <el-form-item label="Approval Comments" prop="approval_comments">
                <el-input autosize type="textarea" v-model="form.approval_comments"></el-input>
            </el-form-item>

            <el-form-item label="Approved on" prop="approved_on">
                <el-col >
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
        name: "pa_policies_approve_form",
        data(){
            return{
                id: '',
                form: {

                },
                covers:[],
                products:[],
                underwriters:[],
                token: '',
                message: '',
                // Form validation rules
                rules: {
                    claim_refno: [
                        {required: true, message: 'Please enter claims ref no', trigger: 'blur'},
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
                        let url = this.url + '/paclaims/'+this.id ;
                        this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+this.token
                            }}).then((response)=> {
                            if (response.status == 200){
                                this.message=response.data.message;
                                this.success();
                                this.$router.push('/paclaimsnew');
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
                });
            },

            getClaims(){
                let url = this.url + '/paclaims/'+this.$route.params.id;
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                        this.form=response.data.data;
                }).catch(err =>{
                    this.$router.push('login');
                });
            },

            cancelClicked(){
                this.$router.push('/paclaimsnew');
            },
			handleApproval(command){
                this.form.approval_status=command;
            }
        },
        created(){
            this.id=this.$route.params.id;
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getClaims();

        }
    }
</script>

<style scoped>

</style>