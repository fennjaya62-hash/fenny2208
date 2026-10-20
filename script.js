// ==========================================
// 1. SCROLL PROGRESS & CURSOR
// ==========================================

window.addEventListener("scroll", () => {

    const winScroll =
        document.documentElement.scrollTop ||
        document.body.scrollTop;

    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const scrolled =
        (winScroll / height) * 100;

    const scrollBar =
        document.getElementById("scrollProgress");

    if (scrollBar) {

        scrollBar.style.width =
            scrolled + "%";
    }
});


const cursorDot =
    document.getElementById("cursorDot");

const cursorOutline =
    document.getElementById("cursorOutline");


window.addEventListener("mousemove", (e) => {

    const posX = e.clientX;
    const posY = e.clientY;

    if (cursorDot) {

        cursorDot.style.left =
            `${posX}px`;

        cursorDot.style.top =
            `${posY}px`;
    }

    if (cursorOutline) {

        cursorOutline.animate(

            {
                left:
                    `${posX}px`,

                top:
                    `${posY}px`
            },

            {
                duration:
                    400,

                fill:
                    "forwards"
            }
        );
    }
});


// ==========================================
// 2. CANVAS PARTICLES NETWORK ENGINE
// ==========================================

const canvas =
    document.getElementById(
        "particleCanvas"
    );

const ctx =
    canvas
        ? canvas.getContext("2d")
        : null;

let particles = [];


function resizeCanvas() {

    if (!canvas)
        return;

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;
}


window.addEventListener(
    "resize",
    resizeCanvas
);

resizeCanvas();


class Particle {

    constructor() {

        this.x =
            Math.random() *
            canvas.width;

        this.y =
            Math.random() *
            canvas.height;

        this.vx =
            (Math.random() - 0.5) *
            1.2;

        this.vy =
            (Math.random() - 0.5) *
            1.2;

        this.size =
            Math.random() * 2 + 1;
    }


    update() {

        this.x +=
            this.vx;

        this.y +=
            this.vy;

        if (
            this.x < 0 ||
            this.x > canvas.width
        ) {

            this.vx *= -1;
        }

        if (
            this.y < 0 ||
            this.y > canvas.height
        ) {

            this.vy *= -1;
        }
    }


    draw() {

        if (!ctx)
            return;

        ctx.fillStyle =
            "rgba(0, 243, 255, 0.7)";

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }
}


function initParticles() {

    particles = [];

    const count =
        Math.floor(
            (
                window.innerWidth *
                window.innerHeight
            ) / 12000
        );

    for (
        let i = 0;
        i < count;
        i++
    ) {

        particles.push(
            new Particle()
        );
    }
}


initParticles();


function animateParticles() {

    if (!ctx)
        return;

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    for (
        let i = 0;
        i < particles.length;
        i++
    ) {

        particles[i].update();
        particles[i].draw();


        for (
            let j = i + 1;
            j < particles.length;
            j++
        ) {

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const dist =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (dist < 110) {

                ctx.strokeStyle =
                    `rgba(
                        0,
                        243,
                        255,
                        ${1 - dist / 110}
                    )`;

                ctx.lineWidth =
                    0.5;

                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.stroke();
            }
        }
    }


    requestAnimationFrame(
        animateParticles
    );
}


if (canvas)
    animateParticles();


// ==========================================
// 3. EFEK TEKS KETIK
// ==========================================

const phrases = [

    "Student of TJKT",

    "Network Specialist",

    "Web Developer Learner",

    "SMKN 3 Soppeng"

];


let phraseIndex = 0;

let charIndex = 0;

let isDeleting = false;


function typeEffect() {

    const typingElement =
        document.getElementById(
            "typing-text"
        );

    if (!typingElement)
        return;


    const currentPhrase =
        phrases[phraseIndex];


    if (isDeleting) {

        typingElement.textContent =
            currentPhrase.substring(
                0,
                charIndex - 1
            );

        charIndex--;

    } else {

        typingElement.textContent =
            currentPhrase.substring(
                0,
                charIndex + 1
            );

        charIndex++;
    }


    let typeSpeed =
        isDeleting
            ? 40
            : 90;


    if (
        !isDeleting &&
        charIndex ===
            currentPhrase.length
    ) {

        typeSpeed = 2200;

        isDeleting = true;

    } else if (
        isDeleting &&
        charIndex === 0
    ) {

        isDeleting = false;

        phraseIndex =
            (
                phraseIndex + 1
            ) %
            phrases.length;

        typeSpeed = 400;
    }


    setTimeout(
        typeEffect,
        typeSpeed
    );
}


document.addEventListener(
    "DOMContentLoaded",
    typeEffect
);


// ==========================================
// 4. FILTER SKILLS
// ==========================================

function filterSkills(
    category,
    clickedButton = null
) {

    const cards =
        document.querySelectorAll(
            ".skill-card"
        );

    const buttons =
        document.querySelectorAll(
            ".filter-btn"
        );


    buttons.forEach(
        btn =>
            btn.classList.remove(
                "active"
            )
    );


    if (clickedButton) {

        clickedButton.classList.add(
            "active"
        );

    } else if (
        window.event?.target
    ) {

        window.event.target.classList.add(
            "active"
        );
    }


    cards.forEach(card => {

        if (
            category === "all" ||
            card.getAttribute(
                "data-category"
            ) === category
        ) {

            card.style.display =
                "block";

            card.style.animation =
                "fadeIn 0.4s ease forwards";

        } else {

            card.style.display =
                "none";
        }

    });


    playSound(
        750,
        "sine",
        0.05
    );
}


// ==========================================
// 5. CONTACT MODAL & COPY EMAIL
// ==========================================

function openContactModal() {

    const modal =
        document.getElementById(
            "contactModal"
        );

    if (modal)
        modal.style.display =
            "flex";

    playSound(
        850,
        "sine",
        0.08
    );
}


function closeContactModal() {

    const modal =
        document.getElementById(
            "contactModal"
        );

    if (modal)
        modal.style.display =
            "none";
}


function copyModalEmail() {

    const copyText =
        document.getElementById(
            "modalEmailInput"
        );

    if (!copyText)
        return;


    copyText.select();

    copyText.setSelectionRange(
        0,
        99999
    );


    navigator.clipboard.writeText(
        copyText.value
    );


    alert(
        "Email berhasil disalin: " +
        copyText.value
    );
}


function copyEmail() {

    const email =
        "pendiagus333@gmail.com";


    navigator.clipboard.writeText(
        email
    );


    const btn =
        document.getElementById(
            "copyEmailBtn"
        );


    if (btn) {

        btn.innerHTML =
            "✓ Email Tersalin!";


        setTimeout(() => {

            btn.innerHTML =
                "✉ Copy Email: " +
                "pendiagus333@gmail.com";

        }, 3000);
    }
}


// ==========================================
// 6. BACKGROUND MUSIC & SOUND
// ==========================================

function toggleBackgroundMusic() {

    const audio =
        document.getElementById(
            "bgMusic"
        );

    const btn =
        document.getElementById(
            "musicToggleBtn"
        );

    const icon =
        document.getElementById(
            "musicIcon"
        );

    const text =
        document.getElementById(
            "musicText"
        );


    if (!audio)
        return;


    if (audio.paused) {

        const playPromise =
            audio.play();


        if (
            playPromise !==
            undefined
        ) {

            playPromise.then(() => {

                if (btn)
                    btn.classList.add(
                        "playing"
                    );

                if (icon)
                    icon.innerText =
                        "🔊";

                if (text)
                    text.innerText =
                        "Playing";

            }).catch(
                error =>
                    console.warn(
                        "Autoplay dicegah browser:",
                        error
                    )
            );
        }

    } else {

        audio.pause();


        if (btn)
            btn.classList.remove(
                "playing"
            );


        if (icon)
            icon.innerText =
                "🎵";


        if (text)
            text.innerText =
                "Musik";
    }
}


function playSound(
    freq,
    type = "sine",
    duration = 0.1
) {

    try {

        const audioCtx =
            new (
                window.AudioContext ||
                window.webkitAudioContext
            )();


        const osc =
            audioCtx.createOscillator();


        const gain =
            audioCtx.createGain();


        osc.type =
            type;


        osc.frequency.setValueAtTime(
            freq,
            audioCtx.currentTime
        );


        gain.gain.setValueAtTime(
            0.08,
            audioCtx.currentTime
        );


        gain.gain.exponentialRampToValueAtTime(
            0.0001,
            audioCtx.currentTime +
            duration
        );


        osc.connect(gain);

        gain.connect(
            audioCtx.destination
        );


        osc.start();

        osc.stop(
            audioCtx.currentTime +
            duration
        );

    } catch (e) {}
}


// ==========================================
// 7. NEXO AI ROBOT CHATBOT
// ==========================================

function toggleRobotChat() {

    const chatWin =
        document.getElementById(
            "robotChatWindow"
        );

    if (chatWin) {

        chatWin.classList.toggle(
            "active"
        );

        playSound(
            800,
            "sine",
            0.1
        );
    }
}


function handleKeyPress(e) {

    if (
        e.key === "Enter"
    ) {

        sendUserMessage();
    }
}


function sendUserMessage() {

    const input =
        document.getElementById(
            "robotInput"
        );


    if (
        !input ||
        !input.value.trim()
    ) {

        return;
    }


    const userText =
        input.value.trim();


    appendMessage(
        userText,
        "user"
    );


    input.value =
        "";


    setTimeout(() => {

        respondRobot(
            userText.toLowerCase()
        );

    }, 500);
}


function askRobot(type) {

    let questionText =
        "";


    if (
        type === "siapa"
    ) {

        questionText =
            "Siapa Fenny Jaya?";
    }


    if (
        type === "skills"
    ) {

        questionText =
            "Apa saja skill utamanya?";
    }


    if (
        type === "kontak"
    ) {

        questionText =
            "Bagaimana cara menghubungi Fenny?";
    }


    appendMessage(
        questionText,
        "user"
    );


    setTimeout(() => {

        respondRobot(
            type
        );

    }, 500);
}


function respondRobot(query) {

    let reply =
        "Maaf, saya tidak memahami pertanyaan tersebut. " +
        "Coba tanya tentang 'skill', 'sekolah', atau 'kontak'.";


    if (
        query.includes("siapa") ||
        query === "siapa"
    ) {

        reply =
            "Fenny Jaya adalah siswi XI TJKT 3 SMKN 3 Soppeng yang berfokus pada Jaringan Komputer, Web Development, dan Persiapan LKS.";

    } else if (
        query.includes("skill") ||
        query === "skills" ||
        query.includes("keahlian")
    ) {

        reply =
            "Keahlian utama Fenny meliputi: 🌐 Computer Networking (Mikrotik/Cisco), 💻 Web Development (HTML, CSS, JS), dan 🛡️ Network Security.";

    } else if (
        query.includes("kontak") ||
        query.includes("email") ||
        query.includes("hubungi")
    ) {

        reply =
            "Anda dapat menghubungi Fenny melalui email di: <strong>pendiagus333@gmail.com</strong>";

    } else if (
        query.includes("sekolah") ||
        query.includes("kelas")
    ) {

        reply =
            "Fenny bersekolah di <strong>SMKN 3 Soppeng</strong>, kelas XI TJKT 3.";
    }


    appendMessage(
        reply,
        "bot"
    );
}


function appendMessage(
    text,
    sender
) {

    const chatMsgs =
        document.getElementById(
            "chatMessages"
        );


    if (!chatMsgs)
        return;


    const msgDiv =
        document.createElement(
            "div"
        );


    msgDiv.className =
        `msg ${sender}-msg`;


    msgDiv.innerHTML =
        text;


    chatMsgs.appendChild(
        msgDiv
    );


    chatMsgs.scrollTop =
        chatMsgs.scrollHeight;


    if (
        sender === "bot"
    ) {

        speakText(
            text.replace(
                /<[^>]*>?/gm,
                ""
            )
        );
    }


    playSound(
        sender === "user"
            ? 700
            : 950,
        "sine",
        0.08
    );
}


// ==========================================
// 8. ACCESSIBILITY & UTILITIES
// ==========================================

let currentFontSize =
    16;


function changeFontSize(delta) {

    currentFontSize +=
        delta * 2;


    if (
        currentFontSize < 12
    ) {

        currentFontSize =
            12;
    }


    if (
        currentFontSize > 22
    ) {

        currentFontSize =
            22;
    }


    document.body.style.fontSize =
        currentFontSize +
        "px";


    playSound(
        600 + delta * 100,
        "sine",
        0.05
    );
}


function speakText(text) {

    if (
        "speechSynthesis"
        in window
    ) {

        window.speechSynthesis.cancel();


        const utterance =
            new SpeechSynthesisUtterance(
                text
            );


        utterance.lang =
            "id-ID";


        utterance.rate =
            1;


        window.speechSynthesis.speak(
            utterance
        );
    }
}


function downloadCV() {

    const element =
        document.getElementById(
            "cvContent"
        );


    const opt = {

        margin:
            0.5,

        filename:
            "CV_Fenny_Jaya_TJKT.pdf",

        image: {

            type:
                "jpeg",

            quality:
                0.98
        },

        html2canvas: {

            scale:
                2,

            backgroundColor:
                "#030712"
        },

        jsPDF: {

            unit:
                "in",

            format:
                "letter",

            orientation:
                "portrait"
        }
    };


    if (
        typeof html2pdf !==
        "undefined"
    ) {

        html2pdf()
            .set(opt)
            .from(element)
            .save();

    } else {

        alert(
            "Library PDF sedang dimuat, silakan coba beberapa detik lagi."
        );
    }
}


function setTheme(color) {

    document.documentElement.style.setProperty(
        "--accent-color",
        color
    );

    document.documentElement.style.setProperty(
        "--accent-glow",
        color + "66"
    );

    playSound(
        950,
        "sine",
        0.1
    );
}


// ==========================================
// 9. 2026 UI UPGRADE
// ==========================================

const portfolioSections = [

    "tentang",

    "data",

    "tools",

    "skills",

    "proyek",

    "timeline",

    "kontak"

];


function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast)
        return;


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        window.__toastTimer
    );


    window.__toastTimer =
        setTimeout(
            () =>
                toast.classList.remove(
                    "show"
                ),
            2300
        );
}


function setTheme(color) {

    document.documentElement.style.setProperty(
        "--accent-color",
        color
    );

    document.documentElement.style.setProperty(
        "--accent-glow",
        color + "66"
    );


    localStorage.setItem(
        "fj-accent",
        color
    );


    playSound(
        950,
        "sine",
        0.1
    );


    showToast(
        "Warna aksen diperbarui"
    );
}


function toggleLightMode() {

    document.body.classList.toggle(
        "light-mode"
    );


    const light =
        document.body.classList.contains(
            "light-mode"
        );


    localStorage.setItem(
        "fj-light-mode",
        light
            ? "1"
            : "0"
    );


    const btn =
        document.getElementById(
            "themeToggle"
        );


    if (btn) {

        btn.innerHTML =
            `<i class="fa-solid ${
                light
                    ? "fa-sun"
                    : "fa-moon"
            }"></i>`;
    }


    showToast(
        light
            ? "Mode terang aktif"
            : "Mode gelap aktif"
    );
}


function toggleReading() {

    const btn =
        document.getElementById(
            "readingToggle"
        );


    if (
        !(
            "speechSynthesis"
            in window
        )
    ) {

        showToast(
            "Fitur suara tidak didukung browser ini"
        );

        return;
    }


    if (
        window.speechSynthesis
            .speaking
    ) {

        window.speechSynthesis.cancel();


        if (btn) {

            btn.classList.remove(
                "active"
            );
        }


        showToast(
            "Pembacaan dihentikan"
        );

        return;
    }


    const heroText =
        document.querySelector(
            ".hero-content"
        );


    speakText(
        heroText
            ? heroText.innerText
                  .replace(
                      /\s+/g,
                      " "
                  )
                  .trim()

            : "Halo, selamat datang di portofolio Fenny Jaya."
    );


    if (btn) {

        btn.classList.add(
            "active"
        );
    }


    showToast(
        "Membacakan bagian utama"
    );
}


function toggleMobileMenu() {

    const nav =
        document.querySelector(
            ".nav-links"
        );


    const btn =
        document.getElementById(
            "mobileMenuBtn"
        );


    if (!nav)
        return;


    nav.classList.toggle(
        "open"
    );


    if (btn) {

        btn.innerHTML =
            `<i class="fa-solid ${
                nav.classList.contains(
                    "open"
                )
                    ? "fa-xmark"
                    : "fa-bars"
            }"></i>`;
    }
}


document
    .querySelectorAll(
        ".nav-links a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                document
                    .querySelector(
                        ".nav-links"
                    )
                    ?.classList.remove(
                        "open"
                    );


                const btn =
                    document.getElementById(
                        "mobileMenuBtn"
                    );


                if (btn) {

                    btn.innerHTML =
                        '<i class="fa-solid fa-bars"></i>';
                }
            }
        );

    });


function scrollToSection(id) {

    document
        .getElementById(id)
        ?.scrollIntoView({

            behavior:
                "smooth",

            block:
                "start"
        });
}


function scrollToTop() {

    window.scrollTo({

        top:
            0,

        behavior:
            "smooth"
    });
}


function copyPortfolioLink() {

    const url =
        window.location.href;


    if (
        navigator.clipboard
    ) {

        navigator.clipboard
            .writeText(url)
            .then(
                () =>
                    showToast(
                        "Link portofolio disalin"
                    )
            );

    } else {

        showToast(
            "Clipboard tidak tersedia"
        );
    }
}


async function sharePortfolio() {

    const shareData = {

        title:
            "Fenny Jaya — Portfolio TJKT",

        text:
            "Lihat portofolio Fenny Jaya.",

        url:
            window.location.href
    };


    try {

        if (
            navigator.share
        ) {

            await navigator.share(
                shareData
            );

        } else {

            await navigator.clipboard.writeText(
                window.location.href
            );
        }


        showToast(

            navigator.share
                ? "Siap dibagikan"
                : "Link portofolio disalin"
        );

    } catch (e) {}
}


// ==========================================
// PROJECT FILTERS
// ==========================================

function filterProjects(category) {

    const cards =
        document.querySelectorAll(
            ".project-card"
        );


    const buttons =
        document.querySelectorAll(
            ".project-filter"
        );


    let visible = 0;


    buttons.forEach(btn =>
        btn.classList.remove(
            "active"
        )
    );


    const clicked =
        [...buttons].find(btn =>
            btn.textContent
                .toLowerCase()
                .includes(

                    category === "all"
                        ? "semua"

                        : category ===
                          "networking"
                        ? "networking"

                        : "web dev"
                )
        );


    if (clicked) {

        clicked.classList.add(
            "active"
        );
    }


    cards.forEach(card => {

        const match =
            category === "all" ||
            card.dataset.projectCategory ===
                category;


        card.classList.toggle(
            "is-hidden",
            !match
        );


        if (match)
            visible++;
    });


    const count =
        document.getElementById(
            "projectCount"
        );


    if (count) {

        count.textContent =
            `${visible} proyek`;
    }


    showToast(
        `${visible} proyek ditampilkan`
    );
}


// ==========================================
// ACTIVE NAV + BACK TOP
// ==========================================

const backToTop =
    document.getElementById(
        "backToTop"
    );


window.addEventListener(
    "scroll",
    () => {

        const y =
            window.scrollY ||
            document.documentElement
                .scrollTop;


        if (backToTop) {

            backToTop.classList.toggle(
                "visible",
                y > 520
            );
        }


        let current =
            "";


        portfolioSections.forEach(
            id => {

                const el =
                    document.getElementById(
                        id
                    );


                if (
                    el &&
                    y >=
                        el.offsetTop -
                        170
                ) {

                    current =
                        id;
                }
            }
        );


        document
            .querySelectorAll(
                ".nav-links a[data-nav]"
            )
            .forEach(a => {

                a.classList.toggle(
                    "active",
                    a.dataset.nav ===
                        current
                );
            });
    }
);


// ==========================================
// LIVE CLOCK
// ==========================================

function updateClock() {

    const clock =
        document.getElementById(
            "liveClock"
        );


    if (!clock)
        return;


    const now =
        new Date();


    clock.textContent =
        now.toLocaleTimeString(
            "id-ID",
            {
                hour:
                    "2-digit",

                minute:
                    "2-digit",

                second:
                    "2-digit"
            }
        );
}


setInterval(
    updateClock,
    1000
);


updateClock();


// ==========================================
// REVEAL ON SCROLL
// ==========================================

const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(
                entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "revealed"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );
                    }

                }
            );

        },

        {
            threshold:
                0.12
        }
    );


document
    .querySelectorAll(

        ".section-title," +
        ".card-about," +
        ".info-card," +
        ".skill-card," +
        ".project-card," +
        ".timeline-item," +
        ".contact-card," +
        ".tool-card"

    )
    .forEach(el => {

        el.classList.add(
            "reveal-ready"
        );


        revealObserver.observe(
            el
        );
    });


// ==========================================
// SMOOTH TILT
// ==========================================

if (
    window.matchMedia(
        "(pointer:fine)"
    ).matches
) {

    document
        .querySelectorAll(
            ".tilt-card"
        )
        .forEach(card => {

            card.addEventListener(
                "pointermove",
                e => {

                    const r =
                        card.getBoundingClientRect();


                    const x =
                        (e.clientX -
                            r.left) /
                            r.width -
                        0.5;


                    const y =
                        (e.clientY -
                            r.top) /
                            r.height -
                        0.5;


                    card.style.transform =

                        `perspective(900px)
                         rotateY(${x * 4}deg)
                         rotateX(${y * -4}deg)
                         translateY(-4px)`;
                }
            );


            card.addEventListener(
                "pointerleave",
                () => {

                    card.style.transform =
                        "";
                }
            );
        });
}


// ==========================================
// COMMAND PALETTE
// ==========================================

const commandItems = [

    {
        label:
            "Tentang Saya",

        desc:
            "Profil singkat Fenny",

        icon:
            "fa-user",

        action:
            () =>
                scrollToSection(
                    "tentang"
                )
    },


    {
        label:
            "Data Diri",

        desc:
            "Informasi dan kontak",

        icon:
            "fa-id-card",

        action:
            () =>
                scrollToSection(
                    "data"
                )
    },


    {
        label:
            "Quick Tools",

        desc:
            "Alat praktis",

        icon:
            "fa-bolt",

        action:
            () =>
                scrollToSection(
                    "tools"
                )
    },


    {
        label:
            "Keahlian",

        desc:
            "Networking, web, security",

        icon:
            "fa-code",

        action:
            () =>
                scrollToSection(
                    "skills"
                )
    },


    {
        label:
            "Proyek",

        desc:
            "Karya dan praktikum",

        icon:
            "fa-folder-open",

        action:
            () =>
                scrollToSection(
                    "proyek"
                )
    },


    {
        label:
            "Perjalanan",

        desc:
            "Timeline akademik",

        icon:
            "fa-route",

        action:
            () =>
                scrollToSection(
                    "timeline"
                )
    },


    {
        label:
            "Kontak",

        desc:
            "Email Fenny",

        icon:
            "fa-envelope",

        action:
            () =>
                scrollToSection(
                    "kontak"
                )
    },


    {
        label:
            "Download CV",

        desc:
            "Ekspor ke PDF",

        icon:
            "fa-file-pdf",

        action:
            downloadCV
    }

];


function renderCommandList(
    query = ""
) {

    const list =
        document.getElementById(
            "commandList"
        );


    if (!list)
        return;


    const q =
        query
            .trim()
            .toLowerCase();


    const items =
        commandItems.filter(
            x =>
                !q ||
                `${x.label} ${x.desc}`
                    .toLowerCase()
                    .includes(q)
        );


    list.innerHTML =
        items.length

            ? items
                  .map(
                      x =>

                        `
                        <button
                            class="command-item"
                            data-command-index="${commandItems.indexOf(x)}"
                        >

                            <i
                                class="fa-solid ${x.icon}">
                            </i>

                            <span>
                                ${x.label}
                                <small>
                                    ${x.desc}
                                </small>
                            </span>

                        </button>
                        `
                  )
                  .join("")

            : `
              <div class="command-empty">
                  Tidak ada perintah yang cocok.
              </div>
              `;


    list
        .querySelectorAll(
            ".command-item"
        )
        .forEach(btn => {

            btn.addEventListener(
                "click",
                () => {

                    const item =
                        commandItems[
                            Number(
                                btn.dataset
                                    .commandIndex
                            )
                        ];


                    closeCommandPalette();


                    item.action();
                }
            );
        });
}


function openCommandPalette() {

    const overlay =
        document.getElementById(
            "commandPalette"
        );


    if (!overlay)
        return;


    overlay.classList.add(
        "active"
    );


    overlay.setAttribute(
        "aria-hidden",
        "false"
    );


    renderCommandList();


    const input =
        document.getElementById(
            "commandInput"
        );


    setTimeout(
        () =>
            input?.focus(),
        50
    );
}


function closeCommandPalette() {

    const overlay =
        document.getElementById(
            "commandPalette"
        );


    if (!overlay)
        return;


    overlay.classList.remove(
        "active"
    );


    overlay.setAttribute(
        "aria-hidden",
        "true"
    );
}


document.addEventListener(
    "keydown",
    e => {

        if (
            (e.ctrlKey ||
                e.metaKey) &&
            e.key.toLowerCase() ===
                "k"
        ) {

            e.preventDefault();

            openCommandPalette();
        }


        if (
            e.key === "Escape"
        ) {

            closeCommandPalette();
        }
    }
);


document
    .getElementById(
        "commandInput"
    )
    ?.addEventListener(
        "input",
        e =>
            renderCommandList(
                e.target.value
            )
    );


document
    .getElementById(
        "commandPalette"
    )
    ?.addEventListener(
        "click",
        e => {

            if (
                e.target.id ===
                "commandPalette"
            ) {

                closeCommandPalette();
            }
        }
    );


// ==========================================
// INIT SETTINGS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const savedAccent =
            localStorage.getItem(
                "fj-accent"
            );


        if (savedAccent) {

            setTheme(
                savedAccent
            );
        }


        if (
            localStorage.getItem(
                "fj-light-mode"
            ) === "1"
        ) {

            document.body.classList.add(
                "light-mode"
            );


            const btn =
                document.getElementById(
                    "themeToggle"
                );


            if (btn) {

                btn.innerHTML =
                    '<i class="fa-solid fa-sun"></i>';
            }
        }


        renderCommandList();
    }
);


// ==========================================
// COPY FALLBACK
// ==========================================

window.copyTextSafe =
    async function(text) {

        try {

            await navigator.clipboard.writeText(
                text
            );

            return true;

        } catch (e) {

            const temp =
                document.createElement(
                    "textarea"
                );


            temp.value =
                text;


            document.body.appendChild(
                temp
            );


            temp.select();


            const ok =
                document.execCommand(
                    "copy"
                );


            temp.remove();


            return ok;
        }
    };