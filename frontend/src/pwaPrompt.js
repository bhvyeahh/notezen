let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const btn = document.createElement("button");
  btn.textContent = "📱 Add NoteZen to Home Screen";
  Object.assign(btn.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "12px 18px",
    background: "linear-gradient(135deg, #4f46e5, #9333ea)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "600",
    cursor: "pointer",
    zIndex: "10000",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  });

  document.body.appendChild(btn);

  btn.addEventListener("click", async () => {
    btn.remove();
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    console.log("Install choice:", choice.outcome);
    deferredPrompt = null;
  });
});
