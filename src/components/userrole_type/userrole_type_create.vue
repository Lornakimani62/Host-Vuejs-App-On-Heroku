<template>
    <div class="page-table scrollable">
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
            <h2 class="animated fadeInDown" >Add new role type</h2>

            <el-form-item label="Role name" prop="role_name" >
                <el-input  v-model="form.role_name"></el-input>
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
        name: "userrole-type-create",
        data(){
            return  {

                form: {},
                message: '',
                token: '',
                url: '',
                rules: {
                    role_name: [
                        {required: true, message: 'Please enter a role', trigger: 'blur'}
                    ],
                    added_by: [
                        {required: true, message: 'Please enter a name', trigger: 'blur'}
                    ],
                    added_on: [
                        { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                    ]
                }
            }
        },
        created(){
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;

        },
        methods: {
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.form.added_by=this.$store.getters.username;
                        let url = this.url + '/userroletypes';
                        this.axios.post(url, this.form, {headers: {'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+this.token
                            }}).then((response)=> {
                            if (response.status == 200){

                                this.message=response.data.message;
                                this.success();
                                this.$router.push('/userroletype');
                            }
                            else if (response.status == 400){
                                this.error();
                            }
                        });
                    }else{
                        this.message='Fill in all required entries';
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
            cancelClicked(){
                this.$router.back();
            },
            error() {
                this.$notify({
                    title: 'ERROR',
                    message: this.message,
                    type: 'error'
                });
            }
        }


    }
</script>

<style scoped>

</style>