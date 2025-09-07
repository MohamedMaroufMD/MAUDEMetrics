# MAUDEMetrics

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/python-3.8%2B-blue.svg)](https://www.python.org/)
[![Docker](https://img.shields.io/badge/docker-ready-blue.svg)](https://www.docker.com/)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.16691960.svg)](https://doi.org/10.5281/zenodo.16691960)

## Introduction

**MAUDEMetrics** is a user-friendly tool for analyzing and reporting on medical device events using data from the FDA's Manufacturer and User Facility Device Experience (MAUDE) Database via the openFDA API.  
It enables clinicians, researchers, and quality teams to quickly fetch, explore, and export device event data for further analysis.

> ⚠️ **Disclaimer:** This tool is for research and educational purposes only. Not for clinical decision-making.

---

## GitHub Repository

[https://github.com/MohamedMaroufMD/MAUDEMetrics](https://github.com/MohamedMaroufMD/MAUDEMetrics)

---

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Quick Start](#quick-start)
- [Installation & Usage](#installation--usage)
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
- **Cumulative Results:** Build comprehensive datasets across searches

### 📊 Analytics Dashboard
- **Event Type Analysis:** Distribution of adverse events
- **Patient Demographics:** Age, sex, ethnicity, and race breakdowns
- **Manufacturer Analysis:** Top manufacturers and countries
- **Product Class Analysis:** Most common device types
- **Device Problem Analysis:** Categorized device issues
- **Interactive Chart:** Visualize event types per brand name with modern multi-select filters (checkboxes and search) for Brand Name and Event Type, powered by Choices.js

### 📈 Data Export & Reporting
- **Multi-Sheet Export:** Professional formatting with multiple sheets
- **Raw Events Sheet:** Complete event data for analysis
- **Events Sheet:** Processed data with consistent formatting and integrated MDR texts
- **Summary Sheet:** Patient demographics and event summaries

## System Architecture

The following diagram illustrates the complete MAUDEMetrics workflow:

![MAUDEMetrics Workflow](MAUDEMetrics%20Workflow.png)

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
- **openFDA API Integration:** Direct FDA data access
- **Pandas Processing:** Advanced data manipulation
- **Excel Export:** Professional report generation
- **Docker Support:** Easy deployment and containerization
- **Modern Multi-Select Filters:** Analytics dashboard uses Choices.js for user-friendly filtering by brand and event type

---

## Screenshots

> _See the [GitHub repository](https://github.com/MohamedMaroufMD/MAUDEMetrics) for screenshots and sample exported files!_
> 
> _The analytics dashboard now features an interactive chart with modern multi-select filters (checkboxes and search) for Brand Name and Event Type._

![Home Page](screenshots/1.%20Home%20Page.png)

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/MohamedMaroufMD/MAUDEMetrics.git
cd MAUDEMetrics

# 2. Build and run with Docker
docker-compose up --build

# 3. Open your browser
open http://localhost:5005
```

---

## Installation & Usage

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed
- (Optional) Python 3.8+ if running locally

### Manual Setup (without Docker)

> **Note:** This project requires Python 3.11. Newer versions (e.g., Python 3.13) are not yet supported by all dependencies.

### Prerequisites

- Python 3.11 installed

### Steps

```bash
# 1. Create a virtual environment (recommended)
python3.11 -m venv venv
source venv/bin/activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Run the app
python app.py
```

Then visit [http://localhost:5005](http://localhost:5005) in your browser.

### Usage

1. **Search Setup:** Enter search criteria in any combination:
   - **Brand Name(s):** e.g., "MiniMed 670G, Endurant II"
   - **Product Code(s):** e.g., "MAF, KYF, MND"
   - **Manufacturer(s):** e.g., "Medtronic, Abbott"
   - **Product Class(es):** e.g., "pacemaker, defibrillator, stent"
   - **Date Range:** Select start and end dates

2. **Execute Search:** Click **Extract MAUDE Data**

3. **Review Results:** View recent events (last 50) in the browser or export for analysis

4. **Export Data:** Choose between:
   - **Optimized Data**: Professional Excel file with formatted sheets
   - **Raw Data (faster)**: ZIP file with 5 CSV files in original API structure

---

## Export & Reports

### Export Options
- **Optimized Data Export:** Professional Excel file with 2 sheets:
  - **Events Sheet**: Comprehensive processed and cleaned event data with integrated MDR texts
  - **Summary Sheet**: Statistical summaries, demographics, and analytics
- **Raw Data Export (faster):** ZIP file containing 5 CSV files in original API structure:
  - `Events.csv` - Main event data (report numbers, dates, flags)
  - `Devices.csv` - Device information (brand names, product codes, manufacturers)
  - `Patients.csv` - Patient demographics (age, sex, weight, outcomes)
  - `MDRTexts.csv` - Narrative reports (problem descriptions, manufacturer narratives)
  - `RawJSON.csv` - Complete original API responses

### Data Formatting
- **Consistent Date Format:** All dates formatted as mm/dd/yyyy
- **Professional Styling:** Clean, readable .xlsx formatting
- **Multiple Formats:** Excel (.xlsx) and CSV options
- **Data Validation:** Ensures data integrity and compatibility
- **Performance Optimized:** Fast export for large datasets (50k+ records)

### Export Examples
Real-world examples with 19,000+ reports are available in the [`examples/`](examples/) folder:

- **`MAUDEMetrics_2025-09-07_1657.xlsx`** - Optimized Excel export (14.1 MB)
- **`MAUDEMetrics_RawData_20250907_165704.zip`** - Raw data export (20.3 MB)

**File Size Comparison (19k+ Records):**
- **Optimized Export**: 14.1 MB (Excel format with 2 sheets: Events + Summary)
- **Raw Export**: 20.3 MB (ZIP with 5 CSV files, compressed)

*The optimized export is more compact for this dataset size, while the raw export provides complete data structure preservation and faster processing for very large datasets.*

**Usage:**
1. Download the example files to understand the export formats
2. Compare the two export options to choose the best fit for your needs
3. Use as templates for understanding the data structure before running your own extractions

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

**Q: Docker won't start or port is in use?**  
A: Make sure port 5005 is free, or change the port in `docker-compose.yml`.

**Q: The export is empty or missing data?**  
A: Ensure you have run a search and that the FDA API is available.

**Q: How do I reset the database?**  
A: Use the "Clear All Data" button in the UI.

**Q: Can I search for multiple manufacturers at once?**  
A: Yes, separate multiple manufacturers with commas (e.g., "Medtronic, Abbott").

**Q: Are search results case-sensitive?**  
A: No, all searches are case-insensitive with partial matching.

**Q: How are dates formatted in exports?**  
A: All dates are consistently formatted as mm/dd/yyyy across all sheets.

**Q: What makes the Events sheet special?**  
A: It's the premium "golden sheet" with professional formatting, smart column organization, integrated MDR texts, and optimized performance for the best user experience.

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

---

## Contact

For questions, suggestions, or support, please [open an issue](https://github.com/MohamedMaroufMD/MAUDEMetrics/issues) on GitHub.

