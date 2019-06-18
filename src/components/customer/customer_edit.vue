<template>
    <div class="page-table scrollable">
        <!--Customer edit form-->
        <h2 class="animated fadeInDown" >Edit Entry</h2>

        <el-form ref="form" :rules="rules" :model="form" label-width="120px">

            <el-form-item label="First Name" prop="first_name">
                <el-input v-model="form.first_name"></el-input>
            </el-form-item>
            <el-form-item label="Last Name" prop="last_name">
                <el-input v-model="form.last_name"></el-input>
            </el-form-item>
            <el-form-item lang="en" label="Date of Birth" prop="dob">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="Pick a date" v-model="form.dob" style="width: 100%;"></el-date-picker>
                </el-col>
         </el-form-item>
            <el-form-item label="National ID" prop="id_no">
                <el-input type="number" v-model="form.id_no"></el-input>
            </el-form-item>
            <el-form-item label="KRA Pin" prop="kra_pin">
                <el-input v-model="form.kra_pin"></el-input>
            </el-form-item>
            <el-form-item label="Occupation" prop="occupation">
                <el-input v-model="form.occupation"></el-input>
            </el-form-item>
            <el-form-item label="Mobile No" prop="mobile_no">
                <el-input type="number" v-model="form.mobile_no"></el-input>
            </el-form-item>
            <el-form-item label="email" prop="email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="Location" prop="location">
                <el-input v-model="form.location"></el-input>
            </el-form-item>
            <el-form-item label="Postal Address" prop="postal_address">
                <el-input type="number" v-model="form.postal_address"></el-input>
            </el-form-item>
            <el-form-item label="Postal Code" prop="postal_code">
                <el-input type="number" v-model="form.postal_code"></el-input>
            </el-form-item>
            <el-form-item label="Town" prop="town">
                <el-input v-model="form.town"></el-input>
            </el-form-item>
            <el-form-item label="NOK Full name" prop="nok_fullname">
                <el-input v-model="form.nok_fullname"></el-input>
            </el-form-item>
            <el-form-item label="NOK Mobile No" prop="nok_mobileno">
                <el-input type="number" v-model="form.nok_mobileno"></el-input>
            </el-form-item>
            <el-form-item label="NOK Relation" prop="nok_relation">
                <el-input v-model="form.nok_relation"></el-input>
            </el-form-item>
            <el-form-item label="Sales Channel">
                <el-dropdown @command="handleChannel">
                    <span class="el-dropdown-link">{{form.sales_channel}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="SELF">SELF</el-dropdown-item>
                        <el-dropdown-item command="AGENT">AGENT</el-dropdown-item>
                        <el-dropdown-item command="BROKER">BROKER</el-dropdown-item>
                        <el-dropdown-item command="AGGREGATE">AGGREGATE</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
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
        name: "customer_edit",
        data(){
            return{
                id: '',
                form:{},
                token: '',
                message: '',
                url: '',
                // Form validation rules
                rules: {
                    first_name: [
                        {required: true, message: 'Please enter the First name', trigger: 'blur'},
                        {type: 'string', message: 'Please enter a valid name', trigger: 'blur'}
                    ],
                    last_name: [
                        {required: true, message: 'Please enter the Last name', trigger: 'blur'},
                        {type: 'string', message: 'Please enter a valid name', trigger: 'blur'}
                    ],

                    id_no: [
                        {required: true, message: 'Please enter the ID no', trigger: 'blur'},
                        {min: 8, max: 8, message: 'Please enter an 8 digit ID no', trigger: 'blur'}
                    ],
                    kra_pin: [
                        {required: true, message: 'Please input First name', trigger: 'blur'},
                        {min: 11, max: 11, message: 'Please enter 8 character KRA PIN', trigger: 'blur'}
                    ],
                    occupation: [
                        {required: true, message: 'Please enter occupation', trigger: 'blur'},
                        {type: 'string', message: 'Please input a valid occupation', trigger: 'blur'}
                    ],
                    mobile_no: [
                        {required: true, message: 'Please input mobile no', trigger: 'blur'},
                        { min: 10, max: 10, message: 'Mobile no. should contain 10 digits', trigger: 'blur'}
                    ],
                    email: [
                        { required: true, message: 'Please input email address', trigger: 'blur' },
                        { type: 'email', message: 'Please input a valid email address', trigger: ['blur', 'change'] }
                    ],

                    location: [
                        {required: true, message: 'Please input a location', trigger: 'blur'},
                        {type: 'string', message: 'Please input a valid location', trigger: 'blur'}
                    ],
                    postal_address: [
                        {required: true, message: 'Please input a postal address', trigger: 'blur'},

                    ],
                    postal_code: [
                        {required: true, message: 'Please input a postal code', trigger: 'blur'},
                    ],
                    town: [
                        {required: true, message: 'Please input a town name', trigger: 'blur'},
                        {type: 'string', message: 'Please input a valid town name', trigger: 'blur'}
                    ],
                    nok_fullname: [
                        {required: true, message: 'Please input the Next of Kin name', trigger: 'blur'},
                        {type: 'string', message: 'Please input a valid next of Kin name', trigger: 'blur'}
                    ],
                    nok_mobileno: [
                        {required: true, message: 'Please input next of kin mobile no', trigger: 'blur'},
                        {min: 10, max: 10, message: 'Mobile no. should contain 10 digits', trigger: 'blur'}

                    ],
                    nok_relation: [
                        {required: true, message: 'Please input next of kin relation', trigger: 'blur'},
                        {type: 'string', message: 'Please input a relation', trigger: 'blur'}
                    ],


                }
            }
        },

        methods: {
            cancelClicked(){
                this.$router.back();
            },



                // Validates form and its okay submits a put request to the api sending the edited form values
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                        if (valid) {
                let url = this.url+'/customers/'+this.id ;
                this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+this.token
                    }}).then((response)=> {
                        if (response.status == 200){
                        this.message=response.data.message;
                        this.success();
                        this.$router.push('/customers');

                    }
                })
                        }else{
                            this.message='Fill all required entries';
                            this.error();
                            return false;
                        }
                }).catch(err =>{
                    this.$router.push('login');
                });
            },
            success() {
                this.$notify({
                    title: 'Success',
                    message: this.message,
                    type: 'success'
                });
            },

            // Get customer details using the router params which matches  the unique customer id and the api responds with a single customer value which is to be edited
            getCustomer(){
                let url = this.url+'/customers/'+this.$route.params.id;
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.form=response.data.data;

                }).catch(err =>{
                    this.$router.push('login');
                });

            },
            handleChannel(command){
                this.form.sales_channel=command
            }
        },
        created(){
            this.id=this.$route.params.id;
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getCustomer();
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