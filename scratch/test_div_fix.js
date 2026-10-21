const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `        </div>
      </div>

        </div>
      </div>
      
      <!-- Section Title for Chapter Tests (20-20 Standard) -->`;

const replacement = `        </div>
      </div>
      
      <!-- Sectional & Chapter-Wise Practice Tests Section -->
      <div id="sectionalTestsSection" class="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t-2 border-stone-200/90">
      
      <!-- Section Title for Chapter Tests (20-20 Standard) -->`;

const endTarget = `          <button onclick="openPreTestInstructions(6)" class="w-full mt-4 py-2 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs transition border border-icai-gold/30">
            Attempt 20-20 Test (20 Qs • 15 Mins)
          </button>
        </div>

      </div>
    </div>

    <!-- ==================== VIEW 2: IMAGE 2 - PRE-TEST INSTRUCTIONS (OUR THEME) ==================== -->`;

const endReplacement = `          <button onclick="openPreTestInstructions(6)" class="w-full mt-4 py-2 bg-icai-navy hover:bg-icai-dark text-amber-200 font-bold rounded-lg text-xs transition border border-icai-gold/30">
            Attempt 20-20 Test (20 Qs • 15 Mins)
          </button>
        </div>

      </div>
      </div>
    </div>

    <!-- ==================== VIEW 2: IMAGE 2 - PRE-TEST INSTRUCTIONS (OUR THEME) ==================== -->`;

const modified = html.replace(target, replacement).replace(endTarget, endReplacement);

const lines = modified.split('\n');
let depth = 0;
for (let i = 413; i < 835; i++) {
  const line = lines[i];
  if (!line) continue;
  const opens = (line.match(/<div\b/g) || []).length;
  const closes = (line.match(/<\/div>/g) || []).length;
  depth += opens - closes;
  if (depth <= 2 || i > 815) {
    console.log(`L${i+1} [depth=${depth} (+${opens}, -${closes})]: ${line.trim().slice(0, 70)}`);
  }
}

