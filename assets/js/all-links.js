async function loadAndDisplayLinks() {
        try {
          const paths = ["./links.json", "/links.json", "../links.json"];
          let links = null;

          for (const path of paths) {
            try {
              const response = await fetch(path);
              if (response.ok) {
                links = await response.json();
                break;
              }
            } catch (e) {
              continue;
            }
          }

          if (!links) {
            throw new Error("Could not load links.json");
          }

          document.getElementById("loading").style.display = "none";
          document.getElementById("links-container").style.display = "block";

          const gridEl = document.getElementById("links-grid");
          const countEl = document.getElementById("link-count");
          const currentDomain =
            window.location.origin +
            window.location.pathname
              .replace("all-links.html", "")
              .replace(/\/$/, "");

          const linkEntries = Object.entries(links);
          countEl.textContent = linkEntries.length;

          linkEntries.forEach(([shortCode, targetUrl]) => {
            const card = document.createElement("div");
            card.className = "link-card";

            const shortUrl = `${currentDomain}/${shortCode}`;

            card.innerHTML = `
              <div class="short-url">${shortUrl}</div>
              <div class="target-url">→ ${targetUrl}</div>
              <a href="/${shortCode}" class="visit-btn">Visit URL</a>
              <a href="${targetUrl}" class="visit-btn">Direct Link</a>
            `;

            gridEl.appendChild(card);
          });
        } catch (error) {
          console.error("Error loading links:", error);
          document.getElementById("loading").style.display = "none";
          document.getElementById("error").style.display = "block";
        }
      }

      loadAndDisplayLinks();
