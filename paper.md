---
title: 'MAUDEMetrics: Automated extraction and comprehensive analysis of FDA MAUDE device safety data'
tags:
  - medical devices
  - FDA
  - MAUDE database
  - adverse events
  - safety analysis
  - openFDA API
  - Python
  - Flask
  - data extraction
  - healthcare analytics
  - regulatory science
  - postmarket surveillance
  - health informatics
  - reproducible research
  - clinical safety
authors:
  - name: Mohamed Marouf
    orcid: 0000-0001-7480-371X
    affiliation: "1"
affiliations:
  - index: 1
    name: Faculty of Medicine, Mansoura University, Mansoura, Egypt
date: 2025-09-08
bibliography: paper.bib
# JOSS submission ready
---

# Summary

Monitoring medical device safety is critical for patient safety and regulatory compliance.  
The FDA's Manufacturer and User Facility Device Experience (MAUDE) database contains over 22 million adverse event reports and remains a primary source for postmarket surveillance [@fda_maude].  
The FDA receives several hundred thousand new medical device reports annually, which are accessible via the openFDA Device Event API [@openfda_api].  

However, practical use of this database is constrained by the API’s 1,000-record pagination limit, the FDA website’s 500-record export restriction (with missing demographic fields), and the need for significant technical expertise to aggregate and analyze reports.  
These barriers make comprehensive device safety analysis difficult, time-consuming, and error-prone.  

**MAUDEMetrics** is a Python-based web application that democratizes access to MAUDE data by automating extraction, aggregation, and analysis of adverse event reports via the openFDA API.  
It provides an intuitive web interface, requires no programming expertise, and supports complex queries across brand names, product codes, manufacturers, and date ranges.  
The tool automatically handles API pagination, validates and standardizes fields, and produces professional multi-sheet Excel exports with raw data, cleaned datasets, and statistical summaries.  

By reducing analysis time from hours to minutes, MAUDEMetrics enhances reproducibility, efficiency, and accessibility of MAUDE data for clinicians, researchers, quality assurance teams, and regulatory professionals.

# Statement of Need

Medical device safety analysis is essential for patient safety and regulatory compliance, yet current MAUDE access methods impose significant barriers:

- **API Limitations**: The openFDA API restricts results to 1,000 records per query, requiring complex iteration [@openfda_api].  
- **Web Interface Limitations**: The MAUDE portal only allows 500-record exports and omits essential fields such as demographics [@fda_maude].  
- **Manual Burden**: Researchers must perform multiple searches, downloads, and merges to assemble datasets.  
- **Reproducibility Challenges**: Manual extraction is difficult to replicate and error-prone.    

**MAUDEMetrics** addresses these gaps by providing:  

- An accessible, programming-free web interface  
- Intelligent pagination to assemble complete datasets  
- Multi-parameter search across brand names, product codes, manufacturers, product classes, and date ranges
- Automated cleaning and validation of >100 FDA data fields  
- Multi-sheet professional Excel exports with summaries  
- Built-in visualization dashboard for event types and device brands 
- Docker containerization for reproducible workflows  

The software benefits clinical researchers, hospital QA teams, regulatory professionals, and healthcare institutions conducting device safety audits.

# Implementation

MAUDEMetrics is implemented as a **Flask** web application [@flask] that integrates directly with the openFDA Device Event API.  
The `fetch_all_API_data()` function automates API pagination and error handling, while **Pandas** [@mckinney2010] and **NumPy** [@numpy] perform data processing.  
Data are cached locally in **SQLite** [@sqlite] for performance and persistence.  

The export engine provides two complementary options for researchers:  

- **Raw Data Export**: reports are saved as CSV files that preserve the original JSON structure from the openFDA API, ensuring no loss of information.  
- **Processed Excel Export**: using **OpenPyXL** [@openpyxl], the system generates multi-sheet Excel workbooks with:  
  - **Events**: cleaned and standardized event data with integrated narratives  
  - **Summary**: aggregated statistics of patient demographics and event types

Deployment uses **Docker** [@docker] for reproducibility, and the web interface is styled with Bootstrap 5.  
Testing covers API integration, database operations, export generation, and web routes, with a 100% pass rate.  
Performance benchmarks show ~5,000 records extracted in under 30 seconds.

![MAUDEMetrics Workflow](MAUDEMetrics%20Workflow.png)

*Figure 1: MAUDEMetrics architecture and workflow. User input via the web interface triggers Flask endpoints that query the openFDA API (with pagination), cache results in SQLite, and process data with Pandas. The system supports two export modes: raw CSV files that preserve the original FDA JSON structure, and processed Excel workbooks (via OpenPyXL) with cleaned datasets and summary statistics. Docker ensures reproducible deployment.*

# Use Cases and Impact

**Research**:  
- Aggregate device-specific adverse events for systematic reviews  
- Compare event rates across manufacturers  
- Conduct temporal trend analyses  

**Clinical Quality Assurance**:  
- Monitor devices used within an institution  
- Detect emerging safety signals  
- Generate reproducible safety reports  

**Regulatory**:  
- Support FDA submissions with structured evidence  
- Standardize postmarket surveillance workflows  

By automating extraction and standardizing outputs, MAUDEMetrics reduces manual effort, minimizes transcription errors, and enables reproducible device safety investigations.

# Software Availability

- **Name**: MAUDEMetrics  
- **Repository**: <https://github.com/MohamedMaroufMD/MAUDEMetrics>  
- **DOI**: <https://doi.org/10.5281/zenodo.16691960>  
- **License**: Apache License 2.0  
- **Version**: 2.1.0 (2025-09-08)  

Detailed installation (Docker and manual), usage examples, tests, and sample exports are provided in the repository.

# References