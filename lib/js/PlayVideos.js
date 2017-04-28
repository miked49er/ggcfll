// JavaScript source code

// array containing links to the content
var content = ['video1.mp4', 'video2.mp4', 'video3.mp4', 'video4.mp4'];
// element where anything will be played
var canvas = $('#canvas');
// duration an image is shown in ms (milliseconds)
var durationImage = 1000;
// basic source for image and video tag
var srcImage = '<img src="$" alt="">';
var srcVideo = '<video autoplay><source src="$" type="video/mp4"></source></video>';
// current position
var current = -1;
// regex for getting file extension (from http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript)
var regex = /(?:\.([^.]+))?$/;

// method to play the next content element
function playNext() {
    // increase current element and set it to 0 if end is reached
    ++current;
    if (content.length == current) {
        current = 0;
    }
    // get file and its extension and check whether it's valid
    var source = null;
    var file = content[current];
    var extension = regex.exec(file)[1];
    if ('jpg' == extension) {
        source = srcImage;
    }
    if ('mp4' == extension) {
        source = srcVideo;
    }
    // if source seems valid
    if (null !== source) {
        // replace placeholder with the content and insert content into canvas
        source = source.replace('$', file);
        canvas.html(source);
        // if content is an image play next after set duration
        if ('jpg' == extension) {
            setTimeout(function () { playNext(); }, durationImage);
        }
        // if content is a video, bind 'onend' event handler to it, to play next
        if ('mp4' == extension) {
            canvas.find('video').bind("ended", function () {
                playNext();
            });
        }
    }
}

// show first (remember current = -1 from above :) )
playNext();



