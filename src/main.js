$(document).ready(function () {

        locationFormat = (location) => {
            let textContent = location.split("_");
            textContent = textContent.join(" ");
            return textContent;
        };

        iconFormat = (getIcon) => {
            return getIcon.replace(/-/g, '_').toUpperCase();
        }


        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition( position => {
               let secret = "2bf1c4cbb35044638c478ca3e91c277c";
               let proxy = "https://cors-anywhere.herokuapp.com/";
               const api = proxy + "https://api.darksky.net/forecast/" + secret + "/" + position.coords.latitude + ","  + position.coords.longitude;
               fetch(api)
                   .then( response => {
                       if (response.ok) {
                           return response.json();
                       }
                   }
                   ).then(data => {
                        const {temperature, summary, icon} = data.currently;
                        $('.location-timezone').text(locationFormat(data.timezone));
                        $('.temperature-degree').text(temperature);
                        $('.temperature-description').text(summary);
                           var icons = new Skycons({"color": "#17242a"});
                           icons.play();
                            icons.set("icon-temperature", Skycons[iconFormat(icon)]);
                           $('.temperature-degree').on('click',function (){
                               $('.temperature-degree').text(((temperature-32) * (5/9)).toFixed(2));
                               $('.degree').text("C")
                           });
                        });
                             const time = new Date();
                            $('.current-time').text(time);
            });
        }

});