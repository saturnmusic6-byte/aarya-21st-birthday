/* ================================================================
   AARYA's 21st Birthday — Main App
   Firebase Compat SDK (v9 compat) — no build tools needed
   ================================================================ */

(function () {
  "use strict";

  /* ── Private content (NOT in HTML — injected only after unlock) ── */
  const PRIVATE_HTML = `
  <div id="private-zone-inner">
    <section class="private-hero">
      <div class="hero-ring hero-ring-1"></div>
      <div class="hero-ring hero-ring-2"></div>
      <div class="private-hero-content">
        <p class="private-tag">Dedicated, Just for You.</p>
        <h1><span class="name-glow">For <span class="blush-text">Aarya,</span></span><br/><span class="sparkle-title">in the ways I don’t show the world.</span></h1>
        <button class="private-close-btn" id="private-close-btn">← Back to the Party</button>
      </div>
    </section>

    <section class="letter-section">
      <div class="letter-card">
        <div class="letter-header">
          <p class="letter-date">May 17th, 2026 &nbsp;·&nbsp; Your 21st</p>
          <p class="letter-greeting">Dear Aarya,</p>
        </div>
        <div class="letter-body">
          <p>
            Twenty-one is here. Never in my life did I think that this sweet girl I met randomly would be such a blessing to me, and that I’d be blessed to be part of this chapter of her life, truly. When I first met you, my heart told me instantly, <span class="shimmer-text">she’s the one you’d break mountains for</span>, and I quickly agreed too. I still do.
          </p>
          <p>
            I’m sure God felt like he truly is God when he brought you in this world. Not to make it dramatic, but you’re really special, as I always say, <span class="shimmer-text">those eyes, that smile, the little scrunch on your nose when you smile, that voice, things you share, that mind, your personality, the way you carry yourself</span> and even just your existence, it all makes everything so much better.   The happiness you bring is so real, even weed would get jealous, for real.
          </p>
          <p>
            Every memory with you gets added to the favourite category in my heart, just like every picture and video of yours in my gallery. These stay with me always. I find myself thinking about them pretty much every day, always.
          </p>
          <p>
            You’ve made me want to be more thoughtful, more present, hardworking, and honest. You influence my growth really well, and I’m truly thankful for that. I am a better person because of you. I want to do all the right things and more for you. <span class="shimmer-text">I want to see us grow old and strong, somewhere really nice.</span>
          </p>
          <p>
            I’m glad I am part of this beautiful time, your 21st Birthday. The same way I was glad to be part of your life before this, and the same way I know I’ll be glad to be in every chapter of your life after this. You make things feel calmer, clearer and more meaningful. You have made life feel <span class="shimmer-text">more beautiful, more real.</span>   More than Chainsmokers, I want to be closer to you, and with time, I pray we will be.
          </p>
          <p>
            May this year bring lots of abundance, good times, a better life, health, and everything you’ve wished for. May you reach great heights in all aspects of life. I wish nothing but pure abundance for you. Happy birthday, my sweetheart. <span class="shimmer-text">I love you. Can’t wait for June now.</span>
          </p>
        </div>
        <div class="letter-signature">
          <p class="letter-sign-name">Yash</p>
          <p class="letter-sign-sub">Always by your side.</p>
        </div>
      </div>
    </section>

    <section class="memories-section">
      <div class="memories-header">
        <span class="section-tag" style="border-color:rgba(212,132,156,.3);color:var(--blush)">Memories</span>
        <h2 style="font-family:var(--serif);font-size:clamp(2rem,4vw,3rem);font-weight:300;color:var(--cream);margin-bottom:14px;margin-top:14px">Moments I'll Keep <span class="forever-glow">Forever</span></h2>
        <p style="color:var(--ts);font-size:.9rem">A few of the memories that mean the most</p>
      </div>
      <div class="memories-timeline">

        <div class="memory-item">
          <div class="memory-dot">♡</div>
          <div class="memory-content">
            <p class="memory-date">Early days</p>
            <h3 class="memory-title">The Second Meet</h3>
            <p class="memory-desc">
              First day we talked, got drunk, had fun, sure, but the way I fell for you, being sober, on the 2nd day morning demitasse, was a different high.<br><br>
              I still remember how intensely charmed I was by your presence. That place, and even hippie@heart, has a special corner in my heart.
            </p>
          </div>
        </div>

        <div class="memory-item">
          <div class="memory-dot">✦</div>
          <div class="memory-content">
            <p class="memory-date">Firsts</p>
            <h3 class="memory-title">Mumbai Times</h3>
            <p class="memory-desc">
              You in my city for the first time, our first kiss, first long nice hug, firsts of many things. I remember I cancelled everything and came back to see you, and you gave me a very cute smile.<br><br>
              Next day, I came to see you early morning, best morning, really, the weather was so nice. We cuddled for the first time, then we went out for lunch. I was really happy, to experience a feeling like home.
            </p>
          </div>
        </div>

        <div class="memory-item">
          <div class="memory-dot">◦</div>
          <div class="memory-content">
            <p class="memory-date">No pain no gain!</p>
            <h3 class="memory-title">Mapro Garden</h3>
            <p class="memory-desc">
              This has to be remembered. The whole Mapro Garden was such a nice experience, the club sandwich and ice cream too.<br><br>
              The real memory was after that. We fell off, and I was so in guilt, how did I let this happen, omg. You were so understanding about it too. You didn’t even show me at first that you got hurt that bad. I still feel sorry for that.
            </p>
          </div>
        </div>

        <div class="memory-item">
          <div class="memory-dot">♡</div>
          <div class="memory-content">
            <p class="memory-date">Tonight</p>
            <h3 class="memory-title">Your 21st — The One We'll Talk About</h3>
            <p class="memory-desc">
              Whatever this night turns into, I already know it'll be a happy memory, because <span class="static-glow">you're in it</span>. Happy Birthday baby, Love you so much.
            </p>
          </div>
        </div>

      </div>
    </section>
  </div>`;

  /* ═══════════════════════════════════════════════
     STATE
  ═══════════════════════════════════════════════ */
  let db = null;
  let firebaseReady = false;
  let mediaItems = [];   // [{id, url, type, name, ts}]
  let currentFilter = "all";
  let lightboxIndex = 0;
  let lightboxItems = [];
  const AUDIO_URL = "https://res.cloudinary.com/dwoau4g1j/video/upload/v1778445472/f09ndqtk8zphy6b2vuuo.mp3";
  let privateAudio = new Audio(AUDIO_URL);
  privateAudio.loop = true;
  privateAudio.volume = 0.5;
  privateAudio.preload = "auto";

  const PUBLIC_AUDIO_URL = "https://res.cloudinary.com/dwoau4g1j/video/upload/v1778701931/ykmejlu0f2rwvjerc5ci.mp3";
  let publicAudio = new Audio(PUBLIC_AUDIO_URL);
  publicAudio.loop = true;
  publicAudio.volume = 0.3; // Increased slightly for better audibility
  publicAudio.preload = "auto";
  publicAudio.load();
  let publicAudioStarted = false;

  /* ═══════════════════════════════════════════════
     INIT FIREBASE
  ═══════════════════════════════════════════════ */
  function initFirebase() {
    try {
      if (!FIREBASE_CONFIG || FIREBASE_CONFIG.apiKey === "YOUR_API_KEY") {
        setBanner("⚠ Firebase not configured — uploads disabled. See firebase-config.js", "error");
        return;
      }
      firebase.initializeApp(FIREBASE_CONFIG);
      db = firebase.firestore();
      firebaseReady = true;
      setBanner("✓ Connected — uploads and gallery are live", "ok");
      listenToGallery();
    } catch (e) {
      console.error("Firebase init error:", e);
      setBanner("✕ Connection error — check firebase-config.js", "error");
    }
  }

  function setBanner(msg, type) {
    const b = document.getElementById("firebase-banner");
    const t = document.getElementById("firebase-banner-text");
    if (!b || !t) return;
    t.textContent = msg;
    b.className = "firebase-banner" + (type ? " " + type : "");
  }

  /* ═══════════════════════════════════════════════
     FIRESTORE REAL-TIME LISTENER
  ═══════════════════════════════════════════════ */
  function listenToGallery() {
    if (!db) return;
    const q = db.collection("media").orderBy("ts", "desc");
    q.onSnapshot(
      (snap) => {
        mediaItems = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        renderGallery();
      },
      (err) => {
        console.error("Firestore error:", err);
        setBanner("⚠ Gallery sync error — check Firestore rules", "error");
      }
    );
  }

  /* ═══════════════════════════════════════════════
     UPLOAD — Cloudinary for files, Firestore for metadata
  ═══════════════════════════════════════════════ */
  function handleFiles(files) {
    if (!firebaseReady) {
      alert("Cloud services are not configured. Please check firebase-config.js.");
      return;
    }
    [...files].forEach(uploadFile);
  }

  function uploadFile(file) {
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");
    if (!isImage && !isVideo) return;

    const queueEl = addQueueItem(Date.now(), file.name, isVideo ? "video" : "image");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    formData.append("folder", "birthday");

    const resourceType = isVideo ? "video" : "image";
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`;

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        const pct = Math.round((e.loaded / e.total) * 100);
        updateQueueProgress(queueEl, pct);
      }
    });

    xhr.addEventListener("load", async () => {
      if (xhr.status === 200) {
        try {
          const res = JSON.parse(xhr.responseText);
          const fileUrl = res.secure_url;
          await db.collection("media").add({
            url: fileUrl,
            type: isVideo ? "video" : "image",
            name: file.name,
            ts: firebase.firestore.FieldValue.serverTimestamp(),
          });
          markQueueDone(queueEl);
          setTimeout(() => queueEl.remove(), 3000);
        } catch (e) {
          console.error("Firestore save error:", e);
          markQueueError(queueEl, "Uploaded but failed to save");
        }
      } else {
        console.error("Cloudinary error:", xhr.responseText);
        markQueueError(queueEl, "Upload failed — try again");
      }
    });

    xhr.addEventListener("error", () => {
      markQueueError(queueEl, "Network error — check connection");
    });

    xhr.send(formData);
  }

  /* ── Queue UI helpers ── */
  function addQueueItem(id, name, type) {
    const q = document.getElementById("upload-queue");
    const el = document.createElement("div");
    el.className = "upload-item";
    el.dataset.uploadId = id;
    el.innerHTML = `
      <div class="upload-item-thumb" style="display:flex;align-items:center;justify-content:center;font-size:1.4rem">
        ${type === "video" ? "🎥" : "🖼"}
      </div>
      <div class="upload-item-info">
        <p class="upload-item-name">${escHtml(name)}</p>
        <div class="upload-progress-bar"><div class="upload-progress-fill" style="width:0%"></div></div>
        <p class="upload-item-status">Uploading…</p>
      </div>`;
    q.prepend(el);
    return el;
  }

  function updateQueueProgress(el, pct) {
    el.querySelector(".upload-progress-fill").style.width = pct + "%";
    el.querySelector(".upload-item-status").textContent = `Uploading… ${pct}%`;
  }

  function markQueueDone(el) {
    el.querySelector(".upload-progress-fill").style.width = "100%";
    const s = el.querySelector(".upload-item-status");
    s.textContent = "✓ Uploaded!";
    s.classList.add("upload-item-done");
  }

  function markQueueError(el, msg) {
    const s = el.querySelector(".upload-item-status");
    s.textContent = "✕ " + msg;
    s.style.color = "#cc7d7d";
  }

  /* ═══════════════════════════════════════════════
     GALLERY RENDER
  ═══════════════════════════════════════════════ */
  function renderGallery() {
    const grid = document.getElementById("gallery-grid");
    const empty = document.getElementById("gallery-empty");
    if (!grid) return;

    const filtered = currentFilter === "all"
      ? mediaItems
      : mediaItems.filter((m) => m.type === currentFilter);

    // Build lightbox-capable list
    lightboxItems = filtered;

    // Clear existing items (keep empty placeholder)
    [...grid.querySelectorAll(".gallery-item")].forEach((el) => el.remove());

    if (filtered.length === 0) {
      if (empty) empty.style.display = "block";
      return;
    }
    if (empty) empty.style.display = "none";

    filtered.forEach((item, idx) => {
      const el = buildGalleryItem(item, idx);
      grid.appendChild(el);
    });
  }

  function buildGalleryItem(item, idx) {
    const el = document.createElement("div");
    el.className = "gallery-item";
    el.dataset.index = idx;

    if (item.type === "video") {
      // Cloudinary thumbnail: inject image transformation to auto-generate a JPG poster frame
      const thumbUrl = item.url
        .replace('/video/upload/', '/video/upload/so_0,f_jpg,q_auto,w_600/')
        .replace(/\.[^/.]+$/, '.jpg');
      const img = document.createElement("img");
      img.src = thumbUrl;
      img.alt = item.name || "Memory Video";
      img.loading = "lazy";
      img.onerror = () => {
        // Fallback: try simpler URL format
        const simpleThumb = item.url.replace('/video/upload/', '/video/upload/f_jpg,so_0/').replace(/\.[^/.]+$/, '.jpg');
        if (img.src !== simpleThumb) {
          img.src = simpleThumb;
        } else {
          img.style.display = 'none';
          el.style.background = 'linear-gradient(135deg,#181818,#252525)';
          el.insertAdjacentHTML('afterbegin', '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:2.5rem">🎥</div>');
        }
      };
      el.appendChild(img);
      el.insertAdjacentHTML("beforeend", `<span class="video-badge">▶ Video</span>`);
    } else {
      const img = document.createElement("img");
      img.src = item.url;
      img.alt = item.name || "Memory";
      img.loading = "lazy";
      el.appendChild(img);
    }

    el.insertAdjacentHTML("beforeend", `
      <div class="gallery-item-overlay">
        <span class="gallery-item-type">${item.type === "video" ? "▶ Video" : "⊞ Photo"}</span>
      </div>
      <button class="gallery-item-delete" data-id="${item.id}" aria-label="Delete Image" title="Delete image">✕</button>
      <div class="gallery-watermark">✦ Aarya's 21st</div>`);

    const thumbImg = el.querySelector('img');
    const thumbUrl = thumbImg ? thumbImg.src : '';
    el.addEventListener("click", () => openLightbox(idx, thumbUrl));

    const deleteBtn = el.querySelector(".gallery-item-delete");
    if (deleteBtn) {
      // Use pointerdown to ensure it fires instantly even on touch devices
      deleteBtn.addEventListener("pointerdown", (e) => {
        e.preventDefault();
        e.stopPropagation(); // Don't trigger lightbox

        // Instant visual feedback
        deleteBtn.innerHTML = "⏳";
        deleteBtn.style.pointerEvents = "none";
        deleteBtn.style.background = "rgba(0,0,0,0.5)";

        // Delete from Firestore directly
        db.collection("media").doc(item.id).delete().then(() => {
          console.log("Memory deleted:", item.id);
          // Item will automatically disappear because of onSnapshot
        }).catch((err) => {
          console.error("Error deleting:", err);
          alert("Could not delete. Check connection.");
          // Revert button if failed
          deleteBtn.innerHTML = "✕";
          deleteBtn.style.pointerEvents = "auto";
          deleteBtn.style.background = "rgba(204,125,125,.85)";
        });
      });
      
      // Also prevent click from bubbling just in case
      deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
      });
    }

    return el;
  }

  /* ═══════════════════════════════════════════════
     LIGHTBOX
  ═══════════════════════════════════════════════ */
  function openLightbox(idx, thumbUrl) {
    lightboxIndex = idx;
    const lb = document.getElementById("lightbox");
    lb.style.display = "flex";
    document.body.style.overflow = "hidden";
    renderLightboxMedia(thumbUrl);
  }

  function renderLightboxMedia(thumbUrl) {
    const item = lightboxItems[lightboxIndex];
    if (!item) return;
    const wrap = document.getElementById("lightbox-media");
    wrap.innerHTML = "";

    // If we have a thumbnail from the grid, use it as an immediate placeholder
    if (item.type === "video") {
      const vid = document.createElement("video");
      const safeUrl = item.url.replace('/video/upload/', '/video/upload/f_auto,q_auto/');
      vid.src = safeUrl;
      vid.controls = true;
      vid.autoplay = true;
      vid.playsInline = true;
      vid.preload = "auto";
      
      // Use the thumbnail as the video poster so it shows instantly
      if (thumbUrl) vid.poster = thumbUrl;
      
      vid.onerror = () => { vid.src = item.url; };
      wrap.appendChild(vid);
    } else {
      const img = document.createElement("img");
      
      // Optimization: Show thumbnail first, then switch to high-res
      if (thumbUrl) {
        img.src = thumbUrl;
        img.style.filter = "blur(4px)"; // Slight blur for thumbnail
        const fullImg = new Image();
        fullImg.src = item.url;
        fullImg.onload = () => {
          img.src = item.url;
          img.style.filter = "none";
        };
      } else {
        img.src = item.url;
      }
      
      img.alt = item.name || "Memory";
      wrap.appendChild(img);
    }

    // Add watermark to lightbox too
    wrap.insertAdjacentHTML("beforeend", `<div class="gallery-watermark">✦ Aarya's 21st</div>`);

    const counter = document.getElementById("lightbox-counter");
    if (counter) counter.textContent = `${lightboxIndex + 1} / ${lightboxItems.length}`;
  }

  function closeLightbox() {
    const lb = document.getElementById("lightbox");
    lb.style.display = "none";
    document.body.style.overflow = "";
    const wrap = document.getElementById("lightbox-media");
    // Stop any playing video
    const vid = wrap ? wrap.querySelector("video") : null;
    if (vid) vid.pause();
    if (wrap) wrap.innerHTML = "";
  }

  /* ═══════════════════════════════════════════════
     PRIVATE ZONE
  ═══════════════════════════════════════════════ */
  function openPasswordModal() {
    const modal = document.getElementById("password-modal");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    setTimeout(() => document.getElementById("password-input")?.focus(), 100);
  }

  function closePasswordModal() {
    const modal = document.getElementById("password-modal");
    modal.style.display = "none";
    document.body.style.overflow = "";
    const err = document.getElementById("password-error");
    if (err) err.textContent = "";
    const inp = document.getElementById("password-input");
    if (inp) inp.value = "";
  }

  function checkPassword() {
    const inp = document.getElementById("password-input");
    const err = document.getElementById("password-error");
    if (!inp || !err) return;

    if (inp.value.trim() === SECRET) {
      closePasswordModal();
      unlockPrivateZone();
    } else {
      err.textContent = "Incorrect password. Try again.";
      inp.value = "";
      inp.focus();
      inp.style.borderColor = "#cc7d7d";
      setTimeout(() => { inp.style.borderColor = ""; }, 1500);
    }
  }

  function unlockPrivateZone() {
    const pub = document.getElementById("public-zone");
    const priv = document.getElementById("private-zone");
    if (!priv) return;

    // Inject content if not already done
    if (!priv.innerHTML.trim()) {
      priv.innerHTML = PRIVATE_HTML;
    }

    pub.style.display = "none";
    priv.style.display = "block";
    priv.removeAttribute("aria-hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
    sessionStorage.setItem("private_unlocked", "1");

    // Pause public music when entering private zone
    if (publicAudio) publicAudio.pause();

    // Bind close button
    const closeBtn = document.getElementById("private-close-btn");
    if (closeBtn) closeBtn.addEventListener("click", lockPrivateZone);

    // Ensure it starts from the beginning and plays
    privateAudio.currentTime = 0;
    const playPromise = privateAudio.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log("Private music started");
      }).catch(err => {
        console.log("Autoplay prevented, will play on first interaction", err);
        const playOnFirstClick = () => {
          privateAudio.play();
          window.removeEventListener('click', playOnFirstClick);
          window.removeEventListener('touchstart', playOnFirstClick);
        };
        window.addEventListener('click', playOnFirstClick);
        window.addEventListener('touchstart', playOnFirstClick);
      });
    }
  }

  function lockPrivateZone() {
    const pub = document.getElementById("public-zone");
    const priv = document.getElementById("private-zone");
    pub.style.display = "";
    priv.style.display = "none";
    priv.setAttribute("aria-hidden", "true");
    sessionStorage.removeItem("private_unlocked");
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Stop music
    if (privateAudio) {
      privateAudio.pause();
      privateAudio.currentTime = 0;
    }

    // Resume public music when returning to party
    if (publicAudio && publicAudioStarted) {
      publicAudio.play().catch(e => console.log("Could not resume public audio", e));
    }
  }

  /* ═══════════════════════════════════════════════
     QR CODE
  ═══════════════════════════════════════════════ */
  function generateQR() {
    const container = document.getElementById("qr-code-container");
    const urlEl = document.getElementById("current-url");
    if (!container) return;

    const url = window.location.href;
    if (urlEl) urlEl.textContent = url;

    if (typeof QRCode === "undefined") return;

    container.innerHTML = "";
    new QRCode(container, {
      text: url,
      width: 180,
      height: 180,
      colorDark: "#1a1a1a",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
    });

    const dlBtn = document.getElementById("download-qr");
    if (dlBtn) {
      dlBtn.addEventListener("click", () => {
        const canvas = container.querySelector("canvas");
        if (!canvas) return;
        const a = document.createElement("a");
        a.download = "aarya-birthday-qr.png";
        a.href = canvas.toDataURL();
        a.click();
      });
    }
  }

  /* ═══════════════════════════════════════════════
     BIRTHDAY COUNTER
  ═══════════════════════════════════════════════ */
  function initBirthdayCounter() {
    const birthday = new Date('2026-05-17T00:00:00+05:30');
    const el = document.getElementById('age-counter-time');
    const label = document.querySelector('.age-counter-label');
    if (!el) return;
    function tick() {
      const now = new Date();
      const diff = now - birthday;
      if (diff < 0) {
        const absDiff = Math.abs(diff);
        const d = Math.floor(absDiff / 86400000);
        const h = Math.floor((absDiff % 86400000) / 3600000);
        const m = Math.floor((absDiff % 3600000) / 60000);
        const s = Math.floor((absDiff % 60000) / 1000);
        if (label) label.textContent = 'birthday in';
        el.textContent = `${d}d ${h}h ${m}m ${s}s`;
      } else {
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        if (label) label.textContent = "you've been 21 for";
        el.textContent = `${d}d ${h}h ${m}m ${s}s`;
      }
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ═══════════════════════════════════════════════
     PETALS
  ═══════════════════════════════════════════════ */
  function spawnPetals() {
    const container = document.getElementById("petals");
    if (!container) return;
    const N = 22;
    for (let i = 0; i < N; i++) {
      const p = document.createElement("div");
      p.className = "petal";
      p.style.cssText = `
        left:${Math.random() * 100}%;
        animation-duration:${6 + Math.random() * 10}s;
        animation-delay:${-Math.random() * 14}s;
        width:${5 + Math.random() * 6}px;
        height:${6 + Math.random() * 7}px;
        opacity:${.2 + Math.random() * .3};
      `;
      container.appendChild(p);
    }
  }

  /* ═══════════════════════════════════════════════
     NAV SCROLL EFFECT
  ═══════════════════════════════════════════════ */
  function initNavScroll() {
    const nav = document.getElementById("navbar");
    const onScroll = () => {
      nav?.classList.toggle("scrolled", window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ═══════════════════════════════════════════════
     UTILITY
  ═══════════════════════════════════════════════ */
  function escHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /* ═══════════════════════════════════════════════
     EVENT BINDINGS
  ═══════════════════════════════════════════════ */
  function bindEvents() {
    /* Upload zone */
    const zone = document.getElementById("upload-zone");
    const fileInput = document.getElementById("file-input");
    const uploadTrigger = document.getElementById("upload-trigger");

    if (zone) {
      zone.addEventListener("click", (e) => {
        if (!e.target.classList.contains("upload-trigger-btn")) return;
        fileInput?.click();
      });
      zone.addEventListener("dragover", (e) => { e.preventDefault(); zone.classList.add("drag-over"); });
      zone.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
      zone.addEventListener("drop", (e) => {
        e.preventDefault();
        zone.classList.remove("drag-over");
        handleFiles(e.dataTransfer.files);
      });
      zone.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") fileInput?.click();
      });
    }

    if (fileInput) fileInput.addEventListener("change", (e) => handleFiles(e.target.files));

    /* Gallery filters */
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentFilter = btn.dataset.filter || "all";
        renderGallery();
      });
    });

    /* Unlock buttons */
    const unlockBtn = document.getElementById("unlock-btn");
    const navUnlock = document.getElementById("nav-unlock-btn");
    const mobileUnlock = document.getElementById("mobile-unlock-btn");
    if (unlockBtn) unlockBtn.addEventListener("click", openPasswordModal);
    if (navUnlock) navUnlock.addEventListener("click", openPasswordModal);
    if (mobileUnlock) mobileUnlock.addEventListener("click", () => {
      document.getElementById("mobile-menu")?.classList.remove("open");
      openPasswordModal();
    });

    /* Password modal */
    const modalClose = document.getElementById("modal-close");
    const submitPwd = document.getElementById("submit-password");
    const pwdInput = document.getElementById("password-input");
    const modalOverlay = document.getElementById("password-modal");

    if (modalClose) modalClose.addEventListener("click", closePasswordModal);
    if (submitPwd) submitPwd.addEventListener("click", checkPassword);
    if (pwdInput) pwdInput.addEventListener("keydown", (e) => { if (e.key === "Enter") checkPassword(); });
    if (modalOverlay) {
      modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closePasswordModal();
      });
    }

    /* Lightbox */
    const lb = document.getElementById("lightbox");
    const lbClose = document.getElementById("lightbox-close");
    const lbPrev = document.getElementById("lightbox-prev");
    const lbNext = document.getElementById("lightbox-next");
    const lbDl = document.getElementById("lightbox-download");

    if (lbClose) lbClose.addEventListener("click", closeLightbox);
    if (lbPrev) lbPrev.addEventListener("click", () => {
      lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
      renderLightboxMedia();
    });
    if (lbNext) lbNext.addEventListener("click", () => {
      lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
      renderLightboxMedia();
    });
    if (lbDl) lbDl.addEventListener("click", () => {
      const item = lightboxItems[lightboxIndex];
      if (!item) return;
      const a = document.createElement("a");
      a.href = item.url;
      a.download = item.name || "memory";
      a.target = "_blank";
      a.click();
    });
    if (lb) lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });

    /* Keyboard nav */
    document.addEventListener("keydown", (e) => {
      const lb = document.getElementById("lightbox");
      if (lb && lb.style.display !== "none") {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") {
          lightboxIndex = (lightboxIndex - 1 + lightboxItems.length) % lightboxItems.length;
          renderLightboxMedia();
        }
        if (e.key === "ArrowRight") {
          lightboxIndex = (lightboxIndex + 1) % lightboxItems.length;
          renderLightboxMedia();
        }
        return;
      }
      const modal = document.getElementById("password-modal");
      if (modal && modal.style.display !== "none" && e.key === "Escape") closePasswordModal();
    });

    /* Mobile nav hamburger */
    const hamburger = document.getElementById("nav-hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    if (hamburger && mobileMenu) {
      hamburger.addEventListener("click", () => mobileMenu.classList.toggle("open"));
    }
    document.querySelectorAll(".mobile-link").forEach((a) => {
      a.addEventListener("click", () => mobileMenu?.classList.remove("open"));
    });
  }

  /* ═══════════════════════════════════════════════
     BOOT
  ═══════════════════════════════════════════════ */
  document.addEventListener("DOMContentLoaded", () => {
    spawnPetals();
    initNavScroll();
    bindEvents();
    generateQR();
    initFirebase();
    initBirthdayCounter();

    // Restore session if already unlocked
    if (sessionStorage.getItem("private_unlocked") === "1") {
      unlockPrivateZone();
    } else {
      // Background music for main page — starts on first interaction
      const startPublicMusic = () => {
        if (publicAudioStarted || sessionStorage.getItem("private_unlocked") === "1") return;
        publicAudio.play().then(() => {
          publicAudioStarted = true;
          console.log("Main page music started");
        }).catch(err => console.log("Audio play blocked", err));
        
        // Remove listeners after first success
        window.removeEventListener('click', startPublicMusic);
        window.removeEventListener('touchstart', startPublicMusic);
      };
      window.addEventListener('click', startPublicMusic);
      window.addEventListener('touchstart', startPublicMusic);
    }
  });
})();
