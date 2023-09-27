"use strict";
const baseURL='https://hack-or-snooze-v3.herokuapp.com'
/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
  $allStoriesList.find("li").prepend($starIcon);
  $('.fa-star').click(function () {
    $(this).toggleClass('fas far');
  });
  $myFavorites.hide()

}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
  $storiesContainer.hide()
}
$navLogin.on("click", navLoginClick);

/** Hide everything but profile on click on "profile" */

function navProfileClick(evt) {
  console.debug("navProfileClick", evt);
  hidePageComponents();
  $userProfile.show();
}

$navUserProfile.on("click", navProfileClick);


/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").css('display', 'flex');
  $navUserProfile.text(`${currentUser.username}`).show()
  $navSubmit.show();
  $navmyStories.show();
  $navFavorites.show()

  $navLogin.hide();
  $navLogOut.show();


}





// show story submit form when 'submit' is clcked
function showAddStoryForm(evt) {
  console.debug("navStoryForm");
  hidePageComponents();
  $allStoriesList.show();
  $myFavorites.hide()
  $submitStoryForm.show();




}


$navSubmit.on("click", showAddStoryForm);

function navFavorites(evt){
  hidePageComponents();
  putFavoriteStoriesOnPage()

}
$navFavorites.on("click",navFavorites)








