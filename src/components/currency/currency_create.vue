<template>
    <div class="page-table scrollable">
        <!--Displays the input form for a new currency entry-->


        <el-form ref="addForm" :rules="rules" :model="addForm" label-width="120px">
            <h2 class="animated fadeInDown" >Add new</h2>

            <el-form-item label="Upload Excel" prop="import" >
                <input type="file" ref="xlsx" @change="selectFile"/>
                <el-button type="warning" icon="el-icon-info" v-on:click="uploadXlsx">Import Excel</el-button>
            </el-form-item>

            <el-form-item label="Currency Code" prop="currency_code" >
                <el-input placeholder="eg: KES" v-model="addForm.currency_code"></el-input>
            </el-form-item>

            <el-form-item label="Currency Name" prop="currency_name">
                <el-input  placeholder="Kenyan Shilling" v-model="addForm.currency_name"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit('addForm')">SAVE</el-button>
                <el-button  @click="cancelClicked">CLOSE</el-button>
            </el-form-item>

        </el-form>

    </div>
</template>

<script>
    import XLSX from 'xlsx';

    export default {
        name: "currency_create",
        data(){
            return  {
                addForm: {},
                message: '',
                token: '',
                url: '',
                xlsx: '',
                // Validation  rules
                rules: {
                    currency_code: [
                        {required: true, message: 'Please input currency code', trigger: 'blur'},
                        {min: 3, max: 3, message: 'Code should be 3 letters', trigger: 'blur'}
                    ],
                    currency_name: [
                        {required: true, message: 'Please input currency name', trigger: 'blur'},
                        {min: 3, message: 'Currency name should be at least 3 characters', trigger: 'blur'}
                    ]
                }
            }
        },

        created(){
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
        },

        methods: {
            // Validates the input fields and if true posts the addForm data ot the api
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {

                let url = this.url + '/currencies';
                this.axios.post(url, this.addForm, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+this.token
                    }}).then((response)=> {
                    if (response.status == 200){

                        this.message=response.data.message;
                        this.success();
                        this.$router.push('/currency');
                    }
                    else if (response.status == 400){
                        this.error();
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
            selectFile() {
                this.xlsx = this.$refs.xlsx.files[0];
            },
                uploadXlsx(){

               if (this.xlsx != ''){
                const formData = new FormData();

                    formData.append('xlsx',this.xlsx);

                    let url = this.url + '/currencies/excel';
                    this.axios.post(url, formData, {headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+this.token
                        }}).then((response)=> {
                        if (response.status == 200){

                            this.message=response.data.message;
                            this.success();
                            this.$router.push('/currency');
                            this.xlsx='';
                        }
                        else if (response.status == 400){
                            this.error();
                        }
                    });
               }else{
                   this.message='Please select a file';
                   this.error();
               }
                },




            success() {
                this.$notify({
                    title: 'Success',
                    message: this.message,
                    type: 'success'
                });},
            cancelClicked(){
                this.$router.push('/currency');
            },
            error() {
                this.$notify({
                    title: 'ERROR',
                    message: this.message,
                    type: 'error'
                });
            }
        }


    }
</script>

<style scoped>

</style>