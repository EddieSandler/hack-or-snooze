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


//Gets the data from the Add story form, calls the .addStory method and puts that new story on the page.

// function putNewStoryOnPage() {
//   // evt.preventDefault();
//   // console.debug('putNewStoryOnPage')
//   // const $author = $("#author-name").val();

//   // const $storyTitle = $("#story-title").val();

//   // const $storyURL = $("#story-url").val();

//   // console.log($author,$storyTitle,$storyURL)
//   console.log('test')

// }


$(document).ready(function() {
  // Add a submit event listener to the form
  $("#submit-story-form").submit(function(event) {
    event.preventDefault(); // Prevent the default form submission
console.log('test')
    // Get the values from the form elements using jQuery
    const author = $("#author-name").val();
    const title = $("#story-title").val();
    const url = $("#story-url").val();

    // Create an object with the form data
    const formData = {
      author: author,
      title: title,
      url: url
    }
    console.log(formData.author,formData.title,formData.url)
    });



  })


