"use strict";

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
  $myFavorites.show()

  $navLogin.hide();
  $navLogOut.show();

  $loginForm.hide();
  $signupForm.hide();






  $("#nav-favorite").show();

  $navUserProfile.text(`${currentUser.username}`).show();
}


// show story submit form when 'submit' is clcked
function showAddStoryForm(evt) {
  console.debug("navStoryForm");
  $submitStoryForm.show();


}


$navSubmit.on("click", showAddStoryForm);

async function makeFavoriteStory() {


  let response = await axios.post('https://hack-or-snooze-v3.herokuapp.com/users/theDude2/favorites/4372222a-67a7-422c-9eef-a4e286e3388f',
    {
      token: `${currentUser.loginToken} `
    })



  console.log('future site of favorites', response);
  //  return this.favorites
  return response
}






$("#nav-favorite").on('click', makeFavoriteStory)

