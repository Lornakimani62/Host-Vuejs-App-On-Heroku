<template>
    <!--Edit payment-->
    <div class="page-table scrollable">



        <el-form ref="form" :rules="rules" :model="form"  label-width="150px">
            <h2 class="animated fadeInDown">Edit payment</h2>

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
                <el-input type="textarea" v-model="form.sales_type"></el-input>
            </el-form-item>
            <el-form-item label="Agent code" prop="agent_code">
                <el-input type="number" v-model="form.agent_code"></el-input>
            </el-form-item>


            <el-form-item label="Payment date" prop="payment_date">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="Pick a date" v-model="form.payment_date" style="width: 70%;"></el-date-picker>
                </el-col></el-form-item>

            <el-form-item label="Mobile no" prop="mobile_number">
                <el-input type="number" v-model="form.mobile_number"></el-input>
            </el-form-item>
            <el-form-item label="Credit card" prop="credit_card_number">
                <el-input type="number" v-model="form.credit_card_number"></el-input>
            </el-form-item>
            <el-form-item label="Bank account no" prop="bank_account_no">
                <el-input  type="number" v-model="form.bank_account_no"></el-input>
            </el-form-item>
            <el-form-item label="Transaction details" prop="transaction_details">
                <el-input type="textarea" v-model="form.transaction_details"></el-input>
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
        name: "payment_edit",
        data(){
            return{
                id: '',
                form:{
                    currencies: 'Currency'
                },
                token: '',
                message: '',
                url : '',
                currencies:[],
                rules: {
                    // Form validation rules
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

        methods: {
            cancelClicked(){
                this.$router.push('/payments');
            },

            //validate and submit
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                        if (valid) {
                let url = this.url + '/payments/'+this.id ;



                this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+this.token
                    }}).then((response)=> {
                    if (response.status == 200){
                        this.message=response.data.message;
                        this.success();
                        this.$router.push('/payments');
                    }
                })
                        }else{
                            this.message='Fill all required entries';
                            this.error();
                            return false;
                        }
                });
            },
            //Get currency from api for the dropdown
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
            error() {
                this.$notify({
                    title: 'Error',
                    message: this.message,
                    type: 'error'
                });
            },
            getPayment(){
                let url = this.url + '/payments/'+this.id;

                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.form=response.data.data;
                });

            }
        },
        created(){
            this.id=this.$route.params.id;
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getPayment();
        }
    }
</script>

<style scoped>

</style>