// --- Configuration ---
const speedHeart = 500; // ms between heart creations
const particleCount = 200; // Increased for milky way effect
const musicFile = 'music.mp3'; // Ensure this matches your file

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setInterval(createHeart, speedHeart);
    startGallery();
    
    // Auto blast confetti on load
    fireConfetti();
});

// --- Particles (Background) ---
function createParticles() {
    const container = document.getElementById('particles');
    for(let i=0; i<particleCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        const size = Math.random() * 3 + 1; // 1px to 4px
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's'; // 2s to 5s
        star.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(star);
    }
}

// --- Floating Hearts ---
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart-float');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    
    const duration = Math.random() * 3 + 4; // 4s to 7s
    heart.style.animationDuration = duration + 's';
    
    const size = Math.random() * 20 + 10; // 10px to 30px
    heart.style.fontSize = size + 'px';

    // Interaction
    heart.onclick = function() {
        // Pop effect
        heart.style.transform = 'scale(2)';
        heart.style.opacity = 0;
        setTimeout(() => heart.remove(), 200);
    };

    document.body.appendChild(heart);
    
    // Cleanup
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// --- Gallery ---
let slideIndex = 0;
function startGallery() {
    showSlides();
}

function showSlides() {
    const slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

// --- Music ---
let isPlaying = false;
function toggleMusic() {
    const audio = document.getElementById('bg-music');
    const icon = document.getElementById('music-icon');
    
    if (isPlaying) {
        audio.pause();
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    } else {
        audio.play().catch(e => console.log("Audio autoplay might be blocked: ", e));
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    }
    isPlaying = !isPlaying;
}

// --- Surprise Modal ---
function showSurprise() {
    const modal = document.getElementById('secret-modal');
    modal.style.display = 'flex';
    fireConfetti();
}

function closeModal() {
    const modal = document.getElementById('secret-modal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('secret-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// --- Confetti ---
function fireConfetti() {
    var count = 200;
    var defaults = {
        origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
    });
    fire(0.2, {
        spread: 60,
    });
    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2
    });
    fire(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}
