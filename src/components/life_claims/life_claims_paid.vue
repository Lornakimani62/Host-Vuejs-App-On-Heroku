<template>
	<!--Life Claims Table-->
	<div class="page-table scrollable">
		<h1 class="animated fadeInDown">Paid Claims</h1>
		<el-row id="space">
			<el-button  type="primary" v-on:click="addClicked" icon="el-icon-plus">Add New</el-button>
			<el-button type="warning" icon="el-icon-info" v-on:click="exportXlsx">Export Excel</el-button>
		</el-row>

		<div class="table-box card-base card-shadow--medium">
			<el-table :data="tableData" height="475" style="width: 100%">

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
						width="160"></el-table-column>
				<!--<el-table-column-->
				<!--prop="approval_comments"-->
				<!--label="Approval Comments"-->
				<!--width="160"></el-table-column>-->
				<!--<el-table-column-->
				<!--prop="approved_by"-->
				<!--label="Approved By"-->
				<!--width="150"></el-table-column>-->
				<!--<el-table-column-->
				<!--prop="approved_on"-->
				<!--label="Approved on"-->
				<!--sortable-->
				<!--width="150"></el-table-column>-->

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
		name: "life_claims_approved",
		data() {
			return {
				tableData:[],
				message: '',
				token: '',
				form:{},
				id:'',
				url: '',
				excelForm: []

			}
		},

		created(){
			this.token=this.$store.getters.token;
			this.url=this.$store.getters.url;
			this.getClaims();

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
			getClaims(){
				let url = this.url+'/lifeclaimspaid';
				this.axios.get(url, {headers: {'Content-Type': 'application/json',
						'Authorization': 'Bearer '+ this.token
					}}).then((response) => {
					this.tableData=response.data.data;
					this.excelForm=Object.values(this.tableData);
				}).catch(err =>{
					this.$router.push('login');
				});
			},
			handleDelete(index, row) {

				let url = this.url+'/lifeclaims/' + row.life_claim_id;
				this.axios.delete(url , {headers: {'Content-Type': 'application/json',
						'Authorization': 'Bearer '+ this.token
					}}).then((response)=> {
					this.message=response.data.message;
					this.delete();
					this.tableData.splice(index,1);

					this.getClaims();
				}).catch(err =>{
					this.$router.push('login');
				});
			},

			handleEdit(index,row){
				this.form=row;
				this.id=this.form.life_claim_id;
				this.$router.push('/lifeclaims/edit/'+this.id);
			},
			exportXlsx(){
				var paClaimsIdWs = XLSX.utils.json_to_sheet(this.excelForm);

				// Workbook
				var paClaimsWb = XLSX.utils.book_new();
				//Add worksheet to workbook

				XLSX.utils.book_append_sheet(paClaimsWb,paClaimsIdWs);
				XLSX.writeFile(paClaimsWb, 'Life-Claims.xlsx');

			},

			addClicked(){
				this.$router.push('/lifeclaims/add');
			},



			delete() {
				this.$notify({
					title: 'Deleted',
					message: this.message,
					type: 'Success'
				});
			},

			onSubmit() {
				let url = this.url+'/lifeclaims/' + this.form.life_claim_id;
				this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
						'Authorization': 'Bearer '+this.token
					}}).then((response)=> {
					this.status == true;
					if (response.status == 200){
						this.message=response.data.message;
						this.success();
					}
				}).catch(err =>{
					this.$router.push('login');
				});
			}
		},
	}
</script>

<style scoped>
	#space {
		padding-bottom: 15px;
	}
</style>