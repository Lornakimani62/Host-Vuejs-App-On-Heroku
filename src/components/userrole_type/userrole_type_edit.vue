<template>
    <div class="page-table scrollable">

        <el-form ref="form" :rules="rules" :model="form" label-width="120px">
            <h2 class="animated fadeInDown" >Add new role type</h2>

            <el-form-item label="Role name" prop="role_name" >
                <el-input  v-model="form.role_name"></el-input>
            </el-form-item>
            <el-form-item label="Added by" prop="added_by" >
                <el-input  v-model="form.added_by"></el-input>
            </el-form-item>
            <el-form-item label="Added on" prop="added_on">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="Pick a date" v-model="form.added_on" style="width: 70%;"></el-date-picker>
                </el-col>
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
        name: "userrole_type_edit",
        data(){
            return{
                id: '',
                form:{},

                token: '',
                message: '',
                url: '',
                rules: {
                    role_name: [
                        {required: true, message: 'Please enter a role', trigger: 'blur'}
                    ],
                    added_by: [
                        {required: true, message: 'Please enter a name', trigger: 'blur'}
                    ],
                    added_on: [
                        { type: 'date', required: true, message: 'Please pick a date', trigger: 'change' }
                    ]
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
                        let url = this.url + '/userroletypes/'+this.id ;


                        this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
                                'Authorization': 'Bearer '+this.token
                            }}).then((response)=> {
                            if (response.status == 200){
                                this.message=response.data.message;
                                this.success();
                                this.$router.push('/userroletype');
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
                this.$notify.error({
                    title: 'Error!',
                    message: this.message,
                    type: 'error'
                });
            },

            getRole(){
                let url = this.url + '/userroletypes/'+this.$route.params.id;
                this.axios.get(url, {headers: {'Content-Type': 'application/json',
                        'Authorization': 'Bearer '+ this.token
                    }}).then((response) => {
                    this.form=response.data.data;

                });

            },

        },
        created(){
            this.id=this.$route.params.id;
            this.token=this.$store.getters.token;
            this.url=this.$store.getters.url;
            this.getRole();
        }
    }
</script>

<style scoped>

