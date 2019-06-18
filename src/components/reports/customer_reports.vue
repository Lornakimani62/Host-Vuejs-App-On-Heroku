  <template>
	 <!--PA Covers Table-->
	 <div class="page-table scrollable">
		 <h2 class="animated fadeInDown">Customer Reports</h2>
		<div id="space">
		 <el-row>
			 <el-button type="success" icon="el-icon-refresh" v-on:click="handelRefresh" round></el-button>
			 <el-dropdown @command="handleSelection" style="padding: 0px 10px 0px 10px">
				 <el-button style="color: #1da1f2" plain>{{selectedValue}}<i class="el-icon-arrow-down el-icon--right"></i>
					 </el-button>
					 <el-dropdown-menu slot="dropdown">
						 <el-dropdown-item command="SELF">Self</el-dropdown-item>
						 <el-dropdown-item  command="AGENT">Agent</el-dropdown-item>
						 <el-dropdown-item  command="BROKER">Broker</el-dropdown-item>
						 <el-dropdown-item  command="AGGREGATE">Aggregate</el-dropdown-item>
					 </el-dropdown-menu>
				 </el-dropdown>
			 <el-button type="warning" icon="el-icon-info" v-on:click="exportXlsx">Export Excel</el-button>
		 </el-row>
		</div>
		 <div class="table-box card-base card-shadow--medium">
			 <el-table :data="tableData1" height="475" style="width: 100%">

				 <el-table-column
						 prop="customer_id"
						 sortable
						 label="ID"
						 width="60"
				 ></el-table-column>
				 <el-table-column
						 prop="first_name"
						 label="First Name"
						 width="100"></el-table-column>
				 <el-table-column
						 prop="last_name"
						 label="Last Name"
						 width="100"></el-table-column>
				 <el-table-column
						 prop="id_no"
						 label="ID No"
						 width="100"
				 ></el-table-column>
				 <el-table-column
						 prop="dob"
						 label="DOB"
						 sortable
						 width="180"
				 ></el-table-column>
				 <el-table-column
						 prop="kra_pin"
						 label="KRA Pin"
						 width="150"
				 ></el-table-column>
				 <el-table-column
						 prop="occupation"
						 label="Occupation"
						 width="180"></el-table-column>
				 <el-table-column
						 prop="mobile_no"
						 label="Mobile No"
						 width="150"></el-table-column>

				 <el-table-column
						 prop="email"
						 label="Email"
						 width="180"></el-table-column>
				 <el-table-column
						 prop="location"
						 label="Location"
						 width="100"></el-table-column>
				 <el-table-column
						 prop="postal_address"
						 label="Postal Address"
						 width="150"></el-table-column>
				 <el-table-column
						 prop="postal_code"
						 label="Postal Code"
						 width="100"></el-table-column>
				 <el-table-column
						 prop="town"
						 label="Town"
				 ></el-table-column>
				 <el-table-column
						 prop="nok_fullname"
						 label="NOK Name"
						 width="180"></el-table-column>
				 <el-table-column
						 prop="nok_mobileno"
						 label="NOK Mobile No"
						 width="120"></el-table-column>
				 <el-table-column
						 prop="nok_relation"
						 label="NOK Relation"
						 width="120"></el-table-column>
				 <el-table-column
						 prop="agent_code"
						 label="Agent Code"
						 width="100"></el-table-column>
				 <el-table-column
						 prop="sales_channel"
						 label="Sales channel"
						 width="150"></el-table-column>
				 <el-table-column
						 prop="agent_usercode"
						 label="Agent usercode"
						 width="150"></el-table-column>



			 </el-table>
		 </div>
	 </div>

 </template>

 <script>
	 import XLSX from 'xlsx';

	 export default {
		 name: "customer_reports",
		 data() {
			 return {
				 tableData:[],
				 tableData1:[],
				 message: '',
				 token: '',
				 form:{},
				 selectedValue:'Sort by Sales channel',
				 id:'',
				 url: '',
				 excelForm:[],
			 }
		 },

		 created(){
			 this.token=this.$store.getters.token;
			 this.url=this.$store.getters.url;
			 this.getPolicies();

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
			 handleSelection(command){
			 	this.tableData1=this.tableData;
			 	 this.selectedValue=command;
			 	 console.log(command);
				 this.tableData1=this.tableData1.filter(d => d.sales_channel === command);
				 console.log(this.tableData1);

				 this.excelForm = Object.values(this.tableData1);
		},
			 handelRefresh(){
				 this.selectedValue='Sort by status';
				 this.tableData1=this.tableData;

			 },

			 getPolicies(){
				 let url = this.url  + '/customers';
				 this.axios.get(url
					 , {headers: {'Content-Type': 'application/json',
							 'Authorization': 'Bearer '+ this.token
						 }}).then((response) => {
					 this.tableData=response.data.data;
					 console.log(this.tableData);
					 this.tableData1=this.tableData;

				 });
			 },

			 exportXlsx(){
				 var policiesIdWs = XLSX.utils.json_to_sheet(this.excelForm);
				 // Workbook
				 var policiesyWb = XLSX.utils.book_new();
				 //Add worksheet to workbook
				 XLSX.utils.book_append_sheet(policiesyWb,policiesIdWs);
				 XLSX.writeFile(policiesyWb, 'Policies.xlsx');

			 },

			 addClicked(){
				 this.$router.push('pa_policies/add');
			 },

			 handleDelete(index, row) {
				 let url = this.url + '/papolicies/' + row.pa_policy_id;
				 this.axios.delete(url , {headers: {'Content-Type': 'application/json',
						 'Authorization': 'Bearer '+ this.token
					 }}).then((response)=> {
					 this.message=response.data.message;
					 this.delete();
					 this.tableData.splice(index,1);
					 this.getPolicies();
				 }).catch(err =>{
					 this.$router.push('/login');
				 });
			 },

			 handleEdit(index,row){
				 this.form=row;
				 this.id=this.form.pa_policy_id;
				 this.$router.push('/pa_policies/edit/'+this.id);
			 },
			 handlePolicy(index,row){
				 console.log('Policy Document starts here!!');
				 this.form=row;
				 this.id=this.form.pa_policy_id;
				 this.$router.push('/policy/'+this.id);
			 },


			 delete() {
				 this.$notify({
					 title: 'Deleted',
					 message: this.message,
					 type: 'error'
				 });
			 }


		 }
	 }
 </script>

 <style scoped>
	 #space{
		 padding-bottom: 10px;
	 }
 </style>