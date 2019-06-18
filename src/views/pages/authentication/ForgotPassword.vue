<template>
	<vue-scroll class="forgot-password-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo.png" alt="logo"/>


				<float-label class="styled">
					<h3>Please contact Administrator</h3>
					<!--<input type="email" placeholder="E-mail">-->
				</float-label>

				<!--<div class="flex text-center center pt-20 pb-10">			-->
					<!--<el-button plain size="small" @click="resetPass" class="send-btn tada animated">-->
						<!--SEND RESET LINK-->
					<!--</el-button>-->
				<!--</div>-->
			</div>
		</div>
	</vue-scroll>
</template>

<script>
export default {
	name: 'ForgotPassword',
	data() {
		return {
			email: ''
		}
	},
	methods: {
		resetPass() {

				let url = 'http://142.93.172.106:3002/auth/resettemppassword';
				this.axios.put(url,this.email,{headers: {'Content-Type': 'application/json'}
				}).then((response) => {

					this.$router.push('login')

				});
			}



		}

}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.forgot-password-page {
	background: $background-color;
	margin-left: -30px;
	margin-right: -30px;

	.form-wrapper {
		width: 100%;
	}
	
	.form-box {
		width: 100%;
		max-width: 340px;
		padding: 30px;
		box-sizing: border-box;
		margin: 20px auto;

		a {
			font-size: 14px;
			color: $text-color-accent;
			text-decoration: none;
			font-weight: 500;
		}

		.image-logo {
			width: 200px;
			margin: 0px auto;
			margin-bottom: 50px;
			display: block;
		}

		.send-btn {
			width: 160px;
		}
	}
}

@media (max-width: 768px) {
	.layout-container .container .view.forgot-password-page {
		margin-left: -5px;
		margin-right: -5px;
		max-width: calc(100% + 10px);
	}
}
</style>
