 <template>
     <!--Mpesa respons Table-->
     <div>

         <el-row id="space">
             <el-button  type="primary" v-on:click="addClicked" icon="el-icon-plus">Add New</el-button>
             <el-button type="warning" icon="el-icon-info" v-on:click="exportXlsx">Export Excel</el-button>
         </el-row>

         <div class="table-box card-base card-shadow--medium">
             <el-table :data="tableData" height="475" style="width: 100%">

                 <el-table-column
                         prop="receipt_no"
                         label="Receipt Number"
                         width="150"></el-table-column>
                 <el-table-column
                         prop="currency"
                         label="Currency"
                         width="150"></el-table-column>
                 <el-table-column
                         prop="fullname"
                         label="Full Name"
                         width="200"></el-table-column>
                 <el-table-column
                         prop="amount"
                         label="Amount received"
                         sortable
                         width="180"
                 ></el-table-column>
                 <el-table-column
                         prop="payment_type"
                         label="Payment Type"
                         width="150"
                 ></el-table-column>
                 <el-table-column
                         prop="payment_channel"
                         label="Payment Channel"
                         width="150"></el-table-column>
                 <el-table-column
                         prop="mobile_number"
                         label="Mobile Number"
                         width="150"></el-table-column>
                 <el-table-column fixed="right"
                         prop="cover_name"
                         label="Cover Name"
                         width="150"></el-table-column>
                 <el-table-column fixed="right"
                         prop="policy_no"
                         label="Policy Number"
                         width="150"
                 ></el-table-column>
<!-- 

                 <el-table-column fixed="right" label="Operations" width="150">

                     <template slot-scope="scope">


                         <el-button size="mini" slot="reference" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>


                         <el-button style="padding-right: 10px" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                     </template>
                 </el-table-column> -->

             </el-table>
         </div>




     </div>

 </template>

 <script>
     import XLSX from 'xlsx';

     export default {
         name: " mpesaResponse_index",
         data() {
             return {
                 tableData:[],
                 message: '',
                 token: '',
                 form:{},
                 id:'',
                 url: '',
                 excelForm:[]
            }
         },

         created(){
             this.token=this.$store.getters.token;
             this.url=this.$store.getters.url;
             this.getCovers();

         },


         methods: {

             getCovers() {
                 let url = this.url + '/payments';

                 // let url = 'http://142.93.172.106:3002/api/pacovers';
                 this.axios.get(url, {
                     headers: {
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer ' + this.token
                     }
                 }).then((response) => {
                     this.tableData = response.data.data;
                     this.excelForm = Object.values(this.tableData);

                 }).catch(err =>{
                     console.log(err)
                    //  this.$router.push('login');
                 });
             },
             exportXlsx(){
                 var mpesaIdWs = XLSX.utils.json_to_sheet(this.excelForm);
                 // Workbook
                 var mpesaWb = XLSX.utils.book_new();
                 //Add worksheet to workbook
                 XLSX.utils.book_append_sheet(mpesaWb,mpesaIdWs);
                 XLSX.writeFile(mpesaWb, 'M-pesa.xlsx');

             },

             addClicked(){
                 this.$router.push('mpesaresponses/add');

             },
             handleDelete(index, row) {
                 let url = this.url + '/mpesaresponses/' + row.mpesa_response_id;
                 this.axios.delete(url, {
                     headers: {
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer ' + this.token
                     }
                 }).then((response) => {
                     this.message = response.data.message;
                     this.delete();
                     this.tableData.splice(index, 1);

                     this.getCovers();
                 }).catch(err =>{
                     this.$router.push('login');
                 });
             },

             handleEdit(index, row) {
                 this.form = row;
                 this.id = this.form.mpesa_response_id;
                 this.$router.push('/mpesaresponses/edit/' + this.id);
             },


             delete() {
                 this.$notify({
                     title: 'Deleted',
                     message: this.message,
                     type: 'Success'
                 });
             },


         }





     }
 </script>

 <style scoped>
     #space{
         padding-bottom: 10px;
     }
 </style>