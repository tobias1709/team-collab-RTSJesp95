const searchBar = document.querySelector('#search-bar')

searchBar.addEventListener('submit', event=>{
    event.preventDefault();

    const searchText = searchBar.querySelector('#search-bar-input').value;
    document.location = `http://localhost:3000/search/${searchText}`;
})