<template>
	<div class="page-table scrollable">
		<h1 class="animated fadeInDown" >Leads</h1>
		<el-row id="space">
			<el-button type="warning" icon="el-icon-info" v-on:click="exportXlsx">Export Excel</el-button>
		</el-row>
		<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
			<div class=" table-box card-base card-shadow--medium">
				<!--Displays the currency table-->
				<el-table :data="tableData" height="475" width="100%">
					<el-table-column
							prop="leads_id"
							sortable
							label="ID"
					></el-table-column>
					<el-table-column
							prop="product_name"
							sortable
							label="Product Name"
							width="220"
					></el-table-column>
					<el-table-column
							prop="cover_name"
							sortable
							label="Cover Name"
							width="160"
					></el-table-column>
					<el-table-column
							prop="id_no"
							sortable
							label="ID Number"
							width="160"
					></el-table-column>
					<el-table-column
							prop="fullname"
							sortable
							label="Full Name"
							width="160"
					></el-table-column>
					<el-table-column
							prop="age"
							sortable
							label="Age"
							width="160"
					></el-table-column>
					<el-table-column
							prop="monthly_premium"
							sortable
							label="Premium"
							width="140"
					></el-table-column>
					<el-table-column
							prop="term"
							sortable
							label="Term"
					></el-table-column>
					<el-table-column sortable label="Status" width="100">
						<template slot-scope="scope">
							<el-tag
									:type="scope.row.lead_status === 'PENDING' ? 'danger' : 'primary'" disable-transitions>
								{{scope.row.lead_status}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column  label="Operations" width="180">
						<template slot-scope="scope">
							<el-button  size="mini" slot="reference" type="primary" @click="handleAssign(scope.$index, scope.row)">ASSIGN</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-col>
	</div>
</template>

<script>
	export default {
		name: "leads_index",
		data(){
			return {
				tableData: [],
				token:'',
				form:[],
				url: '',
				excelForm:[]
			}
		},
		methods:{
			getLeads(){
				let url = this.url + '/leads';
				this.axios.get(url, {headers: {'Content-Type': 'application/json',
						'Authorization': 'Bearer '+ this.token
					}}).then((response) => {
					this.tableData=response.data.data;
					this.excelForm = Object.values(this.tableData);

				}).catch(err =>{
					this.$router.push('login');
				});
			},
			exportXlsx(){
				var leadIdWs = XLSX.utils.json_to_sheet(this.excelForm);
				// Workbook
				var leadsWb = XLSX.utils.book_new();
				//Add worksheet to workbook
				XLSX.utils.book_append_sheet(leadsWb,leadIdWs);
				XLSX.writeFile(leadsWb, 'Leads.xlsx');
			},

			// Assigns the selected row unique id to the route params to allow for editing
			handleView(index,row){
				this.form=row;
				this.id=this.form.leads_id;
				this.$router.push('/leads/view/'+this.id);
			},

			handleAssign(index,row){
				this.form=row;
				this.id=this.form.leads_id;
				this.$router.push('/leads/assign/'+this.id);
			},


			delete() {
				this.$notify({
					title: 'Deleted',
					message: 'Entry Deleted',
					type: 'Success'
				});
			},
		},
		created(){
			this.token=this.$store.getters.token;
			this.url=this.$store.getters.url;
			this.getLeads();


		}
	}


</script>

<style scoped>
	.table-box{
	}
	.card-base{
	}
	#space{
		padding-bottom: 10px;
	}
</style>
