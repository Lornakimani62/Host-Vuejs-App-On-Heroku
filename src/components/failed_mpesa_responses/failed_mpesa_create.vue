<template>
    <!--Create Failed transaction za mpesa-->
    <div class="page-table scrollable">
        <el-form ref="form" :model="form" :rules="rules"  label-width="150px">
            <h2 class="animated fadeInDown" >Add new transaction</h2>

            <el-form-item label="Transaction ID" prop="transaction_id">
                <el-input v-model="form.transaction_id"></el-input>
            </el-form-item>
            <el-form-item label="Second name" prop="second_name">
                <el-input  v-model="form.second_name"></el-input>
            </el-form-item>
            <el-form-item label="Last name" prop="last_name">
                <el-input  v-model="form.last_name"></el-input>
            </el-form-item>
            <el-form-item label="Key ID" prop="key_id">
                <el-input v-model="form.key_id"></el-input>
            </el-form-item>
            <el-form-item label="Subscriber no" prop="subscriber_nr">
                <el-input type="number" v-model="form.subscriber_nr"></el-input>
            </el-form-item>
            <el-form-item label="Transaction Date" prop="transaction_date">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="Pick a date" v-model="form.transaction_date" style="width: 70%;"></el-date-picker>
                </el-col></el-form-item>
             <el-form-item label="Amount recieved" prop="amount_received">
                <el-input type="number" v-model="form.amount_received"></el-input>
            </el-form-item>
            <el-form-item label="Message ID" prop="message_id">
                <el-input v-model="form.message_id"></el-input>
            </el-form-item>
            <el-form-item label="Processor ID" prop="processor_id">
                <el-input  v-model="form.processor_id"></el-input>
            </el-form-item>
            <el-form-item label="Account no" prop="account_nr">
                <el-input type="number" v-model="form.account_nr"></el-input>
            </el-form-item>
            <el-form-item label="Current balance" prop="current_balance">
                <el-input type="number" v-model="form.current_balance"></el-input>
            </el-form-item>
            <el-form-item label="Short code" prop="short_code">
                <el-input type="number" v-model="form.short_code"></el-input>
            </el-form-item>
            <el-form-item label="Error code" prop="error_code">
                <el-input  v-model="form.error_code"></el-input>
            </el-form-item>
            <el-form-item label="Error Description" prop="error_description">
                <el-input type="textarea" v-model="form.error_description"></el-input>
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
        name:  "failed_mpesa_create",
        data(){
            return  {

                form: {},
                message: '',
                token: '',
                url: '',
                rules: {
                    transaction_id: [
                        {required: true, message: 'Please enter transaction id', trigger: 'blur'},
                    ],
                    second_name: [
                        {required: true, message: 'Please enter the second name', trigger: 'blur'},
                    ],
                    last_name: [
                        {required: true, message: 'Please enter the last name', trigger: 'blur'},
                    ],
                    key_id: [
                        {required: true, message: 'Please enter the key id', trigger: 'blur'},
                    ],
                    transaction_date: [
                        { type: 'date', required: true, message: 'Please enter the transaction date', trigger: 'change' }
                    ],
                    subscriber_nr: [
                        {required: true, message: 'Please enter the subscriber\'s no', trigger: 'blur'},
                    ],
                    amount_received: [
                        {required: true, message: 'Please enter the amount received', trigger: 'blur'},
                    ],
                    message_id: [
                        {required: true, message: 'Please enter a message id', trigger: 'blur'},
                    ],
                    processor_id: [
                        {required: true, message: 'Please enter a processor id', trigger: 'blur'},
                    ],
                    account_nr: [
                        {required: true, message: 'Please enter an account no', trigger: 'blur'},
                    ],
                    current_balance: [
                        {required: true, message: 'Please enter the current balance', trigger: 'blur'},
                    ],
                    short_code: [
                        {required: true, message: 'Please enter a short code', trigger: 'blur'},
                    ],
                    error_code: [
                        {required: true, message: 'Please enter the error code', trigger: 'blur'},
                    ],
                    error_description: [
                        {required: true, message: 'Please enter the error description', trigger: 'blur'},
                    ]


                }} },


        created(){
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
        },
        methods: {
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                let url = this.url + '/failedmpesaresponses';

                // let url = 'http://142.93.172.106:3002/api/pacovers';
                this.axios.post(url, this.form, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+this.token
                    }}).then((response)=> {
                    if (response.status == 200){

                        this.message=response.data.message;
                        this.success();
                        this.$router.push('/failedmpesaresponses');
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
            success() {
                this.$notify({
                    title: 'Success',
                    message: this.message,
                    type: 'success'
                });},
            cancelClicked(){
                this.$router.push('/failedmpesaresponses');
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

</style>
