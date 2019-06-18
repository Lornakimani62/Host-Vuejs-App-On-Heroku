<template>
	<div class="page-profile-timeline">

		<div class="timeline">
			<div class="time-box" >
				<div class="time-pin">

				</div>
				<div class="time-wrap">
					<div class="time-content__header">
						<h3 class="animated fadeInDown" >Profile information</h3>
						<p>Name: <strong>{{form.fullname}}</strong></p>
						<p>Username: <strong>{{form.username}}</strong></p>
						<p>ID no: <strong>{{form.id_no}}</strong></p>
						<p>Mobile no: <strong>{{form.mobile_no}}</strong></p>
						<p>Email: <stong>{{form.email}}</stong></p>
					</div>
				</div>
			</div>
		</div>	
	</div>
</template>

<script>

export default {
	name: 'ProfileTimeline',
	data() {
		return {
			form: {},
			token: '',
			username: '',
			url: ''
		}
	},
	created(){
		this.token=this.$store.getters.token;
		this.url=this.$store.getters.url;
		this.username=this.$store.getters.username;
		this.getProfile();

	},
	methods:{
		//Get profile details
		getProfile(){
			let url = this.url + '/users/'+ this.username;
			this.axios.get(url, {headers: {'Content-Type': 'application/json',
					'Authorization': 'Bearer '+ this.token
				}}).then((response) => {
				this.form=response.data.data;
			});
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';
#button {
	padding-left: 200px;
}
.page-profile-timeline {
	.timeline {
		font-family: inherit;
		
		.time-box {
			padding-bottom: 40px;
			overflow: hidden;
			position: relative;

			&:before {
				content: '';
				display: block;
				width: 2px;
				background: $background-color;
				position: absolute;
				top: 0px;
				left: 24px;
				bottom: 0px;
			}

			&:first-child {
				&:before {
					top: 25px;
				}
			}
			&:last-child {
				&:before {
					bottom: inherit;
					height: 15px;
				}
			}

			.time-pin {
				width: 50px;
				height: 50px;
				padding: 5px;
				display: block;
				overflow: hidden;
				float: left;
				box-sizing: border-box;
				position: relative;
				
				.avatar {
					width: 40px;
					height: 40px;
					border-radius: 50%;
					overflow: hidden;
					border: 2px solid #fff;
					box-shadow: 0px 3px 4px -2px rgba(0, 0, 0, 0.4);
					box-sizing: border-box;
	
					img {
						width: 100%;
					}
				}
			}

			.time-wrap {
				width: 100%;
				display: block;
				float: right;
				margin-left: -50px;
				padding-left: 60px;
				box-sizing: border-box;

				.time-content__header {
					font-size: 14px;
					margin-bottom: 5px;
					border-bottom: 1px solid transparentize($text-color, 0.8);
					
					& > * {
						margin-right: 10px;
					}

					.time {
						opacity: .5;
					}
				}

			}
		}
	}
}
</style>

