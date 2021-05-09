window.addEventListener('load', () => {
    let long;
    let lat;

    let tempDesc = document.querySelector(
        ".temp-desc"
    );

    let tempDegree = document.querySelector(
        ".temp-degree"
    );

    let locationTimezone = document.querySelector(
        ".location-timezone"
    );

    let locationIcon = document.querySelector(
        ".icon"
    );
    
    let degreeSection = document.querySelector(
        ".degree-section"
    );

    const tempSpan = document.querySelector(
        ".unit"
    );

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            console.log(pos);
            long = pos.coords.longitude;
            lat = pos.coords.latitude;

            const api = `http://api.weatherapi.com/v1/current.json?key=d6f436754e5741eb82e72911210905&q=${lat},${long}`;

            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    const { condition, feelslike_c, feelslike_f, last_updated, location } = data.current;

                    //set elemets from API
                    tempDegree.textContent = feelslike_c;
                    tempDesc.textContent = condition.text;
                    locationTimezone.textContent = data.location.name + ", " + data.location.region + ", " + data.location.country
                     
                    // set icon
                    locationIcon.innerHTML = `<img src="icons/${getIcon(condition.icon)}.png">`;

                    // Change the unit on click

                    degreeSection.addEventListener("click", () =>{
                        if(tempSpan.textContent === "F")
                        {
                            tempDegree.textContent = feelslike_c;
                            tempSpan.textContent = "C"
                        }
                        else if(tempSpan.textContent === "C")
                        {
                            tempDegree.textContent = feelslike_f;
                            tempSpan.textContent = "F"
                        }

                    });
                });
        });
    }

    // Function to get the icon id 
    function getIcon(iconUrl) {
        var iconID = -1;
        if(iconUrl.indexOf("day"))
        {
            iconID = "day/";
        }
        else{
            iconID = "night/";
        }
        var index = iconUrl.indexOf('png');
        var iconID = iconID + iconUrl.substring(index-4,index-1);
        return iconID;
    }
});