<template>
	<div class="page-table scrollable">
		<!--Displays the input form for a new currency entry-->
		<el-form ref="form" :rules="rules" :model="form" label-width="120px">
			<h2 class="animated fadeInDown" >Send an Email</h2>

			<el-form-item label="Email" prop="phone_number">
				<el-input type="email" placeholder="example@example.con" v-model="form.email"></el-input>
			</el-form-item>

			<el-form-item label="Subject" prop="message">
				<el-input autosize placeholder="Enter subject here" v-model="form.subject"></el-input>
			</el-form-item>

			<el-form-item label="Message" prop="message">
				<el-input autosize type="textarea" placeholder="Enter text here ..." v-model="form.message"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit()">SAVE</el-button>
				<el-button  @click="cancelClicked">CLOSE</el-button>
			</el-form-item>

		</el-form>

	</div>
</template>

<script>
	import XLSX from 'xlsx';

	export default {
		name: "single_email",
		data(){
			return  {
				form: {
					api_user:'demo.wazinsure.com'
				},
				message: '',
				token: '',
				url: '',
				xlsx: '',
				// Validation  rules
				rules: {
					// phone_number: [
					// 	{required: true, message: 'Please enter a phone number', trigger: 'blur'},
					// 	{min: 10, max: 10, message: 'Enter a valid 10 digit number', trigger: 'blur'}
					// ],
					// message: [
					// 	{required: true, message: 'Please input a message', trigger: 'blur'},
					// ]
				}
			}
		},

		created(){
			this.token=this.$store.getters.token;
			this.url=this.$store.getters.url;
			this.notificationToken=this.$store.getters.notificationToken;
			this.notificationUrl=this.$store.getters.notificationUrl;
		},

		methods: {
			// Validates the input fields and if true posts the form data ot the api
			onSubmit(){
				this.emailNotification()
			},
	

			//Email notification
			emailNotification(){

				let url =this.notificationUrl + '/email/custom';
				this.axios.post(url, this.form, {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + this.notificationToken
					}
				}).then((response) => {
					if (response.status == 200) {

					}
				});

			},


			success() {
				this.$notify({
					title: 'Success',
					message: this.message,
					type: 'success'
				});},
			cancelClicked(){
				this.$router.back()
			},
			error() {
				this.$notify({
					title: 'ERROR',
					message: this.message,
					type: 'error'
				});
			}
		}


	}
</script>

<style scoped>

</style>