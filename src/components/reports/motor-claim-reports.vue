<template>
	<!--PA Covers Table-->
	<div class="page-table scrollable">
		<h2 class="animated fadeInDown">Motor claim Report</h2>
		<div id="space">
			<el-row>
				<el-button type="success" icon="el-icon-refresh" v-on:click="handelRefresh" round></el-button>
				<el-dropdown @command="handleSelection" style="padding: 0px 10px 0px 10px">
					<el-button style="color: #1da1f2" plain>{{selectedValue}}<i class="el-icon-arrow-down el-icon--right"></i>
					</el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="APPROVED">Approved</el-dropdown-item>
						<el-dropdown-item  command="PENDING">Pending</el-dropdown-item>
						<el-dropdown-item  command="AWAITING INFORMATION">Awaiting Information</el-dropdown-item>
						<el-dropdown-item  command="REJECTED">Rejected</el-dropdown-item>
						<el-dropdown-item  command="REOPENED">Reopened</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<el-button type="warning" icon="el-icon-info" v-on:click="exportXlsx">Export Excel</el-button>
			</el-row>
		</div>
		<div class="table-box card-base card-shadow--medium">
			<el-table :data="tableData1" height="475" style="width: 100%">

				<el-table-column
						prop="life_claim_id"
						sortable
						label="ID"
						width="60"
				></el-table-column>
				<el-table-column
						prop="claim_refno"
						label="Claim Ref No"
						width="150"></el-table-column>
				<el-table-column
						prop="claim_type"
						label="Claim type"
						width="100"></el-table-column>
				<el-table-column
						prop="claim_description"
						label="Claim Description"
						width="150"
				></el-table-column>
				<el-table-column
						prop="claim_currency"
						label="Claim Currency"
						width="150"
				></el-table-column>
				<el-table-column
						prop="claim_est_amount"
						label="Claim Estimate"
						width="150"
				></el-table-column>
				<el-table-column
						prop="claim_appr_amount"
						label="Approved amount"
						width="150"
				></el-table-column>
				<el-table-column
						prop="claim_date"
						label="Claim Date"
						sortable
						width="180"
				></el-table-column>
				<el-table-column
						prop="policy_no"
						label="Policy No"
						width="150"
				></el-table-column>
				<el-table-column
						prop="applicant_name"
						label="Applicant name"
						width="150"></el-table-column>
				<el-table-column
						prop="applicant_idno"
						label="Applicant ID"
						width="150"></el-table-column>

				<el-table-column
						prop="applicant_idfront"
						label="Aplicant ID Front"
						width="180"></el-table-column>
				<el-table-column
						prop="applicant_photo"
						label="Applicant Photo"
						width="150"></el-table-column>
				<el-table-column
						prop="supporting_doc1"
						label="Supporting Doc 1"
						width="150"></el-table-column>
				<el-table-column
						prop="supporting_doc2"
						label="Supporting Doc 2"
						width="150"></el-table-column>
				<el-table-column
						prop="supporting_doc3"
						label="Supporting Doc 3"
						width="150"></el-table-column>
				<el-table-column
						prop="supporting_doc4"
						label="Supporting Doc 4"
						width="150"></el-table-column>
				<el-table-column
						prop="supporting_doc5"
						label="Supporting Doc 5"
						width="150"></el-table-column>
				<el-table-column
						prop="review_status"
						label="Review status"
						width="150"></el-table-column>
				<el-table-column
						prop="review_comments"
						label="Review Comments"
						width="150"
				></el-table-column>
				<el-table-column
						prop="reviewed_by"
						label="Reviewed By"
						width="150"></el-table-column>
				<el-table-column
						prop="reviewed_on"
						label="Reviewed on"
						sortable
						width="150"></el-table-column>
				<el-table-column
						prop="approval_status"
						label="Approval Status"
						width="150"></el-table-column>
				<el-table-column
						prop="approval_comments"
						label="Approval Comments"
						width="160"></el-table-column>
				<el-table-column
						prop="approved_by"
						label="Approved By"
						width="150"></el-table-column>
				<el-table-column
						prop="approved_on"
						label="Approved on"
						sortable
						width="150"></el-table-column>
			</el-table>
		</div>
	</div>

</template>

<script>
	import XLSX from 'xlsx';

	export default {
		name: "motor-claim-reports",
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
				this.tableData1=this.tableData1.filter(d => d.approval_status === command);
				this.excelForm = Object.values(this.tableData1);
			},
			handelRefresh(){
				this.selectedValue='Sort by status';
				this.tableData1=this.tableData;
			},

			getPolicies(){
				let url = this.url  + '/motorclaims';
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
				XLSX.writeFile(policiesyWb, 'Motor-Report.xlsx');

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