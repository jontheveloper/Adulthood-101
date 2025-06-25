  const checkboxes = document.querySelectorAll('.check-item');
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const clearButton = document.getElementById('clear-button');
  const container = document.getElementById('progress-container');

  // Load saved checkbox states
  checkboxes.forEach((checkbox, index) => {
    const saved = localStorage.getItem(`checkbox-${index}`);
    checkbox.checked = saved === 'true';
  });

  function updateProgress() {
    const total = checkboxes.length;
    const checked = [...checkboxes].filter(checkbox => checkbox.checked).length;
    const percent = Math.round((checked / total) * 100);

    progressBar.value = percent;
    progressText.textContent = `You are ${percent}% ready to be an adult`;

    // Set progress color level
    container.dataset.progress =
      percent < 40 ? 'low' :
      percent < 80 ? 'mid' : 'high';

    // Save checkbox states
    checkboxes.forEach((checkbox, index) => {
      localStorage.setItem(`checkbox-${index}`, checkbox.checked);
    });
  }

  // Listen for changes
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
  });

  // Clear all checkboxes and localStorage
  clearButton.addEventListener('click', () => {
    checkboxes.forEach((checkbox, index) => {
      checkbox.checked = false;
      localStorage.removeItem(`checkbox-${index}`);
    });
    updateProgress();
  });

  // Initialize progress on load
  updateProgress();

