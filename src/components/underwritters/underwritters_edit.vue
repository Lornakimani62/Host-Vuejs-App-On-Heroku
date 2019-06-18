<template>
    <!--Edit underwritters-->
    <div class="page-table scrollable">
         <el-form ref="form" :model="form" :rules="rules" label-width="150px">
            <h2 class="animated fadeInDown" >Add a new underwriter</h2>

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
        name: "underwritters_edit" ,
        data(){
            return{
                id: '',
                form:{},
                token: '',
                message: '',
                url: '',
                rules: {

                    //Form validation
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


                }}
        },

        methods: {
            cancelClicked(){
                this.$router.push('/underwritters');
            },
            onSubmit(form){
                this.$refs[form].validate((valid) => {
                        if (valid) {
                let url = this.url + '/underwritters/'+this.id ;

                this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+this.token
                    }}).then((response)=> {
                    if (response.status == 200){
                        this.message=response.data.message;
                        this.success();
                        this.$router.push('/underwritters');

                    }
                }) }else{
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
            error() {
                this.$notify({
                    title: 'Error',
                    message: this.message,
                    type: 'error'
                });
            },
            //Get underwriter form api
            getUnderwriter(){
                let url = this.url + '/underwritters/'+this.$route.params.id ;

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
            this.getUnderwriter();
        }
    }
</script>

<style scoped>

</style>