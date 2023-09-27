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

}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navSubmit.show();
  $navmyStories.show();
  $navFavorites.show()

  $navLogin.hide();
  $navLogOut.show();

  $loginForm.hide();
  $signupForm.hide();

}





// show story submit form when 'submit' is clcked
function showAddStoryForm(evt) {
  console.debug("navStoryForm");
  $submitStoryForm.show();


}


$navSubmit.on("click", showAddStoryForm);










