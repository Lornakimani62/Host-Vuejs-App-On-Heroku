<template>
	<div class="page-table scrollable">
		<h2 class="animated fadeInDown" >Edit Entry</h2>
		<!-- Displays the currency edit form-->
		<el-form ref="form" :rules="rules" :model="form" label-width="120px">
			<el-form-item label="Choose agent:" prop="agent">
				<el-dropdown placement="bottom-start" v-model="agentsForm.username" @command="handleAgents" >
					<span class="el-dropdown-link">{{form.assigned_to}}<i class="el-icon-arrow-down el-icon--right"></i></span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item  v-bind:key="agent.sales_agents_id" v-for="agent in agentsForm" :command=agent.username>{{agent.fullname}}</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit()">Assign</el-button>
				<el-button v-on:click="cancelClicked">Cancel</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: "leads_assign",
		data(){
			return{
				id: '',
				form:{
					assigned_to:'Choose an agent:'
				},
				agentsForm:{},
				token: '',
				message: '',
				url: '',
				// Edit form input validation rules
				rules: {
					currency_code: [
						{required: true, message: 'Please input currency code', trigger: 'blur'},
						{min: 3, max: 3, message: 'Length should be 3 letters', trigger: 'blur'}
					],
					currency_name: [
						{required: true, message: 'Please input currency name', trigger: 'blur'},
						{min: 3, message: 'Currency name should be at least 3 characters', trigger: 'blur'}
					]
				}
			}
		},
		methods: {
			cancelClicked(){
				this.$router.back();
			},
			// Validates the edit form and if it returns true updates the db values
			onSubmit(){
						let url = this.url + '/leads/'+this.id ;
						this.axios.put(url, this.form, {headers: {'Content-Type': 'application/json',
								'Authorization': 'Bearer '+this.token
							}}).then((response)=> {
							if (response.status == 200){
								this.message=response.data.message;
								this.success();
								this.$router.push('/currency');
							}
						})
							.catch(err =>{
								this.$router.push('login');
							});

			},
			handleAgents(command){
				this.form.assigned_to=command
			},
			// Notifications
			success() {
				this.$notify({
					title: 'Success',
					message: this.message,
					type: 'success'
				});},
			error() {
				this.$notify.error({
					title: 'ERROR',
					message: 'Error! Please Try again',
					type: 'error'
				});
			},
			getAgents(){
				let url = this.url + '/salesagents';
				this.axios.get(url, {headers: {'Content-Type': 'application/json',
						'Authorization': 'Bearer '+ this.token
					}}).then((response) => {
					this.agentsForm=response.data.data;
				});
			},

		},
		created(){
			this.id=this.$route.params.id;
			this.token=this.$store.getters.token;
			this.url=this.$store.getters.url;
			this.getAgents();
			this.getLead();
		}
	}
</script>

<style scoped>

</style>
