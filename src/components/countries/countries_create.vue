<template>
<!--Displays Country's input form-->
    <div class="page-table scrollable">
         <el-form  :rules="rules" :model="addForm" ref="addForm" label-width="120px">
            <h2 class="animated fadeInDown" >Add new country</h2>
            <el-form-item label="Country code" prop="country_code">
                <el-input type="number" placeholder="eg: 254" v-model="addForm.country_code"></el-input>
            </el-form-item>
            <el-form-item label="Country name" prop="country_name">
                <el-input type="text" placeholder="Kenya" v-model="addForm.country_name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('addForm')">SAVE</el-button>
                <el-button  @click="cancelClicked">CLOSE</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "countries_create",
        data(){
            return {

                addForm: {},
                message: '',
                token: '',
                url:'',
                // Form validation rules
                rules: {
                    country_code: [

                        {required: true, message: 'Please input country code', trigger: 'blur'},
                        {min: 1, max: 3, message: 'Length should be between 1 to 3 digits', trigger: 'change'}
                    ],
                    country_name: [
                        {required: true, message: 'Please input country name', trigger: 'blur'},
                        {type: 'string', message: 'Please input a valid country name', trigger: 'change'},
                        {min: 4, message: 'Country name should be at least 4 characters', trigger: 'blur'}
                    ]
                }
            }
        },
        created(){
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
        },
        methods: {
            // Checks form validation and if true submits a post request to the api
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let url = this.url + '/countries';
                        this.axios.post(url, this.addForm, {headers: {'Content-Type': 'application/json',
                                    'Authorization': 'Bearer '+this.token
                                }}).then((response)=> {
                              if (response.status == 200){

                                    this.message=response.data.message;
                                    this.success();
                                    this.$router.push('/countries');
                                    this.checkStatus(response);
                                }
                                else if (response.status != 200){
                                    this.message=response.data.message;
                                    this.error();
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
            checkStatus(res){
                if (res.status == 500 || this.$store.getters.token == ''){
                    this.$store.commit('setLogout');
                }
            },
            // Success and error notifications
            success() {
                this.$notify({
                    title: 'Success',
                    message: this.message,
                    type: 'success'
                });},
            error() {
                this.$notify({
                    title: 'ERROR',
                    message: this.message,
                    type: 'error'
                });
            },
            // cancel button clicked
            cancelClicked(){
                this.$router.push('/countries');
            }

        }


    }
</script>

<style scoped>

</style>