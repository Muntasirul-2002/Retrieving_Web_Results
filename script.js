
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const accordion = document.getElementById("accordion");

    // Updated function to toggle description visibility
    function toggleDescription(event) {
      const targetId = event.target.getAttribute("data-bs-target");
      const description = document.querySelector(targetId);

      if (description.classList.contains("show")) {
        event.target.innerText = "View More"; // Change button text to "View More" when hiding the description
      } else {
        event.target.innerText = "Hide"; // Change button text to "Hide" when showing the description
      }
    }

    searchButton.addEventListener("click", async () => {
      const searchTerm = searchInput.value;

      try {
        const response = await fetch(
          `http://localhost:3000/search?keyword=${searchTerm}`
        );
        if (response.ok) {
          const data = await response.json();

          accordion.innerHTML = ""; // Clear previous results

          data.forEach((result, index) => {
            // Create accordion item
            const accordionItem = document.createElement("div");
            accordionItem.classList.add("card");

            // Create card header
            const cardHeader = document.createElement("div");
            cardHeader.classList.add("card-header");
            cardHeader.setAttribute("id", `heading${index}`);

            // Create button to toggle the accordion item
            const toggleButton = document.createElement("button");
            toggleButton.classList.add("btn", "btn-link");
            toggleButton.setAttribute("type", "button");
            toggleButton.setAttribute("data-bs-toggle", "collapse");
            toggleButton.setAttribute("data-bs-target", `#collapse${index}`);
            toggleButton.setAttribute("aria-expanded", "false");
            toggleButton.setAttribute("aria-controls", `collapse${index}`);
            toggleButton.innerText = result.title;

            // Append the button to the card header
            cardHeader.appendChild(toggleButton);

            // Create collapsible content
            const collapsibleContent = document.createElement("div");
            collapsibleContent.classList.add("collapse");
            collapsibleContent.setAttribute("id", `collapse${index}`);

            // Create card body for the description (abstract)
            const cardBody = document.createElement("div");
            cardBody.classList.add("card-body");
            cardBody.innerText = result.abstract;

            // Append the card body to the collapsible content
            collapsibleContent.appendChild(cardBody);

            // Append the card header and collapsible content to the accordion item
            accordionItem.appendChild(cardHeader);
            accordionItem.appendChild(collapsibleContent);

            // Append the accordion item to the accordion
            accordion.appendChild(accordionItem);
          });

          accordion.scrollIntoView({ behavior: "smooth" });
        } else {
          console.error("Error fetching data from the API");
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    });
  });