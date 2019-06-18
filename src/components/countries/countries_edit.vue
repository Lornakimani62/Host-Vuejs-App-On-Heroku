<template>
    <!--Displays countries edit form-->
    <div class="page-table scrollable">
        <h2 class="animated fadeInDown" >Edit Entry</h2>
        <el-form ref="form" :rules="rules" :model="form" label-width="120px">

            <el-form-item label="Country code" prop="country_code">
                <el-input placeholder="eg: 254" v-model="form.country_code" ></el-input>
            </el-form-item>
            <el-form-item label="Country name" prop="country_name">
                <el-input placeholder="eg: Kenya" v-model="form.country_name" ></el-input>
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
        name: "countries_edit",
        data(){
            return{
                id: '',
                form:{},
                token: '',
                message: '',
                url:'',
                // form validation rules
                rules: {
                    country_code: [
                        {required: true, message: 'Please input country code', trigger: 'blur'},
                        {min: 3, max: 5, message: 'Length should be 3 or less', trigger: 'blur'}
                    ],
                    country_name: [
                        {required: true, message: 'Please input country name', trigger: 'blur'},
                        {min: 4, message: 'Country name should be at least 4 characters', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            // Cancel button clicked
            cancelClicked(){
                this.$router.push('/countries');
            },
            //Checks whether it passes the validation rules and if true, submits a put request to the api
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                        if (valid) {
                            let url = this.url + '/countries/'+this.id ;
                            this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
                                    'Authorization': 'Bearer '+this.token
                                }}).then((response)=> {
                                    if (response.status == 200){
                                    this.message=response.data.message;
                                    this.success();
                                    this.$router.push('/countries');

                                }
                });}
                        else{
                            this.message='Try Again';
                            this.error();
                            return false;
                        }
                });
            },
            //Gets the country using route params whose value matches the countries id and adds it to the form data object which can be edited
            getCountry(){
                let url = this.url+'/countries/'+this.$route.params.id;
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.form=response.data.data;
                    console.log(response.data.data);
                    this.checkStatus(response);


                }).catch(err =>{
                    this.$router.push('login');
                });

            },
            checkStatus(res){
                if (res.status == 500 || this.$store.getters.token == ''){
                    this.$store.commit('setLogout');
                }
            },
            //Success notification
            success() {
                this.$notify({
                    title: 'Success',
                    message: this.message,
                    type: 'success'
                });},

        },
        // initializes the id value to the router parameter
        // initializes the token object with its value from the store
        //Runs the getCountry function to initialize the form object
        created(){
            this.id=this.$route.params.id;
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getCountry();
        }
    }
</script>

<style scoped>

</style>