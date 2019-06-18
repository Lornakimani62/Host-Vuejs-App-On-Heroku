<template>
    <div class="page-table scrollable">
        <el-form ref="form" :rules="rules" :model="form"  label-width="150px">
            <h2 class="animated fadeInDown" >Add new Cover</h2>
            <el-form-item label="Upload Excel" prop="import" >
                <input type="file" ref="xlsx" @change="selectFile"/>
                <el-button type="warning" icon="el-icon-info" v-on:click="uploadXlsx">Import Excel</el-button>
            </el-form-item>

            <el-form-item label="Cover name:" prop="cover">
                <el-input v-model="form.cover_name"></el-input>
            </el-form-item>

            <el-form-item label="Choose product:" prop="product">
                <el-dropdown placement="bottom-start" v-model="form.product" @command="handleProduct" >
                    <span class="el-dropdown-link">{{form.product}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  v-bind:key="product.product_id" v-for="product in products" :command=product.product_name>{{product.product_name}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
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
            <el-form-item label="Motor Type" prop="motor_type">
                <el-input autosize type="textarea" v-model="form.motor_type"></el-input>
            </el-form-item>
            <el-form-item label="Premium" prop="motor_type">
                <el-input autosize type="textarea" v-model="form.premium"></el-input>
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
        name: "motor_cover_create",
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
                    motor_type: [
                        {required: true, message: 'Please enter a motor type', trigger: 'blur'},
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
                        let url = this.url + '/motorcovers';
                        this.axios.post(url, this.form, {headers: {'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+this.token
                            }}).then((response)=> {
                            if (response.status == 200){

                                this.message=response.data.message;
                                this.success();
                                this.$router.push('/motorcovers');
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
                    let url = this.url + '/motorcovers/excel';
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
                this.$router.push('/motorcovers');
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