/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination.
******************************************/

// get children of the student list & set max number of students to show per page
const list = document.querySelector('.student-list').children;
const maxItemsPerPage = 10;

//called to split students to separate pages
const showPage = (list, page) => {
   // get the starting index and ending index for each page
   const startIndex = (page * maxItemsPerPage) - maxItemsPerPage; 
   const endIndex = page * maxItemsPerPage;
   // loop through elements to set display properties
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         if (list[i].hasAttribute('style')) list[i].removeAttribute('style');
      } else {
         list[i].style.display = 'none';
      }
   }
}

//called to add pagination links to the bottom of the page
const appendPageLinks = (list) => {
   // see how many pages are needed
   const pageCount = Math.ceil(list.length/maxItemsPerPage) + 1;
   // create div & ul, append them to eachother, set class name for the div for pagination list
   const div = document.createElement('div');
   const ul = document.createElement('ul');
   div.className = 'pagination';
   div.appendChild(ul);
   document.querySelector('.page').appendChild(div);
   // add li and a tags at the bottom of the page depending on how many pages
   for (let i = 1; i < pageCount; i ++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a['href']= '#';
      a.textContent = i;
      li.appendChild(a);
      ul.appendChild(li);
   }
   // grab ul and all a tags from the above created pagination section
   const paginationUL = document.querySelector('div.pagination ul');
   const paginationA = paginationUL.querySelectorAll('li a');
   // listen for clicks on the pagination ul
   paginationUL.addEventListener('click', (e) => {
      // loop through all anchors in pagination and remove active class
      for (let i = 0; i < paginationA.length; i ++){
         paginationA[i].classList.remove('active');
      }
      // if current clicked element is an <a> set its class to active
      if (e.target.tagName === 'A') {
         showPage(list, e.target.textContent);
         e.target.className = 'active';
      } 
   });
}

// insert search bar and set appropriate classes
const searchInsert = document.querySelector('.page-header');
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
const searchInput = document.createElement('input');
const searchBtn = document.createElement('button');
searchBtn.innerText = 'Search';
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchBtn);
searchInsert.appendChild(searchDiv);

// search function
const search = (event) => {
   const studentName = document.querySelectorAll('.student-details h3');
   const searchBoxValue = document.querySelector('.student-search input').value;
   const page = document.querySelector('.page');
   const pagination = document.querySelector('.pagination');
   for (let i = 0; i < studentName.length; i++) {
      if (!studentName[i].innerText.toLowerCase().includes(searchBoxValue.toLowerCase())) {
         studentName[i].parentNode.parentNode.style.display = 'none';
         studentName[i].parentNode.parentNode.classList.remove('js-search-result');
      } else {
         studentName[i].parentNode.parentNode.removeAttribute('style');
         studentName[i].parentNode.parentNode.classList.add('js-search-result');
      }
   }
   const newList = document.querySelectorAll('.js-search-result');
   const noResultMsgCheck = document.querySelector('.no-results');
   if (pagination) page.removeChild(pagination);
   if (noResultMsgCheck) page.removeChild(noResultMsgCheck);
   if (newList.length <= 0) {
      const noResult = document.createElement('div');
      noResult.innerText = 'Your search returned zero results';
      noResult.className = 'no-results';
      page.appendChild(noResult);
   } else {
      appendPageLinks(newList);
      showPage(newList, 1);
      document.querySelector('div.pagination ul li a').className = 'active';
   }
}

//adding click and keyup events to trigger search function
const searchBox = document.querySelector('.student-search');
searchBox.addEventListener('click', search, false);
searchBox.addEventListener('keyup', search, false);

//used so both functions listed can run on pageload
const pageLoad = () =>{
   appendPageLinks(list);
   showPage(list, 1);
   //set pagination link '1' to active so user knows what page they are on
   document.querySelector('div.pagination ul li a').className = 'active';
}
// will trigger both functions that are in the pageLoad functions
window.onload = () => {
   pageLoad();
}