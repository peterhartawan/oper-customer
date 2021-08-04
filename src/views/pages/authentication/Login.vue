<template>
	<vue-scroll class="login-page align-vertical">
		<div class="form-wrapper align-vertical-middle">
			<div class="form-box card-base card-shadow--extraLarge">
				<img class="image-logo" src="@/assets/images/logo.svg" alt="logo"/>
				<p style="color: red" v-show="errorButto">Invalid Email or Password</p>
				<p style="color: red" v-show="errorBUtt">{{ errorMessage.message }}</p>
				<float-label class="styled">
					<input 
							type="email"
							v-model="form.email"
							@keyup.enter="login"
							placeholder="E-mail">
				</float-label>
				<float-label class="styled">
					<input 
							type="password" 
							v-model="form.password"
							@keyup.enter="login"
							placeholder="Password">
				</float-label>
				
				<div class="flex">
					<div class="box grow text-right"><router-link to="/forgot-password">Forgot Password?</router-link></div>
				</div>

				<div class="flex text-center center pt-30 pb-10">			
					<el-button
							plain size="small"
							@click="login"
							:loading="button"
							class="login-btn tada animated">
						LOGIN
					</el-button>
				</div>
				<!--<span>{{ errorMessage }}</span>-->
				<!-- <div class="text-divider mv-10">or</div>

				<div class="flex column center pt-10 pb-10">			
					<el-button plain size="small" @click="login" class="social-btn google">
						Log in with Google
					</el-button>
					<el-button plain size="small" @click="login" class="social-btn facebook">
						Log in with Facebook
					</el-button>
				</div>

				<div class="text-center signin-box pt-20">
					Don't have an account? <a>Sign in</a>
				</div> -->
			</div>
		</div>
	</vue-scroll>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import router from '../../../router'
import * as mutation from '../../../store/mutation-types'
import * as action from '../../../store/action-types.js'
import * as getter from '../../../store/getters-types'

export default {
	name: 'Login',
	data() {
		return {
			buttonError		: null,
			buttonErrors	: null,
			form: {
				email: '',
				password: '',
			}
		}
	},
	computed: {
		...mapGetters({
			getError		: getter.GET_ERROR,
			button			: getter.GET_BUTTON,
			errorMessage 	: getter.GET_ERROR_MESSAGE
		}),
		isLogged(){
			return this.$store.getters.isLogged
		},
		errorButto(){
			if(this.getError){
				if(this.errorMessage.code == 4000){
					return true
				}else {
					return false
				}
			}
		},
		errorBUtt(){
			if(this.getError){
				if(this.errorMessage.code != 4000){
					return true
				}else {
					return false
				}
			}
		}
	},
	methods: {
		login() {
			const formData = {
				email: this.form.email,
				password: this.form.password,
			};
			this.$store.commit(mutation.SET_ERROR, null)
			this.$store.commit(mutation.BUTTON_STATUS, true)
			this.$store.dispatch(action.LOGIN, formData)
		}
	},
	created(){
		this.$store.commit(mutation.SET_ERROR, null)
	}
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.login-page {
	background: $text-color;
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
			width: 80px;
			margin: 0px auto;
			margin-bottom: 30px;
			display: block;
		}

		.login-btn ,
		.social-btn {
			width: 160px;

			&.google {
				margin-bottom: 10px;
				background-color: #d73d32;
				color: white;

				&:hover {
					border-color: #d73d32;
				}
			}
			&.facebook {
				background-color: #3f5c9a;
				color: white;

				&:hover {
					border-color: #3f5c9a;
				}
			}
		}

		.signin-box {
			font-size: 14px;
		}
	}
}

@media (max-width: 768px) {
	.layout-container .container .view.login-page {
		margin-left: -5px;
		margin-right: -5px;
		max-width: calc(100% + 10px);
	}
}
</style>
