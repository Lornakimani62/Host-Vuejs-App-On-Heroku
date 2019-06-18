<template>
	<div class="page-profile-edit">
		<!--Edit Form-->
		<p>All changes made will be effected after login</p>

		<el-form ref="form" :model="form"   label-width="120px" >
			<h3 class="animated fadeInDown">Change profile image</h3>

			<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
				<el-form-item label="Profile Picture" prop="profileurl" >
					<input type="file" ref="profileurl" @change="selectFile"/>
				</el-form-item>
			</el-col>
			<el-col>
				<el-form-item>
					<el-button type="primary" @click="updateProfileImage">CHANGE</el-button>
				</el-form-item>
			</el-col>

		</el-form>

		<el-form ref="form" :model="form"   label-width="120px" >
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<h3 class="animated fadeInDown">Edit profile</h3>
					<el-form-item label="Full Name">
						<el-input v-model="form.fullname"/>
					</el-form-item>
				</el-col>

			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="ID no">
						<el-input v-model="form.id_no"/>
					</el-form-item>
				</el-col>
			</el-col>

			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Mobile no">
						<el-input v-model="form.mobile_no"/>
					</el-form-item>
				</el-col>

				<el-col :span="12" :md="12" :sm="24" :xs="30" class="col-p">
					<el-form-item label="Email">
						<el-input v-model="form.email"/>
					</el-form-item>
				</el-col>
			</el-col>

			<el-col class="col-p">
				<el-form-item>
					<el-button type="primary" @click="updateProfile">Save</el-button>
				</el-form-item>
			</el-col>
		</el-form>
	</div>
</template>

<script>

	export default {
		name: 'ProfileEdit',
		data() {


			// validate confirm password rules not working


			// var validatePass = (rule, value, callback) => {
			// 	if (value === '') {
			// 		callback(new Error('Please input the password'));
			// 	} else {
			// 		if (this.authForm.checkPass !== '') {
			// 			this.$refs.authForm.validateField('checkPass');
			// 		}
			// 		callback();
			// 	}
			// };
			// var validatePass2 = (rule, value, callback) => {
			// 	if (value === '') {
			// 		callback(new Error('Please input the password again'));
			// 	} else if (value !== this.authForm.password) {
			// 		callback(new Error('Two inputs don\'t match!'));
			// 	} else {
			// 		callback();
			// 	}
			// };

			return {
				form: {

				},
				authForm:{
					password:'',
					username: ''
				},
				url: '',
				authUrl: '',
				profileurl:''

				// 	rules2: {
				// 		password: [
				// 			{ validator: validatePass, trigger: 'blur' }
				// 		],
				// 		checkPass: [
				// 			{ validator: validatePass2, trigger: 'blur' }
				// 		]
				// 	},
				// 	labelPosition: 'right',
				// 	token:'',
				// 	username:'',
				// 	message:''
				// }


			}},
		created(){
			this.token=this.$store.getters.token;
			this.url=this.$store.getters.url;
			this.authUrl=this.$store.getters.authUrl;
			this.authForm.username=this.$store.getters.username;
			this.username=this.$store.getters.username;
			this.form.profileurl=this.$store.getters.username;
			this.getProfile();

		},
		methods: {
			getProfile(){
				let url = this.url + '/users/'+ this.username;
				this.axios.get(url, {headers: {'Content-Type': 'application/json',
						'Authorization': 'Bearer '+ this.token
					}}).then((response) => {
						this.form=response.data.data;
					}
				);
			},
			updateProfile(){
				let url = this.authUrl + '/updateuser/'+ this.username;
				this.axios.put(url,this.form, {headers: {'Content-Type': 'application/json',
						'Authorization': 'Bearer '+ this.token
					}}).then((response) => {
					this.message=response.data.message;
					this.success();

				});
			},

			updateProfileImage(){
				const formData = new FormData();
				formData.append('profileurl',this.form.profileurl);
				let url = this.authUrl + '/updateprofile/'+ this.username;
				this.axios.put(url,formData, {headers: {'Content-Type': 'application/json',
						'Authorization': 'Bearer '+ this.token
					}}).then((response) => {
					this.message=response.data.message;
					this.success();

				});
			},
			selectFile(){
				this.form.profileurl=this.$refs.profileurl.files[0];
			},

			success() {
				this.$notify({
					title: 'Success',
					message: this.message,
					type: 'success'
				});},

			resetForm(form) {
				this.$refs[form.resetFields()];
			},

			resizeLabelPosition() {
				if(window.innerWidth <= 768) {
					this.labelPosition = 'top'
				}
			}
		},
		mounted() {
			this.resizeLabelPosition();
			window.addEventListener('resize', this.resizeLabelPosition);
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.resizeLabelPosition);
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../assets/scss/_variables';

	.page-profile-edit {
		.label-switch-box {
			display: block;
			clear: both;
			width: 100%;
			text-align: right;
			margin-bottom: 20px;
		}
		.col-p {
			padding: 0 10px;
			box-sizing: border-box;
		}
		.select-wide {
			width: 100%;
		}
	}
</style>
