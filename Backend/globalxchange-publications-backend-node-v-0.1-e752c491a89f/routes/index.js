var express = require('express');
var router = express.Router();
const { mallPlatformUser, authenticateFun } = require('../middleware/authenticate');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Publications' });
});

const publication = require('../controllers/pub_publication_detail_controller');
const video = require('../controllers/pub_video_controller');
const article = require('../controllers/pub_article_controller');
const publisher = require('../controllers/pub_publisher_detail_controller');
const apppub = require('../controllers/pub_app_publisher_controller');
const navbar = require('../controllers/pub_navbar_controller');
const categories = require('../controllers/pub_category_controller');
const company = require('../controllers/pub_company_detail_controller');
const event = require('../controllers/pub_event_detail_controller');
const country = require('../controllers/pub_country_detail_controller');
const useprofile = require('../controllers/pub_user_profile_controller');
const group = require('../controllers/pub_group_field_controller');
const field = require('../controllers/pub_field_data_controller');
const admin = require('../controllers/pub_admin_detail_controller');
const associate = require('../controllers/pub_user_association_detail_controller');
const caseStudy = require('../controllers/pub_case_study_controller');
const reports = require('../controllers/pub_reports_controller');
const documentaries = require('../controllers/pub_documentaries_controller');
const webstory = require('../controllers/pub_web_story_template_controller');
const story = require('../controllers/pub_stories_controller');
const pubPerson = require('../controllers/pub_person_detail_controller');
const userSaved = require('../controllers/pub_user_saved_controller');
const actionTrack = require('../controllers/pub_action_track_controller');
const userPublication = require('../controllers/pub_user_publication_controller');
const userPoints = require('../controllers/pub_user_points_controller');
const signUpUserPoints = require('../controllers/pub_user_signup_points_controller');
const userDailyPoints = require('../controllers/pub_user_daily_points_controller');
const articleRead = require('../controllers/pub_article_read_controller');
const userBonusPoints = require('../controllers/pub_user_bonus_controller');
const searchValue = require('../controllers/pub_search_controller');
const videoAction = require('../controllers/pub_action_video_track_controller');
const videoRead = require('../controllers/pub_video_read_controller');
const videoBonus = require('../controllers/pub_user_video_bonus_controller');
const articleQuestions = require('../controllers/pub_article_questions_controller');
const videoQuestions = require('../controllers/pub_video_questions_controller');
const userArticleAnswers = require('../controllers/pub_user_article_answers_controller');
const userVideoAnswers = require('../controllers/pub_user_video_answers_controller');
const PubAffiliateData = require('../controllers/pub_affiliate_data_controller');
const PubAffiliatePointsData = require('../controllers/pub_affiliate_points_data_controller');
const PubUserGlobalRank = require('../controllers/pub_user_global_rank_controller');
const PubUserRedeemPoints = require('../controllers/pub_user_redeem_points_controller');
const PubUserPointsRequest = require('../controllers/pub_user_points_request_controller');
const PubUserDailyPointsRank = require('../controllers/pub_user_daily_points_rank_controller');
const PubUserSubscription = require('../controllers/pub_user_subscirption_controller');
const PubCourses = require('../controllers/pub_courses_controller');
const PubSections = require('../controllers/pub_section_controller');
const PubVideoSections = require('../controllers/pub_video_section_controller');
const PubNewsLetter = require('../controllers/pub_news_letter_controller');
const PubWebinar = require('../controllers/pub_webinar_controller');
const subCategories = require('../controllers/pub_sub_category_controller')
const followAuthor = require('../controllers/pub_follow_authors_controller')



router.use('/publication', publication);
router.use('/action', actionTrack);
router.use('/founder', pubPerson);
router.use('/publisher', publisher);
router.use('/video', video);
router.use('/article', article);
router.use('/application', apppub);
router.use('/navbar', navbar);
router.use('/category', categories);
router.use('/subcategory',subCategories)
router.use('/company', company);
router.use('/event', event);
router.use('/country', country);
router.use('/userprofile', useprofile);
router.use('/group/field', field);
router.use('/group', group);
router.use('/admin', admin);
router.use('/associate', associate);
router.use('/casestudy', caseStudy);
router.use('/report', reports);
router.use('/documentary', documentaries);
router.use('/webstory', webstory);
router.use('/story', story);
router.use('/saveditems', userSaved);
router.use('/userpublication', userPublication)
router.use('/userpoints', userPoints)
router.use('/signuppoints', signUpUserPoints)
router.use('/dailypoints', userDailyPoints)
router.use('/articleread', articleRead)
router.use('/userbonus', userBonusPoints)
router.use('/search', searchValue)
router.use('/videoaction', videoAction)
router.use('/videoread', videoRead)
router.use('/videobonus', videoBonus)
router.use('/articlequestions', articleQuestions)
router.use('/videoquestions', videoQuestions)
router.use('/userarticleanswers', userArticleAnswers)
router.use('/uservideoanswers', userVideoAnswers)
router.use('/affiliate', PubAffiliateData)
router.use('/affiliatepoints', PubAffiliatePointsData)
router.use('/globalrank', PubUserGlobalRank)
router.use('/redeempoints', PubUserRedeemPoints)
router.use('/pointsrequest', PubUserPointsRequest)
router.use('/dailyrank', PubUserDailyPointsRank)
router.use('/subscription', PubUserSubscription)
router.use('/courses', PubCourses)
router.use('/sections', PubSections)
router.use('/videosections', PubVideoSections)
router.use('/userCourse', require('../controllers/pub_user_course_controller'))
router.use('/newsLetter', PubNewsLetter)
router.use('/webinar', PubWebinar)
router.use('/details', followAuthor)

module.exports = router;