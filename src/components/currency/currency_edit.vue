<template>
    <div class="page-table scrollable">
        <h2 class="animated fadeInDown" >Edit Entry</h2>
        <!-- Displays the currency edit form-->

        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
            <el-form-item label="Currency Code" prop="currency_code">
                <el-input placeholder="eg: KES" v-model="form.currency_code"></el-input>
            </el-form-item>
            <el-form-item label="Currency name" prop="currency_name">
                <el-input placeholder="eg: Kenyan Shilling" v-model="form.currency_name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">Save</el-button>
                <el-button v-on:click="cancelClicked">Cancel</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    export default {
        name: "currency_edit",
        data(){
            return{
                id: '',
                form:{},
                token: '',
                message: '',
                url: '',
                // Edit form input vslidation rules
                rules: {
                    currency_code: [
                        {required: true, message: 'Please input currency code', trigger: 'blur'},
                        {min: 3, max: 3, message: 'Length should be 3 letters', trigger: 'blur'}
                    ],
                    currency_name: [
                        {required: true, message: 'Please input currency name', trigger: 'blur'},
                        {min: 3, message: 'Currency name should be at least 3 characters', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            cancelClicked(){
                this.$router.push('/currency');
            },
            // Validates the edit form and if it returns true updates the db values
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                        if (valid) {
                let url = this.url + '/currencies/'+this.id ;
                this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+this.token
                    }}).then((response)=> {
                    if (response.status == 200){
                        this.message=response.data.message;
                        this.success();
                        this.$router.push('/currency');

                    }
                })
                    .catch(err =>{
                    this.$router.push('login');
                });
                        }else{
                            this.message='Try Again';
                            this.error();
                            return false;
                        }
                });
            },
            // Notifications
            success() {
                this.$notify({
                    title: 'Success',
                    message: this.message,
                    type: 'success'
                });},
            error() {
                this.$notify.error({
                    title: 'ERROR',
                    message: 'Error! Please Try again',
                    type: 'error'
                });
            },
            // Gets he unique currency row to be edited and initializes th form object with the response data
            getCurrency(){
                let url = this.url + '/currencies/'+this.$route.params.id;
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.form=response.data.data;

                });

            },

        },
        created(){
            this.id=this.$route.params.id;
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getCurrency();
        }
    }
</script>

<style scoped>

</style>