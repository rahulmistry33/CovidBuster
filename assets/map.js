

counts = {};
// getData();
function getData(){
    console.log("HOLA");
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
                    backgroundColor: '#ff9800'
                    },
                    backgroundColor: '#ff9800',
                    label: {
                    visible: true
                    }
                },
                MH: {
                    tooltip: {
                    text: 'Maharashtra \\n Active cases:'+counts['Maharashtra'].active+" \\n Confirmed Cases:"+counts['Maharashtra'].confirmed,
                    backgroundColor: '#ff5722'
                    },
                    backgroundColor: '#ff5722',
                    label: {
                    visible: true
                    }
                },
                TL: {
                    tooltip: {
                    text: 'Telangana \\n Active cases:'+counts['Telangana'].active+" \\n Confirmed Cases:"+counts['Telangana'].confirmed,
                    backgroundColor: '#ff9800'
                    },
                    backgroundColor: '#ff9800',
                    label: {
                    visible: true
                    }
                },
                TN: {
                    tooltip: {
                    text: 'Tamil Nadu \\n Active cases:'+counts['Tamil Nadu'].active+" \\n Confirmed Cases:"+counts['Tamil Nadu'].confirmed,
                    backgroundColor: '#ff9800'
                    },
                    backgroundColor: '#ff9800',
                    label: {
                    visible: true
                    }
                },
                GJ: {
                    tooltip: {
                    text: 'Gujarat \\n Active cases:'+counts['Gujarat'].active+" \\n Confirmed Cases:"+counts['Gujarat'].confirmed,
                    backgroundColor: '#ff9800'
                    },
                    backgroundColor: '#ff9800',
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
                    backgroundColor: '#ff9800'
                    },
                    backgroundColor: '#ff9800',
                    label: {
                    visible: true
                    }
                },
                    CT: {
                        tooltip: {
                        text: 'Chhattisgarh \\n Active cases:'+counts['Chhattisgarh'].active+" \\n Confirmed Cases:"+counts['Chhattisgarh'].confirmed,
                        backgroundColor: '#ff9800'
                        },
                        backgroundColor: '#ff9800',
                        label: {
                        visible: true
                        }
                    },
                    PB: {
                        tooltip: {
                        text: 'Punjab \\n Active cases:'+counts['Punjab'].active+" \\n Confirmed Cases:"+counts['Punjab'].confirmed,
                        backgroundColor: '#ff9800'
                        },
                        backgroundColor: '#ff9800',
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
                        text: 'Jharkhand \\n Active cases:'+counts['Jharkhand'].active+" \\n Confirmed Cases:"+counts['Jharkhand'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    HR: {
                        tooltip: {
                        text: 'Haryana \\n Active cases:'+counts['Haryana'].active+" \\n Confirmed Cases:"+counts['Haryana'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    HP: {
                        tooltip: {
                        text: 'Himachal Pradesh \\n Active cases:'+counts['Himachal Pradesh'].active+" \\n Confirmed Cases:"+counts['Himachal Pradesh'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    UT: {
                        tooltip: {
                        text: 'Uttarakhand \\n Active cases:'+counts['Uttarakhand'].active+" \\n Confirmed Cases:"+counts['Uttarakhand'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    UP: {
                        tooltip: {
                        text: 'Uttar Pradesh \\n Active cases:'+counts['Uttar Pradesh'].active+" \\n Confirmed Cases:"+counts['Uttar Pradesh'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    HP: {
                        tooltip: {
                        text: 'Himachal Pradesh \\n Active cases:'+counts['Himachal Pradesh'].active+" \\n Confirmed Cases:"+counts['Himachal Pradesh'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    BR: {
                        tooltip: {
                        text: 'Bihar \\n Active cases:'+counts['Bihar'].active+" \\n Confirmed Cases:"+counts['Bihar'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    OR: {
                        tooltip: {
                        text: 'Orissa \\n Active cases:'+counts['Odisha'].active+" \\n Confirmed Cases:"+counts['Odisha'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    AP: {
                        tooltip: {
                        text: 'Andhra Pradesh \\n Active cases:'+counts['Andhra Pradesh'].active+" \\n Confirmed Cases:"+counts['Andhra Pradesh'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    KL: {
                        tooltip: {
                        text: 'Kerala \\n Active cases:'+counts['Kerala'].active+" \\n Confirmed Cases:"+counts['Kerala'].confirmed,
                        backgroundColor: '#ff9800'
                        },
                        backgroundColor: '#ff9800',
                        label: {
                        visible: true
                        }
                    },
                    GA: {
                        tooltip: {
                        text: 'Goa \\n Active cases:'+counts['Goa'].active+" \\n Confirmed Cases:"+counts['Goa'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    WB: {
                        tooltip: {
                        text: 'West Bengal \\n Active cases:'+counts['West Bengal'].active+" \\n Confirmed Cases:"+counts['West Bengal'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    SK: {
                        tooltip: {
                        text: 'Sikkim \\n Active cases:'+counts['Sikkim'].active+" \\n Confirmed Cases:"+counts['Sikkim'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    AS: {
                        tooltip: {
                        text: 'Assam \\n Active cases:'+counts['Assam'].active+" \\n Confirmed Cases:"+counts['Assam'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    AR: {
                        tooltip: {
                        text: 'Arunachal Pradesh\\n Active cases:'+counts['Arunachal Pradesh'].active+" \\n Confirmed Cases:"+counts['Arunachal Pradesh'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    ML: {
                        tooltip: {
                        text: 'Meghalaya \\n Active cases:'+counts['Meghalaya'].active+" \\n Confirmed Cases:"+counts['Meghalaya'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    TR: {
                        tooltip: {
                        text: 'Tripura \\n Active cases:'+counts['Tripura'].active+" \\n Confirmed Cases:"+counts['Tripura'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    MZ: {
                        tooltip: {
                        text: 'Mizoram \\n Active cases:'+counts['Mizoram'].active+" \\n Confirmed Cases:"+counts['Mizoram'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    MN: {
                        tooltip: {
                        text: 'Manipur \\n Active cases:'+counts['Manipur'].active+" \\n Confirmed Cases:"+counts['Manipur'].confirmed,
                        backgroundColor: '#00bcd4'
                        },
                        backgroundColor: '#00bcd4',
                        label: {
                        visible: true
                        }
                    },
                    NL: {
                        tooltip: {
                        text: 'Nagaland \\n Active cases:'+counts['Nagaland'].active+" \\n Confirmed Cases:"+counts['Nagaland'].confirmed,
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
