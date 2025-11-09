// ✅ Modern, silent PWA install handler
// Removes the custom floating button — uses native prompt automatically

let deferredPrompt = null;

// Listen for the install prompt event
window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent the default browser mini-infobar
  e.preventDefault();

  // Save event for triggering later (if needed)
  deferredPrompt = e;

  console.log("📲 PWA install prompt ready");

  // You can choose to automatically trigger it, or let the browser handle
  // Uncomment the line below if you want to auto-prompt the user
  // deferredPrompt.prompt();
});

// Optional: Listen for successful app installation
window.addEventListener("appinstalled", () => {
  console.log("✅ NoteZen successfully installed as PWA!");
  deferredPrompt = null;
});
