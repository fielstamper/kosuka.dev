

document.addEventListener("DOMContentLoaded", lastfm)

function addContainer(trackName, data) {
    let container = document.createElement("div");
    container.classList.add("container");

    let textContainer = document.createElement("div");
    textContainer.classList.add("text-container");

    let imageDiv = document.createElement("div");
    imageDiv.classList.add("image-div");
    imageDiv.style.backgroundImage = `url(${data.image[2]['#text']})`;

    let lastfm = document.createElement("p");
    lastfm.classList.add("lastfm-text");

    let currently = document.createElement("p");
    currently.classList.add("currently-playing");
    if (data['@attr'] && data['@attr'].nowplaying) {
        currently.appendChild(document.createTextNode("currently playing..."));
    } else {
        currently.appendChild(document.createTextNode("last played:"));
    }

    lastfm.appendChild(document.createTextNode(trackName));
    lastfm.appendChild(document.createElement("br"));
    lastfm.appendChild(document.createTextNode(`${data.artist['#text']} | ${data.album['#text']}`));

    container.appendChild(imageDiv);
    textContainer.appendChild(currently);
    textContainer.appendChild(lastfm);
    container.appendChild(textContainer);
    document.getElementById("lastfm-container").appendChild(container);
}

async function lastfm() {
    try {
        const response = await fetch('/api/lastfm');
        const data = await response.json();

        const trackName = data.name?.split('(feat. ')[0] || 'error';

        const existingContainer = document.querySelector(".container");
        const trackMatches = existingContainer?.querySelector('.lastfm-text')?.textContent.includes(trackName);

        if (existingContainer && !trackMatches) {
            existingContainer.remove();
            addContainer(trackName, data);
        } else if (!existingContainer) {
            addContainer(trackName, data);
        }
    } catch (error) {
        console.error("error: ", error);
    }

    setTimeout(lastfm, 3 * 1000);
}
