<template>
    <!--Create Customer form-->
    <div class="page-table scrollable">

     <el-form ref="addForm" :model="addForm" :rules="rules" label-width="130px">
            <h2 class="animated fadeInDown" >Add Customer</h2>
         <el-form-item label="Upload Excel" prop="import" >
             <input type="file" ref="xlsx" @change="selectFile"/>
             <el-button type="warning" icon="el-icon-info" v-on:click="uploadXlsx">Import Excel</el-button>
         </el-form-item>

            <el-form-item label="First Name" prop="first_name">
                <el-input type="text" v-model="addForm.first_name"></el-input>
            </el-form-item>

            <el-form-item label="Last Name" prop="last_name">
                <el-input v-model="addForm.last_name"></el-input>
            </el-form-item>

            <el-form-item label="Date of Birth" prop="dob">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="Pick a date" v-model="addForm.dob" style="width: 70%;"></el-date-picker>
                </el-col>
            </el-form-item>

            <el-form-item label="National ID" prop="id_no">
                <el-input type="number" v-model="addForm.id_no"></el-input>
            </el-form-item>

            <el-form-item label="KRA Pin" prop="kra_pin">
                <el-input v-model="addForm.kra_pin"></el-input>
            </el-form-item>

            <el-form-item label="Occupation" prop="occupation">
                <el-input v-model="addForm.occupation"></el-input>
            </el-form-item>

            <el-form-item label="Mobile No" prop="mobile_no">
                <el-input type="number" v-model="addForm.mobile_no"></el-input>
            </el-form-item>

            <el-form-item label="email" prop="email">
                <el-input v-model="addForm.email"></el-input>
            </el-form-item>

            <el-form-item label="Location" prop="location">
                <el-input v-model="addForm.location"></el-input>
            </el-form-item>

            <el-form-item label="Postal Address" prop="postal_address">
                <el-input type="number" v-model="addForm.postal_address"></el-input>
            </el-form-item>

            <el-form-item label="Postal Code" prop="postal_code" >
                <el-input type="number" v-model="addForm.postal_code"></el-input>
            </el-form-item>

            <el-form-item label="Town" prop="town">
                <el-input v-model="addForm.town"></el-input>
            </el-form-item>

            <el-form-item label="NOK Full name" prop="nok_fullname">
                <el-input v-model="addForm.nok_fullname"></el-input>
            </el-form-item>

            <el-form-item label="NOK Mobile No" prop="nok_mobileno">
                <el-input v-model="addForm.nok_mobileno"></el-input>
            </el-form-item>

            <el-form-item label="NOK Relation" prop="nok_relation">
                <el-input v-model="addForm.nok_relation"></el-input>
            </el-form-item>

             <el-form-item label="Sales Channel">
                 <el-dropdown @command="handleChannel">
                     <span class="el-dropdown-link">{{addForm.sales_channel}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                     <el-dropdown-menu slot="dropdown">
                         <el-dropdown-item command="SELF">SELF</el-dropdown-item>
                         <el-dropdown-item command="AGENT">AGENT</el-dropdown-item>
                         <el-dropdown-item command="BROKER">BROKER</el-dropdown-item>
                         <el-dropdown-item command="AGGREGATE">AGGREGATE</el-dropdown-item>
                     </el-dropdown-menu>
                 </el-dropdown>
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
        name: "customer_create",
        data(){
            return  {

                addForm: {
                    sales_channel: 'Sales channel'
                },
                message: '',
                token: '',
                xlsx:'',

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
                    dob: [
                        { type: 'date', required: true, message: 'Please pick a date', trigger: 'change'}
                    ],
                    id_no: [
                        {required: true, message: 'Please enter the ID no', trigger: 'blur'},
                        {min: 8, max: 8, message: 'Please enter an 8 digit ID no', trigger: 'blur'}
                    ],
                    kra_pin: [
                        {required: true, message: 'Please enter a KRA no', trigger: 'blur'},
                        {min: 11, max: 11, message: 'Please enter 11 character KRA PIN', trigger: 'blur'}
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
                        { type: 'email', message: 'Please input a valid email address', trigger: 'change' }
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
                        ],
                    nok_fullname: [
                        {required: true, message: 'Please input the Next of Kin name', trigger: 'blur'},
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
        created(){
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
        },
        methods: {
            //validates the form and submits a post request to the api
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                    let url = this.url + '/customers';
                    this.axios.post(url, this.addForm, {headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+this.token
                        }}).then((response)=> {
                        if (response.status == 200){
                            this.message=response.data.message;
                            this.success();
                            this.$router.push('/customers');
                        }
                        else if (response.status != 200){
                            this.message=response.data.message;
                            this.error();
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
            selectFile() {
                this.xlsx = this.$refs.xlsx.files[0];
            },
            handleChannel(command){
                this.addForm.sales_channel=command
            },
            uploadXlsx(){
                if (this.xlsx != ''){
                    const formData = new FormData();
                    formData.append('xlsx',this.xlsx);
                    let url = this.url + '/customers/excel';
                    this.axios.post(url, formData, {headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+this.token
                        }}).then((response)=> {
                        if (response.status == 200){
                            this.message=response.data.message;
                            this.success();
                            this.$router.push('/customers');
                            this.xlsx='';
                        }
                        else {
                            this.message='';
                            this.error();
                        }

                    }).catch(err =>{
                        this.$router.push('login');
                    });
                }else{
                    this.message='Please select a file';
                    this.error();
                }
            },
            //success notification
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
                this.$notify.error({
                    title: 'Customer ID should be unique',
                    message: this.message,

                });
            }
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