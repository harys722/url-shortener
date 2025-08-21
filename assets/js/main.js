async function loadLinksAndRedirect() {
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
            throw new Error("Could not load links.json from any path");
          }

          const path = window.location.pathname;
          const segments = path.split("/").filter((segment) => segment !== "");
          const shortCode = segments[segments.length - 1];

          const statusEl = document.getElementById("status");
          const errorEl = document.getElementById("error");

          if (!shortCode) {
            window.location.href = "/";
            return;
          }

          if (links[shortCode]) {
            const targetUrl = links[shortCode];
            statusEl.innerHTML = `Taking you to: <br><span class="gradient-text">${targetUrl}</span>`;

            setTimeout(() => {
              window.location.href = targetUrl;
            }, 1000);
          } else {
            document.querySelector(".spinner").style.display = "none";
            statusEl.style.display = "none";
            errorEl.style.display = "block";
            document.title = "404 - Link Not Found";
          }
        } catch (error) {
          console.error("Error:", error);
          document.querySelector(".spinner").style.display = "none";
          document.getElementById("status").innerHTML = `
                    <div style="color: #e53e3e; font-weight: 600;">
                        <strong>Error loading links</strong><br>
                        <small style="color: #a0aec0;">Check console for details</small>
                    </div>
                `;
        }
      }

      loadLinksAndRedirect();
