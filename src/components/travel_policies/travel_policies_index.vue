 <template>
     <!--Travel Policies table-->
     <div>
         <div class="table-box card-base card-shadow--medium">
             <el-table :data="tableData" height="475" style="width: 100%">
                 <el-table-column
                         prop="travel_policy_id"
                         sortable
                         label="ID"
                         width="60"
                 ></el-table-column>

                 <el-table-column
                         prop="policyNumber"
                         label="Policy no"
                         width="160"></el-table-column>
                 <el-table-column
                         prop="ticketNumber"
                         label="Ticket no"
                         width="150"></el-table-column>
                 <el-table-column
                         prop="clientName"
                         label="Client name"
                         width="180"
                 ></el-table-column>


                 <el-table-column
                         prop="travelFrom"
                         label="From"
                         sortable
                         width="180"
                 ></el-table-column>
                 <el-table-column
                         prop="travelTo"
                         label="To"
                         width="150"
                 ></el-table-column>

                 <el-table-column fixed="right" label="Details" width="80">
                     <template slot-scope="scope">
                         <el-button size="mini" slot="reference" @click="handleView(scope.$index, scope.row)" icon="el-icon-view"></el-button>
                     </template>
                 </el-table-column>
             </el-table>
         </div>
     </div>

 </template>

 <script>
     export default {
         name:  "travel_policies_index",
         data() {
             return {
                 tableData:[],
                 message: '',
                 token: '',
                 form:{},
                 id:'',
                 url: ''


             }
         },

         created(){
             this.token=this.$store.getters.token;
             this.url=this.$store.getters.url;
             this.getPolicy();

         },


         methods: {
             formatter(row, column) {
                 return row.address;
             }, filterTag(value, row) {
                 return row.tag === value;
             },
             filterHandler(value, row, column) {
                 const property = column['property'];
                 return row[property] === value;
             },
             getPolicy() {
                 let url = this.url + '/travelpolicies';
                 this.axios.get(url, {
                     headers: {
                         'Content-Type': 'application/json',
                         'Authorization': 'Bearer ' + this.token
                     }
                 }).then((response) => {
                     this.tableData = response.data.data;
                     console.log(this.tableData);
                 });
             },


             handleView(index, row) {
                 this.form = row;
                 this.id = this.form.travel_policy_id;
                 this.$router.push('/travelpolicies/' + this.id);
             },
         }

     }
 </script>

 <style scoped>

 </style>