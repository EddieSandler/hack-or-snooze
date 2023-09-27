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

function generateStoryMarkup(story,showDeleteBtn = false) {
  const hostName = story.getHostName();
  // console.debug("generateStoryMarkup", story);
  const showStar = Boolean(currentUser);


  return $(`
      <li id="${story.storyId}">
      <div>
      ${showDeleteBtn ? getDeleteBtnHTML() : ""}
      ${showStar ? getStarHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
        </div>
      </li>
    `);
}
function getDeleteBtnHTML() {
  return `
      <span class="trash-can">
        <i class="fas fa-trash-alt"></i>
      </span>`;
}

/** Make favorite/not-favorite star for story */

function getStarHTML(story, user) {
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite ? "fas" : "far";
  return `
      <span class="star">
        <i class="${starType} fa-star"></i>
      </span>`;
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
async function deleteStory(evt) {
  console.debug("deleteStory");

  const $closestLi = $(evt.target).closest("li");
  const storyId = $closestLi.attr("id");

  await storyList.removeStory(currentUser, storyId);

  // re-generate story list
  await putMyStoriesOnPage();
}

$myStories.on("click", ".trash-can", deleteStory);


//put all user created stories on the page

function putMyStoriesOnPage(e) {
  $myStories.empty()
  console.debug('putMyStoriesOnPage')

  for (let story of currentUser.ownStories) {
    const userStory = generateStoryMarkup(story,true);
    $myStories.append(userStory);

  }

  $myStories.show();
  $myFavorites.hide()
}

$navmyStories.on("click",putMyStoriesOnPage)

//put favorite stories on page

function putFavoriteStoriesOnPage(e) {



   if (currentUser.favorites.length === 0) {
    $favoritedStories.append("<h5>No favorites added!</h5>");
  } else {
    // loop through all of users favorites and generate HTML for them
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $myFavorites.append($story);


   }

   $myFavorites.show()
   $myStories.hide();


}
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


  $myStories.prepend($myStory);
  return myStory;

}

$submitStoryForm.on("submit", getStoryFormData)


async function toggleStoryFavorite(evt) {
  console.debug("toggleStoryFavorite");

  const $tgt = $(evt.target);
  const $closestLi = $tgt.closest("li");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find(s => s.storyId === storyId);

  // see if the item is already favorited (checking by presence of star)
  if ($tgt.hasClass("fas")) {
    // currently a favorite: remove from user's fav list and change star
    await currentUser.removeFavorite(story);
    $tgt.closest("i").toggleClass("fas far");
  } else {
    // currently not a favorite: do the opposite
    await currentUser.addFavorite(story);
    $tgt.closest("i").toggleClass("fas far");
  }
}

$storiesLists.on("click", ".star", toggleStoryFavorite);



