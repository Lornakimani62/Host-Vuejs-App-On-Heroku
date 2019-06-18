<template>
	<!--PA Covers Table-->
	<div class="page-table scrollable">
		<h2 class="animated fadeInDown">Life Policy Reports</h2>
		<div id="space">
			<el-row>
				<el-button type="success" icon="el-icon-refresh" v-on:click="handelRefresh" round></el-button>
				<el-dropdown @command="handleSelection" style="padding: 0px 10px 0px 10px">
					<el-button style="color: #1da1f2" plain>{{selectedValue}}<i class="el-icon-arrow-down el-icon--right"></i>
					</el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="APPROVED">Approved</el-dropdown-item>
						<el-dropdown-item  command="PENDING">Pending</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<el-button type="warning" icon="el-icon-info" v-on:click="exportXlsx">Export Excel</el-button>
			</el-row>
		</div>
		<div class="table-box card-base card-shadow--medium">
			<el-table :data="tableData1" height="475" style="width: 100%">

				<el-table-column
						prop="motor_policies_id"
						sortable
						label="ID"
						width="60"
				></el-table-column>
				<el-table-column
						prop="policy_no"
						label="Policy no"
						width="150"></el-table-column>
				<el-table-column
						prop="cover_name"
						label="Cover name"
						width="150"></el-table-column>
				<el-table-column
						prop="product_name"
						label="Product name"
						width="150"
				></el-table-column>
				<el-table-column
						prop="premium"
						label="Premium"
						width="150"
				></el-table-column>
				<el-table-column
						prop="applicant_dob"
						label="Applicant DOB"
						width="150"
				></el-table-column>
				<el-table-column
						prop="applicant_name"
						label="Applicant name"
						width="150"
				></el-table-column>
				<el-table-column
						prop="applicant_idno"
						label="Applicant ID"
						sortable
						width="180"
				></el-table-column>
				<el-table-column
						prop="applicant_idfront"
						label="Applicant ID Front"
						width="150"
				></el-table-column>
				<el-table-column
						prop="applicant_idback"
						label="Applicant ID Back"
						width="150"></el-table-column>
				<el-table-column
						prop="applicant_photo"
						label="Applicant Photo"
						width="150"></el-table-column>
				<el-table-column
						prop="applicant_dlno"
						label="Applicant DL no"
						width="150"></el-table-column>
				<el-table-column
						prop="make"
						label="Make"
						width="150"></el-table-column>
				<el-table-column
						prop="model"
						label="Model"
						width="150"></el-table-column>
				<el-table-column
						prop="engine_no"
						label="Engine no"
						width="150"></el-table-column>
				<el-table-column
						prop="chassis_no"
						label="Chassis no"
						width="150"></el-table-column>
				<el-table-column
						prop="body_type"
						label="Body type"
						width="150"></el-table-column>
				<el-table-column
						prop="v_reg_no"
						label="Vehicle Reg no"
						width="150"></el-table-column>
				<el-table-column
						prop="t_reg_no"
						label="T reg no"
						width="150"></el-table-column>
				<el-table-column
						prop="yr_of_manufacture"
						label="Year of manufacture"
						width="150"></el-table-column>
				<el-table-column
						prop="v_carrying_capacity"
						label="Vehicle carrying capacity"
						width="182"></el-table-column>
				<el-table-column
						prop="t_carrying_capacity"
						label="T carrying capacity"
						width="150"></el-table-column>
				<el-table-column
						prop="application_date"
						label="Application date"
						width="150"
				></el-table-column>
				<el-table-column
						prop="start_date"
						label="Start date"
						width="150"></el-table-column>
				<el-table-column
						prop="end_date"
						label="End date"
						width="150"></el-table-column>
				<el-table-column
						prop="included_benefits"
						label="Included benefits"
						width="150"></el-table-column>
				<el-table-column
						prop="included_excess"
						label="Included excess"
						width="150"></el-table-column>
				<el-table-column
						prop="activation_status"
						label="Activation Status"
						width="150"></el-table-column>
				<el-table-column
						prop="activation_comments"
						label="Activation comments"
						width="160"></el-table-column>
				<el-table-column
						prop="activated_by"
						label="Activated by"
						width="150"
				></el-table-column>
				<el-table-column
						prop="activated_on"
						label="Activated on"
						width="150"></el-table-column>



			</el-table>
		</div>
	</div>

</template>

<script>
	import XLSX from 'xlsx';

	export default {
		name: "life-policy-reports",
		data() {
			return {
				tableData:[],
				tableData1:[],
				message: '',
				token: '',
				form:{},
				selectedValue:'Sort by status',
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
				this.tableData1=this.tableData1.filter(d => d.activation_status === command);
				this.excelForm = Object.values(this.tableData1);
			},
			handelRefresh(){
				this.selectedValue='Sort by status';
				this.tableData1=this.tableData;
			},

			getPolicies(){
				let url = this.url  + '/lifepolicies';
				this.axios.get(url
					, {headers: {'Content-Type': 'application/json',
							'Authorization': 'Bearer '+ this.token
						}}).then((response) => {
					this.tableData=response.data.data;
					this.tableData1=this.tableData;

				});
			},

			exportXlsx(){
				var policiesIdWs = XLSX.utils.json_to_sheet(this.excelForm);
				// Workbook
				var policiesyWb = XLSX.utils.book_new();
				//Add worksheet to workbook
				XLSX.utils.book_append_sheet(policiesyWb,policiesIdWs);
				XLSX.writeFile(policiesyWb, 'Life-Report.xlsx');

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