//fetch the data from a json api file


fetch("http://localhost:3000/films")
 .then(function (response){
 return response.json();
 })

 .then(function(data){

const films =document.querySelector('.details');
data.forEach(function(movie){

const card  = document.createElement('div');
card.classList.add('card');        
card.innerHTML = `

<div class ="container">
<img src ="${movie.poster}" alt="product Image" style="width:10%; height:60px%>
<h1><b>${movie.title}</b></h1>
<p>$Runtime:${movie.runtime}</p>
<p>Capacity:${movie.capacity}</p>
<p>Available Tickets:<span class="available-tickets">${movie.capacity-movie.tickets_sold}</span></p>
 <button class="buy-ticket">Buy Ticket</button>


</div>
`;
      
films.appendChild(card);


//adding a click event listener to buy "ticket"

const buyButton = card.querySelector('.buy-ticket');
buyButton.addEventListener('click',function(event){

    event.preventDefault(); // prevent the page from  reloading

    //check if there is any available tickets

    const availableTickets = card.querySelector('.available-tickets');
    const numAvailableTickets = parseInt(availableTickets.textsContent);


    //introducing ana if statement


        if(numAvailableTickets > 0){


         // update number of available tickets and display it to frontend

         availableTickets.textContent = numAvailableTickets - 1;

         //update the data movie  to backend side

         const newTicketSold = movie.tickets_sold + 1;

         fetch(`http://localhost:3000/films/${movie.id}`,{
            

           method:'PATCH',
           headers:{
            'Content-Type':'appliaction/json' 
           },

           body:JSON.stringify({tickets_sold:newTicketSold})
         })
         .then(function(response){
         if(!response.ok){
            throw new Error('Network response  was not ok');


         }
         }) 

         .catch(function(error){
            console.error('There was a problem updating the movie data:',error);


         });
        }else{


      alert('Sorry, this show is sold out!');

        }
});
});

 })

 .catch(function(error){
  console.log('There was an error fetching the movie data:', error);

 });



 

