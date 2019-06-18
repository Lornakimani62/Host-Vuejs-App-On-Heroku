<template>
    <!--Create Cover-->
    <div class="page-table scrollable">
        <el-form ref="form" :rules="rules" :model="form"  label-width="150px">
            <h2 class="animated fadeInDown" >Add new Cover</h2>
            <el-form-item label="Upload Excel" prop="import" >
                <input type="file" ref="xlsx" @change="selectFile"/>
                <el-button type="warning" icon="el-icon-info" v-on:click="uploadXlsx">Import Excel</el-button>
            </el-form-item>

            <el-form-item label="Cover name" prop="cover_name">
                <el-input v-model="form.cover_name"></el-input>
            </el-form-item>
            <el-form-item label="Cover description" prop="cover_desc">
                <el-input autosize type="textarea" v-model="form.cover_desc"></el-input>
            </el-form-item>
            <el-form-item label="Choose currency:" prop="currency">
                <el-dropdown placement="bottom-start" v-model="form.currency" @command="handleCurrency" >
                    <span class="el-dropdown-link">{{form.currency}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  v-bind:key="currency.currency_code" v-for="currency in currencies" :command=currency.currency_code>{{currency.currency_name}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>
            <el-form-item label="Annual premium" prop="annual_premium">
                <el-input type="number" v-model="form.premium"></el-input>
            </el-form-item>
            <el-form-item label="Benefit name" prop="rider1_name">
                <el-input v-model="form.rider1_name"></el-input>
            </el-form-item>
            <el-form-item label="Benefit Description" prop="rider1_desc">
                <el-input type="textarea" v-model="form.rider1_desc"></el-input>
            </el-form-item>
            <el-form-item label="Benefit amount" prop="rider1_premium">
                <el-input type="number" v-model="form.rider1_premium"></el-input>
            </el-form-item>
            <el-form-item label="Benefit name" prop="rider2_name">
                <el-input v-model="form.benefit2_name"></el-input>
            </el-form-item>
            <el-form-item label="Benefit Description" prop="rider2_desc">
                <el-input type="textarea" v-model="form.benefit2_desc"></el-input>
            </el-form-item>
            <el-form-item label="Benefit amount" prop="rider2_premium">
                <el-input type="number" v-model="form.benefit2_amount"></el-input>
            </el-form-item>

            <el-form-item label="Choose product:" prop="product">
                <el-dropdown placement="bottom-start" v-model="form.product" @command="handleProduct" >
                    <span class="el-dropdown-link">{{form.product}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  v-bind:key="product.product_id" v-for="product in products" :command=product.product_name>{{product.product_name}}</el-dropdown-item>
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
        name: "life",
        data(){
            return  {
                currencies: [],
                products:[],
                form: {
                    currency: 'Currency',
                    product:'Product',
                },
                message: '',
                token: '',
                url: '',
                xlsx:'',
                rules: {
                    // form validation rules
                    cover_name: [
                        {required: true, message: 'Please enter cover name', trigger: 'blur'},
                    ],
                    cover_desc: [
                        {required: true, message: 'Please enter cover description', trigger: 'blur'},
                    ],
                    currency: [
                        {required: true, message: 'Please enter currency name', trigger: 'blur'},
                    ],
                    premium: [
                        {required: true, message: 'Please enter an annual premium', trigger: 'blur'},
                    ],
                    benefit1_name: [
                        {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    ],
                    benefit1_desc: [
                        {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    ],
                    benefit1_amount: [
                        {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    ],
                    benefit2_name: [
                        {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    ],
                    benefit2_desc: [
                        {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    ],
                    benefit2_amount: [
                        {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    ],
                    benefit3_name: [
                        {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    ],
                    benefit3_desc: [
                        {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    ],
                    benefit3_amount: [
                        {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    ],
                    benefit4_name: [
                        {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    ],
                    benefit4_desc: [
                        {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    ],
                    benefit4_amount: [
                        {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    ],
                    benefit5_name: [
                        {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    ],
                    benefit5_desc: [
                        {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    ],
                    benefit5_amount: [
                        {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    ],
                    benefit6_name: [
                        {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    ],
                    benefit6_desc: [
                        {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    ],
                    benefit6_amount: [
                        {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    ],
                    benefit7_name: [
                        {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    ],
                    benefit7_desc: [
                        {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    ],
                    benefit7_amount: [
                        {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    ],
                    product: [
                        {required: true, message: 'Please enter product', trigger: 'blur'},
                    ],
                }

            }
        },

        created(){
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getCurrencies();
            this.getProduct();
        },

        methods: {
            //validates and submits form
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let url = this.url + '/lifecovers';
                        this.axios.post(url, this.form, {headers: {'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+this.token
                            }}).then((response)=> {
                            if (response.status == 200){

                                this.message=response.data.message;
                                this.success();
                                this.$router.push('/life-covers');
                            }
                            else if (response.status != 200){
                                this.message=response.data.message;
                                this.error();
                            }
                        })
                    }else{
                        this.message='Try Again';
                        this.error();
                        return false;
                    }
                });
            },

            getCurrencies(){
                let url = this.url+ '/currencies';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.currencies=response.data.data;
                })
            },
            selectFile() {
                this.xlsx = this.$refs.xlsx.files[0];
            },

            uploadXlsx(){
                if (this.xlsx != ''){
                    const formData = new FormData();
                    formData.append('xlsx',this.xlsx);
                    let url = this.url + '/lifecovers/excel';
                    this.axios.post(url, formData, {headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+this.token
                        }}).then((response)=> {
                        if (response.status == 200){

                            this.message=response.data.message;
                            this.success();
                            this.$router.push('/life-covers');
                            this.xlsx='';
                        }
                        else if (response.status == 400){
                            this.error();
                        }
                    })

                }else{
                    this.message='Please select a file';
                    this.error();
                }
            },

            handleCurrency(command){

                this.form.currency=command;

            },

            getProduct(){

                let url = this.url+ '/products';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.products=response.data.data;
                })

            },
            handleProduct(command){
                this.form.product=command;
            },

            success() {
                this.$notify({
                    title: 'Success',
                    message: this.message,
                    type: 'success'
                });
            },
            cancelClicked(){
                this.$router.back();
            },

            error() {
                this.$notify.error({
                    title: 'Error',
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