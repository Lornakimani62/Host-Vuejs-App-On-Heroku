<template>
    <!--Create Product-->
    <div class="page-table scrollable">
     <el-form ref="form" :rules="rules" :model="form"  label-width="170px">
            <h2 class="animated fadeInDown" >Add new product</h2>


            <el-form-item label="Product name" prop="product_name">
                <el-input v-model="form.product_name"></el-input>
            </el-form-item>
            <el-form-item label="Product description" prop="product_description">
                <el-input autosize="true" type="textarea" v-model="form.product_description"></el-input>
            </el-form-item>
            <el-form-item label="Terms & Conditions" prop="terms_n_conditions">
                <el-input autosize="true" type="textarea" v-model="form.terms_n_conditions"></el-input>
            </el-form-item>
            <el-form-item label="Total days Covered" prop="total_days_covered">
                <el-input type="number" v-model="form.total_days_covered"></el-input>
            </el-form-item>

            <el-form-item label="Minimum age" prop="min_eligible_age">
                <el-input type="number" v-model="form.min_eligible_age"></el-input>
            </el-form-item>
            <el-form-item label="Maximum age" prop="max_eligible_age">
                <el-input type="number" v-model="form.max_eligible_age"></el-input>
            </el-form-item>
            <el-form-item label="Other Conditions" prop="eligible_other_conditions">
                <el-input autosize="true" type="textarea" v-model="form.eligible_other_conditions"></el-input>
            </el-form-item>
            <el-form-item label="Claim documentation" prop="claim_documentation">
                <el-input v-model="form.claim_documentation"></el-input>
            </el-form-item>


         <el-form-item label="Select Icon" prop="product_icon">
             <input type="file" ref="product_icon" @change="selectIcon"/>
         </el-form-item>
            <el-form-item label="M-pesa paybill no" prop="mpesa_paybill_no">
                <el-input type="number" v-model="form.mpesa_paybill_no"></el-input>
            </el-form-item>
            <el-form-item label="Airtel paybill" prop="airtel_paybill_no">
                <el-input type="number" v-model="form.airtel_paybill_no"></el-input>
            </el-form-item>
            <el-form-item label="Telkom paybill" prop="telkom_paybill_no">
                <el-input type="number" v-model="form.telkom_paybill_no"></el-input>
            </el-form-item>
            <el-form-item label="Bank name" prop="bank_name">
                <el-input v-model="form.bank_name"></el-input>
            </el-form-item>
            <el-form-item label="Bank account" prop="bank_account">
                <el-input type="nnumber" v-model="form.bank_account"></el-input>
            </el-form-item>
            <el-form-item label="Choose underwriter:" prop="underwritters">
                <el-dropdown placement="bottom-start" v-model="form.underwritter_name" @command="handleUnderwriters" >
                    <span class="el-dropdown-link">{{form.underwritter_name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  v-bind:key="underwritter.underwritter_id" v-for="underwritter in underwritters" :command=underwritter.underwritter_name>{{underwritter.underwritter_name}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
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
        name: "products_edit",
        data(){
            return{
                id: '',
                underwritters:[],
                form: {
                    underwritter_name: 'Underwriter name'
                },
                token: '',
                message: '',
                url: '',
                //Form validation
                rules: {
                    product_name: [
                        {required: true, message: 'Please enter product name', trigger: 'blur'},
                    ],
                    product_description: [
                        {required: true, message: 'Please enter product description', trigger: 'blur'},
                    ],
                    terms_n_conditions: [
                        {required: true, message: 'Please enter Terms & conditions', trigger: 'blur'},
                    ],
                    total_days_covered: [
                        {required: true, message: 'Please enter  total days', trigger: 'blur'},
                    ],
                    min_eligible_age: [
                        {required: true, message: 'Please enter minimum age', trigger: 'blur'},
                    ],
                    max_eligible_age: [
                        {required: true, message: 'Please enter maximum age', trigger: 'blur'},
                    ],
                    eligible_other_conditions: [
                        {required: true, message: 'Please enter eligible conditions', trigger: 'blur'},
                    ],
                    claim_documentation: [
                        {required: true, message: 'Please enter claim documentation', trigger: 'blur'},
                    ],
                    product_icon: [
                        {required: true, message: 'Please enter product Icon', trigger: 'blur'},
                    ],
                    mpesa_paybill_no: [
                        {required: true, message: 'Please enter M-pesa paybill', trigger: 'blur'},
                    ],
                    airtel_paybill_no: [
                        {required: true, message: 'Please enter Airtel paybill', trigger: 'blur'},
                    ],
                    telkom_paybill_no: [
                        {required: true, message: 'Please enter  Telkom paybill', trigger: 'blur'},
                    ],
                    bank_name: [
                        {required: true, message: 'Please enter bank name', trigger: 'blur'},
                    ],
                    bank_account: [
                        {required: true, message: 'Please enter bank account no', trigger: 'blur'},
                    ],
                    underwritter_name: [
                        {required: true, message: 'Please enter  underwriter\'s name', trigger: 'blur'},
                    ]

                }
            }


        },
        methods: {
            cancelClicked(){
                this.$router.back();
            },
            //Validate and submit
            onSubmit(form){
                const formData=new FormData();
                formData.append('product_name', this.form.product_name);
                formData.append('product_description', this.form.product_description);
                formData.append('terms_n_conditions', this.form.terms_n_conditions);
                formData.append('total_days_covered', this.form.total_days_covered);
                formData.append('min_eligible_age', this.form.min_eligible_age);
                formData.append('max_eligible_age', this.form.max_eligible_age);
                formData.append('eligible_other_conditions', this.form.eligible_other_conditions);
                formData.append('claim_documentation', this.form.claim_documentation);
                formData.append('product_icon', this.form.product_icon);
                formData.append('mpesa_paybill_no', this.form.mpesa_paybill_no);
                formData.append('airtel_paybill_no', this.form.airtel_paybill_no);
                formData.append('telkom_paybill_no', this.form.telkom_paybill_no);
                formData.append('bank_name', this.form.bank_name);
                formData.append('bank_account', this.form.bank_account);
                formData.append('underwritter_name', this.form.telkom_paybill_no);

                this.$refs[form].validate((valid) => {
                        if (valid) {
                let url = this.url + '/products/'+this.id ;
                this.axios.put(url, formData, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+this.token
                    }}).then((response)=> {
                    if (response.status == 200){
                        this.message=response.data.message;
                        this.success();
                        this.$router.push('/products');

                    }
                }) }else{
                            this.message='Fill all required entries';
                            this.error();
                            return false;
                        }
                });
            },
            getUnderwritter(){
                let url = this.url + '/underwritters';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.underwritters=response.data.data;
                });
            },
            handleUnderwriters(command){
                this.form.underwritter_name=command
            },
            selectIcon(){
                this.form.product_icon=this.$refs.product_icon.files[0];
            },
            success() {
                this.$notify({
                    title: 'Success',
                    message: this.message,
                    type: 'success'
                });},
            error() {

                this.$notify.error({
                    title: 'Error',
                    message: this.message,

                });
            },
            getProduct(){
                let url = this.url + '/products/'+this.$route.params.id;
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
            this.getUnderwritter();
            this.getProduct();
        }
    }
</script>

<style scoped>

</style>