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
      list[i].classList.remove('js-search-result');
      if (i >= startIndex && i < endIndex) {
         if (list[i].hasAttribute('style')){list[i].removeAttribute('style')}
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

// insert search bar
const searchInsert = document.querySelector('.page-header');
const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
const searchInput = document.createElement('input');
const searchBtn = document.createElement('button');
searchBtn.innerText = 'Search';
searchDiv.appendChild(searchInput);
searchDiv.appendChild(searchBtn);
searchInsert.appendChild(searchDiv);

// search ability
const names = document.querySelectorAll('.student-details h3');
const searchBox = document.querySelector('.student-search');


searchBox.addEventListener('click', () => {
   search();
});  


const search = () => {
   const searchBoxValue = document.querySelector('.student-search input').value;
   const page = document.querySelector('.page');
   const pagination = document.querySelector('.pagination');
   if (searchBoxValue.length <= 0) {
      page.removeChild(pagination);
      pageLoad();
   } else {
      page.removeChild(pagination);
      for (let i = 0; i < names.length; i++) {
         if (names[i].innerText.toLowerCase().includes(searchBoxValue.toLowerCase())) {
            names[i].parentNode.parentNode.classList.add('js-search-result');
            if (names[i].parentNode.parentNode.hasAttribute('style')){names[i].parentNode.parentNode.removeAttribute('style')}
         } else {
            names[i].parentNode.parentNode.classList.remove('js-search-result');
            names[i].parentNode.parentNode.style.display = 'none';
         }
      }
      const newList = document.querySelectorAll('.js-search-result');
      appendPageLinks(newList);
      showPage(newList, 1);
      document.querySelector('div.pagination ul li a').className = 'active';
   }
}




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