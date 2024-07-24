document.addEventListener("DOMContentLoaded", function () {
    fetch("./data/faq.json")
      .then((response) => response.json())
      .then((data) => {
        const faqAccordion = document.getElementById("faqAccordion");
        const categories = [...new Set(data.map((faq) => faq.category))];
        
        categories.forEach((category) => {
          const categoryTitle = document.createElement("h2");
          categoryTitle.className = "category-title";
          categoryTitle.textContent = category;
          faqAccordion.appendChild(categoryTitle);
  
          const categoryContainer = document.createElement("div");
          categoryContainer.className = "category-container";
  
          data.filter((faq) => faq.category === category).forEach((faq, index) => {
              const uniqueId = `${category.replace(/\s+/g, "")}${index}`;
  
              const card = document.createElement("div");
              card.className = "card";
  
              const cardHeader = document.createElement("div");
              cardHeader.className = "card-header";
              cardHeader.id = `heading${uniqueId}`;
  
              const h2 = document.createElement("h2");
              h2.className = "mb-0";
  
              const button = document.createElement("button");
              button.className = "btn btn-link text-white collapsed";
              button.type = "button";
              button.setAttribute("data-toggle", "collapse");
              button.setAttribute("data-target", `#collapse${uniqueId}`);
              button.setAttribute("aria-expanded", "false");
              button.setAttribute("aria-controls", `collapse${uniqueId}`);
              button.innerHTML = `${faq.question} <span class="arrow">&gt;</span>`;
  
              h2.appendChild(button);
              cardHeader.appendChild(h2);
              card.appendChild(cardHeader);
  
              const collapse = document.createElement("div");
              collapse.id = `collapse${uniqueId}`;
              collapse.className = "collapse collapse-faq";
              collapse.setAttribute("aria-labelledby", `heading${uniqueId}`);
  
              const cardBody = document.createElement("div");
              cardBody.className = "card-body text-gray";
              cardBody.textContent = faq.answer;
  
              collapse.appendChild(cardBody);
              card.appendChild(collapse);
  
              categoryContainer.appendChild(card);
            });
  
          faqAccordion.appendChild(categoryContainer);
        });
        
        document.getElementById("expandAll").addEventListener("click", () => {
          $(".collapse-faq").collapse("show");
        });
  
        document.getElementById("collapseAll").addEventListener("click", () => {
          $(".collapse-faq").collapse("hide");
        });
      })
      .catch((error) => console.error("Error fetching FAQ data:", error));
  });
  