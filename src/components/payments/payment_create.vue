<template>
    <!--Create Product-->
    <div class="page-table scrollable">

     <el-form ref="form" :rules="rules" :model="form"  label-width="150px">
            <h2 class="animated fadeInDown">Add new payment</h2>

         <el-form-item label="Upload Excel" prop="import" >
             <input type="file" ref="xlsx" @change="selectFile"/>
             <el-button type="warning" icon="el-icon-info" v-on:click="uploadXlsx">Import Excel</el-button>
         </el-form-item>


            <el-form-item label="Receipt no" prop="receipt_no">
                <el-input type="number" v-model="form.receipt_no"></el-input>
            </el-form-item>


            <el-form-item label="Choose currency:" prop="currency">
                <el-dropdown placement="bottom-start" v-model="form.currency" @command="handleCurrency" >
                    <span class="el-dropdown-link">{{form.currency}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  v-bind:key="currency.currency_code" v-for="currency in currencies" :command=currency.currency_code>{{currency.currency_name}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>


            <el-form-item label="Amount" prop="amount">
                <el-input type="number" v-model="form.amount"></el-input>
            </el-form-item>


            <el-form-item label="Paid by" prop="paid_by">
                <el-input v-model="form.paid_by"></el-input>
            </el-form-item>


            <el-form-item label="Payment type" prop="payment_type">
                <el-input v-model="form.payment_type"></el-input>
            </el-form-item>


            <el-form-item label="Payment channel" prop="payment_channel">
                <el-input v-model="form.payment_channel"></el-input>
            </el-form-item>
            <el-form-item label="Sales type" prop="sales_type">
                <el-input  v-model="form.sales_type"></el-input>
            </el-form-item>
            <el-form-item label="Agent code" prop="agent_code">
                <el-input type="number" v-model="form.agent_code"></el-input>
            </el-form-item>


            <el-form-item label="Payment Date" prop="payment_date">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="Pick a date" v-model="form.payment_date" style="width: 70%;"></el-date-picker>
                </el-col>
            </el-form-item>


            <el-form-item label="Mobile no" prop="mobile_number">
                <el-input type="number" v-model="form.mobile_number"></el-input>
            </el-form-item>


            <el-form-item label="Credit card" prop="credit_card_number">
                <el-input type="number" v-model="form.credit_card_number"></el-input>
            </el-form-item>


            <el-form-item label="Bank account no" prop="bank_account_no">
                <el-input type="number" v-model="form.bank_account_no"></el-input>
            </el-form-item>


            <el-form-item label="Transaction details" prop="transaction_details">
                <el-input autosize type="textarea" v-model="form.transaction_details"></el-input>
            </el-form-item>

            <el-form-item label="Policy no" prop="policy_no">
                <el-input type="number" v-model="form.policy_no"></el-input>
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
        name: "payment_create",
        data(){
            return  {
                currencies: [],
                form: {
                    currency: 'Currency'
                },
                message: '',
                token: '',
                //Form validation rules
                rules: {
                    receipt_no: [
                        {required: true, message: 'Please enter receipt no', trigger: 'blur'},
                    ],
                    currency: [
                        {required: true, message: 'Please enter currency', trigger: 'blur'},
                    ],
                    amount: [
                        {required: true, message: 'Please enter amount', trigger: 'blur'},
                    ],
                    paid_by: [
                        {required: true, message: 'Please enter a name', trigger: 'blur'},
                    ],
                    payment_type: [
                        {required: true, message: 'Please enter payment type', trigger: 'blur'},
                    ],
                    payment_channel: [
                        {required: true, message: 'Please enter payment channel', trigger: 'blur'},
                    ],
                    sales_type: [
                        {required: true, message: 'Please enter sales type', trigger: 'blur'},
                    ],
                    payment_date: [
                        { type: 'date', required: true, message: 'Please payment date', trigger: 'change' }
                    ],
                    agent_code: [
                        {required: true, message: 'Please enter agent code', trigger: 'blur'},
                    ],
                    mobile_number: [
                        {required: true, message: 'Please enter mobile no', trigger: 'blur'},
                    ],
                    credit_card_number: [
                        {required: true, message: 'Please enter credit card no', trigger: 'blur'},
                    ],
                    bank_account_no: [
                        {required: true, message: 'Please enter bank account no', trigger: 'blur'},
                    ],
                    transaction_details: [
                        {required: true, message: 'Please enter transaction details', trigger: 'blur'},
                    ],
                    policy_no: [
                        {required: true, message: 'Please enter policy no', trigger: 'blur'},
                    ]
                }

            }
        },
        created(){
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getCurrencies();
        },
        methods: {
            //Validate and submit
            onSubmit(form){

                this.$refs[form].validate((valid) => {
                    if (valid) {
                let url = this.url + '/payments';
                this.axios.post(url, this.form, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+this.token
                    }}).then((response)=> {
                    if (response.status == 200){
                        console.log('3');
                        this.message=response.data.message;
                        this.success();
                        this.$router.push('/payments');
                    }
                    else if (response.status != 200){
                        this.message=response.data.message;
                        this.error();
                    }
                }); }else{
                        this.message='Fill all required entries';
                        this.error();
                        return false;
                    }
                });
            },
            selectFile() {
                this.xlsx = this.$refs.xlsx.files[0];
            },
            uploadXlsx(){

                if (this.xlsx != ''){
                    const formData = new FormData();
                    formData.append('xlsx',this.xlsx);
                    let url = this.url + '/payments/excel';
                    this.axios.post(url, formData, {headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+this.token
                        }}).then((response)=> {
                        if (response.status == 200){
                            this.message=response.data.message;
                            this.success();
                            this.$router.push('/payments');
                            this.xlsx='';
                        }
                        else if (response.status == 400){
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

            getCurrencies(){
                let url = this.url + '/currencies';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.currencies=response.data.data;
                });
            },
            handleCurrency(command){
                this.form.currency=command;

            },
            success() {
                this.$notify({
                    title: 'Success',
                    message: this.message,
                    type: 'success'
                });},
            cancelClicked(){
                this.$router.push('/payments');
            },
            error() {
                this.$notify({
                    title: 'Error',
                    message: this.message,
                    type: 'error'
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
