

counts = {};
function getData(){
    const xhr = new XMLHttpRequest();
    //get request
    xhr.open('GET','https://api.rootnet.in/covid19-in/stats/latest',true);
    xhr.onload = function(){
        // console.log(this.responseText);
        // if(this.status === 200){
        let obj = JSON.parse(this.responseText);
        console.log(obj);
        states = obj.data.regional;
        // console.log("states is :"+states);
        c = 0;
        for(let i=0;i<states.length;i++){
            console.log(states[i]);
            console.log(states[i].totalConfirmed);
            counts[states[i].loc] = states[i].totalConfirmed;
        }
        // console.log(counts+" is counts");
        // console.log(counts["Sikkim"]);
        

        displayMap();
        
        // articles.forEach(function(e) {

        //         let card = `<div class="col-sm-3"><div class="card" style="width: 18rem;">
        //         <img src="${e['urlToImage']}" class="card-img-top" alt="...">
        //         <div class="card-body">
        //             <h5 class="card-title">${e['title']}</h5>
        //             <p class="card-text">${e['content']}</p>
        //             <a href="${e['url']}" class="btn btn-primary">View More</a>
        //         </div>
        //         </div>
        //         </div>`
        //     newsHtml += card;

        // });

        // area.innerHTML = newsHtml;

        // }
        // else{
        //     console.log("error hai bhai");
        // }
    // }
    
    }
    xhr.send()
}

function displayMap(){
    let chartConfig = {
        shapes: [
        {
            type: 'zingchart.maps',
            options: {
            bbox: [67.177, 36.494, 98.403, 6.965], // get bbox from zingchart.maps.getItemInfo('world-countries','ind');
            ignore: ['IND'], // ignore India because we are rendering a more specific India map below
            name: 'world.countries',
            panning: true, // turn of zooming. Doesn't work with bounding box
            style: {
                tooltip: {
                borderColor: '#000',
                borderWidth: '2px',
                fontSize: '18px'
                },
                controls: {
                visible: false // turn of zooming. Doesn't work with bounding box
                },
                hoverState: {
                alpha: .28
                }
            },
            zooming: false // turn of zooming. Doesn't work with bounding box
            }
        },
        {
            type: 'zingchart.maps',
            options: {
            name: 'ind',
            panning: false, // turn of zooming. Doesn't work with bounding box
            zooming: false,
            scrolling: false,
            style: {
                tooltip: {
                borderColor: '#000',
                borderWidth: '2px',
                fontSize: '18px'
                },
                borderColor: '#000',
                borderWidth: '2px',
                controls: {
                visible: false, // turn of zooming. Doesn't work with bounding box
      
                },
                hoverState: {
                alpha: .28
                },
                items: {
                KA: {
                    tooltip: {
                    text: 'Karnataka \\n Active cases:'+counts['Karnataka'],
                    backgroundColor: '#ff5722'
                    },
                    backgroundColor: '#ff5722',
                    label: {
                    visible: true
                    }
                },
                MH: {
                    tooltip: {
                    text: 'Maharashtra \\n Active cases:'+counts['Maharashtra'],
                    backgroundColor: '#ff9800'
                    },
                    backgroundColor: '#ff9800',
                    label: {
                    visible: true
                    }
                },
                TL: {
                    tooltip: {
                    text: 'Telangana \\n Active cases:'+counts['Telengana'],
                    backgroundColor: '#00AE4D'
                    },
                    backgroundColor: '#00AE4D',
                    label: {
                    visible: true
                    }
                },
                TN: {
                    tooltip: {
                    text: 'Tamil Nadu \\n Active cases:'+counts['Tamil Nadu'],
                    backgroundColor: '#00bcd4'
                    },
                    backgroundColor: '#00bcd4',
                    label: {
                    visible: true
                    }
                },
                GJ: {
                    tooltip: {
                    text: 'Gujarat \\n Active cases:'+counts['Gujarat'],
                    backgroundColor: '#00bcd4'
                    },
                    backgroundColor: '#00bcd4',
                    label: {
                    visible: true
                    }
                },
                RJ: {
                    tooltip: {
                    text: 'Rajasthan \\n Active cases:'+counts['Rajasthan'],
                    backgroundColor: '#00bcd4'
                    },
                    backgroundColor: '#00bcd4',
                    label: {
                    visible: true
                    }
                },
                MP: {
                    tooltip: {
                    text: 'Madhya Pradesh \\n Active cases:'+counts['Madhya Pradesh'],
                    backgroundColor: '#00bcd4'
                    },
                    backgroundColor: '#00bcd4',
                    label: {
                    visible: true
                    }
                },
                CHH: {
                    tooltip: {
                    text: 'Chhatisgarh \\n Active cases:'+counts['Chhattisgarh'],
                    backgroundColor: '#00bcd4'
                    },
                    backgroundColor: '#00bcd4',
                    label: {
                    visible: true
                    }
                },
                },
                label: { // text displaying. Like valueBox
                fontSize: '15px',
                visible: false
                }
            },
            zooming: false // turn of zooming. Doesn't work with bounding box
            }
        }
        ]
      }
      
      zingchart.loadModules('maps,maps-ind,maps-world-countries');
      zingchart.render({
        id: 'myChart',
        data: chartConfig,
        height: '100%',
        width: '100%',
      });
      
}
