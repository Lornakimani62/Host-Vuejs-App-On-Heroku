<template>
    <!--Create underwritters-->
    <div class="page-table scrollable">
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
            <h2 class="animated fadeInDown" >Add a new underwriter</h2>
            <el-form-item label="Upload Excel" prop="import" >
                <input type="file" ref="xlsx" @change="selectFile"/>
                <el-button type="warning" icon="el-icon-info" v-on:click="uploadXlsx">Import Excel</el-button>
            </el-form-item>
            <el-form-item label="Underwritter name" prop="underwritter_name">
                <el-input v-model="form.underwritter_name"></el-input>
            </el-form-item>
            <el-form-item label="Underwritter code" prop="underwritter_code">
                <el-input type="number" v-model="form.underwritter_code"></el-input>
            </el-form-item>
            <el-form-item label="Physical location" prop="physical_location">
                <el-input  v-model="form.physical_location"></el-input>
            </el-form-item>
            <el-form-item label="Postal address" prop="postal_address">
                <el-input type="number" v-model="form.postal_address"></el-input>
            </el-form-item>
            <el-form-item label="Tel no" prop="tell_no">
                <el-input type="number" v-model="form.tell_no"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input  v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="website" prop="website">
                <el-input v-model="form.website"></el-input>
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
        name: "underwritters_create",
        data(){
            return  {
                form: {},
                message: '',
                token: '',
                url: '',
                xlsx:'',
                //Form validation
                rules: {
                    underwritter_name: [
                        {required: true, message: 'Please enter underwriter\'s name', trigger: 'blur'},
                    ],
                    underwritter_code: [
                        {required: true, message: 'Please enter underwriter\'s code', trigger: 'blur'},
                    ],
                    physical_location: [
                        {required: true, message: 'Please enter location', trigger: 'blur'},
                    ],
                    postal_address: [
                        {required: true, message: 'Please enter a postal address', trigger: 'blur'},
                    ],
                    tell_no: [
                        {required: true, message: 'Please enter Tel no', trigger: 'blur'},
                    ],
                    email: [
                        {type:'email', required: true, message: 'Please enter a valid email', trigger: ['blur', 'change']},
                    ],
                    website: [
                        {required: true, message: 'Please enter sales type', trigger: 'blur'},
                    ]


                }
            }
                },

        created(){
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
        },

        methods: {
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                    if (valid) {
                            let url = this.url + '/underwritters' ;

                           // let url = 'http://142.93.172.106:3002/api/pacovers';
                            this.axios.post(url, this.form, {headers: {'Content-Type': 'application/json',
                                    'Authorization': 'Bearer '+this.token
                                }}).then((response)=> {
                                if (response.status == 200){

                                    this.message='New Underwriter added';
                                    this.success();
                                    this.$router.push('/underwritters');
                                }
                                else if (response.status != 200){
                                    this.message=response.data.message;
                                    this.error();
                                }
                            });
                    }else{
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

                    let url = this.url + '/underwritters/excel';
                    this.axios.post(url, formData, {headers: {'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+this.token
                        }}).then((response)=> {
                        if (response.status == 200){

                            this.message=response.data.message;
                            this.success();
                            this.$router.push('/underwritters');
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
                this.$router.push('/underwritters');
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