function showWish() {
    const wishes = [
        "May all your dreams come true! ✨",
        "Wishing you endless happiness! 🌟",
        "You deserve all the love in the world! 💖",
        "May this year bring you amazing adventures! 🌈",
        "You make the world a better place! 🌺"
    ];
    
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    
    // Create and show the wish popup
    const popup = document.createElement('div');
    popup.className = 'wish-popup';
    popup.textContent = randomWish;
    
    // Style the popup
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'rgba(255, 75, 110, 0.9)';
    popup.style.color = 'white';
    popup.style.padding = '20px 40px';
    popup.style.borderRadius = '15px';
    popup.style.fontSize = '1.5em';
    popup.style.fontFamily = "'Dancing Script', cursive";
    popup.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    popup.style.zIndex = '1000';
    popup.style.animation = 'fadeIn 0.5s ease-out';
    
    // Add keyframes for animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translate(-50%, -60%); }
            to { opacity: 1; transform: translate(-50%, -50%); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(popup);
    
    // Remove popup after 3 seconds
    setTimeout(() => {
        popup.style.animation = 'fadeOut 0.5s ease-out';
        style.textContent += `
            @keyframes fadeOut {
                from { opacity: 1; transform: translate(-50%, -50%); }
                to { opacity: 0; transform: translate(-50%, -60%); }
            }
        `;
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 500);
    }, 3000);
}

// Add confetti effect when the page loads
window.onload = function() {
    createConfetti();
};

function createConfetti() {
    const colors = ['#ff4b6e', '#ff9a9e', '#fad0c4', '#ffd700', '#ff69b4'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        
        document.body.appendChild(confetti);
    }
}

// Add confetti styles
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    .confetti {
        position: fixed;
        width: 10px;
        height: 10px;
        top: -10px;
        opacity: 0;
        animation: fall linear infinite;
        z-index: 999;
    }
    
    @keyframes fall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Gallery Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-content img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
let currentImageIndex = 0;

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
    });
});

function updateLightboxImage() {
    const imgSrc = galleryItems[currentImageIndex].querySelector('img').src;
    lightboxImg.src = imgSrc;
}

lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

lightboxPrev.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxImage();
});

lightboxNext.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    updateLightboxImage();
});

// Surprise Box
const surpriseBox = document.querySelector('.surprise-box');
const messageReveal = document.querySelector('.message-reveal');
const closeMessage = document.querySelector('.close-message');

surpriseBox.addEventListener('click', () => {
    surpriseBox.classList.add('open');
    setTimeout(() => {
        messageReveal.classList.add('active');
    }, 1000);
});

closeMessage.addEventListener('click', () => {
    messageReveal.classList.remove('active');
    setTimeout(() => {
        surpriseBox.classList.remove('open');
    }, 500);
});

// Add Wish Form
const addWishBtn = document.querySelector('.add-wish-btn');
const wishForm = document.querySelector('.wish-form');
const wishFormClose = document.querySelector('.wish-form-close');
const wishFormSubmit = document.querySelector('.wish-form-submit');

addWishBtn.addEventListener('click', () => {
    wishForm.classList.add('active');
});

wishFormClose.addEventListener('click', () => {
    wishForm.classList.remove('active');
});

wishFormSubmit.addEventListener('click', () => {
    const name = document.querySelector('#wish-name').value;
    const message = document.querySelector('#wish-message').value;
    const emoji = document.querySelector('#wish-emoji').value;

    if (name && message) {
        const wishesContainer = document.querySelector('.wishes-container');
        const newWish = document.createElement('div');
        newWish.className = 'wish-card';
        newWish.innerHTML = `
            <div class="emoji">${emoji || '🎉'}</div>
            <h3>${name}</h3>
            <p>${message}</p>
        `;
        wishesContainer.appendChild(newWish);
        wishForm.classList.remove('active');
        document.querySelector('#wish-name').value = '';
        document.querySelector('#wish-message').value = '';
        document.querySelector('#wish-emoji').value = '';
    }
});

// Upload Photo
const uploadBtn = document.querySelector('.upload-btn');
const fileInput = document.querySelector('#photo-upload');

uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const gallery = document.querySelector('.gallery');
            const newPhoto = document.createElement('div');
            newPhoto.className = 'gallery-item';
            newPhoto.innerHTML = `<img src="${e.target.result}" alt="Uploaded photo">`;
            gallery.appendChild(newPhoto);
        };
        reader.readAsDataURL(file);
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

document.querySelectorAll('.memory, .wish-card, .gallery-item').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

// Audio Controls
const audio = document.getElementById('background-music');
const playPauseBtn = document.getElementById('play-pause');

// Function to toggle audio play/pause
function toggleAudio() {
    if (audio.paused) {
        audio.muted = false; // Unmute when playing
        audio.play();
        playPauseBtn.textContent = '⏸️';
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶️';
    }
}

// Function to adjust volume
function adjustVolume(change) {
    audio.muted = false; // Unmute when adjusting volume
    audio.volume = Math.max(0, Math.min(1, audio.volume + change));
}

// Play audio when page loads
window.addEventListener('load', () => {
    // Try to play audio automatically
    audio.play().catch(error => {
        console.log('Autoplay prevented:', error);
        // Show play button if autoplay is prevented
        playPauseBtn.textContent = '▶️';
    });
});

// Try to unmute and play audio on first user interaction
document.addEventListener('click', function initAudio() {
    if (audio.muted) {
        audio.muted = false;
        audio.play();
        playPauseBtn.textContent = '⏸️';
    }
    // Remove the event listener after first interaction
    document.removeEventListener('click', initAudio);
}, { once: true }); 