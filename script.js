/* =========================================================
   ELEMENTS
========================================================= */

const introScreen =
    document.getElementById("introScreen");

const envelope =
    document.getElementById("envelope");

const waxSeal =
    document.getElementById("waxSeal");

const mainContent =
    document.getElementById("mainContent");

const weddingMusic =
    document.getElementById("weddingMusic");

const musicToggle =
    document.getElementById("musicToggle");

const homeScene =
    document.getElementById("homeScene");

const scenes =
    document.querySelectorAll(".scene");

const discoveryItems =
    document.querySelectorAll(".discovery-item");


/* =========================================================
   OPEN INVITATION
========================================================= */

function openInvitation() {

    if (
        envelope.classList.contains("open")
    ) {
        return;
    }


    envelope.classList.add("open");


    setTimeout(() => {

        introScreen.style.opacity = "0";

        introScreen.style.visibility =
            "hidden";

        mainContent.classList.add(
            "visible"
        );


        playMusic();

    }, 1600);

}


waxSeal.addEventListener(
    "click",
    openInvitation
);


/* =========================================================
   MUSIC
========================================================= */

function playMusic() {

    weddingMusic
        .play()
        .then(() => {

            musicToggle.classList.add(
                "playing"
            );

        })
        .catch(() => {
        });

}


musicToggle.addEventListener(
    "click",
    () => {

        if (
            weddingMusic.paused
        ) {

            weddingMusic
                .play()
                .then(() => {

                    musicToggle.classList.add(
                        "playing"
                    );

                })
                .catch(() => {});

        } else {

            weddingMusic.pause();

            musicToggle.classList.remove(
                "playing"
            );

        }

    }
);


/* =========================================================
   NAVIGATION
========================================================= */

discoveryItems.forEach(
    item => {

        item.addEventListener(
            "click",
            () => {

                openScene(
                    item.dataset.section
                );

            }
        );


        item.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openScene(
                        item.dataset.section
                    );

                }

            }
        );

    }
);


function openScene(section) {

    const target =
        document.getElementById(
            `${section}Scene`
        );


    if (!target) {
        return;
    }


    scenes.forEach(
        scene => {

            scene.classList.remove(
                "active"
            );

        }
    );


    target.classList.add(
        "active"
    );

}


document
    .querySelectorAll("[data-home]")
    .forEach(
        button => {

            button.addEventListener(
                "click",
                returnHome
            );

        }
    );


function returnHome() {

    scenes.forEach(
        scene => {

            scene.classList.remove(
                "active"
            );

        }
    );


    homeScene.classList.add(
        "active"
    );

}


/* =========================================================
   COUNTDOWN
========================================================= */

const weddingDate =
    new Date(
        "November 22, 2026 09:00:00"
    ).getTime();


function updateCountdown() {

    const now =
        new Date().getTime();


    const difference =
        weddingDate - now;


    if (
        difference <= 0
    ) {

        document.getElementById(
            "days"
        ).textContent = "00";

        document.getElementById(
            "hours"
        ).textContent = "00";

        document.getElementById(
            "minutes"
        ).textContent = "00";

        document.getElementById(
            "seconds"
        ).textContent = "00";

        return;

    }


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference /
                (1000 * 60 * 60)) %
            24
        );


    const minutes =
        Math.floor(
            (difference /
                (1000 * 60)) %
            60
        );


    const seconds =
        Math.floor(
            (difference / 1000) %
            60
        );


    document.getElementById(
        "days"
    ).textContent =
        String(days).padStart(2, "0");


    document.getElementById(
        "hours"
    ).textContent =
        String(hours).padStart(2, "0");


    document.getElementById(
        "minutes"
    ).textContent =
        String(minutes).padStart(2, "0");


    document.getElementById(
        "seconds"
    ).textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();


setInterval(
    updateCountdown,
    1000
);


/* =========================================================
   OUR STORY
========================================================= */

const stories = [

    {
        image: "images/photo1.jpg",

        kicker: "THE BEGINNING",

        title:
            "It started with a moment.",

        text:
            "Somewhere between ordinary days and unexpected moments, two lives found their way toward each other."
    },

    {
        image: "images/photo2.jpg",

        kicker: "THE JOURNEY",

        title:
            "And then came countless memories.",

        text:
            "From little conversations to unforgettable days, every moment slowly became a part of our story."
    },

    {
        image: "images/photo3.jpg",

        kicker: "THE FOREVER",

        title:
            "Now we begin our forever.",

        text:
            "With hearts full of gratitude and excitement, we are ready to begin the next chapter together."
    }

];


let currentStory =
    0;


const storyImage =
    document.getElementById(
        "storyImage"
    );

const storyKicker =
    document.getElementById(
        "storyKicker"
    );

const storyTitle =
    document.getElementById(
        "storyTitle"
    );

const storyText =
    document.getElementById(
        "storyText"
    );

const storyDots =
    document.getElementById(
        "storyDots"
    );


function createStoryDots() {

    storyDots.innerHTML = "";


    stories.forEach(
        (_, index) => {

            const dot =
                document.createElement(
                    "span"
                );


            dot.className =
                "story-dot";


            if (
                index === currentStory
            ) {

                dot.classList.add(
                    "active"
                );

            }


            dot.addEventListener(
                "click",
                () => {

                    currentStory =
                        index;

                    updateStory();

                }
            );


            storyDots.appendChild(
                dot
            );

        }
    );

}


function updateStory() {

    const story =
        stories[currentStory];


    storyImage.src =
        story.image;


    storyKicker.textContent =
        story.kicker;


    storyTitle.textContent =
        story.title;


    storyText.textContent =
        story.text;


    createStoryDots();

}


document
    .getElementById("storyPrev")
    .addEventListener(
        "click",
        () => {

            currentStory--;

            if (
                currentStory < 0
            ) {

                currentStory =
                    stories.length - 1;

            }


            updateStory();

        }
    );


document
    .getElementById("storyNext")
    .addEventListener(
        "click",
        () => {

            currentStory++;

            if (
                currentStory >=
                stories.length
            ) {

                currentStory = 0;

            }


            updateStory();

        }
    );


createStoryDots();


/* =========================================================
   GALLERY
========================================================= */

const galleryImages = [

    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg"

];


let currentGallery =
    0;


const galleryImage =
    document.getElementById(
        "galleryImage"
    );

const galleryCurrent =
    document.getElementById(
        "galleryCurrent"
    );

const galleryThumbs =
    document.querySelectorAll(
        ".gallery-thumb"
    );


function updateGallery() {

    galleryImage.src =
        galleryImages[
            currentGallery
        ];


    galleryCurrent.textContent =
        String(
            currentGallery + 1
        ).padStart(2, "0");


    galleryThumbs.forEach(
        (thumb, index) => {

            thumb.classList.toggle(
                "active",
                index === currentGallery
            );

        }
    );

}


document
    .getElementById("galleryPrev")
    .addEventListener(
        "click",
        () => {

            currentGallery--;

            if (
                currentGallery < 0
            ) {

                currentGallery =
                    galleryImages.length - 1;

            }


            updateGallery();

        }
    );


document
    .getElementById("galleryNext")
    .addEventListener(
        "click",
        () => {

            currentGallery++;

            if (
                currentGallery >=
                galleryImages.length
            ) {

                currentGallery = 0;

            }


            updateGallery();

        }
    );


galleryThumbs.forEach(
    thumb => {

        thumb.addEventListener(
            "click",
            () => {

                currentGallery =
                    Number(
                        thumb.dataset.index
                    );

                updateGallery();

            }
        );

    }
);


/* =========================================================
   EVENT CARD FLIP
========================================================= */

document
    .querySelectorAll(".event-card")
    .forEach(
        card => {

            card.addEventListener(
                "click",
                () => {

                    card.classList.toggle(
                        "flipped"
                    );

                }
            );

        }
    );


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            returnHome();

        }

    }
);


/* =========================================================
   IMAGE PRELOAD
========================================================= */

const preloadImages = [

    "images/engagement-hand.jpg",
    "images/couple.jpg",
    "images/photo1.jpg",
    "images/photo2.jpg",
    "images/photo3.jpg",
    "images/photo4.jpg"

];


preloadImages.forEach(
    src => {

        const image =
            new Image();

        image.src = src;

    }
);

/* =========================================================
   ENVELOPE MOUSE PARALLAX — DESKTOP ONLY
========================================================= */

const introStage = document.querySelector(".invitation-stage");

if (
    introStage &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
) {

    introStage.addEventListener("mousemove", event => {

        if (envelope.classList.contains("open")) {
            return;
        }

        const rect = introStage.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const rotateY =
            ((x / rect.width) - 0.5) * 5;

        const rotateX =
            ((y / rect.height) - 0.5) * -4;

        envelope.style.transform =
            `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    introStage.addEventListener("mouseleave", () => {
        envelope.style.transform = "";
    });
}