const sectionsContainer = document.getElementById("sections-container");
const addSectionBtn = document.getElementById("add-section-btn");

let sectionCount = 0;

// Function to create a new section card
function createSection() {
  sectionCount++;
  
  const sectionCard = document.createElement("div");
  sectionCard.className = "section-card";

  sectionCard.innerHTML = `
    <h2>Section ${sectionCount}</h2>
    <p>All the necessary information about this section. This can be anything like travel section, hotel or any activity.</p>
    <input type="text" placeholder="Date Range: xxx to yyy" />
    <input type="text" placeholder="Budget of this section" />
  `;

  sectionsContainer.appendChild(sectionCard);
}

// Initial sections (3 by default)
for (let i = 0; i < 3; i++) {
  createSection();
}

// Add new section on button click
addSectionBtn.addEventListener("click", () => {
  createSection();
});
