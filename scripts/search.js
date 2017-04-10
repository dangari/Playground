 var searchField = $("#search").val();
 var isSelected = false;
 var liSelected;
 $('#search').keyup(function (e) {
     if (e.which == 40 || e.which == 38) {
         return;
     }
     liSelected = null;
     searchField = $('#search').val();
     output = search(searchField, 4);
     $('#result').html(output);
     $('#result').css({
         position: "absolute"
         , top: (this.offsetTop + this.offsetHeight) + "px"
         , left: this.offsetLeft + "px"
     });
     if (!searchField.trim()) {
         $('#result').hide();
     }
     else {
         $('#result').show();
     }
 });
 $('#search').focusout(function () {
     if (!isSelected) {
         setTimeout(function () {
             $('#result').hide();
         }, 500);
     }
 });
 $("#searchBtn").click(searchSite);

 function searchSite() {
     if ($(".selected").length == 0) {
         var addpath = generateAddpath();
         window.location.replace(addpath + "searchResult.html?searchString=" + $('#search').val());
         return false;
     }
     else {
         window.location.replace($(".selected a").attr('href'));
         return false;
     }
 }

 function search(searchValue, maxCount) {
     var count = 0;
     var regex = new RegExp(searchValue, 'i');
     var output = "<ul class='list-group'>";
     var searchresult = [];
     $.each(data, function (idx, val) {
         if ((val.SearchString.search(regex) != -1)) {
             searchresult.push(val);
         }
     });
     searchresult.sort(compare);
     if (maxCount != -1) {
         return createResultPreview(searchresult, maxCount);
     }
     else {
         return createSearchResult(searchresult);
     }
 }

 function createSearchResult(searchresult) {
     var output = "<ul class='list-group'>";
     $.each(searchresult, function (idx, val) {
         output += "<li class='searchResult list-group-item'>";
         output += "<a href='" + generateAddpath() + val.Link + AddAnchor(val.Category) + "'>";
         output += "<div class='container-fluid'>";
         output += "<div class='info row'>";
         output += "<div id='searchString'>" + createCol(val.SearchString) + "</div>";
         output += createCol(val.MapperName);
         output += createCol(val.FileName);
         output += createCol(val.Category);
         output += createCol(val.MapperName);
         output += createCol(val.NameSpace);
         output += "</div>";
         output += "</div>";
         output += "</div>";
         output += "</a>"
     });
     output += '</ul>';
     return output;
 }

 function createResultPreview(searchresult, maxCount) {
     var output = "<ul class='list-group'>";
     var count = 0;
     $.each(searchresult, function (idx, val) {
         output += "<li class='preview searchResult list-group-item' >";
         output += "<div> <a href='" + generateAddpath() + val.Link + AddAnchor(val.Category) + "'>";
         output += "<b>" + val.SearchString + "</b> <br>";
         output += "<p class='info'> " + val.FileName + "<br>";
         output += val.MapperName + "</p>";
         output += "</div></a>"
         output += "</li>";
         if (maxCount != -1 && count > maxCount) {
             output += "<li class='preview searchResult list-group-item'>";
             output += "<div> <p onclick='searchSite();'>...</p> </div>";
             output += "</li>";
             return false;
         }
         count++;
     });
     output += '</ul>';
     return output;
 }

 function createCol(s) {
     return "<div class='col-lg-2'>" + s + "</div>";
 }

 function searchResult(searchString) {
     if (searchString !== -1) {
         var output = search(searchString, -1);
         output = output.replace("../", "");
         $('#sresult').html(output);
     }
 }

 function generateAddpath() {
     var path = document.location.href.match(/Doku\/[^\.]*/g)[0];
     var addpath = "";
     var matchLength = path.match(/\//g).length - 1;
     for (i = 0; i < matchLength; i++) {
         addpath += "../";
     }
     return addpath;
 }

 function compare(a, b) {
     var aValue = levDist(searchField, a.SearchString) + a.SearchString.length;
     var bValue = levDist(searchField, b.SearchString) + b.SearchString.length;
     return aValue > bValue ? 1 : -1;
 }
 var levDist = function (s, t) {
     var d = []; //2d matrix
     // Step 1
     var n = s.length;
     var m = t.length;
     if (n == 0) return m;
     if (m == 0) return n;
     //Create an array of arrays in javascript (a descending loop is quicker)
     for (var i = n; i >= 0; i--) d[i] = [];
     // Step 2
     for (var i = n; i >= 0; i--) d[i][0] = i;
     for (var j = m; j >= 0; j--) d[0][j] = j;
     // Step 3
     for (var i = 1; i <= n; i++) {
         var s_i = s.charAt(i - 1);
         // Step 4
         for (var j = 1; j <= m; j++) {
             //Check the jagged ld total so far
             if (i == j && d[i][j] > 4) return n;
             var t_j = t.charAt(j - 1);
             var cost = (s_i == t_j) ? 0 : 1; // Step 5
             //Calculate the minimum
             var mi = d[i - 1][j] + 1;
             var b = d[i][j - 1] + 1;
             var c = d[i - 1][j - 1] + cost;
             if (b < mi) mi = b;
             if (c < mi) mi = c;
             d[i][j] = mi; // Step 6
             //Damerau transposition
             if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                 d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
             }
         }
     }
     // Step 7
     return d[n][m];
 }
 $("#search").keydown(function (e) {
     var li = $(".preview");
     if (e.which === 40) {
         if (liSelected) {
             liSelected.removeClass('selected');
             next = liSelected.next();
             if (next.length > 0) {
                 liSelected = next.addClass('selected');
             }
             else {
                 liSelected = li.eq(0).addClass('selected');
             }
         }
         else {
             liSelected = li.eq(0).addClass('selected');
         }
     }
     else if (e.which === 38) {
         if (liSelected) {
             liSelected.removeClass('selected');
             next = liSelected.prev();
             if (next.length > 0) {
                 liSelected = next.addClass('selected');
             }
             else {
                 liSelected = li.last().addClass('selected');
             }
         }
         else {
             liSelected = li.last().addClass('selected');
         }
     }
 });

 function AddAnchor(category) {
     if (!(category == "File")) {
         return "#" + category;
     }
     return "";
 }