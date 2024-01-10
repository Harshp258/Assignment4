/**
 * WEB222 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with
 * Seneca Academic Policy. No part of this assignment has been
 * copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Please update the following with your information:
 *
 *      Name:       <HARSH PATEL>
 *      Student ID: <114085228>
 *      Date:       <03/08/2023>
 */

const { artists, songs } = window;
const displayTracks = document.querySelector(".display-tracks");
const navbar = document.querySelector("#menu");

window.addEventListener("DOMContentLoaded", function () {
  document.getElementById("selected-artist").textContent = "Darshan Raval";
  displaySongTracks(
    songs.filter(function (song) {
      if (song.artistId === "id-dars") {
        return song;
      }
    })
  );

  displayMenuButtons();
});

// cards
function displaySongTracks(songTracks) {
  let displaySongs = songTracks.map(function (song) {
    return createSongCard(song);
  });

  displaySongs = displaySongs.join("");
  displayTracks.innerHTML = displaySongs;
}

// create a song card
function createSongCard(song) {
  const minutes = Math.floor(song.duration / 60);
  const remainingSeconds = (song.duration % 60 < 10 ? "0" : "") + (song.duration % 60);
  return `
  <div class="card">
    <img src="${song.imageUrl}" alt="Album-Art">
    <div class="song-info">
      <div class="song-title">${song.title}</div>
      <div class="song-year">${song.year}</div>
      <div class="song-duration">${`${minutes}:${remainingSeconds}`}</div>
    </div>
  </div>`;
}

function displayMenuButtons() {
  const arts = artists
    .map(function (track) {
      return `<button data-id="${track.name}" class="filter-button" type="button">${track.name}</button>`;
    })
    .join("");

  navbar.innerHTML = arts;
  const filterButtons = document.querySelectorAll(".filter-button");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      let artist = e.currentTarget.dataset.id;
      document.getElementById("selected-artist").textContent = e.currentTarget.dataset.id;

      if (artist === "Darshan Raval") {
        artist = "id-dars";
      } else if (artist === "Atif Aslam") {
        artist = "id-atif";
      } else if (artist === "A.R. Rahman") {
        artist = "id-rahman";
      }

      const songArtist = songs.filter(function (track) {
        if (track.artistId === artist) {
          return track;
        }
      });

      displaySongTracks(songArtist);
      showLinks(e.currentTarget.dataset.id);
    });
  });

  // links
  function showLinks(selectedArtist) {
    const headingElem = document.getElementById("selected-artist");

    artists.forEach((artist) => {
      if (artist.name === selectedArtist) {
        const linksCon = document.createElement("span");
        linksCon.classList.add("small");
        const openingBr = document.createTextNode("(");
        linksCon.appendChild(openingBr);

        artist.links.forEach((link, index) => {
          const linkAnchor = document.createElement("a");
          linkAnchor.setAttribute("href", link.url);
          linkAnchor.textContent = link.name;
          linksCon.appendChild(linkAnchor);

          if (index < artist.links.length - 1) {
            const comma = document.createTextNode(", ");
            linksCon.appendChild(comma);
          }
        });

        const closingBr = document.createTextNode(")");
        linksCon.appendChild(closingBr);
        headingElem.appendChild(linksCon);
      }
    });
  }
  showLinks("Darshan Raval");
}