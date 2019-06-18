import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	state: {
		layout: {
			navPos: 'left', //top, bottom, left, right, false
			toolbar: 'top', //top, bottom, false
			footer: true, //above, below, false
			boxed: false, //true, false
			roundedCorners: false, //true, false
			viewAnimation: 'fade-top' // fade-left, fade-right, fade-top, fade-top-in-out, fade-bottom, fade-bottom-in-out, fade, false
		},
		userRoles:'',
		splashScreen: true,
		logged: false,
		token:'',
		notificationToken:'',
		email:'',
		phone_number:'',
		profileurl:'',
		fullname:'',
		url:
		// 'http://localhost:4443/api'
			'https://capex.wazinsure.com:4443/api'
		,
		authUrl:
		// 'http://localhost:4443/auth'
			'https://capex.wazinsure.com:4443/auth'
		,
		notificationUrl:
			'http://messaging.wazinsure.com:4443/api'
		// 'http://localhost:4443/api'
		,
		notificationAuthUrl:
		// 'http://localhost:4443/auth'
			'http://messaging.wazinsure.com:4443/auth'

	},
	mutations: {
		setLayout(state, payload) {
			if(payload && payload.navPos !== undefined)
				state.layout.navPos = payload.navPos

			if(payload && payload.toolbar !== undefined)
				state.layout.toolbar = payload.toolbar

			if(payload && payload.footer !== undefined)
				state.layout.footer = payload.footer

			if(payload && payload.boxed !== undefined)
				state.layout.boxed = payload.boxed

			if(payload && payload.roundedCorners !== undefined)
				state.layout.roundedCorners = payload.roundedCorners

			if(payload && payload.viewAnimation !== undefined)
				state.layout.viewAnimation = payload.viewAnimation
		},
		setLogin(state, payload) {
			state.logged = payload
		},
		setLogout(state, payload) {
			state.layout.navPos = null
			state.layout.toolbar = null
			state.logged = false
		},
		setSplashScreen(state, payload) {
			state.splashScreen = payload
		},
		change(state, username){
			state.username=username;
		},
		setToken(state, token){
			state.token=token;
		},
		setEmail(state, email){
			state.email=email;
		},
		setPhoneNumber(state, phone_number){
			state.phone_number=phone_number;
		},
		setNotificationToken(state, token){
			state.notificationToken=token;
		},
		setUserRoles(state, userRoles){
			state.userRoles=userRoles;
		},
		setName(state, fullname){
			state.fullname=fullname;
		},
		setProfile(state, profileurl){
			state.profileurl=profileurl;
		},

		setUrl(state, url){
			state.url=url;
		},

		setAuthUrl(state, authUrl){
			state.authUrl=authUrl;
		},
		setNotificationUrl(state, url){
			state.notificationUrl=url;
		},

		setNotificationAuthUrl(state, authUrl){
			state.notificationAuthUrl=authUrl;
		},
		removeChange(state){
			return state.username='';
		},
		removeToken(state){
			return state.token='';
		},
		removeName(state){
			return state.name='';
		},
		removeProfile(state){
			return state.profileurl='';
		}
	},
	actions: {

	},
	getters: {
		layout(state, getters) {
			return state.layout
		},
		navPos(state, getters) {
			return state.layout.navPos
		},
		toolbar(state, getters) {
			return state.layout.toolbar
		},
		footer(state, getters) {
			return state.layout.footer
		},
		boxed(state, getters) {
			return state.layout.boxed
		},
		roundedCorners(state, getters) {
			return state.layout.roundedCorners
		},
		viewAnimation(state, getters) {
			return state.layout.viewAnimation
		},
		isLogged(state, getters) {
			return state.logged
		},
		splashScreen(state, getters) {
			return state.splashScreen
		},

		token: state => state.token,
		notificationToken: state => state.notificationToken,
		getUserRole:(state) => (role) => {
			return state.userRoles.find(userRoles => userRoles === role)
		},

		username: state => state.username,
		fullname: state => state.fullname,
		url: state => state.url,
		authUrl: state => state.authUrl,
		notificationAuthUrl: state => state.notificationAuthUrl,
		notificationUrl: state => state.notificationUrl,
		phone_number: state => state.phone_number,
		email: state => state.email,
		userRoles: state => state.userRoles,
		profileurl: state => state.profileurl

	},
	plugins: [createPersistedState({paths: ['layout']})],
	strict: debug
})
