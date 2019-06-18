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
                         prop="mpesa_response_id"
                         sortable
                         label="ID"
                         width="60"
                 ></el-table-column>
                 <el-table-column
                         prop="transaction_id"
                         label="Transaction ID"
                         width="150"></el-table-column>
                 <el-table-column
                         prop="second_name"
                         label="Second name"
                         width="150"></el-table-column>
                 <el-table-column
                         prop="last_name"
                         label="Last name"
                         width="150"
                 ></el-table-column>
                 <el-table-column
                         prop="key_id"
                         label="Key ID"
                         width="150"
                 ></el-table-column>
                 <el-table-column
                         prop="subscriber_nr"
                         label="Subscriber no"
                         width="150"
                 ></el-table-column>
                 <el-table-column
                         prop="transaction_date"
                         label="Transaction Date"
                         width="150"
                 ></el-table-column>
                 <el-table-column
                         prop="amount_received"
                         label="Amount received"
                         sortable
                         width="180"
                 ></el-table-column>
                 <el-table-column
                         prop="message_id"
                         label="Message ID"
                         width="150"
                 ></el-table-column>
                 <el-table-column
                         prop="processor_id"
                         label="Processor ID"
                         width="150"></el-table-column>
                 <el-table-column
                         prop="account_nr"
                         label="Account no"
                         width="150"></el-table-column>
                 <el-table-column
                         prop="current_balance"
                         label="Current balance"
                         width="150"
                 ></el-table-column>
                 <el-table-column
                         prop="short_code"
                         label="Short Code"
                         width="150"></el-table-column>


                 <el-table-column fixed="right" label="Operations" width="150">

                     <template slot-scope="scope">


                         <el-button size="mini" slot="reference" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>


                         <el-button style="padding-right: 10px" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                     </template>
                 </el-table-column>

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
                 let url = this.url + '/mpesaresponses';

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
                     this.$router.push('login');
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