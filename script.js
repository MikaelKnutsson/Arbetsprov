$(document).ready(function() {
  doSearch();
});

const itemsArray = [];

function doSearch() {
  //Call the function to filter search when typing in textfield
  $("#textSearch").keyup(function(e) {
    filterSearch(e);
  });

  //Call the function to add a title when pressing enter
  $("#textSearch").keypress(function(e) {
    if (e.which == 13) {
      addItem(e);
    }
  });
}

//Function to handle and filter the search
function filterSearch(e) {
  e.preventDefault();
  //Url for wikipedia's public API
  var testUrl = "http://en.wikipedia.org/w/api.php?callback=?";
  //Value of the search
  var userInput = $("#textSearch").val();

  //Querying the data fetched from the search
  $.getJSON(
    testUrl,
    {
      srsearch: userInput,
      action: "query",
      list: "search",
      format: "json"
    },

    function(data) {
      $("#list-results").empty();

      var text = $("#textSearch");

      if (data.continue === undefined) {
        return;
      } else {
        $.each(data.query.search, function(i, item) {
          //Create new list element based on the titles fetched
          completedList = $(
            "<li class='results-populated'>" + item.title + "<hr/>" + "</li>"
          );
          $("#list-results").append(completedList);
          //Adding the selected title to the array of chosen items
          completedList.on("click", function() {
            itemsArray.push(item.title);
            text.val(item.title);
            $("#list-results").empty();
          });
        });
      }
    }
  );
}

//Function to add an item from the list when pressing enter
function addItem(e) {
  var date = getCurrentDate();
  var lastItem = itemsArray.slice(-1)[0];
  e.preventDefault();
  //Div to be added to result list. Including chosen title and date of action
  var resultDiv = $(
    "<li class='selectedItems' id='itemToRemove'>" +
      lastItem +
      " " +
      date +
      " <span class='deleteButtonDiv'><button class='deleteButton' onClick='removeItem()'><span id='xButton'> X </div></button></span></li>"
  );
  $("#selected-results").append(resultDiv);
  $("#textSearch").val("");
}

//Removing the first item (function not completed since it's not pointing on the index of specific list element)
function removeItem(index) {
  var itemToRemove = document.getElementById("itemToRemove");
  itemToRemove.parentNode.removeChild(itemToRemove);
}

//Function to get today's date and timestamp
function getCurrentDate(date) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var hours = today.getHours();
  var minutes = ("0" + today.getMinutes()).slice(-2);

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd + " " + hours + ":" + minutes;
  return today;
}
