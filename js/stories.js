"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

//put all user created stories on the page

function putMyStoriesOnPage(e) {
  $myStories.empty()
  console.debug(putMyStoriesOnPage)
  $allStoriesList.hide();
  for (let story of currentUser.ownStories) {
    const userStory = generateStoryMarkup(story);
    $myStories.append(userStory);
    userStory.prepend($trashIcon)


  }

  $myStories.show();
  $myFavorites.hide()


}

$navmyStories.on("click",putMyStoriesOnPage)

//put favorite stories on page

function putFavoriteStoriesOnPage(e) {

   console.debug(putFavoriteStoriesOnPage)
   $allStoriesList.hide();
  $myFavorites.empty()
for (let story of currentUser.favorites) {
     const favoriteStory = generateStoryMarkup(story);
     $myFavorites.append(favoriteStory);
     favoriteStory.prepend($starIcon)


   }

   $myFavorites.show()
   $myStories.hide();


}




//Gets the data from the Add story form, calls the .addStory method and puts that new story on the page.

async function getStoryFormData(evt) {
  console.log('get new story data');
  evt.preventDefault();
  const $author = $("#author-name").val();
  const $storyTitle = $("#story-title").val();
  const $storyURL = $("#story-url").val();
  const $user = currentUser.username;

  const formData = {
    author: $author,
    title: $storyTitle,
    url: $storyURL,
    username: $user
  };

  const myStory = await storyList.addStory(currentUser, formData);

  const $myStory = generateStoryMarkup(myStory);


  $submitStoryForm.hide();
  $submitStoryForm.reset();
  $fav

  $myStories.prepend($myStory);
  return myStory;

}

$submitStoryForm.on("submit", getStoryFormData)





