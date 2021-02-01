let fetchBtn = document.getElementById('fetchBtn');
fetchBtn.addEventListener('click',dataFromApi);

function dataFromApi(){
  console.log("button clicked");
  
  //instantiate xhr object
  const xhr = new XMLHttpRequest();

  //get request
  xhr.open('GET','https://newsapi.org/v2/top-headlines?q=covid&apiKey=a8720d66af5749479e06c45ec5ff5a92',true);

  xhr.onload = function(){
    // console.log(this.responseText);
    if(this.status === 200){
      let obj = JSON.parse(this.responseText);
      console.log(obj);
      let area = document.getElementById('news');
      let articles = obj.articles;
      let newsHtml = "";
      let count = 0;
      articles.forEach(function(e) {

              let card = `<div class="col-sm-3"><div class="card" style="width: 18rem;">
              <img src="${e['urlToImage']}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${e['title']}</h5>
                <p class="card-text">${e['content']}</p>
                <a href="${e['url']}" class="btn btn-primary">View More</a>
              </div>
            </div>
            </div>`
        newsHtml += card;

      });

      area.innerHTML = newsHtml;

    }
  }
  xhr.send()
}