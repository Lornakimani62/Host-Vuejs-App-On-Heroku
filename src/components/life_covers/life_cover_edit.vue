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
                <el-input v-model="form.premium"></el-input>
            </el-form-item>
            <el-form-item label="Rider 1 name" prop="rider1_name">
                <el-input v-model="form.rider1_name"></el-input>
            </el-form-item>
            <el-form-item label="Rider 1 Description" prop="rider1_desc">
                <el-input type="textarea" v-model="form.rider1_desc"></el-input>
            </el-form-item>
            <el-form-item label="Rider 1 premium" prop="rider1_premium">
                <el-input v-model="form.rider1_premium"></el-input>
            </el-form-item>
            <el-form-item label="Rider 2 name" prop="rider2_name">
                <el-input v-model="form.rider2_name"></el-input>
            </el-form-item>
            <el-form-item label="Rider 2  Description" prop="rider2_desc">
                <el-input type="textarea" v-model="form.rider2_desc"></el-input>
            </el-form-item>
            <el-form-item label="Rider 2 amount" prop="rider2_premium">
                <el-input type="number" v-model="form.rider2_premium"></el-input>
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
        name: "life_cover_edit",
        data(){
            return{
                id: '',
                currencies: [],
                products: [],
                form: {
                    currency: 'Currency',
                    product: 'Product',
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

        methods: {
            cancelClicked(){
                this.$router.back();
            },

            onSubmit(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let url = this.url + '/lifecovers/'+this.id ;
                        this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+this.token
                            }}).then((response)=> {
                            if (response.status == 200){
                                this.message=response.data.message;
                                this.success();
                                this.$router.push('/life-covers');
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

            getProducts(){
                let url = this.url + '/products';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.products=response.data.data;
                }).catch(err =>{
                    this.$router.push('login');
                });

            },
            getCover(){
                let url = this.url+'/lifecovers/'+this.$route.params.id;
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
            this.getProducts();
            this.getCurrencies();
        }

    }
</script>

<style scoped>

</style>