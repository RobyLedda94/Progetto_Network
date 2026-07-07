document.addEventListener("DOMContentLoaded", () => {

  const items = document.querySelectorAll(".obj-item");
  const total = items.length;

  let doneCount = 0;
  let inProgressCount = 0;

  items.forEach((item) => {
    if (item.classList.contains("status-done")) doneCount++;
    if (item.classList.contains("status-inprogress")) inProgressCount++;
  });

  const percent = total > 0
    ? Math.round(((doneCount + inProgressCount * 0.5) / total) * 100)
    : 0;

  const progressBar = document.getElementById("progressBar");
  const progressLabel = document.getElementById("progressLabel");

  if (progressBar) progressBar.style.width = percent + "%";
  if (progressLabel) {
    progressLabel.textContent =
      `${percent}% completato — ${doneCount} completati, ${inProgressCount} in corso, ${total - doneCount - inProgressCount} da fare (su ${total} totali)`;
  }

  const expandBtn = document.getElementById("expandAll");
  const collapseBtn = document.getElementById("collapseAll");

  if (expandBtn) {
    expandBtn.addEventListener("click", () => {
      items.forEach((item) => item.setAttribute("open", ""));
    });
  }

  if (collapseBtn) {
    collapseBtn.addEventListener("click", () => {
      items.forEach((item) => item.removeAttribute("open"));
    });
  }

});