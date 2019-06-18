<template>
    <div class="page-table scrollable">

        <el-form ref="form" :rules="rules" :model="form"  label-width="150px">
            <h2 class="animated fadeInDown" >Add new Cover</h2>
            <el-form-item label="Cover name" prop="cover_name">
                <el-input v-model="form.cover_name"></el-input>
            </el-form-item>
            <el-form-item label="Cover description" prop="cover_desc">
                <el-input autosize="true" type="textarea" v-model="form.cover_desc"></el-input>
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
                <el-input v-model="form.annual_premium"></el-input>
            </el-form-item>
            <el-form-item label="Benefit name" prop="benefit1_name">
                <el-input v-model="form.benefit1_name"></el-input>
            </el-form-item>
            <el-form-item label="Benefit Description" prop="benefit1_desc">
                <el-input autosize type="textarea" v-model="form.benefit1_desc"></el-input>
            </el-form-item>
            <el-form-item label="Benefit amount" prop="benefit1_amount">
                <el-input v-model="form.benefit1_amount"></el-input>
            </el-form-item>
            <el-form-item label="Benefit name" prop="benefit2_name">
                <el-input v-model="form.benefit2_name"></el-input>
            </el-form-item>
            <el-form-item label="Benefit Description" prop="benefit2_desc">
                <el-input autosize type="textarea" v-model="form.benefit2_desc"></el-input>
            </el-form-item>
            <el-form-item label="Benefit amount" prop="benefit2_amount">
                <el-input type="number" v-model="form.benefit2_amount"></el-input>
            </el-form-item>
            <el-form-item label="Benefit name" prop="benefit3_name">
                <el-input v-model="form.benefit3_name"></el-input>
            </el-form-item>
            <el-form-item label="Benefit Description" prop="benefit3_desc">
                <el-input autosize type="textarea" v-model="form.benefit3_desc"></el-input>
            </el-form-item>
            <el-form-item label="Benefit amount" prop="benefit3_amount">
                <el-input type="number" v-model="form.benefit3_amount"></el-input>
            </el-form-item>
            <el-form-item label="Benefit name" prop="benefit4_name">
                <el-input v-model="form.benefit4_name"></el-input>
            </el-form-item>
            <el-form-item label="Benefit Description" prop="benefit4_desc">
                <el-input autosize type="textarea" v-model="form.benefit4_desc"></el-input>
            </el-form-item>
            <el-form-item label="Benefit amount" prop="benefit4_amount">
                <el-input type="number" v-model="form.benefit4_amount"></el-input>
            </el-form-item>
            <el-form-item label="Benefit name" prop="benefit5_name">
                <el-input v-model="form.benefit5_name"></el-input>
            </el-form-item>
            <el-form-item label="Benefit Description" prop="benefit5_desc">
                <el-input autosize type="textarea" v-model="form.benefit5_desc"></el-input>
            </el-form-item>
            <el-form-item label="Benefit amount" prop="benefit5_amount">
                <el-input type="number" v-model="form.benefit5_amount"></el-input>
            </el-form-item>
            <el-form-item label="Benefit name" prop="benefit6_name">
                <el-input v-model="form.benefit6_name"></el-input>
            </el-form-item>
            <el-form-item label="Benefit Description" prop="benefit6_desc">
                <el-input type="textarea" autosize v-model="form.benefit6_desc"></el-input>
            </el-form-item>
            <el-form-item label="Benefit amount" prop="benefit6_amount">
                <el-input type="number" v-model="form.benefit6_amount"></el-input>
            </el-form-item>
            <el-form-item label="Benefit name" prop="benefit7_name">
                <el-input v-model="form.benefit7_name"></el-input>
            </el-form-item>
            <el-form-item label="Benefit Description" prop="benefit7_desc">
                <el-input autosize type="textarea" v-model="form.benefit7_desc"></el-input>
            </el-form-item>
            <el-form-item label="Benefit amount" prop="benefit7_amount">
                <el-input type="number" v-model="form.benefit7_amount"></el-input>
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
        name: "pa_covers_edit",
        data(){
            return{
                id: '',
                currencies: [],
                products: [],
                form: {
                    currency: 'Currency',
                    product_name: 'Products'
                },
                token: '',
                message: '',
                url: '',
                rules: {
                    cover_name: [
                        {required: true, message: 'Please enter cover name', trigger: 'blur'},
                    ],
                    cover_desc: [
                        {required: true, message: 'Please enter cover description', trigger: 'blur'},
                    ],
                    currency: [
                        {required: true, message: 'Please enter currency name', trigger: 'blur'},
                        {min: 3, message: 'Currency code should have 3 characters', trigger: 'blur'}
                    ],
                    annual_premium: [
                        {required: true, message: 'Pleaseenter annual premium', trigger: 'blur'},
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

                    product: [
                        {required: true, message: 'Please enter product', trigger: 'blur'},
                    ],
                }

            }
        },

        methods: {
            cancelClicked(){
                this.$router.push('/pa_covers');
            },

            onSubmit(form){
                this.$refs[form].validate((valid) => {
                        if (valid) {
                let url = this.url + '/pacovers/'+this.id ;
                this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+this.token
                    }}).then((response)=> {
                    if (response.status == 200){
                        this.message=response.data.message;
                        this.success();
                        this.$router.push('/pa_covers');

                    }
                }).catch(err =>{
                    this.$router.push('login');
                });
                        }else{
                            this.message='Try Again';
                            this.error();
                            return false;
                        }
                });
            },

            getCurrencies(){
                let url = this.url + '/currencies';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.currencies=response.data.data;
                }).catch(err =>{
                    this.$router.push('login');
                });
            },

            getProduct(){

                let url = this.url+ '/products';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.products=response.data.data;
                }).catch(err =>{
                    this.$router.push('login');
                });

            },

            handleCurrency(command){
                this.form.currency=command;
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

            getCover(){
                let url = this.url+'/pacovers/'+this.$route.params.id;
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.form=response.data.data;

                }).catch(err =>{
                    this.$router.push('login');
                });
            }
        },

        created(){
            this.id=this.$route.params.id;
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getCover();
            this.getProduct();
            this.getCurrencies();
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