<template>
	<div class="page-table scrollable">
		<!--Displays the input form for a new currency entry-->
		<el-form ref="addForm" :rules="rules" :model="form" label-width="120px">
			<h2 class="animated fadeInDown" >Send a message</h2>

			<el-form-item label="Phone Number" prop="phone_number" >
				<el-input type="number" placeholder="07xxxxxxxx" v-model="form.phone_number"></el-input>
			</el-form-item>

			<el-form-item label="Message" prop="message">
				<el-input autosize type="textarea" placeholder="Enter text here ..." v-model="form.message"></el-input>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="onSubmit()">SEND</el-button>
				<el-button  @click="cancelClicked">CLOSE</el-button>
			</el-form-item>

		</el-form>

	</div>
</template>

<script>
	import XLSX from 'xlsx';

	export default {
		name: "single_message",
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
			// Validates the input fields and if true posts the addForm data ot the api
			onSubmit(){
						this.smsNotification();


			},


			//SMS NOTIFICATION
			smsNotification(){
				let url =this.notificationUrl + '/message/custom';
				this.axios.post(url, this.form, {
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + this.notificationToken
					}
				}).then((response) => {
					if (response.status == 200) {
						this.message='SMS sent successfully';
						this.success();
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