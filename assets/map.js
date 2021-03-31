

counts = {};
function getData(){
    const xhr = new XMLHttpRequest();
    //get request
    // xhr.open('GET','https://api.rootnet.in/covid19-in/stats/latest',true);
    xhr.open('GET','https://api.covid19india.org/data.json',true);
    xhr.onload = function(){
        console.log(this.responseText);
        // if(this.status === 200){
        let obj = JSON.parse(this.responseText);
        console.log(obj.statewise);
        states = obj.statewise;
        // console.log("states is :"+states);
        c = 0;
        for(let i=0;i<states.length;i++){
            if(states[i].states == "Total") continue;
            console.log(states[i].state +" "+states[i].statecode);
            console.log(states[i].active);
            counts[states[i].state] = {confirmed:states[i].confirmed,active:states[i].active,code:states[i].statecode};
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
                    text: 'Karnataka \\n Active cases:'+counts['Karnataka'].active+" \\n Confirmed Cases:"+counts['Karnataka'].confirmed,
                    backgroundColor: '#ff5722'
                    },
                    backgroundColor: '#ff5722',
                    label: {
                    visible: true
                    }
                },
                MH: {
                    tooltip: {
                    text: 'Maharashtra \\n Active cases:'+counts['Maharashtra'].active+" \\n Confirmed Cases:"+counts['Maharashtra'].confirmed,
                    backgroundColor: '#ff9800'
                    },
                    backgroundColor: '#ff9800',
                    label: {
                    visible: true
                    }
                },
                TL: {
                    tooltip: {
                    text: 'Telangana \\n Active cases:'+counts['Telangana'].active+" \\n Confirmed Cases:"+counts['Telangana'].confirmed,
                    backgroundColor: '#00AE4D'
                    },
                    backgroundColor: '#00AE4D',
                    label: {
                    visible: true
                    }
                },
                TN: {
                    tooltip: {
                    text: 'Tamil Nadu \\n Active cases:'+counts['Tamil Nadu'].active+" \\n Confirmed Cases:"+counts['Tamil Nadu'].confirmed,
                    backgroundColor: '#00bcd4'
                    },
                    backgroundColor: '#00bcd4',
                    label: {
                    visible: true
                    }
                },
                GJ: {
                    tooltip: {
                    text: 'Gujarat \\n Active cases:'+counts['Gujarat'].active+" \\n Confirmed Cases:"+counts['Gujarat'].confirmed,
                    backgroundColor: '#00bcd4'
                    },
                    backgroundColor: '#00bcd4',
                    label: {
                    visible: true
                    }
                },
                RJ: {
                    tooltip: {
                    text: 'Rajasthan \\n Active cases:'+counts['Rajasthan'].active+" \\n Confirmed Cases:"+counts['Rajasthan'].confirmed,
                    backgroundColor: '#00bcd4'
                    },
                    backgroundColor: '#00bcd4',
                    label: {
                    visible: true
                    }
                },
                MP: {
                    tooltip: {
                    text: 'Madhya Pradesh \\n Active cases:'+counts['Madhya Pradesh'].active+" \\n Confirmed Cases:"+counts['Madhya Pradesh'].confirmed,
                    backgroundColor: '#00bcd4'
                    },
                    backgroundColor: '#00bcd4',
                    label: {
                    visible: true
                    }
                },
                    CT: {
                        tooltip: {
                        text: 'Chhattisgarh \\n Active cases:'+counts['Chhattisgarh'].active+" \\n Confirmed Cases:"+counts['Chhattisgarh'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    PB: {
                        tooltip: {
                        text: 'Punjab \\n Active cases:'+counts['Punjab'].active+" \\n Confirmed Cases:"+counts['Punjab'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    JK: {
                        tooltip: {
                        text: 'Jammu & Kashmir \\n Active cases:'+counts['Jammu and Kashmir'].active+" \\n Confirmed Cases:"+counts['Jammu and Kashmir'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    JH: {
                        tooltip: {
                        text: 'Jharkhan \\n Active cases:'+counts['Jharkhand'].active+" \\n Confirmed Cases:"+counts['Jharkhand'].confirmed,
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
