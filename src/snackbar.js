function showSnackbar () {
  const snackbar = document.createElement('div');
  snackbar.id = "snackbar"
  snackbar.innerText = "Search query is empty.Please enter your request.";

  document.body.appendChild(snackbar);
  snackbar.className = "show";
  
  setTimeout(() => {
    snackbar.className = snackbar.className.replace("show", "");
  }, 2500);
} 

export {showSnackbar};