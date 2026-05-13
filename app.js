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

    el.addEventListener("click", () => openLightbox(idx));

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
  function openLightbox(idx) {
    lightboxIndex = idx;
    const lb = document.getElementById("lightbox");
    lb.style.display = "flex";
    document.body.style.overflow = "hidden";
    renderLightboxMedia();
  }

  function renderLightboxMedia() {
    const item = lightboxItems[lightboxIndex];
    if (!item) return;
    const wrap = document.getElementById("lightbox-media");
    wrap.innerHTML = "";

    if (item.type === "video") {
      const vid = document.createElement("video");
      // Use Cloudinary's f_auto transformation to auto-convert to browser-compatible format
      // This fixes .MOV and other non-web formats from iPhones
      const safeUrl = item.url.replace('/video/upload/', '/video/upload/f_auto,q_auto/');
      vid.src = safeUrl;
      vid.controls = true;
      vid.autoplay = true;
      vid.playsInline = true;
      vid.preload = "auto";
      // Fallback to original URL if transformation fails
      vid.onerror = () => { vid.src = item.url; };
      wrap.appendChild(vid);
    } else {
      const img = document.createElement("img");
      img.src = item.url;
      img.alt = item.name || "Memory";
      wrap.appendChild(img);
    }

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
     STAR MAP
  ═══════════════════════════════════════════════ */
  function openStarMap() {
    const modal = document.getElementById('starmap-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    const canvas = document.getElementById('starmap-canvas');
    if (canvas && !canvas.dataset.rendered) {
      canvas.dataset.rendered = '1';
      setTimeout(() => renderStarMap(canvas), 50);
    }
  }

  function closeStarMap() {
    const modal = document.getElementById('starmap-modal');
    if (!modal) return;
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  function renderStarMap(canvas) {
    const W = Math.min(canvas.parentElement.offsetWidth, 820) * window.devicePixelRatio || 820;
    const H = Math.round(W * 0.6);
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // Sky gradient
    const sky = ctx.createRadialGradient(W*.5,H*.3,0, W*.5,H*.6,W*.9);
    sky.addColorStop(0, '#0d1b3e');
    sky.addColorStop(0.5, '#070e1e');
    sky.addColorStop(1, '#020508');
    ctx.fillStyle = sky;
    ctx.fillRect(0,0,W,H);

    // Milky way haze
    const mw = ctx.createLinearGradient(0,H*.2,W,H*.8);
    mw.addColorStop(0,'rgba(80,100,170,0)');
    mw.addColorStop(.35,'rgba(90,110,180,0.06)');
    mw.addColorStop(.5,'rgba(110,130,200,0.09)');
    mw.addColorStop(.65,'rgba(90,110,180,0.06)');
    mw.addColorStop(1,'rgba(80,100,170,0)');
    ctx.fillStyle = mw;
    ctx.fillRect(0,0,W,H);

    // Random background stars
    const rng = () => { let s=0; for(let i=0;i<6;i++) s+=Math.random(); return s/6; };
    for (let i=0; i<320; i++) {
      const x=Math.random()*W, y=Math.random()*H;
      const r=Math.random()*0.9+0.15;
      const b=rng()*0.55+0.08;
      ctx.beginPath();
      ctx.arc(x,y,r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${200+Math.floor(Math.random()*55)},${210+Math.floor(Math.random()*45)},255,${b})`;
      ctx.fill();
    }

    // Constellation data (normalized 0-1 coords)
    const cons = [
      { name:'Ursa Major', col:[190,210,245],
        stars:[
          {x:.12,y:.13,r:1.6,n:'Dubhe'},{x:.17,y:.20,r:1.4,n:'Merak'},
          {x:.24,y:.21,r:1.2},{x:.25,y:.13,r:1.0},
          {x:.32,y:.10,r:1.5,n:'Alioth'},{x:.39,y:.08,r:1.4,n:'Mizar'},
          {x:.45,y:.12,r:1.6,n:'Alkaid'}
        ],
        lines:[[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]]
      },
      { name:'Leo', col:[240,220,170],
        stars:[
          {x:.49,y:.30,r:2.8,n:'Regulus',glow:true},{x:.44,y:.20,r:1.2},
          {x:.42,y:.25,r:1.0},{x:.51,y:.21,r:1.4,n:'Algieba'},
          {x:.57,y:.22,r:1.2},{x:.63,y:.28,r:1.6,n:'Denebola'},{x:.57,y:.31,r:1.0}
        ],
        lines:[[0,2],[2,1],[1,3],[3,4],[4,5],[5,6],[6,0]]
      },
      { name:'Boötes', col:[255,200,140],
        stars:[
          {x:.72,y:.36,r:3.2,n:'Arcturus',glow:true},{x:.70,y:.20,r:1.3,n:'Nekkar'},
          {x:.77,y:.26,r:1.2,n:'Izar'},{x:.70,y:.41,r:1.1},
          {x:.64,y:.22,r:1.0,n:'Seginus'},{x:.78,y:.33,r:1.0}
        ],
        lines:[[0,1],[0,2],[0,3],[1,4],[2,5],[5,0]]
      },
      { name:'Virgo', col:[200,218,255],
        stars:[
          {x:.63,y:.58,r:2.6,n:'Spica',glow:true},{x:.59,y:.44,r:1.2,n:'Porrima'},
          {x:.57,y:.36,r:1.1,n:'Vindemiatrix'},{x:.67,y:.52,r:1.0},{x:.52,y:.47,r:1.0}
        ],
        lines:[[0,1],[1,2],[1,3],[1,4]]
      },
      { name:'Scorpius', col:[255,175,155],
        stars:[
          {x:.86,y:.60,r:2.8,n:'Antares',glow:true},{x:.80,y:.54,r:1.2},
          {x:.82,y:.57,r:1.0},{x:.88,y:.68,r:1.1},{x:.91,y:.74,r:1.3,n:'Shaula'},{x:.89,y:.72,r:1.0}
        ],
        lines:[[1,2],[2,0],[0,3],[3,5],[5,4]]
      }
    ];

    // Draw constellation lines
    cons.forEach(con => {
      const [r,g,b] = con.col;
      ctx.save();
      ctx.strokeStyle = `rgba(${r},${g},${b},0.18)`;
      ctx.lineWidth = W > 600 ? 0.7 : 0.5;
      ctx.setLineDash([4,7]);
      con.lines.forEach(([a,bIdx]) => {
        const sA = con.stars[a], sB = con.stars[bIdx];
        ctx.beginPath();
        ctx.moveTo(sA.x*W, sA.y*H);
        ctx.lineTo(sB.x*W, sB.y*H);
        ctx.stroke();
      });
      ctx.restore();
    });

    // Draw stars
    cons.forEach(con => {
      const [r,g,b] = con.col;
      con.stars.forEach(star => {
        const sx=star.x*W, sy=star.y*H, sr=star.r*(W/820);
        if (star.glow) {
          const gl = ctx.createRadialGradient(sx,sy,0,sx,sy,sr*10);
          gl.addColorStop(0,`rgba(${r},${g},${b},0.45)`);
          gl.addColorStop(1,`rgba(${r},${g},${b},0)`);
          ctx.fillStyle=gl;
          ctx.beginPath(); ctx.arc(sx,sy,sr*10,0,Math.PI*2); ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(sx,sy,sr,0,Math.PI*2);
        ctx.fillStyle = `rgba(${r},${g},${b},${star.glow?1:0.85})`;
        ctx.fill();
        if (star.n) {
          ctx.fillStyle = `rgba(${r},${g},${b},0.38)`;
          ctx.font = `${W>500?10:8}px Jost,sans-serif`;
          ctx.fillText(star.n, sx+sr+4, sy+4);
        }
      });
      // Constellation label
      const first = con.stars[0];
      ctx.fillStyle = `rgba(${con.col[0]},${con.col[1]},${con.col[2]},0.28)`;
      ctx.font = `italic ${W>500?9:7}px 'Cormorant Garamond',serif`;
      ctx.fillText(con.name, first.x*W, first.y*H - 12*(W/820));
    });

    // Horizon glow at bottom
    const horiz = ctx.createLinearGradient(0,H*.72,0,H);
    horiz.addColorStop(0,'rgba(50,80,160,0)');
    horiz.addColorStop(1,'rgba(20,40,100,0.18)');
    ctx.fillStyle=horiz;
    ctx.fillRect(0,0,W,H);
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

    /* Star map */
    const navStar = document.getElementById('nav-starmap-btn');
    const mobileStar = document.getElementById('mobile-starmap-btn');
    const starmapClose = document.getElementById('starmap-close');
    const starmapModal = document.getElementById('starmap-modal');
    if (navStar) navStar.addEventListener('click', openStarMap);
    if (mobileStar) mobileStar.addEventListener('click', () => {
      mobileMenu?.classList.remove('open');
      openStarMap();
    });
    if (starmapClose) starmapClose.addEventListener('click', closeStarMap);
    if (starmapModal) starmapModal.addEventListener('click', e => { if (e.target === starmapModal) closeStarMap(); });

    /* Escape closes star map too */
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && starmapModal && starmapModal.style.display !== 'none') closeStarMap();
    }, true);
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
    }
  });
})();
