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

## ⬇️ Download the Desktop App

> **No installation required.** Download, open, and start analyzing FDA data in seconds.

<table>
  <tr>
    <td align="center" width="50%">
      <h3>🍎 macOS</h3>
      <a href="https://github.com/MohamedMaroufMD/MAUDEMetrics/releases/latest/download/MAUDEMetrics.dmg">
        <img src="https://img.shields.io/badge/Download-macOS%20App-blue?style=for-the-badge&logo=apple&logoColor=white" alt="Download for macOS"/>
      </a>
      <br/><sub>macOS 10.12+ · Apple Silicon &amp; Intel</sub>
    </td>
    <td align="center" width="50%">
      <h3>🪟 Windows</h3>
      <a href="https://github.com/MohamedMaroufMD/MAUDEMetrics/releases/latest/download/MAUDEMetrics-Setup.exe">
        <img src="https://img.shields.io/badge/Download-Windows%20App-0078D4?style=for-the-badge&logo=windows&logoColor=white" alt="Download for Windows"/>
      </a>
      <br/><sub>Windows 10/11 · 64-bit</sub>
    </td>
  </tr>
</table>

> 💡 **Tip:** The app **automatically checks for updates** from GitHub Releases. When a new version is available, you'll be prompted to update in one click — no need to re-download manually.

### Installation Steps

**macOS:**
1. Click the **Download macOS App** button above.
2. Open the downloaded `.dmg` file.
3. Drag **MAUDEMetrics** into your Applications folder.
4. Double-click to launch. *(On first launch: right-click → Open if macOS warns about an unverified developer.)*

**Windows:**
1. Click the **Download Windows App** button above.
2. Run the downloaded `.exe` installer.
3. Follow the on-screen prompts and click **Finish**.
4. Launch MAUDEMetrics from your Start Menu or Desktop shortcut.

---

## GitHub Repository

[https://github.com/MohamedMaroufMD/MAUDEMetrics](https://github.com/MohamedMaroufMD/MAUDEMetrics)

---

## Table of Contents

- [Download the Desktop App](#️-download-the-desktop-app)
- [Features](#features)
- [Screenshots](#screenshots)
- [FDA API Key](#-fda-api-key-recommended)
- [Advanced Usage (Docker / CLI)](#advanced-usage-docker--cli)
- [Export & Reports](#export--reports)
- [API Details](#api-details)
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
./run.sh

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

### Export Examples
Real-world examples with 19,000+ reports are available in the [`examples/`](examples/) folder:

- **`MAUDEMetrics_2025-09-07_1657.xlsx`** - Optimized Excel export (14.1 MB)
- **`MAUDEMetrics_RawData_20250907_165704.zip`** - Raw data export (20.3 MB)

**File Size Comparison (19k+ Records):**
- **Optimized Export**: ~14 MB (Excel format with Events sheet only)
- **Raw Export**: 20.3 MB (ZIP with 5 CSV files, compressed)
- **Summary Export**: < 1 MB (Excel format with analytical summaries)

*The optimized export provides a clean, single-sheet view of events, while the raw export provides complete data structure preservation and faster processing for very large datasets. The standalone summary provides instant aggregate statistics.*

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

**Q: macOS says "unverified developer" — is it safe?**  
A: Yes, this is a standard macOS security prompt for apps not yet signed with a paid Apple Developer certificate. Right-click the app and select **Open** to bypass the warning.

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
