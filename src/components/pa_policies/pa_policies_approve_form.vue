 <template>
     <!--Edit Policy-->
     <div class="page-table scrollable">
         <el-form ref="form" :model="form" :rules="rules" label-width="150px">
             <h2 class="animated fadeInDown" >Approve Policy</h2>

             <el-form-item label="Policy no" prop="policy_no">
                 <el-input disabled="true" v-model="form.policy_no"></el-input>
             </el-form-item>

             <el-form-item label="Approval Status">
                 <el-dropdown @command="handleActivation">
                     <span class="el-dropdown-link">{{form.activation_status}}<i class="el-icon-arrow-down el-icon--right"></i></span>
                     <el-dropdown-menu slot="dropdown">
                         <el-dropdown-item command="PENDING">PENDING</el-dropdown-item>
                         <el-dropdown-item  command="APPROVED">APPROVED</el-dropdown-item>
                     </el-dropdown-menu>
                 </el-dropdown>
             </el-form-item>
             <el-form-item label="Activation comments" prop="activation_comments">
                 <el-input type="textarea" v-model="form.activation_comments"></el-input>
             </el-form-item>
             <el-form-item label="Activated by" prop="activated_by">
                 <el-input  v-model="form.activated_by"></el-input>
             </el-form-item>
             <el-form-item label="Activated on" prop="activated_on">
                 <el-col :span="11">
                     <el-date-picker type="date" placeholder="Pick a date" v-model="form.activated_on" style="width: 70%;"></el-date-picker>
                 </el-col></el-form-item>

             <el-form-item>
                 <el-button type="primary" @click="onSubmit('form')">SAVE</el-button>
                 <el-button  @click="cancelClicked">CLOSE</el-button>
             </el-form-item>
         </el-form>

     </div>
 </template>

 <script>
     export default {
         name: " pa_policies_approve_form",
         data(){
             return{
                 id: '',
                 form: {
                    approval_status:''
                 },
                 covers:[],
                 products:[],
                 underwriters:[],
                 token: '',
                 message: '',
                 // Form validation rules
                 rules: {
                     policy_no: [
                         {required: true, message: 'Please enter policy no', trigger: 'blur'},
                     ],

                     activation_status: [
                         {required: true, message: 'Please enter activation status', trigger: 'blur'},
                     ],
                     activation_comments: [
                         {required: true, message: 'Please enter activation comments', trigger: 'blur'},
                     ],
                     activated_by: [
                         {required: true, message: 'Please enter name', trigger: 'blur'},
                     ],

                 }
             }
         },
         methods: {
             // Validate and submit
             onSubmit(form){
                 this.$refs[form].validate((valid) => {
                     if (valid) {
                         let url = this.url + '/papolicies/'+this.id ;
                         this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
                                 'Authorization': 'Bearer '+this.token
                             }}).then((response)=> {
                             if (response.status == 200){
                                 this.message=response.data.message;
                                 this.success();
                                 this.$router.push('/papolicies/approved');

                             }
                         }).catch(err =>{
                             this.$router.push('login');
                         });
                     }else{
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
                 });
             },
             getPolicy(){
                 let url = this.url + '/papolicies/'+this.$route.params.id;
                 this.axios.get(url, {headers: {'Content-Type': 'application/json',
                         'Authorization': 'Bearer '+ this.token
                     }}).then((response) => {
                     this.form=response.data.data;
                 }).catch(err =>{
                     this.$router.push('login');
                 });

             },

             cancelClicked(){
                 this.$router.push('/papolicies/approved');
             },
             handleActivation(command){
                 this.form.activation_status=command
             }
         },
         created(){
             this.id=this.$route.params.id;
             this.token=this.$store.getters.token;
             this.url=this.$store.getters.url;
             this.getPolicy();

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