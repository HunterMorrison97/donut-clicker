var donutCount = 0;
var autoClickerCount = 0;
var autoClickerBaseCost = 100;
var autoClickerCostMultiplier = 1.1;
var autoClickerInterval;

function makeDonut() {
  donutCount++;
  updateDonutCount();
  updatePurchaseButton();
}

function getDonutCount() {
  return donutCount;
}

function getAutoClickerCount() {
  return autoClickerCount;
}

function addAutoClicker() {
  autoClickerCount++;
  updateAutoClickerCount();
  updateAutoClickerCost();
  updatePurchaseButton();

  if (autoClickerCount === 1) {
    startAutoClicker();
  }
}

function calculateAutoClickerCost() {
  return Math.floor(autoClickerBaseCost * Math.pow(autoClickerCostMultiplier, autoClickerCount));
}

function purchaseAutoClicker() {
  var autoClickerCost = calculateAutoClickerCost();
  if (donutCount >= autoClickerCost) {
    donutCount -= autoClickerCost;
    addAutoClicker();
    updateDonutCount();
    updateAutoClickerCount();
    activateAutoClickers();
  }
}

function activateAutoClickers() {
  var autoClickerDonuts = autoClickerCount;
  donutCount += autoClickerDonuts;
  updateDonutCount();
}

function startAutoClicker() {
  autoClickerInterval = setInterval(function() {
    activateAutoClickers();
  }, 1000);
}

function stopAutoClicker() {
  clearInterval(autoClickerInterval);
}

function updateDonutCount() {
  document.getElementById("donutCount").textContent = donutCount;
}

function updateAutoClickerCount() {
  document.getElementById("autoClickerCount").textContent = autoClickerCount;
}

function updateAutoClickerCost() {
  document.getElementById("autoClickerCost").textContent = calculateAutoClickerCost();
}

function updatePurchaseButton() {
  var autoClickerCost = calculateAutoClickerCost();
  var purchaseButton = document.getElementById("purchaseButton");
  
  if (donutCount >= autoClickerCost) {
    purchaseButton.disabled = false;
    purchaseButton.classList.remove("disabled");
  } else {
    purchaseButton.disabled = true;
    purchaseButton.classList.add("disabled");
  }
}

function resetGame() {
  donutCount = 0;
  autoClickerCount = 0;
  stopAutoClicker();
  updateDonutCount();
  updateAutoClickerCount();
  updateAutoClickerCost();
  updatePurchaseButton();
}

document.getElementById("makeDonutButton").addEventListener("click", makeDonut);
document.getElementById("purchaseButton").addEventListener("click", purchaseAutoClicker);
document.getElementById("resetButton").addEventListener("click", resetGame);

// Automatically start auto clickers if already purchased
if (autoClickerCount > 0) {
  startAutoClicker();
}

document.addEventListener("DOMContentLoaded", function() {
  const dropdowns = document.querySelectorAll(".dropdown-content");

  dropdowns.forEach(function(dropdown) {
    const parentLink = dropdown.parentNode.querySelector("a");

    parentLink.addEventListener("click", function(e) {
      e.preventDefault();
      toggleDropdown(dropdown);
    });

    parentLink.addEventListener("blur", function() {
      closeDropdown(dropdown);
    });
  });

  function toggleDropdown(dropdown) {
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
  }

  function closeDropdown(dropdown) {
    dropdown.style.display = "none";
  }
});

function openModal() {
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}