if (localStorage.getItem("bookmarks") === null) {
  localStorage.setItem("bookmarks", JSON.stringify([]));
}

document
  .getElementById("myform")
  .addEventListener("submit", event => createBookmark(event));

function createBookmark(e) {
  e.preventDefault();
  var name = document.getElementById("sitename").value;
  var url = document.getElementById("siteurl").value;
  console.log(name, url);

  if (validation(name, url)) {
    var bookmark = {
      name: name,
      url: url
    };
    saveBookmark(bookmark);
  } else {
    return;
  }
}

function saveBookmark(bookmark) {
  bookmarkStorage = JSON.parse(localStorage.getItem("bookmarks"));
  bookmarkStorage.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkStorage));
  getBookmarks();
}
function deleteBookmark(url) {
  let bookmarkStorage = JSON.parse(localStorage.getItem("bookmarks"));
  bookmarkStorage.forEach((bookmark, index) => {
    if (bookmark.url == url) {
      bookmarkStorage.splice(index, 1);
    }
  });
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkStorage));
  getBookmarks();
}

function getBookmarks() {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  resultDiv = document.getElementById("savedBookmarks");
  resultDiv.innerHTML = "";
  bookmarks.forEach(bookmark => {
    resultDiv.innerHTML +=
      '<div class="well">' +
      "<h4>" +
      bookmark.name +
      '<a class="btn btn-default" target="_blank" href = "' +
      bookmark.url +
      '">Visit</a>' +
      '<a class="btn btn-danger" onclick="deleteBookmark(\'' +
      bookmark.url +
      '\')" href = "#">Delete</a>' +
      "</h4>" +
      "</div>";
  });
  document.getElementById("myform").reset();
}
function validation(name, url) {
  console.log("validation", name, url);

  if (!name || !url) {
    alert("Fill in the fields");
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!url.match(regex)) {
    alert("Not a valid URL");
    return false;
  }
  return true;
}
