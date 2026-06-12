console.log(`Hello`);

/*copy
const copyLink = document.querySelector('.tocopy');
const statusMsg = document.getElementById('copystatus');

copyLink.addEventListener('click', function(event){
    event.preventDefault();

    const numberToCopy = this.getAttribute('data-number');

    navigator.clipboard.writeText(numberToCopy).then(() => 
        {

            statusMsg.classList.add('visible');
            setTimeout(() => {
            statusMsg.classList.remove('visible');
            }, 2000);
        }
    )
    .catch(err => {
      console.error('Failed to copy text: ', err);
    });
});
*/