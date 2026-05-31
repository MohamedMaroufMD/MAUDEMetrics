# MAUDEMetrics

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.8%2B-blue.svg)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/docker-ready-blue.svg)](https://www.docker.com/)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.16691960.svg)](https://doi.org/10.5281/zenodo.16691960)
[![status](https://joss.theoj.org/papers/ff734337f3acba932276d552f9119136/status.svg)](https://joss.theoj.org/papers/ff734337f3acba932276d52f9119136)

**MAUDEMetrics** is a user-friendly tool for analyzing and reporting on medical device adverse events using data from the FDA's Manufacturer and User Facility Device Experience (MAUDE) Database via the openFDA API.  
It enables clinicians, researchers, and quality teams to quickly fetch, explore, and export device event data for further analysis.

> ⚠️ **Disclaimer:** This tool is for research and educational purposes only. Not for clinical decision-making.

---

## Download the Desktop App

> **No installation required.** Download, open, and start analyzing FDA data in seconds.

<table>
  <tr>
    <td align="center" width="50%">
      <h3>macOS</h3>
      <a href="https://github.com/MohamedMaroufMD/MAUDEMetrics/releases/latest/download/MAUDEMetrics-arm64.dmg">
        <img width="320" src="https://img.shields.io/badge/Download-Apple%20Silicon-black?style=for-the-badge&logo=apple&logoColor=white&logoWidth=16" alt="Download for Apple Silicon"/>
      </a>
      <br/>
      <a href="https://github.com/MohamedMaroufMD/MAUDEMetrics/releases/latest/download/MAUDEMetrics-x64.dmg">
        <img width="320" src="https://img.shields.io/badge/Download-Intel%20Mac-black?style=for-the-badge&logo=apple&logoColor=white&logoWidth=16" alt="Download for Intel Mac"/>
      </a>
      <br/><sub>macOS · Native Apple Silicon and Intel builds</sub>
    </td>
    <td align="center" width="50%">
      <h3>Windows</h3>
      <a href="https://github.com/MohamedMaroufMD/MAUDEMetrics/releases/latest/download/MAUDEMetrics-Setup.exe">
        <img width="320" src="https://img.shields.io/badge/Download-Windows%20App-0078D4?style=for-the-badge&logo=windows&logoColor=white" alt="Download for Windows"/>
      </a>
      <br/><sub>Windows 10/11 · 64-bit</sub>
    </td>
  </tr>
</table>

> **Tip:** The app **automatically checks for updates** from GitHub Releases. When a new version is available, you'll be prompted to update in one click — no need to re-download manually.

### Installation Steps

> ⚠️ **Why do I get a security warning?** MAUDEMetrics is free and open-source. Because it is not distributed through the Mac App Store or a paid developer certificate, macOS and Windows will show a one-time security prompt. This is completely normal for independent open-source software. The steps below walk you through it.

---

####  macOS — Step by Step

**Step 1 — Figure out your Mac chip**
- Click the  Apple menu (top-left) → **About This Mac**
- If it says **Apple M1 / M2 / M3 / M4** → download **Apple Silicon**
- If it says **Intel** → download **Intel Mac**

**Step 2 — Open the installer**
- Open the downloaded `.dmg` file from your Downloads folder
- Drag the **MAUDEMetrics** icon into the **Applications** folder shortcut

**Step 3 — Handle the macOS security warning**

When you first open the app you may see one of these messages:

**Message A: *"MAUDEMetrics" cannot be opened because it is from an unidentified developer.***
> Right-click (or Control-click) the app icon → click **Open** → click **Open** again in the dialog that appears. You only need to do this once.

**Message B: *"MAUDEMetrics" is damaged and can't be opened. You should move it to the Trash.***
> This is a stricter macOS warning for apps downloaded from the internet. To fix it:
> 1. Open **Terminal** (search for it in Spotlight with ⌘Space)
> 2. Paste this command and press **Enter**:
> ```
> xattr -rd com.apple.quarantine /Applications/MAUDEMetrics.app
> ```
> 3. Close Terminal and double-click the app — it will open normally.

---

#### Windows — Step by Step

**Step 1 — Download and run the installer**
- Click **Download Windows App** above
- Open the downloaded `MAUDEMetrics-Setup.exe` from your Downloads folder

**Step 2 — Handle the Windows SmartScreen warning**

You may see a blue screen saying *"Windows protected your PC"*:
> Click **More info** → then click **Run anyway**. This is a one-time prompt.

**Step 3 — Handle antivirus warnings (McAfee, Norton, Windows Defender, etc.)**

Some antivirus programs may flag or quarantine the app's backend engine. This is a **false positive** — a known issue with independently packaged open-source software. To fix it:

- **Windows Defender:**
  1. Open **Windows Security** (search for it in the Start Menu)
  2. Go to **Virus & threat protection** → **Protection history**
  3. Find the MAUDEMetrics entry → click **Actions** → **Allow on device**

- **McAfee:**
  1. Open **McAfee Security**
  2. Go to **My Protection** → **Quarantined files**
  3. Find `maudemetrics.exe` → click **Restore**
  4. When prompted, click **Restore and exclude** so it is not flagged again

- **Norton:**
  1. Open **Norton** → go to **Security** → **History**
  2. Find the quarantined item → click **Restore** → **Restore and exclude**

- **Other antivirus:** Look for a **Quarantine** or **Threats** section and restore `maudemetrics.exe`, then add it as an exception.

**Step 4 — Launch the app**
- Find **MAUDEMetrics** in your **Start Menu** or **Desktop** and double-click to open it.

---

## GitHub Repository

[https://github.com/MohamedMaroufMD/MAUDEMetrics](https://github.com/MohamedMaroufMD/MAUDEMetrics)

---

## Table of Contents

- [Download the Desktop App](#download-the-desktop-app)
- [Features](#features)
- [Screenshots](#screenshots)
- [FDA API Key](#-fda-api-key-recommended)
- [Advanced Usage (Docker / CLI)](#advanced-usage-docker--cli)
- [Export & Reports](#export--reports)
- [API Details](#api-details)
- [Data Access & Legal Compliance](#data-access--legal-compliance)
- [FAQ / Troubleshooting](#faq--troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

---

## Features

### 🔍 Advanced Search Capabilities
- **Brand Name Search:** Partial matching with case-insensitive search
- **Product Code Search:** FDA product codes (e.g., MAF, KYF, MND)
- **Manufacturer Search:** Company names with flexible matching
- **Product Class Search:** Generic device names (e.g., pacemaker, stent)
- **Date Range Filtering:** Flexible start/end date selection
- **Multiple Values:** Separate multiple entries with commas
- **API Key Integration:** Recommended for 2x faster data extraction with larger batches (1,000 vs 500 records)
- **Advanced Pagination:** Uses `search_after` to seamlessly bypass the 25,000 record skip limit for extracting massive datasets

### 📊 Analytics Dashboard
- **Event Type Analysis:** Distribution of adverse events
- **Patient Demographics:** Age, sex, ethnicity, and race breakdowns
- **Manufacturer Analysis:** Top manufacturers and countries
- **Product Class Analysis:** Most common device types
- **Device Problem Analysis:** Categorized device issues
- **Interactive Chart:** Visualize event types per brand name with modern multi-select filters (checkboxes and search) for Brand Name and Event Type, powered by Choices.js

### 📈 Data Export & Reporting
- **Multiple Export Options:** Choose the right format for your needs
- **Raw Data Export:** Fast extraction of complete event data in original API structure
- **Optimized Events Export:** Processed data with consistent Excel formatting and integrated MDR texts
- **Standalone Summary Export:** Dedicated Excel file for patient demographics and analytical summaries

### 🖥️ Desktop App
- **One-Click Install:** Native macOS (.dmg) and Windows (.exe) installers — no Python or Docker required
- **Auto-Updates:** The app checks GitHub Releases on launch and prompts you to update when a new version is available
- **Fresh Workspace:** Every launch starts with a clean slate — no stale results from previous sessions

## System Architecture

The following diagram illustrates the complete MAUDEMetrics workflow:

<p align="center">
  <img src="https://raw.githubusercontent.com/MohamedMaroufMD/MAUDEMetrics/refs/heads/main/MAUDEMetrics%20Workflow.png" alt="MAUDEMetrics Workflow" width="650"/>
</p>

*Figure 1: Complete workflow showing data extraction, processing, and export capabilities*

### 🎨 Modern User Interface
- **Responsive Design:** Works on desktop, tablet, and mobile
- **Bootstrap 5 Framework:** Modern, accessible UI components
- **Micro-interactions:** Subtle hover effects and animations
- **Intuitive Navigation:** Clear, consistent user experience
- **Professional Styling:** Clean, medical-grade interface
- **Modern Multi-Select Filters:** Interactive dropdowns with checkboxes and search (Choices.js) for analytics filtering
- **User-Friendly Feedback:** Clear status messages and loading indicators

### 🔧 Technical Features
- **Flask Backend:** Python-based web framework
- **SQLite Database:** Local data storage and caching
- **openFDA API Integration:** Direct FDA data access with API Key authentication
- **Advanced Pagination:** Implements `search_after` for robust large-scale data extraction
- **Pandas Processing:** Advanced multi-dimensional data manipulation
- **Excel Export:** Memory-safe `openpyxl` streaming architecture (write_only mode) with $O(1)$ lookup strategies to prevent Out-Of-Memory (OOM) failures on massive arrays
- **Docker Support:** Easy deployment and containerization
- **Electron Shell:** Wraps the app for native desktop delivery across Mac and Windows

---

## Screenshots

> _See the [GitHub repository](https://github.com/MohamedMaroufMD/MAUDEMetrics) for screenshots!_

![Home Page](screenshots/1.%20Home%20Page.png)

---

## 🔑 FDA API Key (Recommended)

> **Free · Takes 1 minute · Doubles your extraction speed**

MAUDEMetrics works out of the box without any account or key. However, registering for a **free FDA API key** is strongly recommended because it:

| | Without API Key | With API Key |
|---|---|---|
| **Records per batch** | 500 | 1,000 |
| **Extraction speed** | Standard | ~2× faster |
| **Rate limits** | Stricter | More lenient |

### How to Get Your Free API Key

1. Visit [open.fda.gov/apis/authentication/](https://open.fda.gov/apis/authentication/)
2. Click **Get API Key** and enter your name and email address.
3. Check your inbox — your key arrives instantly.
4. Paste it into the **FDA API Key** field in the MAUDEMetrics search form before clicking Extract.

Your key is stored only in the app's search form and is **never transmitted anywhere other than directly to the FDA API**.

---

## Advanced Usage (Docker / CLI)

> The desktop app above is the recommended way for most users. The options below are for advanced users who prefer Docker or a manual Python setup.

### Quick Start with Docker

```bash
# 1. Clone the repository
git clone https://github.com/MohamedMaroufMD/MAUDEMetrics.git
cd MAUDEMetrics

# 2. Build and run with Docker
docker compose up --build

# 3. Open your browser
open http://localhost:5005
```

### Manual Python Setup

> **Note:** Requires Python 3.11. Newer versions (e.g., Python 3.13) are not yet supported by all dependencies.

```bash
# 1. Create a virtual environment
python3.11 -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the app
python app.py
```

Then visit [http://localhost:5005](http://localhost:5005) in your browser.

### Usage

1.  **Search Setup:** Enter search criteria in any combination:
    -   **Brand Name(s):** e.g., "MiniMed 670G, Endurant II"
    -   **Product Code(s):** e.g., "MAF, KYF, MND"
    -   **Manufacturer(s):** e.g., "Medtronic, Abbott"
    -   **Product Class(es):** e.g., "pacemaker, defibrillator, stent"
    -   **Date Range:** Select start and end dates
    -   **FDA API Key (Recommended):** Get a free key from [open.fda.gov](https://open.fda.gov/apis/authentication/) and paste it in for 2x faster extraction.

2.  **Execute Search:** Click **Extract MAUDE Data**

3.  **Review Results:** View recent events (last 50) in the browser or export for analysis

4.  **Export Data:** Choose between:
    -   **Optimized Data**: Professional Excel file with formatted Events sheet
    -   **Raw Data (Fast)**: ZIP file with 5 CSV files in original API structure
    -   **Summary Statistics (Fast)**: Standalone Excel file with analytical summaries

---

## Export & Reports

### Export Options
- **Optimized Data Export:** Professional Excel file containing:
  - **Events Sheet**: Comprehensive processed and cleaned event data with integrated MDR texts
- **Raw Data Export (Fast):** ZIP file containing 5 CSV files in original API structure:
  - `Events.csv` - Main event data (report numbers, dates, flags)
  - `Devices.csv` - Device information (brand names, product codes, manufacturers)
  - `Patients.csv` - Patient demographics (age, sex, weight, outcomes)
  - `MDRTexts.csv` - Narrative reports (problem descriptions, manufacturer narratives)
  - `RawJSON.csv` - Complete original API responses
- **Summary Statistics Export (Fast):** Standalone Excel file containing statistical summaries, demographics, and analytics

### Data Formatting
- **Consistent Date Format:** All dates formatted as mm/dd/yyyy
- **Professional Styling:** Clean, readable .xlsx formatting
- **Multiple Formats:** Excel (.xlsx) and CSV options
- **Data Validation:** Ensures data integrity and compatibility
- **Performance Optimized:** Bypasses memory exhaustion (OOM crashes) on massive datasets (50k+ records) by utilizing instantaneous zero-DOM XML streaming and chunked database cursors.

---

## API Details

This application interacts with the [openFDA API](https://open.fda.gov/apis/device/event/).  
See the [fields reference](https://open.fda.gov/fields/deviceevent_reference.xlsx) for available data fields.

### Search Query Building
- **Flexible Matching:** Case-insensitive partial matching
- **Multiple Terms:** Support for comma-separated values
- **Wildcard Support:** Automatic wildcard expansion for partial matches
- **Date Range Filtering:** Precise date-based filtering

---

## Data Access & Legal Compliance

MAUDEMetrics retrieves data exclusively through the **official openFDA API** (`https://api.fda.gov/device/event.json`), the FDA's own platform created specifically for programmatic public access to its datasets.

| Topic | Details |
|---|---|
| **Data license** | All MAUDE data served by openFDA is released under [Creative Commons CC0 1.0 Universal](https://creativecommons.org/publicdomain/zero/1.0/) — equivalent to public domain. Unrestricted use, redistribution, and commercial application are permitted without attribution. |
| **Access method** | Only documented, publicly accessible API endpoints are used. No authentication-protected endpoints are accessed. No web scraping is performed. |
| **Rate-limit compliance** | The tool respects openFDA's published rate limits. An optional FDA-issued API key is supported for higher-volume use (see [FDA API Key](#-fda-api-key-recommended)). |
| **Pagination** | The cursor-based `search_after` pagination used by MAUDEMetrics is an [officially documented openFDA API feature](https://open.fda.gov/apis/query-parameters/), not a circumvention of access controls. |
| **openFDA Terms of Service** | https://open.fda.gov/terms/ |

---

## Testing and Validation

### Automated Testing
The application includes comprehensive testing to ensure reliability:

```bash
# Run basic functionality tests
python -m pytest tests/  # If pytest is available

# Manual testing checklist:
# 1. Search functionality with various parameters
# 2. Data export in Excel format
# 3. Analytics dashboard visualization
# 4. Database operations and caching
# 5. Docker container deployment
```

### Data Validation
- All FDA data is validated against openFDA API specifications
- Date formats are standardized across all exports
- Text sanitization prevents injection attacks
- Database integrity is maintained through proper schema design

### Performance Testing
- Tested with datasets up to 10,000 records
- Optimized for responsive web interface
- Efficient database queries with proper indexing
- Memory usage optimization for large datasets

## FAQ / Troubleshooting

**Q: How do I install the desktop app?**  
A: Download the installer for your platform from the [Releases page](https://github.com/MohamedMaroufMD/MAUDEMetrics/releases/latest). On macOS, open the `.dmg` and drag the app to Applications. On Windows, run the `.exe` installer and follow the prompts.

**Q: macOS says "unverified developer" or "damaged app" — is it safe?**  
A: Yes. MAUDEMetrics is free and open-source. macOS shows this warning for any app not distributed through the App Store or signed with a paid Apple certificate. See the **Installation Steps** section above for the exact fix for your warning type.

**Q: My antivirus (McAfee, Norton, Windows Defender) is blocking or deleting the app on Windows — is it safe?**  
A: Yes, this is a known false positive. Antivirus programs sometimes flag independently packaged open-source apps. The app is fully open-source and you can inspect every line of code in this repository. To fix it, restore `maudemetrics.exe` from your antivirus quarantine and add it as an exception. See the **Windows Installation Steps** above for platform-specific instructions.

**Q: How does auto-update work?**  
A: The desktop app checks GitHub Releases each time it launches. If a newer version is found, it downloads in the background and prompts you to restart and install — no manual re-downloading needed.

**Q: Docker won't start or port is in use?**  
A: Make sure port 5005 is free, or change the port in `docker-compose.yml`.

**Q: The export is empty or missing data?**  
A: Ensure you have run a search and that the FDA API is available.

**Q: Why was my export interrupted?**  
A: Previously, very large datasets (>10,000 records) could consume significant memory and crash the application. MAUDEMetrics has since been upgraded with a **zero-DOM streaming export engine**. It now easily writes enormous datasets (e.g., 50,000+ records) directly to disk sequentially, meaning memory exhaustion is incredibly rare. If your connection is interrupted, check your FDA API key and your container logs.

**Q: How do I reset the database?**  
A: The application automatically clears all database tables on each launch and begins a fresh start every time you submit a new search. There is no longer a need to manually clear the data.

**Q: Where can I get an FDA API Key?**  
A: You can register for an API key for free at [open.fda.gov/apis/authentication/](https://open.fda.gov/apis/authentication/).

**Q: Can I search for multiple manufacturers at once?**  
A: Yes, separate multiple manufacturers with commas (e.g., "Medtronic, Abbott").

**Q: Are search results case-sensitive?**  
A: No, all searches are case-insensitive with partial matching.

**Q: How are dates formatted in exports?**  
A: All dates are consistently formatted as mm/dd/yyyy across all sheets.

**Q: What makes the Events sheet special?**  
A: It's the premium "golden sheet" (exported via Optimized Data) with professional formatting, smart column organization, integrated MDR texts, and optimized performance for the best user experience.

**Q: How do I cite this software?**  
A: Please use the citation information in the CITATION.cff file or cite the JOSS paper when published.

---

## Contributing

We welcome contributions from the community! This project follows standard open-source development practices.

### How to Contribute

1. **Fork the repository** on GitHub
2. **Create a feature branch** from the main branch
3. **Make your changes** with clear commit messages
4. **Test your changes** to ensure they work correctly
5. **Submit a pull request** with a description of your changes

### Development Setup

```bash
# Clone the repository
git clone https://github.com/MohamedMaroufMD/MAUDEMetrics.git
cd MAUDEMetrics

# Create a virtual environment
python3.11 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the development server
python app.py
```

### Code Style

- Follow PEP 8 Python style guidelines
- Use meaningful variable and function names
- Add comments for complex logic
- Include docstrings for functions and classes

### Testing

Before submitting a pull request, please:
- Test the application locally
- Ensure all features work as expected
- Check that the Docker build works correctly

### Reporting Issues

When reporting issues, please include:
- Operating system and version
- Python version
- Steps to reproduce the issue
- Expected vs actual behavior
- Any error messages or logs

### Feature Requests

For feature requests, please describe:
- The problem you're trying to solve
- How the feature would help
- Any specific requirements or constraints

---

## License

- This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
- For data licensing, API terms, and compliance information, see [LEGAL.md](LEGAL.md).

---

## Acknowledgments

- [openFDA API](https://open.fda.gov/) for device event data
- [Flask](https://flask.palletsprojects.com/) community for documentation and support
- [Bootstrap](https://getbootstrap.com/) for modern UI components
- [Pandas](https://pandas.pydata.org/) for data processing capabilities
- [Electron](https://www.electronjs.org/) for cross-platform desktop packaging

---

## Contact

For questions, suggestions, or support, please [open an issue](https://github.com/MohamedMaroufMD/MAUDEMetrics/issues) on GitHub.
