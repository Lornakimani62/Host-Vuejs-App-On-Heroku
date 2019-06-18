<template>
    <div class="page-table scrollable">
        <el-form ref="form" :rules="rules" :model="form"  label-width="150px">
            <h2 class="animated fadeInDown" >Add new Cover</h2>
             <el-form-item label="Excess name" prop="cover_name">
                <el-input v-model="form.excess_name"></el-input>
            </el-form-item>
            <el-form-item label="Excess description" prop="cover_desc">
                <el-input autosize type="textarea" v-model="form.excess_desc"></el-input>
            </el-form-item>
            <el-form-item label="Percentage value" prop="cover_desc">
                <el-input type="number" v-model="form.percentage_value"></el-input>
            </el-form-item>
            <el-form-item label="Excess amount" prop="excess_amount">
                <el-input type="number" v-model="form.excess_amount"></el-input>
            </el-form-item>
            <el-form-item label="Choose currency:" prop="currency">
                <el-dropdown placement="bottom-start" v-model="form.currency" @command="handleCurrency" >
                    <span class="el-dropdown-link">{{form.currency}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  v-bind:key="currency.currency_code" v-for="currency in currencies" :command=currency.currency_code>{{currency.currency_name}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-form-item>
            <el-form-item label="Choose cover:" prop="cover">
                <el-dropdown placement="bottom-start" v-model="form.cover" @command="handleCovers" >
                    <span class="el-dropdown-link">{{form.cover}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item  v-bind:key="cover.motor_cover_id" v-for="cover in covers" :command=cover.cover_name>{{cover.cover_name}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
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
        name: "motor_excess_edit",
        data(){
            return{
                id: '',
                currencies: [],
                products: [],
                covers: [],
                form: {
                    currency: 'Currency',
                    cover:'Covers'

                },
                token: '',
                message: '',
                url: '',
                rules: {
                    // cover_name: [
                    //     {required: true, message: 'Please enter cover name', trigger: 'blur'},
                    // ],
                    // cover_desc: [
                    //     {required: true, message: 'Please enter cover description', trigger: 'blur'},
                    // ],
                    // currency: [
                    //     {required: true, message: 'Please enter currency name', trigger: 'blur'},
                    //     {min: 3, message: 'Currency code should have 3 characters', trigger: 'blur'}
                    // ],
                    //
                    // benefit1_name: [
                    //     {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    // ],
                    // benefit1_desc: [
                    //     {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    // ],
                    // benefit1_amount: [
                    //     {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    // ],
                    // benefit2_name: [
                    //     {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    // ],
                    // benefit2_desc: [
                    //     {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    // ],
                    // benefit2_amount: [
                    //     {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    // ],
                    // benefit3_name: [
                    //     {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    // ],
                    // benefit3_desc: [
                    //     {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    // ],
                    // benefit3_amount: [
                    //     {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    // ],
                    // benefit4_name: [
                    //     {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    // ],
                    // benefit4_desc: [
                    //     {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    // ],
                    // benefit4_amount: [
                    //     {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    // ],
                    // benefit5_name: [
                    //     {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    // ],
                    // benefit5_desc: [
                    //     {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    // ],
                    // benefit5_amount: [
                    //     {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    // ],
                    // benefit6_name: [
                    //     {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    // ],
                    // benefit6_desc: [
                    //     {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    // ],
                    // benefit6_amount: [
                    //     {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    // ],
                    // benefit7_name: [
                    //     {required: true, message: 'Please input benefit name', trigger: 'blur'},
                    // ],
                    // benefit7_desc: [
                    //     {required: true, message: 'Please enter benefit description', trigger: 'blur'},
                    // ],
                    // benefit7_amount: [
                    //     {required: true, message: 'Please enter benefit amount', trigger: 'blur'},
                    // ],
                    // product: [
                    //     {required: true, message: 'Please enter product', trigger: 'blur'},
                    // ],
                }

            }
        },

        methods: {
            cancelClicked(){
                this.$router.push('/motorexcess');
            },

            onSubmit(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let url = this.url + '/motorexcess/'+this.id ;
                        this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+this.token
                            }}).then((response)=> {
                            if (response.status == 200){
                                this.message=response.data.message;
                                this.success();
                                this.$router.push('/motorexcess');
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
            getCovers(){
                let url = this.url + '/motorcovers';
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.covers=response.data.data;
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
                })

            },
            handleProduct(command){
                this.form.product=command;
            },

            handleCurrency(command){
                this.form.currency=command;
            },
            handleCovers(command){
                this.form.cover=command;
            },
            selectFile() {
                this.xlsx = this.$refs.xlsx.files[0];
            },

            success() {
                this.$notify({
                    title: 'Success',
                    message: this.message,
                    type: 'success'
                });
            },

            getExcess(){
                let url = this.url+'/motorexcess/'+this.$route.params.id;
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
            this.getExcess();
            this.getCovers();
            this.getCurrencies();
        }

    }
</script>

<style scoped>

</style>