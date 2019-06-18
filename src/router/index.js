import Vue from 'vue'
import Router from 'vue-router'


//apps
import Dashboard from '../views/apps/Dashboard.vue'
import Calendar from '../views/apps/Calendar.vue'
import Contacts from '../views/apps/Contacts.vue'
import Gallery from '../views/apps/Gallery.vue'
import Timeline from '../views/apps/Timeline.vue'

//pages
import Login from '../views/pages/authentication/Login.vue'
import Register from '../views/pages/authentication/Register.vue'
import Countries from '../views/pages/Countries.vue'
import addCountry from '../components/countries/countries_create'
import editCountry from '../components/countries/countries_edit'
import motorExcess from '../views/pages/MotorExcess.vue'
import motorExcess_add from '../components/motor_excess/motor_excess_create'
import motorExcess_edit from '../components/motor_excess/motor_excess_edit'
import motorClaims from '../views/pages/MotorClaims.vue'
import motorClaims_add from '../components/motor_claims/motor_claims_create'
import motorClaims_edit from '../components/motor_claims/motor_claims_edit'
import Motor_Claims_newly_submitted from '../components/motor_claims/motor_claims_newly_submitted'
import Motor_Claims_awaiting_information from '../components/motor_claims/motor_awaiting_information'
import Motor_Claims_rejected from '../components/motor_claims/motor_claims_rejected'
import Motor_Claims_paid from '../components/motor_claims/motor_claims_paid'
import Motor_Claims_reopened from '../components/motor_claims/motor_claim_reopened'
import Motor_Claims_review from '../components/motor_claims/motor_claim_review_form'
import Motor_Claims_approved from '../components/motor_claims/motor_claims_approved'
import MotorCovers from '../views/pages/MotorCovers.vue'
import MotorCovers_add from '../components/motor_cover/motor_cover_create'
import MotorCovers_edit from '../components/motor_cover/motor_cover_edit'
import motorBenefits from '../views/pages/MotorBenefits.vue'
import motorBenefits_add from '../components/motor_benefits/motor_benefits_create'
import motorBenefits_edit from '../components/motor_benefits/motor_benefits_edit'
import motorPolicies from '../views/pages/MotorPolicies.vue'
import motorPoliciesapproved from '../components/motor_policies/motor_policies_approved'
import motorPoliciespending from '../components/motor_policies/motor_policies_pending'
import motorPolicies_add from '../components/motor_policies/motor_policy_create'
import motorPolicies_edit from '../components/motor_policies/motor_policy_edit'
import motorPoliciesapprovedForm from '../components/motor_policies/motor_policies_approval_form'
import life_policies from '../views/pages/Life.vue'
import life_policies_add from '../components/life_policies/life_policy_create'
import life_policies_approval_form from '../components/life_policies/life_policies_approval_form'
import life_policies_approved from '../components/life_policies/life_policies_approved'
import life_policies_pending from '../components/life_policies/life_policies_pending'
import life_policies_edit from '../components/life_policies/life_policy_edit'
import life_claims from '../views/pages/Life_Claims'
import life_claims_add from '../components/life_claims/life_claim_create'
import life_claims_edit from '../components/life_claims/life_claim_edit'
import life_Claims_newly_submitted from '../components/life_claims/life_claims_newly_submitted'
import life_Claims_awaiting_information from '../components/life_claims/life_claims_awaitng_information'
import life_Claims_rejected from '../components/life_claims/life_claims_rejected'
import life_Claims_paid from '../components/life_claims/life_claims_paid'
import life_Claims_reopened from '../components/life_claims/life_claims_reopened'
import life_Claims_review from '../components/life_claims/life_claims_review_form'
import life_Claims_approved from '../components/life_claims/life_claims_approved'
import life_covers from '../views/pages/LifeCovers'
import life_covers_add from '../components/life_covers/life_cover_create'
import life_covers_edit from '../components/life_covers/life_cover_edit'
import pa_covers from '../views/pages/PA_Covers.vue'
import pa_covers_add from '../components/pa_covers/pa_covers_create'
import pa_covers_edit from '../components/pa_covers/pa_covers_edit'
import PA_Claims_newly_submitted from '../components/pa_claims/pa_claims_newly_submitted'
import PA_Claims_awaiting_information from '../components/pa_claims/pa_claims_awaiting_information'
import PA_Claims_rejected from '../components/pa_claims/pa_claims_rejected'
import PA_Claims_paid from '../components/pa_claims/pa_claims_paid'
import PA_Claims_reopened from '../components/pa_claims/pa_claims_reopened'
import PA_Claims_approved from '../components/pa_claims/pa_claims_approved'
import pa_claims_add from '../components/pa_claims/pa_claims_create'
import pa_claims_edit from '../components/pa_claims/pa_claims_edit'
import pa_claims_review from '../components/pa_claims/pa_claims_review_form'
import customer_reports from '../components/reports/customer_reports'
import motor_policy_reports from '../components/reports/motor_policy_reports'
import pa_policy_reports from '../components/reports/papolicy_reports'
import life_policy_reports from '../components/reports/life-policy-reports'
import motor_claim_reports from '../components/reports/motor-claim-reports'
import pa_claim_reports from '../components/reports/pa-claim-reports'
import life_claim_reports from '../components/reports/life-claim-reports'
import Currency from '../views/pages/Currency.vue'
import addCurrency from '../components/currency/currency_create'
import editCurrency from '../components/currency/currency_edit'
import payments from '../views/pages/Payments.vue'
import payments_add from '../components/payments/payment_create'
import payments_edit from '../components/payments/payment_edit'
import products from '../views/pages/Products.vue'
import products_add from '../components/products/products_create'
import products_edit from '../components/products/products_edit'
import underwritters from '../views/pages/Underwritters.vue'
import underwritters_add from '../components/underwritters/underwritters_create'
import underwritters_edit from '../components/underwritters/underwritters_edit'
import mpesaresponse_add from '../components/mpesa_responses/mpesaResponse_create'
import mpesaresponse_edit from '../components/mpesa_responses/mpesaResponse_edit'
import mpesaresponses from '../views/pages/MpesaResponse.vue'
import failedmpesaresponse_add from '../components/failed_mpesa_responses/failed_mpesa_create'
import failedmpesaresponse_edit from '../components/failed_mpesa_responses/failed_mpesa_edit'
import failedmpesaresponses from '../views/pages/Failed_mpesa_responses.vue'
import userroletype_add from '../components/userrole_type/userrole_type_create'
import userroletype_edit from '../components/userrole_type/userrole_type_edit'
import userroletype from '../views/pages/Userrole_type.vue'
import userroles_add from '../components/userrole/userrole_create'
import userroles_edit from '../components/userrole/userrole_edit'
import userroles from '../views/pages/Userrole.vue'
import user_add from '../components/user/user_create'
import users from '../views/pages/User.vue'
import pa_policies_approved from '../components/pa_policies/pa_policies_approved'
import pa_policies_pending from '../components/pa_policies/pa_policies_pending'
import pa_policies_add from '../components/pa_policies/pa_policies_create'
import pa_policies_approve from '../components/pa_policies/pa_policies_approve_form'
import pa_policies_edit from '../components/pa_policies/pa_policies_edit'
import travelpolicies from '../views/pages/Travel_policies.vue'
import travelpolicy from '../components/travel_policies/travel_policy'
import sendMessage from '../components/message/single_message'
import sendEmail from '../components/message/single_email'
import Customers from '../views/pages/Customers.vue'
import addCustomer from '../components/customer/customer_create'
import editCustomer from '../components/customer/customer_edit'
import ForgotPassword from '../views/pages/authentication/ForgotPassword.vue'
import Profile from '../views/pages/Profile.vue'
import NotFound from '../views/pages/NotFound.vue'
import error from '../views/pages/AdminError.vue'
import charttest from '../components/message/airtime.vue'
import Policy from '../views/pages/Policy'
import LifeCalculator from '../components/termlifeProducts/calculator.vue'

//ui
import layouts from '../layout'
import store from '../store'

Vue.use(Router);


const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            alias: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['app'],
                endUser: true
            }
        },

        {
            path: '/charttest',
            name: 'chart',
            component: charttest,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }

        },
        {
            path: '/lifecalculator',
            name: 'LifeCalculator',
            component: LifeCalculator,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['Term Life'],
                endUser: true
            }
        },
        {
            path: '/motorpolicies',
            name: 'motorpolicies',
            component: motorPolicies,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/motorpolicies/pending',
            name: 'motorpoliciespending',
            component: motorPoliciespending,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },{
            path: '/motorpolicies/approved',
            name: 'motorpoliciesapproved',
            component: motorPoliciesapproved,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/motorpolicies/approve/:id',
            name: 'motorpoliciesapproveForm',
            component: motorPoliciesapprovedForm,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/motorpolicies/add',
            name: 'motorPolicies_add',
            component: motorPolicies_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/motorpolicies/edit/:id',
            name: 'motorPolicies_edit',
            component: motorPolicies_edit,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },

        {
            path: '/motorexcess',
            name: 'motorexcess',
            component: motorExcess,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/motorexcess/add',
            name: 'motorExcess_add',
            component: motorExcess_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/motorexcess/edit/:id',
            name: 'motorExcess_edit',
            component: motorExcess_edit,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },

        {
            path: '/motorcovers',
            name: 'motorcovers',
            component: MotorCovers,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/motorcovers/add',
            name: 'motorCovers_add',
            component: MotorCovers_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/motorcovers/edit/:id',
            name: 'motorCovers_edit',
            component: MotorCovers_edit,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },

        {
            path: '/motorclaims',
            name: 'motorClaims',
            component: motorClaims,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },

        {
            path: '/motorclaimsapproved',
            name: 'motor_claims_approved',
            component: Motor_Claims_approved,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/motorclaimsnew',
            name: 'motor_claims_newly_submitted',
            component: Motor_Claims_newly_submitted,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/motorclaimspaid',
            name: 'motor_claims_paid',
            component: Motor_Claims_paid,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/motorclaimsreopened',
            name: 'motor_claim_reopened',
            component: Motor_Claims_reopened,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/motorclaimsrejected',
            name: 'motor_claims_rejected',
            component: Motor_Claims_rejected,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/motorclaimsawaiting',
            name: 'Motor_Claims_awaiting_information',
            component: Motor_Claims_awaiting_information,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },

        {
            path: '/motorclaims/add',
            name: 'motorClaims_add',
            component: motorClaims_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },

        {
            path: '/motorclaims/review/:id',
            name: 'Motor_Claims_review',
            component: Motor_Claims_review,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/motorclaims/edit/:id',
            name: 'motorClaims_edit',
            component: motorClaims_edit,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },

        {
            path: '/motorbenefits',
            name: 'motorbenefits',
            component: motorBenefits,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/motorbenefits/add',
            name: 'motorBenefits_add',
            component: motorBenefits_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/motorbenefits/edit/:id',
            name: 'motorBenefits_edit',
            component: motorBenefits_edit,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },

        {
            path: '/lifepolicies',
            name: 'life-policy',
            component: life_policies,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/lifepolicies/add',
            name: 'life-policy-add',
            component: life_policies_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/lifepolicies/edit/:id',
            name: 'life-policy-edit',
            component: life_policies_edit,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/lifepolicies/approve/:id',
            name: 'life_policies_approval_form',
            component: life_policies_approval_form,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },

        {
            path: '/lifepolicies/approved',
            name: 'life_policies_approved',
            component: life_policies_approved,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },

        {
            path: '/lifepolicies/pending',
            name: 'life_policies_pending',
            component: life_policies_pending,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },

        {
            path: '/lifeclaims',
            name: 'life-claims',
            component: life_claims,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/lifeclaims/approved',
            name: 'life_Claims_approved',
            component: life_Claims_approved
            ,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/lifeclaims/new',
            name: 'life_Claims_newly_submitted',
            component: life_Claims_newly_submitted,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/lifeclaims/paid',
            name: 'life_Claims_paid',
            component: life_Claims_paid,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/lifeclaims/reopened',
            name: 'life_Claims_reopened',
            component: life_Claims_reopened,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/lifeclaims/rejected',
            name: 'life_Claims_rejected',
            component: life_Claims_rejected,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/lifeclaims/awaiting',
            name: 'life_Claims_awaiting_information',
            component: life_Claims_awaiting_information,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },



        {
            path: '/lifeclaims/review/:id',
            name: 'life_Claims_review',
            component: life_Claims_review,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/lifeclaims/add',
            name: 'life-claims-add',
            component: life_claims_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/lifeclaims/edit/:id',
            name: 'life-claims-edit',
            component: life_claims_edit,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },

        {
            path: '/life-covers',
            name: 'life-covers',
            component: life_covers,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/life-covers/add',
            name: 'life-covers-add',
            component: life_covers_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/life-covers/edit/:id',
            name: 'life-covers-edit',
            component: life_covers_edit,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },


        {
            path: '/customerreports',
            name: 'customer_reports',
            component: customer_reports,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['Reports'],
                endUser: true
            }
        },
        {
            path: '/lifepolicyreports',
            name: 'life_policy_reports',
            component: life_policy_reports,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['Reports'],
                endUser: true
            }
        },
        {
            path: '/motorpolicyreports',
            name: 'motor_policy_reports',
            component: motor_policy_reports,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['Reports'],
                endUser: true
            }
        }, {
            path: '/papolicyreports',
            name: 'pa_policy_reports',
            component: pa_policy_reports,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['Reports'],
                endUser: true
            }
        }, {
            path: '/lifeclaimreports',
            name: 'life_claim_reports',
            component: life_claim_reports,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['Reports'],
                endUser: true
            }
        },
        {
            path: '/motorclaimreports',
            name: 'motor_claim_reports',
            component: motor_claim_reports,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['Reports'],
                endUser: true
            }
        }, {
            path: '/paclaimreports',
            name: 'pa_claim_reports',
            component: pa_claim_reports,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['Reports'],
                endUser: true
            }
        },
        {
            path: '/customers',
            name: 'customers',
            component: Customers,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },

        {
            path: '/customers/add',
            name: 'addCustomer',
            component: addCustomer,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },

        {
            path: '/customers/edit/:id',
            name: 'editCustomer',
            component: editCustomer,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/countries',
            name: 'countries',
            component: Countries,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/countries/add',
            name: 'addCountry',
            component: addCountry,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/countries/edit/:id',
            name: 'editCountry',
            component: editCountry,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/currency',
            name: 'currency',
            component: Currency,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/currency/add',
            name: 'addCurrency',
            component: addCurrency,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/currency/edit/:id',
            name: 'editCurrency',
            component: editCurrency,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },

        {
            path: '/paclaimsnew',
            name: 'pa_claims_new',
            component: PA_Claims_newly_submitted,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/paclaimsawaiting',
            name: 'pa_claims_awaiting',
            component: PA_Claims_awaiting_information,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/paclaimsrejected',
            name: 'pa_claims_rejected',
            component: PA_Claims_rejected,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/paclaimspaid',
            name: 'pa_claims_rejected',
            component: PA_Claims_paid,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/paclaimsreopened',
            name: 'PA_Claims_reopened',
            component: PA_Claims_reopened,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/paclaimsapproved',
            name: 'PA_Claims_approved',
            component: PA_Claims_approved,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },


        {
            path: '/pa_claims/add',
            name: 'pa_claims_add',
            component: pa_claims_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/pa_claims/edit/:id',
            name: 'pa_claims_edit',
            component: pa_claims_edit,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/paclaims/review/:id',
            name: 'pa_claims_edit',
            component: pa_claims_review,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/pa_covers',
            name: 'pa_covers',
            component: pa_covers,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/pa_covers/add',
            name: 'pa_covers_add',
            component: pa_covers_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/pa_covers/edit/:id',
            name: 'pa_covers_edit',
            component: pa_covers_edit,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/papolicies/approved',
            name: 'pa_policies_approved',
            component: pa_policies_approved,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/papolicies/pending',
            name: 'pa_policies_pending',
            component: pa_policies_pending,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/papolicies/add',
            name: 'pa_policies_add',
            component: pa_policies_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/papolicies/edit/:id',
            name: 'pa_policies_edit',
            component: pa_policies_edit,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/papolicies/approve/:id',
            name: 'pa_policies_approve',
            component: pa_policies_approve,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/products',
            name: 'products',
            component: products,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/products/add',
            name: 'products_add',
            component: products_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/products/edit/:id',
            name: 'products_edit',
            component: products_edit,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/travelpolicies',
            name: 'travelpolicies',
            component: travelpolicies,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/travelpolicies/:id',
            name: 'travelpolicy',
            component: travelpolicy,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/payments',
            name: 'payments',
            component: payments,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/payments/add',
            name: 'payments_add',
            component: payments_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/payments/edit/:id',
            name: 'payments_edit',
            component: payments_edit,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/underwritters',
            name: 'underwritters',
            component: underwritters,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/underwritters/add',
            name: 'underwritters_add',
            component: underwritters_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/underwritters/edit/:id',
            name: 'underwritters_edit',
            component: underwritters_edit,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/mpesaresponses',
            name: 'mpesareponses',
            component: mpesaresponses,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/mpesaresponses/add',
            name: 'mpesaresponse_add',
            component: mpesaresponse_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/mpesaresponses/edit/:id',
            name: 'mpesaresponse_edit',
            component: mpesaresponse_edit,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/mpesaresponses',
            name: 'mpesareponses',
            component: mpesaresponses,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/mpesaresponses/add',
            name: 'mpesaresponse_add',
            component: mpesaresponse_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/mpesaresponses/edit/:id',
            name: 'mpesaresponse_edit',
            component: mpesaresponse_edit,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/failedmpesaresponses',
            name: 'failedmpesareponses',
            component: failedmpesaresponses,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/failedmpesaresponses/add',
            name: 'failedmpesaresponse_add',
            component: failedmpesaresponse_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/failedmpesaresponses/edit/:id',
            name: 'failedmpesaresponse_edit',
            component: failedmpesaresponse_edit,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                endUser: true

            }
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {

            path: '/policy/:id',
            name: 'policy',
            component: Policy,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                endUser: true
            }
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {
                layout: layouts.contenOnly
            }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: {
                layout: layouts.contenOnly
            }
        },
        {
            path: '/forgot-password',
            name: 'forgot-password',
            component: ForgotPassword,
            meta: {
                layout: layouts.contenOnly
            }
        },
        {
            path: '/userroles',
            name: 'userroles',
            component: userroles,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                admin: true
            }
        },
        {
            path: '/userroles/add',
            name: 'userroles_add',
            component: userroles_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                admin: true

            }
        },
        {
            path: '/userroles/edit/:id',
            name: 'userroles_edit',
            component: userroles_edit,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                admin: true

            }
        },
        {
            path: '/userroletype',
            name: 'userroletype',
            component: userroletype,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                admin: true
            }
        },
        {
            path: '/userroletype/add',
            name: 'userroletype_add',
            component: userroletype_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                admin: true

            }
        },
        {
            path: '/userroletype/edit/:id',
            name: 'userroletype-edit',
            component: userroletype_edit,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                admin: true

            }
        },
        {
            path: '/user',
            name: 'user',
            component: users,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['pages'],
                admin: true
            }
        },
        {
            path: '/user/add',
            name: 'user_add',
            component: user_add,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                admin: true

            }
        },
        {
            path: '/sendmessage',
            name: 'sendMessage',
            component: sendMessage,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['Messages']
            }
        },
        {
            path: '/sendemail',
            name: 'sendEmail',
            component: sendEmail,
            meta: {
                auth: true,
                layout: layouts.navLeft,
                searchable: true,
                tags: ['Messages']
            }
        },
        {
            path: '/logout',
            beforeEnter (to, from, next) {
                store.commit('setUserRoles', '');
                store.commit('setName', '');
                store.commit('setLogin',false);
                auth.logout();
                next({path:'/login'})
            }
        },
        {
            path: '/error',
            name: 'error',
            component: error,
            meta: {
                layout: layouts.contenOnly
            }
        },

        {
            path: '*',
            name: 'not-found',
            component: NotFound,
            meta: {
                layout: layouts.contenOnly
            }
        }
    ]
})


const l = {
    contenOnly(){
        store.commit('setLayout', layouts.contenOnly)
    },
    navLeft(){
        store.commit('setLayout', layouts.navLeft)
    },
    navRight(){
        store.commit('setLayout', layouts.navRight)
    },
    navTop(){
        store.commit('setLayout', layouts.navTop)
    },
    navBottom(){
        store.commit('setLayout', layouts.navBottom)
    },
    set(layout){
        store.commit('setLayout', layout)
    }
}

//insert here login logic
const auth = {
    loggedIn() {
        return store.getters.isLogged
    },
    logout() {
        location.reload();

        // store.commit('removeToken');
        // store.commit('removeName');
        // store.commit('removeProfile');
        // store.commit('removeChange');
        // store.commit('setLogout');
    },
    checkToken(){
        return store.getters.token;
    }
}

//
// router.beforeEach((to, from, next) => {
// 	if(to.matched.some(record => record.meta.auth)) {
// 		if (store.getters.token == null) {
// 			next({
// 				path: '/login',
// 				params: { nextUrl: to.fullPath }
// 			})
// 		} else {
// 			let user = store.getters.userType;
// 			if(to.matched.some(record => record.meta.admin)) {
// 				if(user === 'ADMIN' && to.name ==='user'){
// 					next()
// 				}
// 				else{
// 					next({from});
// 				}
// 			}
// 			// else if(to.matched.some(record => record.meta.endUser)) {
// 			// 	if(user === 'ENDUSER'){
// 			// 		next()
// 			// 	}
// 			// 	else{
// 			// 		next({ name: 'dashboard'})
// 			// 	}
// 			// }
// 		}
// 	}else {
// 		next()
// 	}
// })


router.beforeEach((to, from, next) => {
    let authrequired = false
    if(to && to.meta && to.meta.auth)
        authrequired = true


    //console.log('authrequired', authrequired, to.name)

    if(authrequired) {
        if(auth.loggedIn()) {
            if(to.name === 'login') {
                window.location.href = '/'
                return false
            } else {
                next()
            }
        } else {
            if(to.name !== 'login'){
                window.location.href = '/login'
                return false
            }
            next()
        }
    } else {
        if(auth.loggedIn() && to.name === 'login'){
            window.location.href = '/'
            return false
        } else {
            next()
        }
    }

    if (to.matched.some(record => record.meta.admin)){
        if (store.getters.getUserRole('Admin') === 'Admin'){
            next()
        }else {
            router.push('/error')
            console.log('ERROR: NOT ADMIN')
        }
    }else{
        next()
    }


    if(to && to.meta && to.meta.layout){
        l.set(to.meta.layout)
    }
})

router.afterEach((to, from) => {
    setTimeout(()=>{
        store.commit('setSplashScreen', false)
    }, 150)
})

export default router
